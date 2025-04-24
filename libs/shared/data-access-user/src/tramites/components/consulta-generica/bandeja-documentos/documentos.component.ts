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
  constructor(private documentosService: DocumentosService) {}
  
  ngOnInit(): void {
    /**
     * Llamar al método para obtener los documentos al inicializar el componente
     */
    this.getDocumentos(); 
  }
  public unsubscribe$ = new Subject<void>();
     /**
     * Subject para notificar la destrucción del componente.
     */
     public destroyNotifier$: Subject<void> = new Subject();
  /**
     * Implementación para la tabla de documentos de requerimientos.
     */
    readonly encabezadoTablaDocumentos : HeaderTablaDocumentos[] = CONSULTA_DOCUMENTOS.encabezadoTablaDocumento;  
    /**
     * Variable para almacenar los documentos
     */
    datosTablaDocumentos: BodyTablaDocumentos[] = []; 
  
  /**
  * Abre una nueva pestaña del navegador para ver los detalles del documento.
  *
  * @param {string} url - La URL del archivo PDF que se va a abrir.
  * @returns {void}
  */
  verPdf(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Permite descargar un documento.
   * @param {number} i - El índice del documento.
   */
  descargarPdf(url: string): void {
    window.open(url, '_blank');
  }
  /**
   * Método para obtener los documentos desde el servicio.
   * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
   * suscribe - Se suscribe al observable del servicio para obtener los datos.
   */
  getDocumentos(): void {
    this.documentosService.getDocumentos()
    .pipe(takeUntil((this.unsubscribe$)))  
    .subscribe((data) => {
      this.datosTablaDocumentos = data; 
    });
  }
  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof DocumentosComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete()
  }
}