import { Component } from '@angular/core';

/**
 * Componente PasoUnoComponent.
 * Este componente representa el primer paso de un trámite.
 * Permite seleccionar un subtítulo mediante pestañas.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  /**
   * Variable que almacena el índice del subtítulo seleccionado.
   * Por defecto, el índice inicial es 1.
   */
  indice: number = 1;

  /**
   * Método para establecer el índice del subtítulo seleccionado.
   * @param i - Índice del subtítulo que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
