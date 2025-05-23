import { Component } from '@angular/core';

/**
 * Representa el PasoUnoComponent, que es responsable de gestionar
 * el primer paso de un proceso específico en la aplicación.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
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
