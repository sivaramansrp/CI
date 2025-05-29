import { Component, ViewChild } from '@angular/core';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';


interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Este componente se utiliza para mostrar los pasos del asistente - 220401
 * Lista de pasos
 * Índice del paso
 */ 
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html'
})

export class PantallasComponent {
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
   indice: number = 1;
  pasos: ListaPasosWizard[] = PASOS;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  }

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

