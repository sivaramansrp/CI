import { Component, ViewChild } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/303/pasos.enums';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './registro-page.component.html',
  styles: ``,
})
export class RegistroPageComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
  }

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
