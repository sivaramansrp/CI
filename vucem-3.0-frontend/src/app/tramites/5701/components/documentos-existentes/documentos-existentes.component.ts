import { Component } from '@angular/core';
import { URL_PRUEBA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { DocumentosCargados } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-documentos-existentes',
  templateUrl: './documentos-existentes.component.html',
  styleUrl: './documentos-existentes.component.scss'
})
export class DocumentosExistentesComponent {
  constructor() { }
  documentosCargados: DocumentosCargados[] = [];
  readonly url: string = URL_PRUEBA;

  ngOnInit(): void {  
    this.documentosCargados = [
      {
        tipoDocumento: {
          descripcion: 'doc12',
          id: 1,
        },
        nombreArchivo: 'Acuse de recepción de trámite',
      },
    ];
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
