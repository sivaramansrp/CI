import { AccionBoton, DatosPasos, ListsPasoWizard } from '../../models/acuicola.module';
import { Component, ViewChild } from '@angular/core';
import { PASOS } from '../../constants/acuicola.module';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Componente principal para el trámite acuícola.
 * 
 * Este componente gestiona el flujo del wizard para el trámite zoosanitario de importación,
 * permitiendo la navegación entre los diferentes pasos y el manejo de los datos asociados.
 *
 * @export
 * @class AcuicolaComponent
 */
@Component({
  selector: 'app-acuicola',
  templateUrl: './acuicola.component.html',
  styleUrl: './acuicola.component.css',
})
export class AcuicolaComponent {
  /**
   * Array de pasos del wizard.
   * @type {Array<ListsPasoWizard>}
   */
  pasos: ListsPasoWizard[] = PASOS;

  /**
   * El título del mensaje.
   * @type {string | null}
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * El índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de los pasos del wizard.
   * @type {DatosPasos}
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
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   */
  getValorIndice(e: AccionBoton): void {
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
