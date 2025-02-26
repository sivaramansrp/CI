import { Component, ViewChild } from '@angular/core';
import { BtnContinuarComponent } from "libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component";
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/130120/permiso-importacion-modification.model';
import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/130120/permiso-importacion-modification.enum';
import { PasoCuatroComponent } from "../paso-cuatro/paso-cuatro.component";
import { PasoDosComponent } from "../paso-dos/paso-dos.component";
import { PasoTresComponent } from "../paso-tres/paso-tres.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component";
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',
  imports: [WizardComponent, BtnContinuarComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, PasoCuatroComponent],
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