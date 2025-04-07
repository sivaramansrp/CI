import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { FLORA_FAUNA } from '../../constantes/flora-fauna.enum';


interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-flora-fauna',
  standalone: false,
  templateUrl: './flora-fauna.component.html',
})
export class FloraFaunaComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  pantallasPasos: ListaPasosWizard[] = FLORA_FAUNA;
  indice = 1;

  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
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
