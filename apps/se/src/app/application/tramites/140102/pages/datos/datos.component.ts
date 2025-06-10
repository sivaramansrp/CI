import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { RegistroDeSolicitudService } from '../../services/registro-de-solicitud.service';

/**
 * @component DatosComponent
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos.
 * Este componente permite cambiar entre diferentes secciones o pestañas
 * utilizando un índice que representa el subtítulo seleccionado.
 * 
 * @selector app-datos
 * @templateUrl ./datos.component.html
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {
   /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
  /**
   * @property indice
   * @description
   * Variable que almacena el índice del subtítulo seleccionado.
   * Por defecto, el índice inicial es `1`.
   * Este índice se utiliza para determinar qué sección o pestaña está activa.
   * 
   * @type {number}
   * 
   * @example
   * // Acceder al índice actual
   * console.log(this.indice); // 1
   */
 public indice: number = 1;

  /**
   * @property pestanaDosFormularioValido
   * @description
   * Indica si el formulario de la pestaña dos es válido.
   * Este valor se recibe como entrada desde el componente padre y se utiliza
   * para habilitar o deshabilitar ciertas acciones relacionadas con la pestaña dos.
   * 
   * @type {boolean}
   * 
   * @example
   * <app-datos [pestanaDosFormularioValido]="true"></app-datos>
   */
  @Input() pestanaDosFormularioValido!: boolean;

  /**
   * @property pestanaCambiado
   * @description
   * Evento que se emite cuando se cambia de pestaña.
   * El valor emitido es el índice de la pestaña seleccionada, lo que permite
   * al componente padre reaccionar al cambio de pestaña.
   * 
   * @type {EventEmitter<number>}
   * 
   * @example
   * <app-datos (pestanaCambiado)="onPestanaCambiado($event)"></app-datos>
   */
  @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * @property elementoDeTablaSeleccionado
   * @description
   * Variable que almacena el elemento seleccionado en la tabla.
   * Este elemento se actualiza cuando el usuario hace clic en un archivo o registro
   * dentro de la tabla, permitiendo realizar acciones específicas sobre el elemento seleccionado.
   * 
   * @type {InstrumentoCupoTPLForm}
   * 
   * @example
   * // Seleccionar un elemento en la tabla
   * this.elementoDeTablaSeleccionado = { id: 1, nombre: 'Elemento de prueba' };
   */
  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

   /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  
    /** Subject para notificar la destrucción del componente. */
    private destroyNotifier$: Subject<void> = new Subject();
  
     constructor(
        private registroDeSolicitudService: RegistroDeSolicitudService,
      ) {
        // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
      }
   /**
   * @method ngOnInit
   * @description
   * Método de inicialización del componente `DatosComponent`.
   * 
   * Detalles:
   * - Se suscribe al observable `selectConsultaioState$` del store `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
   * - Actualiza la propiedad `consultaState` con el estado recibido.
   * - Si la propiedad `update` del estado es verdadera, llama al método `guardarDatosFormulario()`.
   * - Si no, establece la bandera `esDatosRespuesta` en `true` para indicar que se deben mostrar los datos de respuesta.
   * 
   * @example
   * this.ngOnInit();
   * // Inicializa el componente y gestiona el flujo de datos según el estado de la consulta.
   */
  ngOnInit(): void { 
    if(this.consultaState?.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

    /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
    guardarDatosFormulario(): void {
      this.registroDeSolicitudService
        .getImportacionDefinitivaData().pipe(
          takeUntil(this.destroyNotifier$)
        )
        .subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
            Object.entries(resp).forEach(([key, value]) => {
              this.registroDeSolicitudService.actualizarEstadoFormulario(key, value);
            });
          }
        });
    }

  /**
   * @method seleccionaTab
   * @description
   * Método que establece el índice del subtítulo seleccionado.
   * Este método se utiliza para cambiar entre diferentes subtítulos o pestañas.
   * También emite un evento al componente padre para notificar el cambio de pestaña.
   * 
   * @param {number} i - Índice del subtítulo que se desea seleccionar.
   * 
   * @example
   * // Cambiar a la pestaña 2
   * this.seleccionaTab(2);
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }

  /**
 * @method ngOnDestroy
 * @description
 * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
 * 
 * Detalles:
 * - Emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores que el componente está siendo destruido.
 * - Completa el observable para liberar recursos y evitar fugas de memoria.
 * 
 * @returns {void} No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
