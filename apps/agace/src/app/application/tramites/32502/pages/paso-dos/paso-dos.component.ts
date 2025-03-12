import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DocumentoService } from '@ng-mf/data-access-user';
import { DocumentosCargados } from '@ng-mf/data-access-user';
import { PDF } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
/**
 * Este componente se muestra en PasaDos
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS;
  /**
   * Lista de documentos cargados.
   */
  documentosCargados: DocumentosCargados[] = [];
  /**
   * Documento seleccionado por el usuario.
   */
  /**
   * Documento seleccionado por el usuario.
   */
  documentoSeleccionado!: Catalogo;

  /**
   * Tipo de documento.
   */
  tipodocumento: any;

  /**
   * Token de autenticación.
   */
  token!: string;

  /**
   * Formato PDF.
   */
  PDF = PDF;

  /**
   * Lista de documentos.
   */
  documentList: string[] = [
    'Escrito libre a la aduana',
    'Manifesto',
    'ID Official',
    'Actas',
    'Poderes',
    'Otros'
  ];

  /**
   * Estado de los checkboxes seleccionados.
   */
  selectedCheckboxes: boolean[] = new Array(this.documentList.length).fill(false);

  /**
   * Estado del checkbox "Seleccionar todo".
   */
  selectAll: boolean = false;

  /**
   * Constructor del componente
   * @param DocumentoService Servicio para manejar documentos
   * @param toastr Servicio para mostrar notificaciones
   */

  constructor(
    private DocumentoService: DocumentoService,
    private toastr: ToastrService
  ) {
    this.tipodocumento = {
      catalogos: [],
      labelNombre: 'Tipo de Documento',
      primerOpcion: 'Seleccione una tipo de documento'
    };
  }

  /**
   * Toggle all checkboxes based on "Tipo de documento" checkbox state.
   */
  toggleAllCheckboxes(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCheckboxes.fill(checked);
  }

  /**
   * Maneja la carga de documentos
   * @param event Evento de cambio del input de archivo
   */
  cargarDoc(event: Event): void {
    const ARCHIVO = event.target as HTMLInputElement;
    const INFORMACION_ARCHIVO = (ARCHIVO.files as FileList)[0];

    if (INFORMACION_ARCHIVO) {
      const EXT_ARCHIVO = INFORMACION_ARCHIVO.name
        .split('.')
        .pop()
        ?.toLowerCase();

      if (EXT_ARCHIVO !== this.PDF.toLowerCase()) {
        this.toastr.error('Solo se aceptan archivos pdf');
        return;
      }

      const TAMANIO_REQUERIDO = this.documentoSeleccionado.tam
        ? PasoDosComponent.convertirKilobytesABytes(
            parseInt(this.documentoSeleccionado.tam, 10)
          )
        : 0;
      const TAMANIO_ARCHIVO = INFORMACION_ARCHIVO.size;

      if (TAMANIO_ARCHIVO > TAMANIO_REQUERIDO) {
        this.toastr.error(
          'El tamaño del documento que intenta cargar excede el tamaño permitido'
        );
        return;
      }

      this.DocumentoService.subirDocumento(
        this.token,
        INFORMACION_ARCHIVO
      ).subscribe({
        next: (): void => {
          this.toastr.success('Documento subido');
        },
        error: (_error): void => {
          //
        },
      });

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: INFORMACION_ARCHIVO.name,
      });
    }
  }

  /**
   * Convierte kilobytes a bytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en bytes.
   */
  static convertirKilobytesABytes(kilobytes: number): number {
    return kilobytes * 1024;
  }


  /**
   * Verifica si el botón está desactivado
   * @returns {boolean} Verdadero si el botón está desactivado, falso en caso contrario
   */
  get btnDesactivado(): boolean {
    return (this.documentoSeleccionado && this.documentoSeleccionado.id !== 0);
  }
}
