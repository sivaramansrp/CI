import { Component, ViewChild } from '@angular/core';
import { AVISO_SIGLOS } from '../../constantes/aviso-siglos.enum';

import {DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';




interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-aviso-siglos',
  standalone: false,
  templateUrl: './aviso-siglos.component.html',
})
export class AvisoSiglosComponent {
@ViewChild(WizardComponent) wizardComponent! : WizardComponent;

pantallasPasos: ListaPasosWizard[] = AVISO_SIGLOS;


indice = 1;


datosPasos: DatosPasos = {
  nroPasos: this.pantallasPasos.length,
  indice: this.indice,
  txtBtnAnt: 'Anterior',
  txtBtnSig: 'Continuar',
};

 // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
