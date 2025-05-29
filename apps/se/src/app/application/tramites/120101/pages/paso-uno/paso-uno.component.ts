import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
/**
 * @component PasoUnoComponent
 * @description
 * Este componente representa el primer paso del flujo del trámite 120101.
 * @selector paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
 * @Input pestanaDosFormularioValido
 * @description
 * Indica si los formularios asociados a la pestaña dos del wizard son válidos.
 * 
 * Funcionalidad:
 * - Recibe un valor booleano desde el componente padre para determinar la validez de los formularios en la pestaña dos.
 * - Este valor puede ser utilizado para habilitar o deshabilitar acciones relacionadas con la pestaña dos.
 * 
 * @type {boolean}
 * 
 * @example
 * <paso-uno [pestanaDosFormularioValido]="true"></paso-uno>
 */
  @Input() pestanaDosFormularioValido!: boolean;
   /**
   * compo doc
   * Emisor de eventos que notifica el cambio de pestaña.
   * Emite un número correspondiente al índice de la pestaña seleccionada.
   * 
   * @type {EventEmitter<number>}
   * @memberof PasoUnoComponent
   */
   @Output() pestanaCambiado = new EventEmitter<number>();

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
 * @property elementoDeTablaSeleccionado
 * @description
 * Almacena el elemento seleccionado de la tabla en el paso uno del flujo del trámite 120101. 
 * @type {InstrumentoCupoTPLForm}
 */
  public elementoDeTablaSeleccionado!: InstrumentoCupoTPLForm;

  /**
  * @constructor
  * @description Inicializa una instancia del `DatosComponent`.
  */
  constructor(
    private solicitudRegistroService: SolicitudDeRegistroTplService
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
    if(this.consultaState.update) {
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
    this.solicitudRegistroService
      .getSolicitudRegistroData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        Object.entries(resp).forEach(([key, value]) => {
          this.solicitudRegistroService.actualizarEstadoFormulario(key, value);
        });
        }
      });
  }

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }
/**
 * @method archivoHagaClicControlador
 * @description
 * Maneja el evento de clic en un archivo o elemento de la tabla en el paso uno del flujo del trámite 120101.
 * @param {InstrumentoCupoTPLForm} event - El elemento seleccionado de la tabla.
 */
  // eslint-disable-next-line class-methods-use-this
  public archivoHagaClicControlador(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.elementoDeTablaSeleccionado = event;
    }
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
