import { AVISO,AccionBoton, ListaPasosWizard, Notificacion, PASOS, WizardService, doDeepCopy, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnInit,ViewChild,inject} from '@angular/core';
import { Observable,map,switchMap, take } from 'rxjs';
import { Solicitud260502State, Tramite260502Store } from '../../../../shared/estados/stores/260502/tramite260502.store';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Shared2605Service } from '../../../../shared/services/shared2605/shared2605.service';
import { TEXTO_DE_PELIGRO } from '../../constant/muestras-plaguicida.enum';
import { ToastrService } from 'ngx-toastr';
import { Tramite260502Query } from '../../../../shared/estados/queries/260502/tramite260502.query';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  standalone: false,
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent implements OnInit {
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260502;
  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  public guardarIdSolicitud: number = 0;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;
  /** Texto de advertencia que se muestra cuando hay condiciones peligrosas. */
  public textoPeligro: string = TEXTO_DE_PELIGRO;
  /**
   * Referencia al componente `PasoUnoComponent`.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
   /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
   public infoAlert = 'alert-info';

   /**
    * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
    */

  TEXTOS = AVISO.Aviso;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;
  /** 
   * Indica si el formulario es válido.
   * Se utiliza para controlar la navegación entre pasos.
   */
 isFormValid: boolean = false;
  /**
  * @property wizardService
  * @description
  * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
  * @type {WizardService}
  */
   wizardService = inject(WizardService);

   /**
   * Estado local que representa la solicitud actual.
   */
   public solicitudState!: Solicitud260502State;
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
  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
   /**
   * Actualiza el estado local de validez del formulario.
   * Este método recibe el valor emitido por el componente hijo.
   * Se utiliza para saber si el formulario es válido o no desde el componente principal.
   */
onFormValidityChange(isValid: boolean):void {
  this.isFormValid = isValid;
}

/**
   * @description
   * Objeto que representa una notificación de confirmación para agregar servicios.
   * Se utiliza para mostrar modal de confirmación al usuario.
   */
  public notificacionContinuarServicios!: Notificacion;

  /**  
   * Constructor del componente.
   * Inyecta los servicios necesarios para la funcionalidad del componente.
   * @param sharedSvc Servicio compartido para operaciones comunes.
   * @param toastrService Servicio para mostrar notificaciones al usuario.
   * @param store Almacén de estado para gestionar los datos del trámite.
   * @param query Consulta para acceder a los datos del trámite.
   */
  constructor(
    private sharedSvc: Shared2605Service,
    private toastrService: ToastrService,
    private store: Tramite260502Store,
    private query: Tramite260502Query
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la solicitud para mantener el estado local actualizado.
   * {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
    });
  }

   /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
    const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
 
    // if (this.indice === 1 && e.accion === 'cont') {
    //   const ES_VALIDO = this.validarFormulariosPasoActual();
    //   if (!ES_VALIDO) {
    //     this.isPeligro = true;
    //     return;
    //   }
    //   this.isPeligro = false;
    // }
    if (e.valor > 0 && e.valor < this.pasos.length) {
      if (e.accion === 'cont') {
        if (this.indice === 1) {
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
          this.wizardService.cambio_indice(NEXT_INDEX);
          this.wizardComponent.siguiente();
        }
      } else {
        this.indice = NEXT_INDEX;
        this.datosPasos.indice = NEXT_INDEX;
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Verifica si se debe navegar al siguiente paso.
   * Realiza una llamada para guardar los datos y determina si la navegación es exitosa.
   * @returns {Observable<boolean>} Observable que emite true si se debe navegar, false en caso contrario.
   */
  private shouldNavigate$(): Observable<boolean> {
      return this.sharedSvc.getAllState().pipe(
        take(1),
        switchMap(data => this.guardar(data)),
        map((response) => {
          const API_DATOS = doDeepCopy(response)
          const OK = API_DATOS.codigo === '00';
          if (OK) {
            this.toastrService.success(API_DATOS.mensaje);
          } else {
            this.toastrService.error(API_DATOS.mensaje);
          }
          return OK;
        })
      );
    }

    /**
     * Guarda los datos proporcionados mediante una solicitud HTTP POST.
     * @param data - Los datos que se desean guardar.
     * @returns {Promise<unknown>} Una promesa que se resuelve con la respuesta de la solicitud POST.
     */
  public guardar(data: Record<string, unknown>): Promise<unknown> {
     const PAYLOAD = this.sharedSvc.buildPayload(data, this.idProcedimiento);
      return new Promise((resolve, reject) => {
        this.sharedSvc.guardarDatosPost(PAYLOAD,this.idProcedimiento.toString()).subscribe({
          next: (response) => {
            const RESPONSE = doDeepCopy(response);
            if (esValidObject(RESPONSE) && esValidObject(RESPONSE['datos'])) {
              const DATOS = RESPONSE['datos'] as { id_solicitud?: number };
              if (getValidDatos(DATOS.id_solicitud)) {
                this.guardarIdSolicitud = DATOS.id_solicitud ?? 0;
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
}
