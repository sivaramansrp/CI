import { AVISO,AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../services/certificados-licencias.enum';

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
export class TodospasosComponent {

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
   * Este método se utiliza para inicializar el componente.
   */
   public getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if(this.indice === 2) {
        this.titulo = TITULO_PASO_DOS;
      } else if(this.indice === 3) {
        this.titulo = TITULO_PASO_TRES;
      } else {
        this.titulo = TITULO_PASO_UNO;
      }
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
