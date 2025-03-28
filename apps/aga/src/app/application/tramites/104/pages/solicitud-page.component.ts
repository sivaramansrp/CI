import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, SeccionLibState } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user'
import { Subject } from 'rxjs';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {

    pasos: ListaPasosWizard[] = PASOS;
    indice: number = 1;
    public seccion!: SeccionLibState;
    private destroyNotifier$: Subject<void> = new Subject();
  
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
}


