/* eslint-disable sort-imports */
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

@Component({
  selector: 'proceso-completo',
  templateUrl: './proceso-completo.component.html',
  styles: ``
})
export class ProcesoCompletoComponent {
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

interface AccionBoton {
  accion: string;
  valor: number;
}
