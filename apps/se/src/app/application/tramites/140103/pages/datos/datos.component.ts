import { Component } from '@angular/core';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent {
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
