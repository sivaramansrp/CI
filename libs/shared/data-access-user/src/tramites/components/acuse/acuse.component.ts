import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { DocumentoService } from '../../..';
import { BodyTablaAcuse } from '../../../core/models/shared/catalogos.model';
import { DocumentosRequest } from '../../../core/models/shared/documentos-request.model';
import { Tramite5701Query } from '../../../core/queries/tramite5701.query';
import { AlertComponent } from '../alert/alert.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-component-acuse',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './acuse.component.html',
  styleUrl: './acuse.component.scss',
})
export class AcuseComponent implements OnChanges {
  @Input() titulo!: string;
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  @Input() folio!: string;
  @Input() url!: string;

  readonly encabezadoTablaAcuse: { valor: string, key: keyof BodyTablaAcuse }[] = [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ];

  /* Acciones de la tabla */
  datosTablaAcuse: BodyTablaAcuse[] = [];


  constructor(private router: Router,
    private documentosService: DocumentoService,
   private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    const idSolicitud = params['solicitud'];
    this.generarYMostrarDocumentos(idSolicitud);
    });
  }

  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   *
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta'].currentValue) {
      console.log('Texto de alerta actualizado:', changes['txtAlerta'].currentValue);
      
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }
  }

  /**
   * Método que genera y muestra los documentos necesarios para el acuse.
   *
   * Utiliza el servicio `documentosService` para generar el documento basado en los parámetros proporcionados.
   * Luego, obtiene el contenido del documento generado y lo muestra en la tabla de acuse.
   */
  private generarYMostrarDocumentos(id: string): void {
    const body: DocumentosRequest = {
      tipo_dependencia: "AGA",
      tipo_tramite: "5701",
      tipo_documento: 1,
      parametros: {
        id_solicitud: +id,
      }
    };

    this.documentosService.generarDoc(body).pipe(
      switchMap(response => {
        const llaveArchivo = response.datos.llave_archivo;
        return this.documentosService.getVisualizarDoc(llaveArchivo);
      }),
      catchError(error => {
        console.error('Error al generar documentos:', error);
        return throwError(() => error);
      })
    ).subscribe({
      next: (response) => {
        this.datosTablaAcuse = [{
          id: 1,
          documento: response.datos!.nombre_archivo,
          urlPdf: this.crearUrlPdf(response.datos!.contenido),
          idDocumento: '1'
        }];
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  /**
   * Método que crea una URL para un PDF a partir de un string en base64.
   *
   * @param base64 - El contenido del PDF en formato base64.
   * @returns Una URL que puede ser utilizada para mostrar el PDF.
   */
  private crearUrlPdf(base64: string): string {
    // Decodificar el base64
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear el Blob y la URL
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }

  /**
   * Método que se ejecuta al hacer clic en un enlace para ver el PDF.
   *
   * @param url - La URL del PDF a visualizar.
   */
  verPdf(url: string): void {
    // Abrir en nueva pestaña
    window.open(url, '_blank');
  }

  salir(): void {
    this.router.navigate(['/seleccion-tramite']);
  }
}
