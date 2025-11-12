import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ListaPasosWizard, Notificacion, PASOS } from '@libs/shared/data-access-user/src';
import { MENSAJE_DE_VALIDACION, TITULOMENSAJE } from '../../constants/medicos-uso.enum';
import { Observable, catchError, map, switchMap, take, throwError } from 'rxjs';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';

import { NotificacionesComponent } from '@libs/shared/data-access-user/src/tramites/components/notificaciones/notificaciones.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RegistroSolicitudService } from '@libs/shared/data-access-user/src/core/services/shared/registro-solicitud.service';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

import { AmpliacionServiciosAdapter } from '../../adapters/ampliacion-servicios.adapter';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

import { Solicitud260215State, Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { ToastrService } from 'ngx-toastr';


interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-sanitario',
  templateUrl: './sanitario.component.html',
})
export class SanitarioComponent implements OnInit {
  /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
  public formErrorAlert!: string;
  /**
  * ID del tipo de trámite.
  */
  idTipoTramite: string = '260215';

  /**
   * Flag to enable/disable API calls for testing navigation flow
   * Set to true when API endpoint is working correctly
   */
  private enableAPICall: boolean = true;

  /**
    * Evento para cargar archivos.
    */
  cargarArchivosEvento: EventEmitter<void> = new EventEmitter<void>();
  /**
 * Control para activar botón de carga de archivos.
 */
  activarBotonCargaArchivos: boolean = false;

  /**
 * Control de sección de carga de documentos.
 */
  seccionCargarDocumentos: boolean = false;

  /**
       * Indica si la carga de documentos está en progreso.
       * @type {boolean}
       */
  cargaEnProgreso: boolean = true;

  /**
   * @property {ListaPasosWizard[]} pasos - Lista de pasos para el asistente (wizard) del trámite sanitario.
   * Utiliza la constante PASOS para inicializar la secuencia de pasos que el usuario debe seguir.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual utilizado para controlar el estado o la posición dentro del componente.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * Referencia al componente `WizardComponent` dentro de la vista.
   * Permite acceder y manipular las funcionalidades del asistente de pasos (wizard)
   * desde el componente actual.
   *
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
 * ID de la solicitud.
 */
  idSolicitudState: number | null = null;

  /** Nueva notificación relacionada con el RFC. */
  public seleccionarFilaNotificacion!: Notificacion;

  /**
   * Clase CSS para mostrar una alerta de error en caso de validación fallida.
   * Matches 260218 behavior so the template can render a global error alert.
   */
  public infoError: string = 'alert-danger text-center';


  /**
 * @property {boolean} isSaltar
 * @description
 * Indica si se debe saltar al paso de firma. Controla la navegación
 * directa al paso de firma en el wizard.
 * @default false - No salta por defecto
 */
  isSaltar: boolean = false;
  /**
     * Controla la visibilidad del modal de alerta.
     * @property {boolean} mostrarAlerta
     */
  public mostrarAlerta: boolean = false;

  /**
       * @property {PasoUnoComponent} pasoUnoComponent
       * @description
       * Referencia al componente hijo `PasoUnoComponent` mediante
       * `@ViewChild`. Permite acceder a sus métodos y propiedades
       * desde este componente padre.
       */
  @ViewChild(PasoUnoComponent)
  pasoUnoComponent!: PasoUnoComponent;

  /**
   * Referencia al componente de notificaciones para depuración.
   * Nos permite inspeccionar si el modal fue abierto por el componente hijo.
   */
  @ViewChild(NotificacionesComponent)
  notificacionesChild?: NotificacionesComponent;

  // Removed direct ViewChild for PagoDeDerechosContenedoraComponent

  /**
   * Indica si se requieren datos de pago para el trámite actual.
   * @remarks
   * Esta propiedad controla la visualización y el manejo de información relacionada con pagos en el componente.
   */
  public requiresPaymentData: boolean = false;

  /**
   * Indica si la confirmación sin pago de derechos está activa.
   * Valor 0 significa que no está confirmada, otros valores pueden indicar diferentes estados.
   */
  public confirmarSinPagoDeDerechos: number = 0;


  private _esFormaValido: boolean = false;

  /**
   * Estado del formulario de registro IMMEX.
   */
  storeData!: Solicitud260215State;

  constructor(private query: Tramite260215Query,
    private tramite260215Store: Tramite260215Store,
    private registroSolicitudService: RegistroSolicitudService,
    private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.query.selectTramiteState$.pipe().subscribe((data) => {
      this.storeData = data;
    });
  }


  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;

      if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarPasoUno();
      }

      // Determinar el estado de confirmación/cobro según los contenedores del paso uno.
      if (!this.pasoUnoComponent?.contenedorDeDatosSolicitudComponent?.validarContenedor() && this.requiresPaymentData) {
        this.confirmarSinPagoDeDerechos = 2;
      } else {
        this.confirmarSinPagoDeDerechos = 3;
      }

      const PAGO_VALID = Boolean(this.pasoUnoComponent?.pagoDeDerechosContenedoraComponent?.validarContenedor && this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor());

      if (!this.requiresPaymentData) {
        if (!PAGO_VALID) {
          this.mostrarAlerta = true;
          this.seleccionarFilaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE_DE_VALIDACION,
            cerrar: true,
            tiempoDeEspera: 2000,
            txtBtnAceptar: 'SI',
            txtBtnCancelar: 'NO',
            alineacionBtonoCerrar: 'flex-row-reverse',
          };
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        } else if (this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() && !this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor()) {
          this.confirmarSinPagoDeDerechos = 2;
        } else if (
          this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() &&
          this.pasoUnoComponent?.contenedorDeDatosSolicitudComponent?.validarContenedor() &&
          !this.pasoUnoComponent?.tercerosRelacionadosVistaComponent?.validarContenedor()
        ) {
          this.confirmarSinPagoDeDerechos = 3;
        }
      }

      if (!isValid) {
        this.formErrorAlert = MENSAJE_DE_VALIDACION;
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }

      const PAYLOAD = AmpliacionServiciosAdapter.toFormPayload(this.storeData);
      let shouldNavigate = false;
      this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, PAYLOAD).subscribe((response) => {
        shouldNavigate = response.codigo === '00';
        if (!shouldNavigate) {
          const ERROR_MESSAGE = response.mensaje || 'Error desconocido en la solicitud';
          this.formErrorAlert = SanitarioComponent.generarAlertaDeError(ERROR_MESSAGE);
          this.esFormaValido = true;
          this.indice = 1;
          this.datosPasos.indice = 1;
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          return;
        }

        if (shouldNavigate) {
          if (response && response.datos) {
            const DATOS = response.datos as { id_solicitud?: number };
            if (DATOS.id_solicitud && typeof DATOS.id_solicitud === 'number') {
              this.idSolicitudState = DATOS.id_solicitud ?? 0;
            } else {
              this.idSolicitudState = 0;
            }
          }

          // Calcular el nuevo índice basado en la acción
          let indiceActualizado = e.valor;
          if (e.accion === 'cont') {
            indiceActualizado = e.valor;
          }
          this.toastrService.success(response.mensaje);
          if (indiceActualizado > 0 && indiceActualizado < 5) {
            this.indice = indiceActualizado;
            this.datosPasos.indice = indiceActualizado;
            // Mostrar la sección de carga de documentos y ajustar controles
            this.seccionCargarDocumentos = true;
            this.activarBotonCargaArchivos = false;
            this.cargaEnProgreso = false;
            if (e.accion === 'cont') {
              this.wizardComponent.siguiente();
            } else {
              this.wizardComponent.atras();
            }
          }
        } else {
          this.toastrService.error(response.mensaje);
        }
      });
    } else {
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      this.wizardComponent.atras();
    }
  }
  /**
  * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
  */
  set esFormaValido(val: boolean) {
    this._esFormaValido = val;
  }
  get esFormaValido(): boolean {
    return this._esFormaValido;
  }
  /**
   * Cierra el modal y realiza acciones según el valor proporcionado.
   *
   * @param value - Indica si se debe proceder con el pago de derechos. Si es `true`, se oculta la alerta y se requiere información de pago. Si es `false`, se oculta la alerta y se establece la confirmación sin pago de derechos.
   */
  cerrarModal(value: boolean): void {
    /* eslint-disable no-console */
    console.log('[Sanitario] cerrarModal called with value=', value, 'before:', {
      mostrarAlerta: this.mostrarAlerta,
      requiresPaymentData: this.requiresPaymentData,
      confirmarSinPagoDeDerechos: this.confirmarSinPagoDeDerechos,
    });
    /* eslint-enable no-console */
    if (value) {
      this.mostrarAlerta = false;
      this.requiresPaymentData = true;
    } else {
      this.mostrarAlerta = false;
      this.confirmarSinPagoDeDerechos = 4;
    }
    // Re-run validation on the paso-uno container to ensure fields are marked
    // and validation messages are displayed (matches behavior observed in 260218)
    try {
      this.pasoUnoComponent?.validarPasoUno();
    } catch (err) {
      // swallow errors in case child isn't initialized yet
      /* eslint-disable no-console */
      console.debug('[Sanitario] validarPasoUno revalidation skipped:', err);
      /* eslint-enable no-console */
    }
    /* eslint-disable no-console */
    console.log('[Sanitario] cerrarModal completed - after:', {
      mostrarAlerta: this.mostrarAlerta,
      requiresPaymentData: this.requiresPaymentData,
      confirmarSinPagoDeDerechos: this.confirmarSinPagoDeDerechos,
    });
    /* eslint-enable no-console */
    // Strong re-validation: ensure child form controls are marked as touched so
    // per-field "Este campo es obligatorio" messages appear (matches 260218).
    try {
      // If the contenedor indicates the form is invalid, mark all fields touched
      if (this.pasoUnoComponent?.contenedorDeDatosSolicitudComponent?.validarContenedor() === false) {
        this.pasoUnoComponent?.contenedorDeDatosSolicitudComponent?.datosDeLaSolicitudComponent?.marcarTodosLosCamposComoTocados();
        this.formErrorAlert = MENSAJE_DE_VALIDACION;
        this.esFormaValido = true;
        // scroll to top so user sees the global alert
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        /* eslint-disable no-console */
        console.debug('[Sanitario] cerrarModal -> marcarTodosLosCamposComoTocados called and global alert set');
        /* eslint-enable no-console */
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.debug('[Sanitario] cerrarModal revalidation failed:', err);
      /* eslint-enable no-console */
    }
  }


  /**
   * @method blancoObligatoria
   * @description Método para manejar el evento de documentos obligatorios en blanco.
   * Actualiza la bandera `isSaltar` basada en el estado recibido.
   * @param {boolean} enBlanco - Indica si hay documentos obligatorios en blanco.
   * @return {void}
   */
  onBlancoObligatoria(enBlanco: boolean): void {
    this.isSaltar = enBlanco;
  }

  /**
   * @method saltar
   * @description
   * Método para saltar directamente al paso de firma en el wizard.
   * Actualiza los índices correspondientes y ejecuta la transición
   * forward en el componente wizard.
   */
  saltar(): void {
    this.indice = 3;
    this.datosPasos.indice = 3;
    this.wizardComponent.siguiente();
  }
  /**
   * Guarda los datos del formulario utilizando el servicio estándar compartido.
   * Convierte el estado actual a payload y envía los datos al servidor.
   * @returns {Observable<BaseResponse<unknown>>}
   */
  guardarDatosAPI(): Observable<BaseResponse<unknown>> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return this.registroSolicitudService.postGuardarDatos('260215', FORM_PAYLOAD);
      }),
      catchError(error => {
        // eslint-disable-next-line no-console
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }

  /**
  * Maneja el evento de carga de documentos
  */
  manejaEventoCargaDocumentos(event: boolean): void {
    this.activarBotonCargaArchivos = event;
  }

  /**
* Maneja cuando la carga se ha realizado
*/
  cargaRealizada(realizada: boolean): void {
    this.seccionCargarDocumentos = realizada ? false : true;
    // If cargaRealizada is true (upload complete), show 'Continuar' button
  }

  /**
 * Maneja el progreso de carga
 */
  onCargaEnProgreso(carga: boolean): void {
    // Implementar lógica de progreso si es necesario
    this.cargaEnProgreso = carga;
  }
  /**
  * Actualiza la sección de carga de documentos según el paso actual
  */
  private actualizarSeccionCargarDocumentos(): void {
    this.seccionCargarDocumentos = this.indice === 2;
  }

  /**
   * Maneja el clic en cargar archivos
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
    * Botón anterior para paso 2
    */
  anterior(): void {
    this.indice = 1;
    this.datosPasos.indice = this.indice;
    this.actualizarSeccionCargarDocumentos();
    if (this.wizardComponent) {
      this.wizardComponent.atras();
    }
  }


  /**
   * Guarda la solicitud de ampliación de servicios utilizando el adaptador para convertir el estado
   * y enviar los datos al servidor.
   * @returns {Observable<BaseResponse<{ id_solicitud: number }>>}
   */
  onGuardar(): Observable<BaseResponse<{ id_solicitud: number }>> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return (this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD) as Observable<BaseResponse<{ id_solicitud?: number }>>).pipe(
          map((response: BaseResponse<{ id_solicitud?: number }>) => {
            // Adapt the response to the expected type
            return {
              ...response,
              datos: {
                id_solicitud: response.datos?.id_solicitud ?? 0
              }
            } as BaseResponse<{ id_solicitud: number }>;
          })
        );
      }),
      catchError(error => {
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Paso 2: Cuando usuario hace click en 'Continuar' después de cargar archivos
   * Avanza a paso 3 (firma)
   */
  continuarDespuesDeCarga(): void {
    this.indice = 3;
    this.datosPasos.indice = 3;
    this.actualizarSeccionCargarDocumentos();
    if (this.wizardComponent) {
      this.wizardComponent.siguiente();
    }
  }

  /**
   * Método para avanzar al siguiente paso (paso 3) después de la carga de documentos.
   * Se asegura de que el índice y el estado de los pasos se actualicen correctamente,
   * y llama al método `siguiente` del componente `WizardComponent` si está disponible.
   */
  siguiente(): void {
    this.indice = 3;
    this.datosPasos.indice = 3;
    this.actualizarSeccionCargarDocumentos();
    if (this.wizardComponent) {
      this.wizardComponent.siguiente();
    }
  }

  public static generarAlertaDeError(mensajes: string): string {
    const ALERTA = `
      <div class="d-flex justify-content-center text-center">
        <div class="col-md-12 p-3  border-danger  text-danger rounded">
          <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

          <div class="d-flex justify-content-start mb-1">
            <span class="me-2">1.</span>
            <span class="flex-grow-1 text-center">${mensajes}</span>
          </div>  
        </div>
      </div>
      `;
    return ALERTA;
  }

  /**
     * @method obtenerNombreDelTítulo
     * @description Devuelve el título correspondiente al paso actual.
     * @param {number} valor - Índice del paso.
     * @returns {string} Título del paso.
     */
    static obtenerNombreDelTítulo(valor: number): string {
      switch (valor) {
        case 1:
          return TITULOMENSAJE;
        case 2:
          return 'Cargar archivos';
        case 3:
          return 'Firmar';
        default:
          return TITULOMENSAJE;
      }
    }
}
