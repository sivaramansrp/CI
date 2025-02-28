import { Component, ViewChild } from '@angular/core';
import { PASOSACUICULTURA, ListaPasosWizard220203, AccionBoton, WizardComponent, DatosPasos } from '@ng-mf/data-access-user';



@Component({
  selector: 'app-sanidad-certificado',
  templateUrl: './sanidad-certificado.component.html',
})
export class SanidadCertificadoComponent {
  pasos: ListaPasosWizard220203[] = PASOSACUICULTURA;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };
  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   */
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
