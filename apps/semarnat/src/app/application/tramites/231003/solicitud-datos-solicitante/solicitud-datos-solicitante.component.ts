import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitud-datos-solicitante',
  templateUrl: './solicitud-datos-solicitante.component.html',
})
export class SolicitudDatosSolicitanteComponent {
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
