import { Component } from '@angular/core';
/**
 * Componente que representa el paso uno del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

     /**
     * showPreFillingOptions
     * Indica si se deben mostrar las opciones de prellenado.
     */
 showPreFillingOptions: boolean = false; 

 /**
* Índice de la pestaña actualmente seleccionada.
* Inicializado a 1 por defecto.
*/
 indice = 1;

 /**
  * Método para seleccionar una pestaña específica.
  *
  * @param i El índice de la pestaña a seleccionar.
  */
 seleccionaTab(i: number): void {
   this.indice = i;
 }
}
