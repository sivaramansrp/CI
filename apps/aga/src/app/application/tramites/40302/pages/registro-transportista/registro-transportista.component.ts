import { Component, ViewChild } from '@angular/core';
import { REGISTRO_TRANSPORTISTA } from '../../constantes/registro-transportista.enum';

import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';


interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-registro-transportista',
  standalone: false,
  templateUrl: './registro-transportista.component.html',
})
export class RegistroTransportistaComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  pantallasPasos: ListaPasosWizard[] = REGISTRO_TRANSPORTISTA;

  indice = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  getValorIndice(e: AccionBoton):void {
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
