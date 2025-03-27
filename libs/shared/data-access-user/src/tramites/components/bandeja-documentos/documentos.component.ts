import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosCargados } from '../../../core/models/shared/components.model';
import { URL_PRUEBA } from '../../../core/enums/constantes-alertas.enum';

@Component({
  selector: 'lib-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css',
})
export class DocumentosComponent implements OnInit {
  /**
   * Lista de documentos cargados.
   */
  documentosCargados: DocumentosCargados[] = [];
  readonly url: string = URL_PRUEBA;

  ngOnInit(): void {
    //this.documentosCargados = [];
    this.documentosCargados = [
      {
        tipoDocumento: {
          id: 1,
          descripcion: 'Acta de nacimiento'
        },
        nombreArchivo: 'acta_nacimiento.pdf',
        //estatus: 'Cargado'
      },
      {
        tipoDocumento: {
          id: 2,
          descripcion: 'Comprobante de domicilio'
        },
        nombreArchivo: 'comprobante_domicilio.pdf',
        //estatus: 'Cargado'
      },
      {
        tipoDocumento: {
          id: 3,
          descripcion: 'Identificación oficial'
        },
        nombreArchivo: 'identificacion_oficial.pdf',
        //estatus: 'Cargado'
      },
      {
        tipoDocumento: {
          id: 4,
          descripcion: 'CURP'
        },
        nombreArchivo: 'curp.pdf',
        //estatus: 'Cargado'
      },
      {
        tipoDocumento: {
          id: 5,
          descripcion: 'RFC'
        },
        nombreArchivo: 'rfc.pdf',
        //estatus: 'Cargado'
      }
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
