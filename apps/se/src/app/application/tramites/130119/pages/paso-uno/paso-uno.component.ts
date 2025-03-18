import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  standalone: false,
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

    /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
    indice: number = 1;

    /**
     * @method seleccionaTab
     * @description Selecciona una pestaña y actualiza el índice.
     * @param {number} i - El índice de la pestaña seleccionada.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }
}
