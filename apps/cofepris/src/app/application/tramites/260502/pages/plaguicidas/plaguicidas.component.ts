import { AVISO,AccionBoton, ListaPasosWizard, Notificacion, PASOS, WizardService, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, ViewChild,inject} from '@angular/core';
import { Observable,map,switchMap,take } from 'rxjs';
import { Solicitud260502State, Tramite260502Store } from '../../../../estados/tramites/260502/tramite260502.store';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PermisoVegetalesNutrientesService } from '../../service/permiso-nutrientes.service';
import { Shared2605Service } from '../../../../shared/services/shared2605/shared2605.service';
import { TEXTO_DE_PELIGRO } from '../../constant/muestras-plaguicida.enum';
import { ToastrService } from 'ngx-toastr';
import { Tramite260502Query } from '../../../../estados/queries/260502/tramite260502.query';
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
export class PlaguicidasComponent {
    public solicitudState!: Solicitud260502State;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

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
 isFormValid: boolean = false;
  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
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
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

    constructor(
      private toastrService: ToastrService,
      private service: PermisoVegetalesNutrientesService,
      private store: Tramite260502Store,
      private shared2605Service: Shared2605Service,
      private query: Tramite260502Query
    ) {}
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
   * Referencia al componente `PasoUnoComponent`.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
    /**
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean {
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? true;
    }
    return true;
  }
   /**
     * @property wizardService
     * @description
     * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
     * @type {WizardService}
     */
      wizardService = inject(WizardService);
  
   /**
   * Indica si se debe mostrar un mensaje de peligro.
   */
  public isPeligro: boolean = false;

  /** Texto de advertencia que se muestra cuando hay condiciones peligrosas. */
  public textoPeligro: string = TEXTO_DE_PELIGRO;

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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

    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = true; 
        return;
      }
      this.isPeligro = false;
    }
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
        return this.shared2605Service.getAllState().pipe(
          take(1),
          switchMap(data => this.guardar(data)),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map((response: any) => {
            const OK = response.codigo === '00';
            if (OK) {
              this.toastrService.success(response.mensaje);
            } else {
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
            const PAYLOAD = this.shared2605Service.buildPayload(data, 260502);
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
