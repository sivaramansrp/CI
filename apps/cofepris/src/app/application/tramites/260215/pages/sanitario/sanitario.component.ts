import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-sanitario',
  templateUrl: './sanitario.component.html',
})
export class SanitarioComponent {
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

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
