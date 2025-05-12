import { Component } from '@angular/core';

/**
 * Componente PasoUnoComponent.
 *
 * Este componente representa el primer paso de un trámite en la aplicación.
 * Contiene lógica para manejar la selección de subtítulos y mostrar la sección
 * correspondiente de datos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {


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
