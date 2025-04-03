import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-260514',
  templateUrl: './datos-260514.component.html',
  
})
export class Datos260514Component {

  /**
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;
 
  /**
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
