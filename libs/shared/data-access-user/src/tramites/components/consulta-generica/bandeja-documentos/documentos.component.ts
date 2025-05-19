import { BodyTablaDocumentos, HeaderTablaDocumentos } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_DOCUMENTOS } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { DocumentosService } from '../../../../core/services/consultagenerica/bandeja-documentos-service';

@Component({
  selector: 'lib-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.scss',
})
export class DocumentosComponent implements OnInit, OnDestroy {  
  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

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
   * Constructor de la clase DocumentosComponent.
   * @param documentosService Servicio para obtener los documentos.
   */
  constructor(private documentosService: DocumentosService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama al método para obtener los documentos desde el servicio.
   */
  ngOnInit(): void {
    /**
     * Llamar al método para obtener los documentos al inicializar el componente.
     */
    this.getDocumentos();
  }

  /**
   * Abre una nueva pestaña del navegador para ver los detalles del documento.
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  verPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Permite descargar un documento.
   * @param {string} url - La URL del archivo PDF que se va a descargar.
   * @returns {void}
   */
  descargarPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Método para obtener los documentos desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  getDocumentos(): void {
    this.documentosService
      .getDocumentos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaDocumentos = data;
      });
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