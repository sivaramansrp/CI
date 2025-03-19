import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';

import { WizardComponent } from '@ng-mf/data-access-user';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  ngOnInit(): void {
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Cargar pago' };
      }
      return paso;
    });
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }
}
