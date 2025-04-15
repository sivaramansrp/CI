import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { DatosPasos } from '@ng-mf/data-access-user';

import { PasoUnoComponent } from '../peso-uno/PasoUno.component';
import { PasoDosComponent } from '../paso-dos/PasoDos.component';
import { PasoTresComponent } from '../paso-tres/PasoTres.component';

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];



@Component({
  selector: 'app-aviso-modify-iva-eieps',
  standalone: true,
  imports: [CommonModule, WizardComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, BtnContinuarComponent],
  templateUrl: './AvisoModifyIvaEIeps.component.html',
})
export class AvisoModifyIvaEIepsComponent {
 
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;

  datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

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
