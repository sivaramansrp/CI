import { BodyTablaDocumentos, HeaderTablaDocumentos } from '../../../core/models/shared/consulta-generica.model';
import { CONSULTA_DOCUMENTOS } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css',
})
export class DocumentosComponent {
  /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */
    readonly encabezadoTablaDocumentos : HeaderTablaDocumentos[] = CONSULTA_DOCUMENTOS.encabezadoTablaDocumento;  
    readonly datosTablaDocumentos: BodyTablaDocumentos[] = CONSULTA_DOCUMENTOS.datosTablaDocumento;
  
  /**
  * Abre un archivo PDF en una nueva pestaña del navegador.
  *
  * @param {string} url - La URL del archivo PDF que se va a abrir.
  * @returns {void}
  */
  verPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Abre el modal para eliminar un documento.
   * @param {number} i - El índice del documento.
   */
  abrirModal(i: number) {
    // this.modal = 'show';
    //  this.indiceDocumento = i;
  }
}