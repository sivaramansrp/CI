/* eslint-disable sort-imports */
import { Component, ViewChild } from '@angular/core';
import { PANTAPASOS } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Este componente se utiliza para mostrar los pasos del asistente - 110101
 * Lista de pasos
 * Índice del paso
 */

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

  pasos: ListaPasosWizard[] = PASOS;

  
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  getValorIndice(e: AccionBoton):void{
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
