import { Component, EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
import { DatosPasos,ERROR_FORMA_ALERT, ListaPasosWizard, Notificacion, PASOS, WizardComponent, WizardService, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Observable, map, switchMap, take } from 'rxjs';
import { Solicitud260514State, Tramite260514Store } from '../../../../estados/tramites/260514/tramite260514.store';
import { AccionBoton } from '@ng-mf/data-access-user';
import { DatosComponent} from '../datos/datos.component';
import { DatosDomicilioService } from '../../services/permiso-importacion.service';
import { MENSAJE_DE_VALIDACION } from '../../constantes/datos.enum';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { Shared260514Service } from '../../services/260514-payload.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite260514Query } from '../../../../estados/queries/260514/tramite260514.query';

/**
 * @component PantallasComponent
 * @description
 * Componente principal para gestionar el flujo de pasos en el wizard del trámite 260514.
 * Permite la navegación entre diferentes pantallas/pasos utilizando el componente Wizard.
 * Controla el índice del paso actual y los datos necesarios para la navegación.
 * 
 * @selector app-pantallas
 * @templateUrl ./pantallas.component.html
 * @styleUrl ./pantallas.component.scss
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss',
})
export class PantallasComponent implements OnInit {

   isSaltar: boolean = false;
    MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
    public confirmarSinPagoDeDerechos: number = 0;
    public requiresPaymentData: boolean = false;
   

  /**
   * @property pantallasPasos
   * @type {ListaPasosWizard[]}
   * @description
   * Lista de pasos del wizard, obtenida desde una constante.
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 
  /**
   * @property indice
   * @type {number}
   * @default 1
   * @description
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;

  @ViewChild(DatosComponent) pasoUnoComponent!:DatosComponent ;

    /**
     * Lista de pasos del asistente.
     * Se obtiene de una constante definida en otro archivo.
     */
    pasos: ListaPasosWizard[] = PASOS;
  

  public esFormaValido: boolean = false;

  public formErrorAlert = ERROR_FORMA_ALERT;
 
   /**
* Controla la visibilidad del modal de alerta.
* @property {boolean} mostrarAlerta
*/
  public mostrarAlerta: boolean = false;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;
    @ViewChild(PagoDeDerechosContenedoraComponent) pagoDerechosRef!: PagoDeDerechosContenedoraComponent;
  
 
   /**
     * @property wizardService
     * @description
     * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
     * @type {WizardService}
     */
      wizardService = inject(WizardService);
  

  /**
   * @property datosPasos
   * @type {DatosPasos}
   * @description
   * Datos utilizados para el control del wizard, como el número de pasos, el índice actual y los textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

    public solicitudState!: Solicitud260514State;
  
  /**
    * Evento que se emite para cargar archivos.
    * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
    */
   cargarArchivosEvento = new EventEmitter<void>();
 
   /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;

   /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

  /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;

  /** Nueva notificación relacionada con el RFC. */
    public seleccionarFilaNotificacion!: Notificacion;
  

  /**
     * Constructor que inyecta los servicios necesarios para el componente.
     * - toastrService: Servicio para mostrar notificaciones al usuario.
     * - service: Servicio específico para operaciones del permiso de vegetales y nutrientes.
     * - store: Manejador del estado del trámite 260514.
     * - Shared260514Service: Servicio compartido para lógica común del trámite 2605.
     * - query: Fuente de datos reactiva para observar el estado de la solicitud.
     */
    constructor(
      private toastrService: ToastrService,
      private service: DatosDomicilioService,
      private store: Tramite260514Store,
      private shared260514Service: Shared260514Service,
      private query: Tramite260514Query
    ) {}
  
      /** Se ejecuta al inicializar el componente y suscribe al estado de la solicitud. */
  ngOnInit(): void {
    this.query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
    });
  }


  /**
   * @method getValorIndice
   * @description
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás en el wizard.
   * Si la acción es 'cont', avanza al siguiente paso; en caso contrario, retrocede.
   * Solo actualiza si el valor está dentro del rango de pasos válidos.
   * 
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  // public getValorIndice(e: AccionBoton): void {
  //   // Validar formularios antes de continuar desde el paso uno
  //   if (this.indice === 1 && e.accion === 'cont') {
  //     const ISVALID = this.pasoUnoComponent.validOnButtonClick();
  //     if (!ISVALID) {
  //       this.esFormaValido = true;
  //       return; // Detener ejecución si los formularios son inválidos
  //     }
  //   }

  //   // Calcular el nuevo índice basado en la acción
  //   let indiceActualizado = e.valor;
  //   if (e.accion === 'cont') {
  //     indiceActualizado = e.valor + 1;
  //   } else if (e.accion === 'ant') {
  //     indiceActualizado = e.valor - 1;
  //   }

  //   // Validar que el nuevo índice esté dentro de los límites permitidos
  //   if (indiceActualizado > 0 && indiceActualizado <= this.pantallasPasos.length) {

  //     // Actualizar el índice y datosPasos
  //     this.indice = indiceActualizado;
  //     this.datosPasos.indice = indiceActualizado;

  //     if (e.accion === 'cont') {
  //       this.wizardComponent.siguiente();
  //     } else if (e.accion === 'ant') {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }
    getValorIndice(e: AccionBoton): void {
      const NEXT_INDEX =
          e.accion === 'cont' ? e.valor + 1 :
          e.accion === 'ant' ? e.valor - 1 :
          e.valor;

      
          if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.pasoUnoComponent.validOnButtonClick();

       if (!this.pasoUnoComponent.datosDeLaComponent?.validarClickDeBoton() && this.requiresPaymentData) {
        this.confirmarSinPagoDeDerechos = 2;
      } else {
        this.confirmarSinPagoDeDerechos = 3;
      }

      if (!this.requiresPaymentData) {
        if (!this.pagoDerechosRef?.validarFormulariosBanco()) {
          this.mostrarAlerta = true;
          this.seleccionarFilaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: '',
            mensaje: 'Debe capturar los datos de pago de derechos para continuar.',
            cerrar: true,
            tiempoDeEspera: 2000,
            txtBtnAceptar: 'SI',
            txtBtnCancelar: 'NO',
            alineacionBtonoCerrar: 'flex-row-reverse'
          }
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        } else if (this.pagoDerechosRef.validarFormulariosBanco() && this.pasoUnoComponent.datosDeLaComponent?.validarClickDeBoton()) {
          this.confirmarSinPagoDeDerechos = 3;
        }
      }

      if (!ISVALID) {
        this.formErrorAlert = this.MENSAJE_DE_ERROR;
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;

        return; // Detener ejecución si los formularios son inválidos
      }
      this.esFormaValido = false;
    }
        if (e.valor > 0 && e.valor < this.pasos.length) {
        if (e.accion === 'cont') {
          this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
              this.wizardComponent.siguiente();
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
        } else {
          this.indice = NEXT_INDEX;
          this.datosPasos.indice = NEXT_INDEX;
          this.wizardComponent.atras();
        }
      }
    }
  
    /**
     * Maneja la lógica para actualizar el índice del paso del wizard según el evento del botón de acción proporcionado.
     *
     * Este método obtiene el estado actual desde `nuevoProgramaIndustrialService`, lo guarda,
     * y muestra un mensaje de éxito o error dependiendo del código de respuesta. Si la respuesta es exitosa
     * y el valor del evento está dentro del rango válido (1 a 4), actualiza el índice del wizard y navega
     * hacia adelante o atrás según el tipo de acción.
     *
     * @param e - El evento del botón de acción que contiene el valor y el tipo de acción.
     */
      private shouldNavigate$(): Observable<boolean> {
        return this.shared260514Service.getAllState().pipe(
          take(1),
          switchMap(data => this.guardar(data)),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map((response: any) => {
            const OK = response.codigo === '00';
            if (OK) {
              this.toastrService.success(response.mensaje);
            } else {
                const ERROR_MESSAGE = response.mensaje || 'Error desconocido en la solicitud';
          this.formErrorAlert = PantallasComponent.generarAlertaDeError(ERROR_MESSAGE);
              this.toastrService.error(response.mensaje);
            }
            return OK;
          })
        );
      }
  
      /**
       * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
       *
       * @param data - Los datos que se desean guardar y enviar al servidor.
       * @returns void
       */
      guardar(data: Record<string, unknown>): Promise<unknown> {
        const PAYLOAD = this.shared260514Service.buildPayload(data, 260514);
        return new Promise((resolve, reject) => {
          this.service.guardarDatosPost(PAYLOAD).subscribe({
            next: (response) => {
              if (esValidObject(response) && esValidObject(response['datos'])) {
                const DATOS = response['datos'] as { id_solicitud?: number };
                if (getValidDatos(DATOS.id_solicitud)) {
                  this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
                } else {
                  this.store.setIdSolicitud(0);
                }
              }
              resolve(response);
            },
            error: (error) => {
              reject(error);
            }
          });
        });
      }
  
    /**
     * Valida los formularios del paso actual antes de permitir continuar.
     * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
     */
    validarFormulariosPasoActual(): boolean {
      if (this.indice === 1) {
        return this.pasoUnoComponent?.validOnButtonClick() ?? true;
      }
      return true;
    }
  
    /**
     * Emite un evento para cargar archivos.
     * {void} No retorna ningún valor.
     */
    onClickCargaArchivos(): void {
      this.cargarArchivosEvento.emit();
    }
  
    /**
    * Método para manejar el evento de carga de documentos.
    * Actualiza el estado del botón de carga de archivos.
    *  carga - Indica si la carga de documentos está activa o no.
    * {void} No retorna ningún valor.
    */
    manejaEventoCargaDocumentos(carga: boolean): void {
      this.activarBotonCargaArchivos = carga;
    }
  
    /**
     * Método para manejar el evento de carga de documentos.
     * Actualiza el estado de la sección de carga de documentos.
     *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
     * {void} No retorna ningún valor.
     */
    cargaRealizada(cargaRealizada: boolean): void {
      this.seccionCargarDocumentos = cargaRealizada ? false : true;
    }
  
    /** Actualiza el estado de carga en progreso. */
    onCargaEnProgreso(carga: boolean): void {
      this.cargaEnProgreso = carga;
    }

      cerrarModal(value: boolean): void {
  //  this.mostrarAlerta = false;
    this.mostrarAlerta = false;
    if (value) {
      this.requiresPaymentData = true;
      if (!this.pasoUnoComponent.datosDeLaComponent?.validarClickDeBoton() && this.requiresPaymentData) {
        this.confirmarSinPagoDeDerechos = 2;
        this.indice = 2;
        this.datosPasos.indice = 2;
        if (this.wizardComponent) {
          this.wizardComponent.siguiente();
        }
      } else {
        this.confirmarSinPagoDeDerechos = 3;
        this.indice = 3;
        this.datosPasos.indice = 3;
        if (this.wizardComponent) {
          this.wizardComponent.indiceActual = 3;
        }
      }
    } else {
      const IS_DATOS_VALID = this.pasoUnoComponent?.datosDeLaComponent?.validarClickDeBoton?.() ?? false;
      const IS_PAGO_VALID = this.pagoDerechosRef?.validarFormulariosBanco() ?? false;
      if (IS_DATOS_VALID && IS_PAGO_VALID) {
        this.confirmarSinPagoDeDerechos = 4;
        this.indice = 2;
        this.datosPasos.indice = 2;
        if (this.wizardComponent) {
          this.wizardComponent.siguiente();
        }
      } else {
        this.formErrorAlert = this.MENSAJE_DE_ERROR;
        this.esFormaValido = true;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      }
    }
  }

   static generarAlertaDeError(mensajes: string): string {
    const ALERTA = `
      <div class="row">
        <div class="col-md-12 justify-content-center text-center">
          <div class="row">
            <div class="col-md-12">
              <p>Corrija los siguientes errores:</p>
              <ol>
                <li>${mensajes}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    `;
    return ALERTA;
  }
}
