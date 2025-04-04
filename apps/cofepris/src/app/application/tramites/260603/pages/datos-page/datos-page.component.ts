import { Component } from '@angular/core';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 110101
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-datos-page',
  templateUrl: './datos-page.component.html',
})
export class DatosPageComponent {
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
