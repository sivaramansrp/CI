import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { PagoDeDerechosComponent } from '../pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../terceros-relacionados/terceros-relacionados.component';

/**
 * Componente para la revisión documental.
 */
@Component({
  selector: 'app-revision-documental',
  templateUrl: './revision-documental.component.html',
  styleUrl: './revision-documental.component.scss',
  standalone: true,
  imports: [DatosGeneralesComponent,TercerosRelacionadosComponent,PagoDeDerechosComponent,CommonModule],
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