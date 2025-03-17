import { Component, ViewChild } from '@angular/core';
import { ACCIONBOTON, DatosPasos, LISTAPASOWIZARD } from '../../models/acuicola.module';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/acuicola.module';

@Component({
  selector: 'app-acuicola',
  templateUrl: './acuicola.component.html',
  styleUrl: './acuicola.component.css',
})
export class AcuicolaComponent {
  /**
   * @property {Array<LISTAPASOWIZARD>} pasos - Array de pasos del wizard.
   */
  pasos: LISTAPASOWIZARD[] = PASOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - El índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * @param {ACCIONBOTON} e - Objeto de acción que contiene la acción y el valor a manejar.
   */
  getValorIndice(e: ACCIONBOTON): void {
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
