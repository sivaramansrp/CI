import { Component, ViewChild } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/issuance-extension-modification.enum'
import { ListaPasosWizard } from '../../../../core/models/220201/issuance-extension-modification.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
import { DatosPasos } from '../../../../core/models/shared/components.model';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-zoosanitario-page',
  templateUrl: './zoosanitario-page.component.html',
})

export class ZoosanitarioPageComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
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
