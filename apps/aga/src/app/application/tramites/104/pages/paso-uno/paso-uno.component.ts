import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * **Índice del tab actual**  
   * Representa la pestaña actualmente seleccionada en la interfaz.
   */
  indice: number = 1;

  /**
   * **Cambia la pestaña seleccionada**  
   * 
   * - Recibe un índice `i` y lo asigna a la variable `indice`.
   * - Se usa para actualizar la vista y mostrar el contenido de la pestaña correspondiente.
   * 
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
