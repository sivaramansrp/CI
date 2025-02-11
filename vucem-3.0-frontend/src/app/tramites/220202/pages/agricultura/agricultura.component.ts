import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { PASOS } from '../../../../shared/constantes/220202/fitosanitario.enums';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

import { AccionBoton, ListaPasosWizard } from '../../../../core/models/220202/fitosanitario.model';

/**
 * @fileoverview Componente para la gestión del formulario de agricultura.
 * Este componente maneja la lógica y la presentación del formulario de agricultura,
 * incluyendo la navegación entre pasos y la gestión de los datos.
 * @module agricultura
 */

/**
 * Componente para el formulario de agricultura.
 * @class AgriculturaComponent
 */
@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html',
})
export class AgriculturaComponent {

  /**
   * @description Array de objetos que definen los pasos del formulario.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description Referencia al componente Wizard.
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @description Objeto que contiene los datos de los pasos del formulario.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (`cont`) o retroceder (`atras`).
   */
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