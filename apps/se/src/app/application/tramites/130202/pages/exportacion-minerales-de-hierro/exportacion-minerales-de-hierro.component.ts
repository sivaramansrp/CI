import { AVISO, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { PASOS_EXPORTACION } from '../../constants/exportacion-minerales-de-hierro-pasos.enum';

import { AccionBoton } from '../../enums/accion-botton.enum';
@Component({
  selector: 'app-exportacion-minerales-de-hierro',
  templateUrl: './exportacion-minerales-de-hierro.component.html',
})
export class ExportacionMineralesDeHierroComponent {
  
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;
    /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
    public TEXTOS = {
    AVISO,
  };

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
