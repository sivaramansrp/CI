import { Component, ViewChild } from '@angular/core';
import { REGISTRO_TRANSPORTISTA } from '../../constantes/registro-transportista.enum';

import {
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@ng-mf/data-access-user';

const FIRMAR_TEXTO_DE_ALERTA =
  'La Solicitud ha quedado registrada con el número temporal 202768281.Éste no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la Solicitud al momento en que ésta sea firmada';

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
  TEXTO_DE_ALERTA = FIRMAR_TEXTO_DE_ALERTA;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  pantallasPasos: ListaPasosWizard[] = REGISTRO_TRANSPORTISTA;

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
