import { Component } from '@angular/core';
/**
 * Componente `PasoUnoComponent`.
 * 
 * Este componente representa la lógica para manejar las pestañas en el paso uno de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
   /**
   * El índice de la pestaña actualmente activa.
   * Valor predeterminado: 2 (lo que indica la tercera pestaña, ya que la indexación comienza desde 0).
   */
   public indice = 1;

   /**
    * Cambia el índice de la pestaña activa basado en la selección del usuario.
    * @param i El índice de la pestaña seleccionada por el usuario.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
}
