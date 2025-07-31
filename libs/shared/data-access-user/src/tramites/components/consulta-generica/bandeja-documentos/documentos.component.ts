import { BodyTablaDocumentos, HeaderTablaDocumentos } from '../../../../core/models/shared/consulta-generica.model';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { CONSULTA_DOCUMENTOS } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DocumentosService } from '../../../../core/services/consultagenerica/bandeja-documentos-service';


import { DocumentoSolicitud } from '../../../../core/models/130118/consulta-documentos-response.model';

@Component({
  selector: 'lib-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.scss',
})
export class DocumentosComponent implements OnChanges , OnDestroy {  
  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * @property {DocumentoSolicitud[]} documentos
   * @description Documentos de solicitud.
   */
  @Input() documentos: DocumentoSolicitud[] = [];

  /**
   * Encabezado de la tabla de documentos.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaDocumentos[]}
   */
  readonly encabezadoTablaDocumentos: HeaderTablaDocumentos[] = CONSULTA_DOCUMENTOS.encabezadoTablaDocumento;

  /**
   * Datos de la tabla de documentos.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaDocumentos[]}
   */
  public datosTablaDocumentos: BodyTablaDocumentos[] = [];

  /**
   * URL del archivo PDF que se va a abrir.
   * @type {string}
   */
  public verPdf = DocumentosComponent.verPdf;

  /**
   * URL del archivo PDF que se va a descargar.
   * @type {string}
   */
  public descargarPdf = DocumentosComponent.descargarPdf;

  /**
   * Constructor de la clase DocumentosComponent.
   * @param documentosService Servicio para obtener los documentos.
   */
  constructor(private documentosService: DocumentosService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentos'] && changes['documentos'].currentValue?.length > 0) {
      this.getDocumentos();
    }
  }

  /**
   * Abre una nueva pestaña del navegador para ver los detalles del documento.
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  static verPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Permite descargar un documento.
   * @param {string} url - La URL del archivo PDF que se va a descargar.
   * @returns {void}
   */
  static descargarPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Método para obtener los documentos desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  getDocumentos(): void {
     this.datosTablaDocumentos = this.documentos.map((doc) => ({
      tipoDocumento: doc.documento.nombre,
      estatus: doc.estado_documento_solicitud,
      fechaAdjunto: doc.fecha_asociacion,
      nombreArchivo: doc.documento.nombre,
      urlPdf: doc.documento_uuid
    }));
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}