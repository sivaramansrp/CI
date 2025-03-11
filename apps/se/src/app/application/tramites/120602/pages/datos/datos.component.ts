import {Component } from '@angular/core';

/**
 * @class DatosComponent
 * @classdesc Este componente gestiona la selección de pestañas mediante un índice.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent{
  /**
   * @constructor
   * @description Inicializa una instancia del `DatosComponent`.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor() { }

 /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   * @type {number}
   */

  indice: number = 1;
  
 /**
   * @method seleccionaTab
   * @description Este método se utiliza para establecer el índice del subtítulo.
   * @param {number} i - El nuevo índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
