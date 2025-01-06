import { Component, ViewChild } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datos_pasos: DatosPasos = {
    nro_pasos: this.pasos.length,
    indice: this.indice,
    txt_btn_ant: 'Anterior',
    txt_btn_sig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
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
