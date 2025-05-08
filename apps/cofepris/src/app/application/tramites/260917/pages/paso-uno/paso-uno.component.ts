import { Component } from '@angular/core';
/**
 * Componente que representa el paso uno del formulario o flujo de trabajo.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
   /**
   * El índice de la pestaña actualmente seleccionada.
   */
   indice: number = 1;

   /**
    * Selecciona una pestaña estableciendo su índice.
    * @param i El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
}
