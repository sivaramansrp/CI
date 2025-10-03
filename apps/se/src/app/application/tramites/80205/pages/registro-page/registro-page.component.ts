
import { AVISO, RegistroSolicitudService } from '@ng-mf/data-access-user';
import { Component,EventEmitter,OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AmpliacionServiciosAdapter } from '../../adapters/ampliacion-servicios.adapter';
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query';
import { AmpliacionServiciosStore } from '../../estados/tramite80205.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ERROR_SERVICIO_ALERT } from '../../models/datos-info.model';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { ServiciosService } from '../../../../shared/services/servicios.service';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa una acción asociada a un botón.
 * 
 * @property {string} accion - Nombre o descripción de la acción que realiza el botón.
 * @property {number} valor - Valor asociado a la acción, que puede ser utilizado para identificar o parametrizar la acción.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @fileoverview Componente principal para el formulario de certificado zoosanitario.
 * Este componente gestiona el flujo del formulario a través de un asistente (wizard),
 * controlando la navegación entre los pasos y la información mostrada en cada uno.
 * @component RegistroPageComponent --80205
 * @selector app-registro-page
 * @templateUrl ./registro-page.component.html
 */
@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
})
export class RegistroPageComponent implements OnDestroy {

  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Notificador para la destrucción del componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

   /**
   * Clase CSS para mostrar una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string | null = 'Registro de solicitud IMMEX modalidad ampliación servicios ';

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice actual del paso.
   * @property {number} indice - Índice del paso actual en el que se encuentra el usuario.
   */
  indice: number = 1;

   /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
   @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

   /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
   public formErrorAlert!:string;


  /**
     * Constante que almacena el valor de la nota de privacidad.
     * 
     * @constant AVISO_PRIVACIDAD_ADJUNTAR - Almacena el valor definido en `NOTA.AVISO_PRIVACIDAD_ADJUNTAR`.
     * Se utiliza para adjuntar o gestionar el aviso de privacidad dentro del sistema.
     */
      AVISO_PRIVACIDAD_ADJUNTAR = AVISO.Aviso;

      /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = true;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos - Configuración para los botones "Anterior" y "Siguiente".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito - Mensaje que se muestra si el primer paso se completa con éxito.
   */
  mensajeDeTextoDeExito: string = "MENSAJE_DE_ÉXITO_ETAPA_UNO";


  
      /**
       * Evento que se emite para cargar archivos.
       * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
       */
      cargarArchivosEvento = new EventEmitter<void>();
    
      /**
       * Evento que se emite para regresar a la sección de carga de documentos.
       * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
       */
      regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();
    
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
       * cargaEnProgreso - Indica si la carga de documentos está en progreso.
       * Se utiliza para mostrar un indicador de carga o deshabilitar ciertas acciones mientras la carga está en curso.
       */
      cargaEnProgreso: boolean = true;

      idSolicitudState: number | null = 0;

      idTipoTramite: string = '80205';

  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  constructor(
    private tramiteQuery: AmpliacionServiciosQuery,
    private tranmiteStore: AmpliacionServiciosStore,
    private seccion: SeccionLibStore,
    private registroSolicitudService: RegistroSolicitudService,
  ) {
    this.tramiteQuery.FormaValida$.pipe(takeUntil(this.destroyNotifier$)).subscribe(_res => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([true]);
    })

  }
  
  getValorIndice(e: AccionBoton): void {
    if (this.indice === 1) {
      const FORM_VALIDO = this.pasoUnoComponent?.validarTodosLosFormularios() ?? false;
      this.esFormaValido = FORM_VALIDO;

      if (!this.esFormaValido) {
        this.datosPasos.indice = 1;
        this.formErrorAlert = ServiciosService.generarAlertaDeError(ERROR_SERVICIO_ALERT);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }

      this.onGuardar().pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe({
        next: (respuesta: BaseResponse<{ id_solicitud: number }>) => {
          if (respuesta.codigo !== '00') {
            const ERROR_MESSAGE = respuesta.error || 'Error desconocido en la solicitud';
            this.formErrorAlert = ServiciosService.generarAlertaDeError(ERROR_MESSAGE);
            this.esFormaValido = false;
            this.indice = 1;
            this.wizardComponent.indiceActual = 1;
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
            return;
          }
            this.esFormaValido = true;
            this.indice = e.valor;
            this.datosPasos.indice = this.indice;
            this.wizardComponent.siguiente();
            if (respuesta.datos?.id_solicitud) {
              this.idSolicitudState = respuesta.datos.id_solicitud;
              this.tranmiteStore.setIdSolicitud(respuesta.datos.id_solicitud);
            }
        },
        error: (error) => {
          this.formErrorAlert = ServiciosService.generarAlertaDeError('Error al procesar la solicitud');
          this.esFormaValido = false;
          this.indice = 1;
          this.wizardComponent.indiceActual = 1;
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        }
      });
      
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
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
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }

  /**
   * Guarda la solicitud de ampliación de servicios utilizando el adaptador para convertir el estado
   * y enviar los datos al servidor.
   * @returns {Observable<{ exito: boolean; [key: string]: any }>}
   */
  onGuardar(): Observable<any> {
    return this.tramiteQuery.selectTramite80205$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD);
      }),
      catchError(error => {
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores
   * que deben limpiar recursos o cancelar suscripciones, y luego completa el observable.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}