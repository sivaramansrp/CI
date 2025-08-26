import { CAPACIDAD_INSTALADA, CapacidadInstalada } from '../../constantes/capacidad-instalada.enum';
import { CatalogoSelectComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent,} from '@libs/shared/data-access-user/src';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Subject,map,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { Location } from '@angular/common';

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
    TablaDinamicaComponent,FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './capacidad-instalada.component.html',
  styleUrl: './capacidad-instalada.component.css',
})
export class CapacidadInstaladaComponent implements OnInit {
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
   * Constructor de la clase CapacidadInstaladaComponent
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador
   */
  constructor(private ubicaccion: Location, private fb: FormBuilder,private complementarStore: ComplementarStore,
      private complementarQuery: ComplementarQuery,) {
    
  }
   /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    if(!this.capacidadInstaladaDatos){
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
   * Catálogo de fracciones arancelarias de producto terminado
   * @property {any[]} fraccionArancelariaProductoTerminadoCatlogo
   */
  fraccionArancelariaProductoTerminadoCatlogo = [{ "id": 1, "descripcion": "GUADALAJARA" }];

  /**
   * Vuelve a la ubicación anterior en el historial del navegador
   * @returns {void}
   */
  regrasar(): void {
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
      turnos: [this.solicitudState.turnos, Validators.required],
      horasPorTurno: [this.solicitudState.horasPorTurno, Validators.required],
      cantidadEmpleados: [this.solicitudState.cantidadEmpleados, Validators.required],
      cantidadMaquinaria: [this.solicitudState.cantidadMaquinaria, Validators.required],
      descripcionMaquinaria: [this.solicitudState.descripcionMaquinaria, Validators.required],
      capacidadInstaladaMensual: [this.solicitudState.capacidadInstaladaMensual, Validators.required],
      capacidadInstaladaAnual: [this.solicitudState.capacidadInstaladaAnual, Validators.required],
      calculoCapacidadInstalada: [this.solicitudState.calculoCapacidadInstalada, Validators.required],
      capacidadUtilizadaPct: [this.solicitudState.capacidadUtilizadaPct, Validators.required]
    });
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

  this.capacidadInstaladaDatos.push(CAPACIDAD);
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


}
