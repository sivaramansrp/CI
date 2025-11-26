import { AVISO,AccionBoton, DatosPasos, ERROR_FORMA_ALERT, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit,ViewChild} from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_UNO } from '../../services/certificados-licencias.enum';
import { Solicitud260702State, Solicitud260702Store } from '../../../../shared/estados/stores/shared2607/tramites260702.store';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Solicitud260702Query } from '../../../../shared/estados/queries/shared2607/tramites260702.query';

/**
 * Componente que representa la página "Todos Pasos".
 * 
 * Este componente gestiona los pasos en un proceso tipo asistente, incluyendo la navegación
 * entre pasos, la actualización del título según el paso actual y el manejo de acciones de los botones.
 */
@Component({
  selector: 'app-todospasos',
  templateUrl: './todospasos.component.html',
})
export class TodospasosComponent implements OnInit {

  /** Indica si el botón continuar ha sido activado para ejecutar las validaciones del formulario. */
  public isContinuarTriggered: boolean = false;
  /**
 * Contiene la información del mensaje de error utilizado
 * para mostrar alertas relacionadas con el formulario.
 */
   public formErrorAlert = ERROR_FORMA_ALERT;
    /**
     * Indica si la opción de peligro está activada.
     * Cuando es verdadero, representa que la condición de peligro está presente.
     */
    isPeligro:boolean=false;
  /**
   * Esta variable se utiliza para almacenar los textos de aviso.
   */
  TEXTOS = AVISO;
   /**
* Esta variable se utiliza para almacenar la lista de pasos.
*/
 pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

   /**
     * Una cadena que representa la clase CSS para una alerta de información.
     * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
     */
  public infoAlert = 'alert-info';
 /**
  * Esta variable se utiliza para almacenar el índice del paso.
  */
 indice: number = 1;
/**
 * Representa el título del paso actual en el proceso.
 * Este valor se inicializa con una constante que representa el título del primer paso.
 */
 public titulo: string = TITULO_PASO_UNO;


   /**
   * Esta variable se utiliza para almacenar el componente wizard.
   * @param wizardComponent - El componente wizard.
   */
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

   /**
    * Esta variable se utiliza para almacenar los datos de los pasos.
    * @param datosPasos - Los datos de los pasos.
    * @param nroPasos - El número de pasos.
    * @param indice - El índice.
    * @param txtBtnAnt - El texto del botón anterior.
    * @param txtBtnSig - El texto del botón siguiente.
    */

  /**
   * Represents the data for the steps in the process.
   * 
   * @property {number} nroPasos - The number of steps.
   * @property {number} indice - The current index of the step.
   * @property {string} txtBtnAnt - The text for the "Previous" button.
   * @property {string} txtBtnSig - The text for the "Continue" button.
   */
   public datosPasos: DatosPasos = {
     nroPasos: this.pantallasPasos.length,
     indice: this.indice,
     txtBtnAnt: 'Anterior',
     txtBtnSig: 'Continuar',
   };

/**
   * Estado actual de la solicitud para el trámite 260702.
   * Contiene toda la información relevante sobre el proceso de la solicitud,
   * incluyendo datos ingresados por el usuario y el progreso en el flujo del trámite.
   */
  solicitudState!: Solicitud260702State;
   /**
       * Referencia al componente `PasoUnoComponent`.
       */
      @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

      constructor( private solicitud260703Store:Solicitud260702Store,
      private solicitud260703Query:Solicitud260702Query,
   ){
 //constructor code
  }
    /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   * y actualiza las propiedades locales `solicitudState` y `isContinuarTriggered` según los datos recibidos.
   */
  ngOnInit():void{
     this.solicitud260703Query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
      this.isContinuarTriggered = this.solicitudState['continuarTriggered'] ?? false;
    });
  }
   /**
   * Este método se utiliza para inicializar el componente.
   */
 getValorIndice(e: AccionBoton):void{  
if (this.indice === 1 && e.accion === 'cont') {
      this.solicitud260703Store.setContinuarTriggered(true);
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = true; 
        return;
      }
      this.isPeligro = false;
    }
  }

   /**
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean { 
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? false;
    }
    return true;
  }
}
