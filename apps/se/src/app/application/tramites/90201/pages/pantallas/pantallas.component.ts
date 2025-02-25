/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { PANTAPASOS } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.enum';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';


interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {

  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
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
