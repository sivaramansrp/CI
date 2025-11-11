import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { MENSAJE_DE_VALIDACION } from '../../constantes/datos-solicitud.enum';
import { Notificacion } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';

import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';


/**
 * Represents the action and value associated with a button.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent {

   /**
     * Identificador del tipo de trámite.
     * @type {string}
     */
    idTipoTramite: string = '260513';

      /**
     * ID del estado de la solicitud.
     * @type {number | null}
     */
    idSolicitudState: number | null = 260513;

      /**
           * Evento para cargar archivos.
           * @type {EventEmitter<void>}
           */
        cargarArchivosEvento = new EventEmitter<void>();

          /**
   * Indica si el botón de carga de archivos está habilitado.
   * @type {boolean}
   */
    activarBotonCargaArchivos: boolean = false;

    /**
   * Indica si la sección de carga de documentos está activa.
   * @type {boolean}
   */
    seccionCargarDocumentos: boolean = true;

    /**
     * Indica si la carga de documentos está en progreso.
     * @type {boolean}
     */
    cargaEnProgreso: boolean = true;

      /** Nueva notificación relacionada con el RFC. */
      public seleccionarFilaNotificacion!: Notificacion;

       /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
   esMostrarAlerta: boolean = false;

     /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;

  public formErrorAlert = ERROR_FORMA_ALERT;
  
  esFormaValido: boolean = false;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;

   constructor(
      private toastrService: ToastrService,
      ) {}

  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

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
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */

  /**
 * @method onClickCargaArchivos
 * @description
 * Método de manejo de eventos para el click en botón de carga de archivos.
 * Emite evento que notifica a componentes interesados que deben activar
 * la funcionalidad de carga de documentos.
 * 
 * @event_emission
 * Emite evento:
 * - `cargarArchivosEvento`: Sin parámetros (void)
 * - Notifica inicio de proceso de carga
 * - Activa funcionalidad en componentes suscritos
 * 
 * @component_communication
 * Facilita comunicación:
 * - Entre componente padre e hijos
 * - Con servicios de carga de archivos
 * - Con sistemas de gestión de documentos
 * 
 * @user_interaction
 * Responde a:
 * - Click en botón de carga
 * - Acción intencional del usuario
 * - Iniciación de flujo de documentos
 * 
 * @workflow_trigger
 * Desencadena:
 * - Apertura de dialogo de archivos
 * - Activación de componentes de carga
 * - Inicio de proceso de validación de documentos
 * 
 * @void
 * @event_handler
 */
onClickCargaArchivos(): void {
  this.cargarArchivosEvento.emit();
}
/**
* @method manejaEventoCargaDocumentos
* @description
* Método para manejar eventos relacionados con el estado de carga de documentos.
* Actualiza el estado del botón de carga de archivos basado en la disponibilidad
* o progreso de la funcionalidad de carga.
* 
* @param {boolean} carga - Indica si la funcionalidad de carga de documentos
*                         está activa (true) o inactiva (false)
* 
* @button_state_control
* Actualiza `activarBotonCargaArchivos` para:
* - Habilitar botón cuando carga está disponible
* - Deshabilitar durante procesos o cuando no aplique
* - Proporcionar feedback visual al usuario
* 
* @user_interaction
* Controla la interacción del usuario con:
* - Botones de carga de archivos
* - Elementos de UI relacionados con documentos
* - Estados de habilitación/deshabilitación
* 
* @workflow_coordination
* Coordina el flujo de trabajo:
* - Habilita carga cuando es apropiado
* - Previene acciones durante procesos
* - Sincroniza estado con otros componentes
* 
* @param {boolean} carga
* @returns {void}
* @ui_state_manager
*/
manejaEventoCargaDocumentos(carga: boolean): void {
  this.activarBotonCargaArchivos = carga;
}

/**
   * @method cargaRealizada
   * @description
   * Método para manejar el evento de finalización del proceso de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos basado en el resultado
   * de la operación de carga.
   * 
   * @param {boolean} cargaRealizada - Indica si la carga de documentos se realizó
   *                                  correctamente (true) o falló (false)
   * 
   * @state_management
   * Actualiza `seccionCargarDocumentos`:
   * - `false` si la carga fue exitosa (oculta sección)
   * - `true` si la carga falló (mantiene sección visible)
   * 
   * @ui_control
   * Controla la visibilidad de:
   * - Sección de carga de documentos
   * - Botones de acción relacionados
   * - Indicadores de estado de carga
   * 
   * @workflow_progression
   * Permite progresión del flujo:
   * - Oculta sección al completar carga exitosa
   * - Mantiene accesible para retry en caso de fallo
   * 
   * @param {boolean} cargaRealizada
   * @returns {void}
   * @document_upload_handler
   */
cargaRealizada(cargaRealizada: boolean): void {
  this.seccionCargarDocumentos = cargaRealizada ? false : true;
}
 /**
  * @method onCargaEnProgreso
  * @description
  * Método para manejar el estado de progreso de carga de archivos.
  * Actualiza la bandera de carga en progreso para controlar UI y
  * prevenir acciones concurrentes durante procesos de carga.
  * 
  * @param {boolean} carga - Indica si hay una operación de carga en progreso
  *                         (true) o si ha terminado (false)
  * 
  * @loading_state_management
  * Controla estado de carga para:
  * - Mostrar/ocultar indicadores de progreso
  * - Habilitar/deshabilitar botones durante carga
  * - Prevenir acciones concurrentes
  * - Proporcionar feedback visual al usuario
  * 
  * @ui_feedback
  * Actualiza `cargaEnProgreso` para:
  * - Mostrar spinners o barras de progreso
  * - Deshabilitar botones durante operaciones
  * - Indicar estado de procesamiento
  * - Mejorar experiencia de usuario
  * 
  * @concurrent_operation_control
  * Previene:
  * - Múltiples cargas simultáneas
  * - Navegación durante procesos
  * - Acciones conflictivas
  * - Corrupción de datos
  * 
  * @param {boolean} carga
  * @returns {void}
  * @loading_indicator_controller
  */
 onCargaEnProgreso(carga: boolean): void {
  this.cargaEnProgreso = carga;
}
  getValorIndice(e: AccionBoton): void {
    // if(e.accion === 'cont') {
    //   let ISVALID = true;

    //   if(this.indice === 1 && this.pasoUnoComponent) {
    //     ISVALID = this.pasoUnoComponent.validOnButtonClick();
    //   }
    //   if(!this.pasoUnoComponent.ValidarPagoDerechos()) {
    //     this.mostrarAlerta = true;
    //     this.seleccionarFilaNotificacion = {
    //          tipoNotificacion: 'alert',
    //                 categoria: 'danger',
    //                 modo: 'action',
    //                 titulo: '',
    //                 mensaje: MENSAJE_DE_VALIDACION,
    //                 cerrar: true,
    //                 tiempoDeEspera: 2000,
    //                 txtBtnAceptar: 'SI',
    //                 txtBtnCancelar: 'NO',
    //     };
    //   }
    //    if (!ISVALID) {
    //     this.esFormaValido = true;
    //     this.datosPasos.indice = this.indice;
    //     //return;
    //   }

    //   const STATE = this.tramite260209Query.getValue();
    //   this.importacionDestinadosDonacioService.guardarTramite(STATE).subscribe({
    //     next: () => {
    //       this.toastrService.success('Guardado exitosamente');
    //       this.esFormaValido = false;
    //       this.indice = e.valor;
    //       this.datosPasos.indice = this.indice;
    //       this.wizardComponent.siguiente();
    //     },
    //     error: () => {
    //       this.toastrService.error('Error al guardar');
    //     }
    //   });
    //   return;
    // }
    // this.indice = e.valor;
    // this.datosPasos.indice = this.indice;
    // this.wizardComponent.atras();

     this.esFormaValido = false;
      // Validar formularios antes de continuar desde el paso uno
      if (this.indice === 1 && e.accion === 'cont') {
        const ISVALID = this.pasoUnoComponent.validOnButtonClick();
        if (!ISVALID) {
          this.esFormaValido = true;
          return; // Detener ejecución si los formularios son inválidos
        }
      }
  
      // Calcular el nuevo índice basado en la acción
      let indiceActualizado = e.valor;
      if (e.accion === 'cont') {
        indiceActualizado = e.valor + 1;
      } else if (e.accion === 'ant') {
        indiceActualizado = e.valor - 1;
      }
  
      // Validar que el nuevo índice esté dentro de los límites permitidos
      if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
  
        // Actualizar el índice y datosPasos
        this.indice = indiceActualizado;
        this.datosPasos.indice = indiceActualizado;
  
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else if (e.accion === 'ant') {
          this.wizardComponent.atras();
        }
      }

    }
    //   this.esFormaValido = false;
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
    //   if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
  
    //     // Actualizar el índice y datosPasos
    //     this.indice = indiceActualizado;
    //     this.datosPasos.indice = indiceActualizado;
  
    //     if (e.accion === 'cont') {
    //       this.wizardComponent.siguiente();
    //     } else if (e.accion === 'ant') {
    //       this.wizardComponent.atras();
    //     }
    //   }
    }
    

