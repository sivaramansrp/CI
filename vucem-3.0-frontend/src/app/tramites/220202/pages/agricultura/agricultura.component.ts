import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { PASOS } from '../../../../shared/constantes/220202/fitosanitario.enums';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

import { AccionBoton, ListaPasosWizard } from '../../../../core/models/220202/fitosanitario.model';

@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html',
})
export class AgriculturaComponent {
  pasos: ListaPasosWizard[] = PASOS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };



  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param e - Objeto de acción que contiene la acción y el valor a manejar..
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).  --220201
   */
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
