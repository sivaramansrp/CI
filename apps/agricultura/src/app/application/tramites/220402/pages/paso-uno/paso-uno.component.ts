import { Component } from '@angular/core';

/**
 * Componente para la vista de la paso-uno de la sección de "220402".
 */

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  
  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
