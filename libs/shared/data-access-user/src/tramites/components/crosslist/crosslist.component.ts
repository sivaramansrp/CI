import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrosslistState, CrosslistStore } from '../../../core/estados/crosslist.store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CrosslistQuery } from '../../../core/queries/crosslist.query';
/**
 * Interfaz que representa las etiquetas de la lista cruzada.
 * 
 * @property {string} tituluDeLaIzquierda - El título de la izquierda.
 * @property {string} derecha - El valor de la derecha.
 */
export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
}
@Component({
  selector: 'crosslist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crosslist.component.html',
  styleUrl: './crosslist.component.scss',
  host: {}
})
export class CrosslistComponent implements OnInit {

  @Input() botonField: any;
  @Input() botones: any;

  @Input() label: CrossListLable | undefined;
  @Input() showSearchInput1: boolean = false;
  @Input() showSearchInput2: boolean = false;

  @Output() fechasSeleccionadasChange = new EventEmitter<string[]>();

  @Input() fechasSeleccionadas: string[] = []; //Este no sera un input
  @Input() fechas!: string[]; //Este no sera un input

  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('', [Validators.required]);
  fechasDatos: string[] = [];

  public crosslistState!: CrosslistState;
  private destroyNotifier$: Subject<void> = new Subject<void>();

  constructor(
    private crosslistQuery: CrosslistQuery,
    private crosslistStore: CrosslistStore
  ) { 
        // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe al observable `selectCrosslist$` para obtener el estado actual de `crosslistState`
   *   y lo asigna a la propiedad `crosslistState` del componente. La suscripción se gestiona
   *   utilizando `takeUntil` para evitar fugas de memoria.
   * 
   * - Verifica si la propiedad `botones` está definida. Si no lo está, llama al método
   *   `setButtonDefault` para establecer un valor predeterminado.
   * 
   * - Inicializa las propiedades `fechas` y `fechasSeleccionadas` con los valores del estado
   *   actual de `crosslistState`.
   * 
   * - Evalúa si todas las fechas están seleccionadas. Si es así, inicializa `fechasDatos` como
   *   un arreglo vacío. De lo contrario, asigna a `fechasDatos` los datos de fechas disponibles
   *   en el estado actual o, si no hay datos, las fechas originales.
   */
  ngOnInit(): void {
    this.crosslistQuery.selectCrosslist$
      .pipe(takeUntil(this.destroyNotifier$),
        map((state) => {
          this.crosslistState = state;
        })
      )
      .subscribe();


    if (!this.botones) {
      this.setButtonDefault();
    }

    this.fechas = [...this.crosslistState.fechas];
    this.fechasSeleccionadas = [...this.crosslistState.fechasSeleccionadas];

    if (this.fechas.length === this.fechasSeleccionadas.length) {
      this.fechasDatos = [];
    } else {
      this.fechasDatos = this.crosslistState.fechasDatos.length > 0 ? [...this.crosslistState.fechasDatos] : [...this.crosslistState.fechas];
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

    this.crosslistStore.establecerFechasSeleccionadas(this.fechasSeleccionadas);
    this.crosslistStore.establecerFechasDatos(this.fechasDatos);

    this.fechasSeleccionadasChange.emit(this.fechasSeleccionadas);
  }

  /**
   * Elimina elementos de las listas de fechas según el tipo especificado.
   *
   * @param type - Un string que indica el tipo de operación a realizar.
   *               Si es 't', se restablecen las listas de fechas a su estado inicial.
   *               Si es cualquier otro valor, se elimina una fecha seleccionada y se agrega de nuevo a la lista de fechas disponibles.
   *
   * - Cuando `type` es 't':
   *   - Se restablece la lista `fechasDatos` con los valores originales de `fechas`.
   *   - Se vacía la lista `fechasSeleccionadas`.
   *
   * - En otros casos:
   *   - Se obtiene el índice de la fecha seleccionada desde `fechaSeleccionada`.
   *   - Se mueve la fecha correspondiente de `fechasSeleccionadas` a `fechasDatos`.
   *   - Se actualizan las listas eliminando y agregando los elementos correspondientes.
   *
   * Además, actualiza el estado en el `crosslistStore` y emite un evento para notificar
   * los cambios en la lista de fechas seleccionadas.
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

    this.crosslistStore.establecerFechasSeleccionadas(this.fechasSeleccionadas);
    this.crosslistStore.establecerFechasDatos(this.fechasDatos);
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
}
