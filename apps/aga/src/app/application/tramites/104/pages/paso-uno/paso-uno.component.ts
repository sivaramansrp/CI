import { Component } from '@angular/core';
/**
 * **Componente Paso Uno**  
 * 
 * Representa el primer paso dentro del flujo de pasos en la aplicación.  
 * Este componente maneja la lógica y la interfaz de usuario para la primera sección del proceso.
 */
@Component({
  selector: 'app-paso-uno', // Selector utilizado para incluir este componente en otros archivos HTML.
  templateUrl: './paso-uno.component.html', // Ruta de la plantilla HTML asociada a este componente.
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
