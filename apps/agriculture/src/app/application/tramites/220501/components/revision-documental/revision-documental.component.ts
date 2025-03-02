import { Component } from '@angular/core';

/**
 * Componente para la revisión documental.
 */
@Component({
  selector: 'app-revision-documental',
  templateUrl: './revision-documental.component.html',
  styleUrl: './revision-documental.component.scss'
})
export class RevisionDocumentalComponent {

   /**
   * Índice del tab seleccionado.
   * @type {number}
   */
   indice: number = 1;
    /**
   * Indica si el contenido es colapsable.
   * @type {boolean}
   */
   colapsable: boolean = true;
   /**
   * Índice actual de la fila.
   * @type {number}
   */
   currentIndex: number = 1;
   /**
   * Filas de datos.
   * @type {any[]}
   */
  rows: { [key: string]: string }[] = [];
   /**
   * Formulario principal.
   * @type {any}
   */
   forma: string = '';
 
   /**
    * Selecciona un tab específico.
    * @param {number} i - El índice del tab a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
  
}