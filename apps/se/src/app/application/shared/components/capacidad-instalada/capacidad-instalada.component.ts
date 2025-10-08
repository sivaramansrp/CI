import { CAPACIDAD_INSTALADA, CapacidadInstalada } from '../../constantes/capacidad-instalada.enum';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent, } from '@libs/shared/data-access-user/src';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { ComplementosSeccionQuery } from '../../../estados/queries/complementos-seccion.query';
import { ComplementosSeccionState } from '../../../estados/tramites/complementos-seccion.store';
import { Location } from '@angular/common';
import {  Notificacion,NotificacionesComponent } from '@ng-mf/data-access-user';

/**
 * Componente para la capacidad instalada
 * @export CapacidadInstaladaComponent
 * */
@Component({
  selector: 'app-capacidad-instalada',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent, FormsModule,
    ReactiveFormsModule,
    NotificacionesComponent
  ],
  templateUrl: './capacidad-instalada.component.html',
  styleUrl: './capacidad-instalada.component.css',
})
export class CapacidadInstaladaComponent implements OnInit {
  /**
   * Notificación que se muestra al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Índice de la capacidad instalada que se está editando actualmente.
   */
  editingIndex: number | null = null;
  /**
  * Formulario reactivo que gestiona los datos relacionados con el pago de derechos, como clave, dependencia, banco,
  * llave, fecha e importe.
  */
  capacidadForm!: FormGroup;
  /**
    * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
    */
  public solicitudState!: ComplementarState;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Evento que se emite al cerrar el popup.
   * 
   * Se utiliza para notificar al componente padre que el popup ha sido cerrado.
   */
  @Output() cerrarPopup = new EventEmitter<void>();

  /**
 * Estado de la solicitud 250101, que contiene los valores actuales de la solicitud.
 */
  public complementosSeccionState!: ComplementosSeccionState;

  /**
   * Evento que emite la lista de objetos de tipo `CapacidadInstalada` para la tabla de capacidad instalada.
   * 
   * @event
   * @type {EventEmitter<CapacidadInstalada[]>}
   * @remarks
   * Este evento se dispara cuando hay cambios en la lista de capacidad instalada, permitiendo que componentes padres reciban la información actualizada.
   */
  @Output() obtenerCapacidadInstaladaTablaList: EventEmitter<
    CapacidadInstalada[]
  > = new EventEmitter<CapacidadInstalada[]>(true);

  /**
   * Constructor de la clase CapacidadInstaladaComponent
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador
   */
  constructor(private ubicaccion: Location, private fb: FormBuilder, private complementarStore: ComplementarStore,
    private complementarQuery: ComplementarQuery, private complementosSeccionQuery: ComplementosSeccionQuery,) {

  }
  /**
  * Método que se ejecuta cuando el componente es inicializado.
  * 
  * Inicializa el formulario reactivo con los valores actuales de la solicitud.
  */
  ngOnInit(): void {
    this.complementosSeccionQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.complementosSeccionState = seccionState as ComplementosSeccionState;
          if (this.complementosSeccionState['fraccionArancelaria']) {
            this.fraccionArancelariaProductoTerminadoCatlogo.push({
              id: 1,
              descripcion: typeof this.complementosSeccionState['fraccionArancelaria'] === 'string'
                ? this.complementosSeccionState['fraccionArancelaria']
                : (typeof this.complementosSeccionState['fraccionArancelaria'] === 'object' && this.complementosSeccionState['fraccionArancelaria'] !== null && 'descripcion' in this.complementosSeccionState['fraccionArancelaria']
                  ? (this.complementosSeccionState['fraccionArancelaria'] as { descripcion: string }).descripcion
                  : '')
            })
          }
        })
      )
      .subscribe();
    this.inicializarFormulario();
    if (!this.capacidadInstaladaDatos) {
      this.capacidadInstaladaDatos = [];
    }
  }
  /**
   * Tipo de selección para la tabla de capacidad instalada
   * @property {TablaSeleccion} constructorapacidadInstaladaTablaSeleccion
   */
  constructorapacidadInstaladaTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Encabezados de la tabla de capacidad instalada
   * @property {any} capacidadInstaladaEncabezado
   */
  capacidadInstaladaEncabezado = CAPACIDAD_INSTALADA;

  /**
   * Datos de la tabla de capacidad instalada
   * @property {any[]} capacidadInstaladaDatos
   */
  capacidadInstaladaDatos!: CapacidadInstalada[];

  /**
   * Datos de la tabla de capacidad instalada
   * @property {any[]} SelectedInstaladaDatos
   */
  SelectedInstaladaDatos!: CapacidadInstalada[];

  /**
   * Catálogo de fracciones arancelarias de producto terminado
   * @property {any[]} fraccionArancelariaProductoTerminadoCatlogo
   */
  fraccionArancelariaProductoTerminadoCatlogo: Catalogo[] = [];

  /**
   * Vuelve a la ubicación anterior en el historial del navegador
   * @returns {void}
   */
  regrasar(): void {
    this.obtenerCapacidadInstaladaTablaList.emit(this.capacidadInstaladaDatos);
    this.cerrarPopup.emit();

  }
  /** Inicializa los datos del formulario suscribiéndose al estado del trámite.  
 *  Asigna el estado actual al modelo local del componente. */
  inicializarFormulario(): void {
    this.complementarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as ComplementarState;
        })
      )
      .subscribe();
    this.capacidadForm = this.fb.group({
      fraccionArancelariaProductoTerminado: [this.solicitudState.fraccionArancelariaProductoTerminado, Validators.required],
      umt: [this.solicitudState.umt, Validators.required],
      descripcionComercialProductoTerminado: [this.solicitudState.descripcionComercialProductoTerminado, Validators.required],
      turnos: [this.solicitudState.turnos, [Validators.required]],
      horasPorTurno: [this.solicitudState.horasPorTurno, [Validators.required]],
      cantidadEmpleados: [this.solicitudState.cantidadEmpleados, [Validators.required]],
      cantidadMaquinaria: [this.solicitudState.cantidadMaquinaria, [Validators.required]],
      descripcionMaquinaria: [this.solicitudState.descripcionMaquinaria, [Validators.required, Validators.maxLength(300)]],
      capacidadInstaladaMensual: [this.solicitudState.capacidadInstaladaMensual, [Validators.required, Validators.maxLength(11), Validators.pattern('^\\d{1,11}$')]],
      capacidadInstaladaAnual: [this.solicitudState.capacidadInstaladaAnual, [Validators.required]],
      calculoCapacidadInstalada: [{ value: this.solicitudState.calculoCapacidadInstalada, disabled: true }, Validators.required],
      capacidadUtilizadaPct: [this.solicitudState.capacidadUtilizadaPct, Validators.required]
    });

  }

  /**
   * Limita la entrada de un campo de texto a un número máximo de caracteres numéricos.
   * @param event Event del input
   * @param maxLength Longitud máxima permitida
   * @param controlPath Ruta del control en el formulario
   */
  onInputMaxLength(event: Event, maxLength: number, controlPath: string): void {
    const TARGET = event.target as HTMLInputElement;
    let value = TARGET.value;
    value = value.replace(/\D/g, '').slice(0, maxLength);
    TARGET.value = value;
    this.capacidadForm.get(controlPath)?.setValue(value, { emitEvent: false });
  }
  /**
  * Método que se ejecuta cuando el campo capacidadUtilizadaPct pierde el foco (blur).
  * Autopopula el valor de calculoCapacidadInstalada con el valor actual de capacidadUtilizadaPct.
  */
  alPerderFocoCapacidadUtilizadaPct(): void {
    const VAL = this.capacidadForm.get('capacidadUtilizadaPct')?.value;
    this.capacidadForm.get('calculoCapacidadInstalada')?.setValue(VAL, { emitEvent: false });
  }
  /**
  * Método que actualiza el store con los valores del formulario.
  * 
  * @param form - Formulario reactivo con los datos actuales.
  * @param campo - El campo que debe actualizarse en el store.
  * @param metodoNombre - El nombre del método en el store que se debe invocar.
  */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof ComplementarStore): void {
    const VALOR = form.get(campo)?.value;
    (this.complementarStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }


  /**
   * Agrega una nueva capacidad instalada al arreglo `capacidadInstaladaDatos` 
   * basado en los valores proporcionados en el formulario `capacidadForm`.
   * 
   * Este método crea un objeto de tipo `CapacidadInstalada` con los datos 
   * ingresados en el formulario, lo agrega al arreglo y luego limpia el formulario.
   * 
   * @remarks
   * - Asegúrese de que los campos del formulario estén correctamente mapeados 
   *   a las propiedades del objeto `CapacidadInstalada`.
   * - Este método también llama al método `limpiar` para restablecer los valores 
   *   del formulario después de agregar los datos.
   * 
   * @example
   * // Ejemplo de uso:
   * componente.agregar();
   * 
   * @throws
   * Este método no lanza excepciones explícitas, pero puede fallar si los valores 
   * del formulario no están definidos o no son válidos.
   */
  agregar(): void {
    const CAPACIDAD: CapacidadInstalada = {
      PLANTA: this.capacidadForm.value.fraccionArancelariaProductoTerminado, // Adjust field mapping as needed
      FRACCION_ARANCELARIA_PRODUCTO_TERMINADO_CATLOGO: this.capacidadForm.value.fraccionArancelariaProductoTerminado,
      UMT: this.capacidadForm.value.umt,
      DESCRIPCION_COMERCIAL_PRODUCTO_TERMINADO: this.capacidadForm.value.descripcionComercialProductoTerminado,
      TURNOS: this.capacidadForm.value.turnos,
      HORAS_POR_TURNO: this.capacidadForm.value.horasPorTurno,
      CANTIDAD_EMPLEADOS: this.capacidadForm.value.cantidadEmpleados,
      CANTIDAD_MAQUINARIA: this.capacidadForm.value.cantidadMaquinaria,
      DESCRIPCION_MAQUINARIA: this.capacidadForm.value.descripcionMaquinaria,
      CAPACIDAD_INSTALADA_MENSUAL: this.capacidadForm.value.capacidadInstaladaMensual,
      CAPACIDAD_INSTALADA_ANUAL: this.capacidadForm.value.capacidadInstaladaAnual,
      CAPACIDAD_EFECTIVAMENTE_UTILIZADA: this.capacidadForm.value.capacidadUtilizadaPct,
      CALCULO_CAPACIDAD_INSTALADA: this.capacidadForm.value.calculoCapacidadInstalada,
    };

    if (this.editingIndex !== null && this.editingIndex > -1) {
      this.capacidadInstaladaDatos[this.editingIndex] = CAPACIDAD;
      this.capacidadInstaladaDatos = [...this.capacidadInstaladaDatos];
      this.editingIndex = null;
     
    } else {  
      this.capacidadInstaladaDatos = [...this.capacidadInstaladaDatos, CAPACIDAD];
    }
    this.SelectedInstaladaDatos = [];
    this.limpiar();
  }

  /**
   * Método invocado cuando ocurre un cambio en la fracción arancelaria.
   * 
   * Este método actualiza el estado de la tienda con los valores correspondientes
   * relacionados con la fracción arancelaria del producto terminado. Utiliza el formulario
   * `capacidadForm` para obtener los datos necesarios y llama a la función `setValoresStore`
   * para realizar la actualización en el estado global.
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  onFraccionArancelariaChange(): void {
    this.setValoresStore(this.capacidadForm, 'fraccionArancelariaProductoTerminado', 'setFraccionArancelariaProductoTerminado');
  }

  /**
   * Restablece el formulario de capacidad a su estado inicial.
   *
   * Este método realiza las siguientes acciones en el formulario `capacidadForm`:
   * - Restablece todos los valores del formulario a sus valores iniciales mediante `reset()`.
   * - Marca el formulario como "prístino" (sin cambios) utilizando `markAsPristine()`.
   * - Marca el formulario como "no tocado" utilizando `markAsUntouched()`.
   * - Actualiza el estado de validez del formulario llamando a `updateValueAndValidity()`.
   *
   * Útil para limpiar el formulario y prepararlo para un nuevo ingreso de datos.
   */
  limpiar(): void {
    this.capacidadForm.reset();
    this.capacidadForm.markAsPristine();
    this.capacidadForm.markAsUntouched();
    this.capacidadForm.updateValueAndValidity();
  }


  /**
   * Maneja la selección de capacidades instaladas.
   * 
   * @param capacidadInstalada - Arreglo de objetos `CapacidadInstalada` seleccionados.
   * Si el arreglo contiene elementos, actualiza la propiedad `SelectedInstaladaDatos` con la selección.
   */
  onCapacidadInstaladaSeleccionadas(capacidadInstalada: CapacidadInstalada[]): void { debugger;
      this.SelectedInstaladaDatos = capacidadInstalada;

  }

  /**
   * Elimina las capacidades instaladas seleccionadas de la lista `capacidadInstaladaDatos`.
   * 
   * Recorre el arreglo `SelectedInstaladaDatos` y elimina cada elemento correspondiente
   * de `capacidadInstaladaDatos` si existe. Al finalizar, actualiza la referencia del arreglo
   * para asegurar la detección de cambios en Angular.
   *
   * @remarks
   * Esta función asume que `SelectedInstaladaDatos` y `capacidadInstaladaDatos` son arreglos
   * de objetos comparables mediante igualdad estricta (`===`).
   */
  eliminarCapacidadInstalada(): void {
    if (this.SelectedInstaladaDatos?.length > 0) { debugger;
      this.SelectedInstaladaDatos.forEach(planta => {
        const INDEX = this.capacidadInstaladaDatos.findIndex(row => row === planta);
        if (INDEX !== -1) {
          this.capacidadInstaladaDatos.splice(INDEX, 1);
        }
      });
      this.capacidadInstaladaDatos = [...this.capacidadInstaladaDatos];
    }
  }
  /**
   * Edita la capacidad instalada seleccionada.
   */
  editarCapacidadInstalada(): void {
console.log(`selected row ${this.SelectedInstaladaDatos?.length}`)
    if (this.SelectedInstaladaDatos?.length === 1) {
      const SELECTED = this.SelectedInstaladaDatos[0];
      this.capacidadForm.patchValue({
        fraccionArancelariaProductoTerminado: SELECTED.FRACCION_ARANCELARIA_PRODUCTO_TERMINADO_CATLOGO,
        umt: SELECTED.UMT,
        descripcionComercialProductoTerminado: SELECTED.DESCRIPCION_COMERCIAL_PRODUCTO_TERMINADO,
        turnos: SELECTED.TURNOS,
        horasPorTurno: SELECTED.HORAS_POR_TURNO,
        cantidadEmpleados: SELECTED.CANTIDAD_EMPLEADOS,
        cantidadMaquinaria: SELECTED.CANTIDAD_MAQUINARIA,
        descripcionMaquinaria: SELECTED.DESCRIPCION_MAQUINARIA,
        capacidadInstaladaMensual: SELECTED.CAPACIDAD_INSTALADA_MENSUAL,
        capacidadInstaladaAnual: SELECTED.CAPACIDAD_INSTALADA_ANUAL,
        calculoCapacidadInstalada: SELECTED.CALCULO_CAPACIDAD_INSTALADA,
        capacidadUtilizadaPct: SELECTED.CAPACIDAD_EFECTIVAMENTE_UTILIZADA
      });

      setTimeout(() => {
        const NATIVE_EL = document.querySelector(
          'app-catalogo-select[formControlName="fraccionArancelariaProductoTerminado"] select'
        ) as HTMLElement | null;
        if (NATIVE_EL) {
          NATIVE_EL.focus();
        }
      }, 0);
      this.editingIndex = this.capacidadInstaladaDatos.findIndex(row => row === SELECTED);
    }
    else if (!this.SelectedInstaladaDatos || this.SelectedInstaladaDatos.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: '',
        mensaje: 'Debe elegir un registro de complemento para actualizar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
}
}