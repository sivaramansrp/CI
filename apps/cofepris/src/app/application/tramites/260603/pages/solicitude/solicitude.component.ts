import { Component, ViewChild} from '@angular/core';

// eslint-disable-next-line sort-imports
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';

import { LISTA_PASOS_WIZARD } from '../../../../shared/constantes/lista-pasos-wizard.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitude',
  templateUrl: './solicitude.component.html',
})
export class SolicitudeComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
     
    solicitudePasos: ListaPasosWizard[] = LISTA_PASOS_WIZARD;
    indice: number = 1;
    pasos: ListaPasosWizard[] = PASOS;
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Guardar',
      txtBtnSig: 'Continuar',
    };
  
    getValorIndice(e: AccionBoton) :void{
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
