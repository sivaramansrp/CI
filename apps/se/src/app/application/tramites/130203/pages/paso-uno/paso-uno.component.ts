import { Component } from '@angular/core';

/**
 * @component PasoUnoComponent
 * @description Componente que representa el primer paso de un formulario multipaso.
 * Este componente gestiona la navegación entre diferentes pestañas del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * @method seleccionaTab
   * @description Cambia el índice de la pestaña seleccionada.
   * @param {number} i - Índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
