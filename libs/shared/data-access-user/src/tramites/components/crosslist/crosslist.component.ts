import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
/**
 * Interfaz que representa las etiquetas de la lista cruzada.
 * 
 * @property {string} tituluDeLaIzquierda - El título de la izquierda.
 * @property {string} derecha - El valor de la derecha.
 * @property {boolean} showUnoTitulo - Indica si se muestra el primer título.
 * @property {boolean} showDosTitulo - Indica si se muestra el segundo título.
 */
export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
  showUnoTitulo?: boolean;
  showDosTitulo?: boolean;
}
@Component({
  selector: 'crosslist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crosslist.component.html',
  styleUrl: './crosslist.component.scss',
  host: {}
})
export class CrosslistComponent implements OnInit, OnChanges {

  @Input() botonField: { btnNombre: string; class: string; funcion?: () => void }[] | null = null;
  @Input() botones: { btnNombre: string; class: string; funcion?: () => void }[] | null = null;

  @Input() label: CrossListLable | undefined;
  @Input() showSearchInput1: boolean = false;
  @Input() showSearchInput2: boolean = false;

  @Output() fechasSeleccionadasChange = new EventEmitter<string[]>();

  @Input() fechasSeleccionadas: string[] = []; 
  @Input() fechas: string[] = [];
  /**
   * Bandera para indicar si el control debe estar deshabilitado.
   */
  @Input() isDisabled!: boolean;
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('', [Validators.required]);
  fechasDatos: string[] = [];

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * - Verifica si la propiedad `botones` está definida. Si no lo está, llama al método
   *   `setButtonDefault` para establecer un valor predeterminado.
   */
  ngOnInit(): void {
    if (!this.botones) {
      this.setButtonDefault();
    }
  }

  /**
   * @inheritdoc
   * Este método se ejecuta cuando cambian las propiedades de entrada del componente.
   * 
   * @param changes - Un objeto de tipo `SimpleChanges` que contiene los cambios en las propiedades de entrada.
   * 
   * ### Descripción:
   * - Si la propiedad `fechas` cambia y tiene un valor actual, se actualiza la lista de fechas.
   * - Si `fechasSeleccionadas` no tiene elementos, se asigna la lista completa de fechas a `fechasDatos`.
   * - Si `fechasSeleccionadas` tiene elementos, se filtran las fechas para excluir las seleccionadas y se asignan a `fechasDatos`.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fechas'] && changes['fechas'].currentValue) {
      this.fechas = [...changes['fechas'].currentValue];
      if ( changes['fechasSeleccionadas'] && changes['fechasSeleccionadas'].currentValue.length === 0) {
        this.fechasDatos = [...this.fechas];
      } else if (changes['fechasSeleccionadas'] && changes['fechasSeleccionadas'].currentValue.length > 0) {
        this.fechasSeleccionadas = [...changes['fechasSeleccionadas'].currentValue];
        this.fechasDatos = this.fechas.filter(fecha => !this.fechasSeleccionadas.includes(fecha));
      } else {
        this.fechasDatos = [...changes['fechas'].currentValue];
        this.fechasSeleccionadas = [];
      }
    }

    if (changes['isDisabled']) {
      if (this.isDisabled) {
        this.fecha.disable();
        this.fechaSeleccionada.disable();
      } else {
        this.fecha.disable();
        this.fechaSeleccionada.disable();
      }
      this.fecha.updateValueAndValidity({ emitEvent: false });
      this.fechaSeleccionada.updateValueAndValidity({ emitEvent: false });
    }
  }
 

  /**
   * Configura los botones predeterminados para el componente Crosslist.
   * 
   * Esta función inicializa un arreglo de botones con sus propiedades y funciones asociadas.
   * Cada botón tiene un nombre, una clase CSS y una función que se ejecuta al hacer clic.
   * 
   * Botones configurados:
   * - "Agregar": Ejecuta la función `agregar` con un parámetro vacío.
   * - "Agregar todas": Ejecuta la función `agregar` con el parámetro 't'.
   * - "Quitar": Ejecuta la función `quitar` con un parámetro vacío.
   * - "Quitar todas": Ejecuta la función `quitar` con el parámetro 't'.
   */
  setButtonDefault(): void {
    this.botones = [
      {
        btnNombre: 'Agregar',
        class: 'btn-primary',
        funcion: (): void => this.agregar(''),
      },
      {
        btnNombre: 'Agregar todas',
        class: 'btn-default',

        funcion: (): void => this.agregar('t'),
      },
      {
        btnNombre: 'Quitar',
        class: 'btn-danger',

        funcion: (): void => this.quitar(''),
      },
      {
        btnNombre: 'Quitar todas',
        class: 'btn-default',

        funcion: (): void => this.quitar('t'),
      },
    ];
  }

  /**
   * Agrega fechas seleccionadas o actualiza las listas de fechas según el tipo especificado.
   *
   * @param type - Un string que indica el tipo de operación a realizar:
   *               - 't': Copia todas las fechas actuales a la lista de fechas seleccionadas y limpia la lista de datos de fechas.
   *               - Cualquier otro valor: Agrega una fecha seleccionada desde la lista de datos de fechas y la elimina de esta última.
   *
   * Este método actualiza las propiedades internas `fechasSeleccionadas` y `fechasDatos`,
   * y sincroniza estos cambios con el estado del `crosslistStore`. Además, emite un evento
   * para notificar los cambios en las fechas seleccionadas.
   */
  agregar(type: string): void {
    if (type === 't') {
      this.fechasSeleccionadas = [...this.fechas];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value.map(Number);
      this.fechasSeleccionadas = Object.assign([], this.fechasSeleccionadas);
      this.fechasSeleccionadas.push(this.fechasDatos[FECHA_VALOR]);
      this.fechasDatos.splice(FECHA_VALOR, 1);
    }

    this.fechasSeleccionadasChange.emit(this.fechasSeleccionadas);
  }


  /**
   * Quita elementos de las listas según el tipo especificado.
   * 
   * @param type - Tipo de operación ('t' para reiniciar fechas, otro valor para modificar las listas).
   * @returns void
   */
  quitar(type: string = ''): void {
    if (type === 't') {
      this.fechasDatos = [...this.fechas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value.map(Number);
      this.fechasSeleccionadas = Object.assign([], this.fechasSeleccionadas);
      this.fechasDatos.push(this.fechasSeleccionadas[FECHA_VALOR]);
      this.fechasSeleccionadas.splice(FECHA_VALOR, 1);
    }

    this.fechasSeleccionadasChange.emit(this.fechasSeleccionadas);
  }

  /**
   * Verifica si el control de fecha seleccionado es inválido.
   *
   * @returns {boolean | null} - Devuelve `true` si el control es inválido y ha sido tocado,
   * `false` si es válido, o `null` si no hay un control definido.
   */
  isInvalid(): boolean | null {
    const CONTROL = this.fechaSeleccionada;
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  /**
   * Establece el estado deshabilitado del control.
   * @param isDisabled - Indica si el control debe estar deshabilitado.
   * @returns void
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
