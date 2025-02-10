import { Component } from '@angular/core';
/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */ 
@Component({
  selector: 'app-pantalla-datos',
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
