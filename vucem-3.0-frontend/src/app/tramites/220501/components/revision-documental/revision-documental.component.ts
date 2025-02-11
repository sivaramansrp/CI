import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { Component } from '@angular/core';

/**
 * Componente para la revisión documental.
 */
@Component({
  selector: 'revision-documental',
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
   * @type {any}
   */
   colapsable: any;
   /**
   * Índice actual de la fila.
   * @type {any}
   */
   currentIndex: any;
   /**
   * Filas de datos.
   * @type {any[]}
   */
   rows: any;
   /**
   * Formulario principal.
   * @type {any}
   */
   forma: any;
 
   /**
    * Selecciona un tab específico.
    * @param {number} i - El índice del tab a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
  
}
