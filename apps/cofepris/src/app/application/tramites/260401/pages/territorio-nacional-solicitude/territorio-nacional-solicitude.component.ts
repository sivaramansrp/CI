import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASSOS_TERRITORIO } from '../../constantes/territorio-nacional-solicitude.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-territorio-nacional-solicitude',
  templateUrl: './territorio-nacional-solicitude.component.html',

})
export class TerritorioNacionalSolicitudeComponent {
  
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * 
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  territorioPasos: ListaPasosWizard[] = PASSOS_TERRITORIO;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.territorioPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
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
