/**
 * Componente que representa las pestañas de detalles del solicitante.
 * 
 * @selector app-solicitante-detos-tabs
 * @templateUrl ./solicitante-detos-tabs.component.html
 */
import { Component } from '@angular/core';

/**
 * Decorador que define un componente de Angular.
 * 
 * @selector app-solicitante-detos-tabs - El selector CSS que identifica este componente en una plantilla.
 * @templateUrl ./solicitante-detos-tabs.component.html - La URL de la plantilla HTML del componente.
 */

@Component({
  selector: 'app-solicitante-datos-tabs',
  templateUrl: './solicitante-datos-tabs.component.html',
})
export class SolicitanteDatosTabsComponent {

   /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
   indice: number = 1;

   /**
    * Selecciona una pestaña específica.
    * 
    * @param {number} i - El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

}
