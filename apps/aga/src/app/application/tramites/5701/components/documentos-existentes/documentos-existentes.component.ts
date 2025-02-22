import { Component } from '@angular/core';
import { URL_PRUEBA } from '@ng-mf/data-access-user';
import { DocumentosCargados } from '@ng-mf/data-access-user';
import data from 'libs/shared/theme/assets/json/5701/documentos-existentes.json';

@Component({
  selector: 'app-documentos-existentes',
  templateUrl: './documentos-existentes.component.html',
  styleUrl: './documentos-existentes.component.scss'
})
export class DocumentosExistentesComponent {
  constructor() { }
  /**
   * Lista de documentos cargados.
   */
  documentosCargados: DocumentosCargados[] = [];
  readonly url: string = URL_PRUEBA;

  ngOnInit(): void {
    this.documentosCargados = data
  }


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
