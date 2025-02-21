import { Component, OnInit, ViewChild } from '@angular/core';

import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { SOLICITARPASOS } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitar-transferencia-cupos-main',
  templateUrl: './solicitar-transferencia-cupos-main.component.html',
})
export class SolicitarTransferenciaCuposMainComponent implements OnInit {
  pasosSolicitar: ListaPasosWizard[] = SOLICITARPASOS;
  indice: number = 1;

  ngOnInit(): void {
  
    console.log("PANTAPASOS", this.pasosSolicitar);
  }
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
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
