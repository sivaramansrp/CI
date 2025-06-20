import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { BodyTablaAcuse } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { DocumentoService } from '../../..';
import { DocumentosRequest } from '../../../core/models/shared/documentos-request.model';
import { Router } from '@angular/router';

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
  @Input() idSolicitud!: number;

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
  ) { }


  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   *
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta']?.currentValue) {
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }

    if (changes['idSolicitud']?.currentValue) {
      this.generarYMostrarDocumentos();
    }
  }


  /**
   * Método que genera y muestra los documentos necesarios para el acuse.
   *
   * Utiliza el servicio `documentosService` para generar el documento basado en los parámetros proporcionados.
   * Luego, obtiene el contenido del documento generado y lo muestra en la tabla de acuse.
   */
     generarYMostrarDocumentos(): void {
    const BODY: DocumentosRequest = {
      tipo_dependencia: "AGA",
      tipo_tramite: "5701",
      tipo_documento: 1,
      parametros: {
        id_solicitud: Number(this.idSolicitud),
      }
    };

    this.documentosService.generarDoc(BODY).pipe(
      switchMap(response => {
        const LLAVEARCHIVO = response.datos.llave_archivo;
        return this.documentosService.getVisualizarDoc(LLAVEARCHIVO);
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
  crearUrlPdf(base64: string): string {
    // Decodificar el base64
    const BYTE_CHARACTERS = atob(base64);
    const BYTE_NUMBERS = new Array(BYTE_CHARACTERS.length);
    for (let i = 0; i < BYTE_CHARACTERS.length; i++) {
      BYTE_NUMBERS[i] = BYTE_CHARACTERS.charCodeAt(i);
    }
    const BYTE_ARRAY = new Uint8Array(BYTE_NUMBERS);

    // Crear el Blob y la URL
    const BLOB = new Blob([BYTE_ARRAY], { type: 'application/pdf' });
    return URL.createObjectURL(BLOB);
  }


  /**
   * Método que se ejecuta al hacer clic en un enlace para ver el PDF.
   *
   * @param url - La URL del PDF a visualizar.
   */
  verPdf(url: string): void {
    window.open(url, '_blank');
  }

  salir(): void {
    this.router.navigate(['/seleccion-tramite']);
  }
}
