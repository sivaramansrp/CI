import { Component, ViewChild } from '@angular/core';
import{AccionBoton} from 'libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';
import { OCTA_TEMPO } from 'libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';



@Component({
  selector: 'app-cancelacion-de', 
  templateUrl: './cancelacion-de.component.html',
})

export class CancelacionDeComponent {
    /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
 
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
 
  getValorIndice(e: AccionBoton) {
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