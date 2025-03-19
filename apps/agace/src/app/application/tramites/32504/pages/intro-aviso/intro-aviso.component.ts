import { Component, ViewChild } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccionBoton } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_TRES_STEPS } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from "@ng-mf/data-access-user";
@Component({
  selector: 'app-intro-aviso',
  templateUrl: './intro-aviso.component.html',
  styleUrl: './intro-aviso.component.scss',
  imports: [WizardComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, BtnContinuarComponent, ToastrModule],
  providers: [ToastrService],
  standalone: true,
})
export class IntroAvisoComponent {

  indice = 1;
  pasos: ListaPasosWizard[] = PASOS_TRES_STEPS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
