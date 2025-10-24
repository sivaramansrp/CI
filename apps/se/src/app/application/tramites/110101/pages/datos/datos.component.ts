import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { CategoriaMensaje, ConsultaioQuery, ConsultaioState, Notificacion, TabEvaluarTratadosResponse } from '@ng-mf/data-access-user';
import { Subject, takeUntil, tap } from 'rxjs';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';
import { EvaluacionTratadosService } from '../../services/evaluacion-tratados.service';
import { PantallasSvcService } from '../../services/pantallas-svc.service';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { Solicitante110101State } from '../../estados/tramites/solicitante110101.store';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 110101
 * Establecer el índice del subtítulo
 */

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {
  /**
 * @property {boolean} esDictaminadorBandera
 * @description Indica si se está mostrando boton de la calificación con bandera.
 * Por defecto es false.
 */
   @Input() esDictaminadorBandera: boolean = false;

  /**
   * Esta variable se utiliza para almacenar los tratados datos actualizados.
   * Es un array de objetos de tipo EvaluarTratadosResponse.
   */
  tratadosDatosActualizados: TabEvaluarTratadosResponse[] = [];

  /**
   * Este evento se emite cuando los tratados datos son actualizados.
   * Es un EventEmitter que emite un array de objetos de tipo EvaluarTratadosResponse.
   */
  @Output() tratadosEmitidos = new EventEmitter<TabEvaluarTratadosResponse[]>();

  /**
  * Esta variable se utiliza para almacenar el índice del subtítulo.
  */
  indice: number = 1;
  /**
   * Subject utilizado para emitir una señal que permite desuscribirse de los observables, típicamente en el ciclo de vida ngOnDestroy.
   * Cuando se emite un valor, todas las suscripciones que usan `takeUntil(this.destroyNotifier$)` serán desuscritas,
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Almacena el estado actual del proceso Consultaio para este componente.
   */
  public consultaState!: ConsultaioState;

   /**
   * Representa el estado actual de la solicitud para el trámite 110101.
   * Esta propiedad contiene toda la información relevante sobre la solicitud del solicitante,
   * encapsulada en la interfaz `Solicitante110101State`.
  */
  public solicitudeState!: Solicitante110101State;

  /**
  * Notificación actual que se muestra en el componente.
  *
  * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
  * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
  */
  public nuevaNotificacion!: Notificacion;

  /**
  * @property desactivado
  * @type {boolean}
  * @public
  * @description
  * Indica si la pestaña está desactivada (no interactiva).
  * Se utiliza para controlar la habilitación o deshabilitación de la pestaña en la interfaz.
  * Por defecto, la pestaña inicia desactivada (`true`).
  */
  public desactivado: boolean = true;

  public bandejaSolicitud = false;
  /**
   * Inicializa una nueva instancia del componente.
   */
  constructor(
    private pantallasSvc: PantallasSvcService,
    private consultaQuery: ConsultaioQuery,
    private solicitanteQuery: Solicitante110101Query,
    private evaluacionTratadosService: EvaluacionTratadosService
  ) {

  }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * 
   * - Se suscribe al observable `selectConsultaioState$` de `consultaQuery` y actualiza la propiedad local `consultaState` con el valor emitido.
   * - Si la bandera `consultaState.update` es verdadera después de la inicialización, ejecuta el método `guardarDatosFormulario()` para guardar los datos del formulario.
   * - Asegura que la suscripción se limpie correctamente utilizando el observable `destroyNotifier$` para evitar fugas de memoria.
   */
  ngOnInit(): void {
    // Suscripción a consultaState
  this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      tap((seccionState) => {
        this.consultaState = seccionState;

        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        }

        this.checkParameterAndEnableTabs();
      })
    )
    .subscribe();

  this.solicitanteQuery.selectSolicitante$
    .pipe(
      takeUntil(this.destroyNotifier$),
      tap((seccionState) => {
        this.solicitudeState = seccionState;
      })
    )
    .subscribe();
    if(this.consultaState.parameter === "EvaluarSolicitud"){
      this.evaluacionTablaTratados();
    }
  }
  /**
     * Obtiene la evaluación de tratados para la solicitud actual y actualiza la tabla de evaluación.
     *
     * Este método llama al servicio `evaluacionTratadosService.getEvaluarTratados` pasando el ID de la solicitud.
     * - Si la respuesta es exitosa (`CodigoRespuesta.EXITO`), actualiza `tratadosEvaluacionTablaDatos`.
     * - Si ocurre un error o la respuesta es incorrecta, muestra una notificación de error.
     */
    evaluacionTablaTratados(): void {
      this.evaluacionTratadosService.getEvaluarTratados(this.consultaState.id_solicitud)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (response) => {
            if (response.codigo === CodigoRespuesta.EXITO) {
              this.onTratadosActualizados(response.datos ?? []);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              this.nuevaNotificacion = {
                tipoNotificacion: 'toastr',
                categoria: CategoriaMensaje.ERROR,
                modo: 'action',
                titulo: response.error || 'Error obtener tratados.',
                mensaje: response.causa || response.mensaje || 'Error obtener tratados.',
                cerrar: false,
                txtBtnAceptar: '',
                txtBtnCancelar: '',
              };
            }
          },
          error: (err) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const MENSAJE = err?.error?.error || 'Error obtener tratados.';
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: 'error',
              modo: 'action',
              titulo: '',
              mensaje: MENSAJE,
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            }
          }
        });
    }
  /**
   * Este método se utiliza para verificar si el parámetro existe y habilitar las pestañas
   * - Si el parámetro existe y no es undefined, habilita las pestañas 3 y 4.
   * - Si el parámetro no existe o es undefined, mantiene las pestañas 3 y
   * 4 desactivadas.
   */
  private checkParameterAndEnableTabs(): void {
    if (this.consultaState.parameter === undefined && this.consultaState.update === true && this.consultaState.tipoDeTramite === 'Consulta de Proceso'
    ) {
      this.bandejaSolicitud = true;
    }
  }
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Guarda los datos del formulario obteniendo el estado actual del formulario desde el servicio.
   *
   * Este método se suscribe al observable retornado por `pantallasSvc.getConsultaDatos()`,
   * y al recibir una respuesta, actualiza el estado del formulario usando `pantallasSvc.actualizarEstadoFormulario`.
   * La suscripción se cancela automáticamente cuando `destroyNotifier$` emite, evitando fugas de memoria.
   */
  public guardarDatosFormulario(): void {
    this.pantallasSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.pantallasSvc.actualizarEstadoFormulario(response);
    })
  }

  /* Habilita la pestaña si actualmente está desactivada.
   * Cambia la variable `desactivado` a `false` para permitir la interacción con la pestaña.
   *
   * @example
   * this.habilitarPestana();
   * // La pestaña pasa de estar desactivada a habilitada.
   */
  habilitarPestana(): void {
    if (this.desactivado) {
      this.desactivado = false;
    }
  }

  /**
   * @method onTratadosActualizados
   * @description Maneja la actualización de los tratados.
   * @param tratados - Array de objetos de tipo EvaluarTratadosResponse que contiene los tratados actualizados.
   */
  onTratadosActualizados(tratados: TabEvaluarTratadosResponse[]): void {
    this.tratadosDatosActualizados = tratados;
    this.tratadosEmitidos.emit(tratados);
  }

  /**
   * Deshabilita (cierra) la pestaña actual.
   *
   * @example
   * this.cerrarPestana();
   * // La pestaña pasa de estar habilitada a deshabilitada.
   */
  cerrarPestana(): void {
    if (!this.desactivado) {
      this.desactivado = true;
    }
  }

  /**
   * Método del ciclo de vida que se llama cuando el componente es destruido.
   * Emite un valor y completa el subject `destroyNotifier$` para notificar a cualquier suscripción
   * que debe limpiar recursos y prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
