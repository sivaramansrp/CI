import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/permiso-de-hidrocarburos.enum';

import { AccionBoton } from '../../enums/accion-botton.enum';
@Component({
  selector: 'app-permiso-de-hidrocarburos',
  templateUrl: './permiso-de-hidrocarburos.component.html',
})
export class PermisoDeHidrocarburosComponent {
  
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  tabIndex: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
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
