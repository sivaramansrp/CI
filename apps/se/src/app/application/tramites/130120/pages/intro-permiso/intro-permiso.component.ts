import { Component, ViewChild } from '@angular/core';
import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_CUATRO_STEPS } from '@ng-mf/data-access-user';
import { PasoCuatroComponent } from "../paso-cuatro/paso-cuatro.component";
import { PasoDosComponent } from "../paso-dos/paso-dos.component";
import { PasoTresComponent } from "../paso-tres/paso-tres.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component";
import { WizardComponent } from '@ng-mf/data-access-user';

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
  pasos: ListaPasosWizard[] = PASOS_CUATRO_STEPS;
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