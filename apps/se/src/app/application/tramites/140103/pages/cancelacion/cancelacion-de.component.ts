import { Component, ViewChild } from '@angular/core';
import{AccionBoton} from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src';



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
 
  /**
   * Updates the `indice` property based on the value of the provided `AccionBoton` object.
   * If the `valor` property of `AccionBoton` is between 1 and 4 (inclusive), it sets `indice` to `valor`.
   * Depending on the `accion` property of `AccionBoton`, it either moves the wizard component forward or backward.
   *
   * @param {AccionBoton} e - The action button object containing `valor` and `accion` properties.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
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