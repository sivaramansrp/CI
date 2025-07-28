import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { BodyTablaAcuse } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { DocumentoService } from '../../..';
import { DocumentosRequest } from '../../../core/models/shared/documentos-request.model';
import { DocumentosService } from '../../../core/services/130118/documentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-component-acuse',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './acuse.component.html',
  styleUrl: './acuse.component.scss',
})
export class AcuseComponent implements OnChanges {
  /**
  * Título principal que se mostrará en el encabezado del componente.
  * Generalmente representa el nombre del trámite o sección.
  */
  @Input() titulo!: string;

  /**
   * Texto del mensaje de alerta que se mostrará en el componente.
   * Se utiliza para mostrar advertencias, errores o información relevante al usuario.
   */
  @Input() txtAlerta!: string;

  /**
   * Subtítulo que se mostrará debajo del título principal.
   * Usado para complementar la información del título o dar contexto adicional.
   */
  @Input() subtitulo!: string;

  /**
   * Folio único relacionado con el trámite o solicitud.
   * Puede usarse para mostrar información específica o para trazabilidad.
   */
  @Input() folio!: string;

  /**
   * URL relacionada con el trámite o documento generado.
   * Esta puede ser utilizada para redireccionar o mostrar documentos.
   */
  @Input() url!: string;

  /**
   * Identificador numérico de la solicitud asociada al trámite.
   * Este ID se utiliza para generar y obtener los documentos correspondientes.
   */
  @Input() idSolicitud!: number;

  /**
 * Encabezados de la tabla de acuse.
 *
 * Cada elemento representa una columna de la tabla, con su clave asociada
 * al modelo `BodyTablaAcuse` y el valor que se muestra como encabezado en la UI.
 *
 */
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

  /**
 * Datos que se muestran en la tabla de acuse.
 */
  datosTablaAcuse: BodyTablaAcuse[] = [];


  constructor(private router: Router,
    private documentosService: DocumentoService,
    private route: ActivatedRoute,
    private documentosService130118: DocumentosService
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
    if (this.url === 'pexim') {
      this.documentosService130118.guardarAcuse(this.idSolicitud.toString()).pipe(
        switchMap(() => {
          return this.documentosService130118.vistaPrevia(this.idSolicitud.toString());
        }),
        catchError((error) => {
          console.error('Error en guardarAcuse o vistaPrevia:', error);
          return throwError(() => error);
        })
      ).subscribe({
        next: (response) => {
          if (response?.datos) {
            this.datosTablaAcuse = [{
              id: 1,
              documento: response.datos.nombre_archivo,
              urlPdf: AcuseComponent.crearUrlPdf(response.datos.contenido),
              idDocumento: '1'
            }];
          } else {
            this.datosTablaAcuse = [];
          }
        },
        error: (err) => console.error('Error:', err)
      });

    } else {
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
          const DATOS = response.datos as { llave_archivo: string };
          const LLAVEARCHIVO = DATOS.llave_archivo;
          return this.documentosService.getVisualizarDoc(LLAVEARCHIVO);
        }),
        catchError(error => {
          console.error('Error al generar documentos:', error);
          return throwError(() => error);
        })
      ).subscribe({
        next: (response) => {
          if (response?.datos) {
            this.datosTablaAcuse = [{
              id: 1,
              documento: response.datos.nombre_archivo,
              urlPdf: AcuseComponent.crearUrlPdf(response.datos.contenido),
              idDocumento: '1'
            }];
          } else {
            this.datosTablaAcuse = [];
          }
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }



  /**
   * Método que crea una URL para un PDF a partir de un string en base64.
   *
   * @param base64 - El contenido del PDF en formato base64.
   * @returns Una URL que puede ser utilizada para mostrar el PDF.
   */
  static crearUrlPdf(base64: string): string {
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
  // eslint-disable-next-line class-methods-use-this
  verPdf(url: string): void {
    window.open(url, '_blank');
  }

  salir(): void {
    this.router.navigate(['/seleccion-tramite']);
  }
}
