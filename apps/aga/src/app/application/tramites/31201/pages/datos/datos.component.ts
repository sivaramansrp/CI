import { Component } from '@angular/core';

/**
 * @component
 * @name DatosComponent
 * @description
 * Componente que maneja la visualización y navegación entre los subtítulos, 
 * controlando el índice del subtítulo seleccionado.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent {
  /**
   * @property {number} indice
   * @description
   * Esta variable se utiliza para almacenar el índice del subtítulo actualmente seleccionado.
   */
  indice: number = 1;

  /**
   * @method
   * @name seleccionaTab
   * @description
   * Este método se utiliza para establecer el índice del subtítulo seleccionado.
   * @param {number} i El índice del subtítulo que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
