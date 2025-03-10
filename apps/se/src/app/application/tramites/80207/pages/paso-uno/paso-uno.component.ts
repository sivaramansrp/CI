import { Component } from '@angular/core';


/**
 * @fileoverview Componente para la gestión del paso uno.
 * Este componente maneja la lógica y la presentación del primer paso del proceso,
 * incluyendo la inicialización de textos y la gestión de los controles del formulario.
 * @module pasoUno --80207
 */

/**
 * Componente para la gestión del paso uno.
 * @class PasoUnoComponent --80207
 */

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent {
   /**
   * Índice del paso actual.
   * @property {number} indice
   */
  indice: number = 1;

   /**
   * Selecciona una pestaña del wizard.
   * @method seleccionaTab
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
