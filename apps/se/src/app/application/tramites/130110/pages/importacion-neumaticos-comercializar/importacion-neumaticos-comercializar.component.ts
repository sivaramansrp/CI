import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS } from '../../constants/pasos.enum';

@Component({
  selector: 'app-importacion-neumaticos-comercializar',
  templateUrl: './importacion-neumaticos-comercializar.component.html',
  styleUrl: './importacion-neumaticos-comercializar.component.css',
})
export class ImportacionNeumaticosComercializarComponent {
  pasos: ListaPasosWizard[] = PASOS;
   /**
   * Índice del paso actual en el asistente.
   */
   indice: number = 1;

   tabIndex: number = 1;
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
