import { Component, ViewChild } from '@angular/core';
import { BtnContinuarComponent } from "../../../../../shared/components/btn-continuar/btn-continuar.component";
import { DatosPasos } from '../../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../../core/models/130120/permiso-importacion-modification.model';
import { PASOS } from '../../../../../shared/constantes/130120/permiso-importacion-modification.enum';
import { WizardComponent } from '../../../../../shared/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',
  imports: [WizardComponent, BtnContinuarComponent],
  standalone: true,
})
export class IntroPermisoComponent {

  indice = 1;
  pasos: ListaPasosWizard[] = PASOS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

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
