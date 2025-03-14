import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { WizardComponent } from "@libs/shared/data-access-user/src";

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-importacion-productos',
  templateUrl: './importacion-productos.component.html',
  styleUrls: ['./importacion-productos.component.scss']
})
export class ImportacionProductosComponent {
    pasos: ListaPasosWizard[] = PASOS;
    public indice = 1;
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
    constructor(){
      //
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