import { Component } from '@angular/core';
 
/**
 * Componente que gestiona la visualización de datos y permite cambiar entre diferentes pestañas o subtítulos.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
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
 