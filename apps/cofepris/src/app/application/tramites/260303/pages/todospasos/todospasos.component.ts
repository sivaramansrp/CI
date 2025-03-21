/* eslint-disable sort-imports */
import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src/core/models/forma-render.model';
import { PANTA_PASOS, PASO_FOUR, PASO_ONE, PASO_THREE, PASO_TWO } from '../../services/certificados-licencias-permisos.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/301/servicios-pantallas.model';

@Component({
  selector: 'app-todospasos',
  templateUrl: './todospasos.component.html',
})
export class TodospasosComponent {

  /**
* Esta variable se utiliza para almacenar la lista de pasos.
*/
 pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 /**
  * Esta variable se utiliza para almacenar el índice del paso.
  */
 indice: number = 1;

 titulo: string = PASO_ONE;


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
    this.getHeaderDatos();
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  public getHeaderDatos() {
    switch (this.indice) {
      case 1: {
        this.titulo = PASO_TWO;
        break;
      }
      case 2: {
        this.titulo = PASO_THREE;
        break;
      }
      case 3: {
        this.titulo = PASO_FOUR;
        break;
      }
      default: {
        this.titulo = PASO_ONE;
        break;
      }
    }
  }

}
