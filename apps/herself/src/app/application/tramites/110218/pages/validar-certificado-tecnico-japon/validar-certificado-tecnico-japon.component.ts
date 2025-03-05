import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PANTA_PASOS_VALIDAR, WizardComponent } from '@libs/shared/data-access-user/src';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-validar-certificado-tecnico-japon',
  templateUrl: './validar-certificado-tecnico-japon.component.html',
})
export class ValidarCertificadoTecnicoJaponComponent {

  pasosSolicitar: ListaPasosWizard[] = PANTA_PASOS_VALIDAR;
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  getValorIndice(e: AccionBoton) :void {
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
