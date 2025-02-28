import { Component, ViewChild } from '@angular/core';
import { AccionBoton, ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/220203/importacion-de-acuicultura.module';
import { PASOS } from 'libs/shared/data-access-user/src/core/enums/220203/importacion-de-acuicultura.enum';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

@Component({
  selector: 'app-sanidad-certificado',
  templateUrl: './sanidad-certificado.component.html',
})
export class SanidadCertificadoComponent {
  pasos: ListaPasosWizard[] = PASOS;
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
