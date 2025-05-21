import { Component } from '@angular/core';

/**
 * @component DatosComponent
 * @description
 * Componente que representa la página de datos. Permite seleccionar y almacenar el índice del subtítulo.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  /**
   * Almacena el índice del subtítulo seleccionado.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Establece el índice del subtítulo.
   * @param {number} i - Nuevo índice a establecer.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}