import { Component, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { ALERTA_COM } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { FLORA_FAUNA } from '../../constantes/flora-fauna.enum';


interface AccionBoton {
  accion: string;
  valor: number;
}

const FLORA_FAUNA_ALERT =
  'La solicitud ha quedado registrada con el número temporal 202768122. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada';

@Component({
  selector: 'app-flora-fauna',
  templateUrl: './flora-fauna.component.html',
})
export class FloraFaunaComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  pantallasPasos: ListaPasosWizard[] = FLORA_FAUNA;
  TEXTO_FLORA_FAUNA_ALERT = FLORA_FAUNA_ALERT;
  TEXTOS= ALERTA_COM;
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
