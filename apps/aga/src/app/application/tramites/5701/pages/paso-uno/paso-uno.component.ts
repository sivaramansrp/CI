import { Component } from '@angular/core';


@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  indice: number = 1;

  /**
   * Selecciona una pestaña específica y actualiza el índice actual.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
