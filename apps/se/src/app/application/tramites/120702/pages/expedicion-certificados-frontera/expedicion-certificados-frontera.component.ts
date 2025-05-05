import {
  AVISO,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { EXPEDICION_CERTIFICADOS_FRONTERA } from '../../constantes/expedicion-certificados-frontera.enum';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-expedicion-certificados-frontera',
  templateUrl: './expedicion-certificados-frontera.component.html',
})
export class ExpedicionCertificadosFronteraComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  pantallasPasos: ListaPasosWizard[] = EXPEDICION_CERTIFICADOS_FRONTERA;
   public avisoPrivacidadAlert: string = AVISO.Aviso;
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
