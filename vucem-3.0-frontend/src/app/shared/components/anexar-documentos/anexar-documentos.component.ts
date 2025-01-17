import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import {
  CatalogosSelect,
  DocumentosCargados,
} from '../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DatosArchivo } from '../../../core/models/shared/components.model';
import {
  CATALOGOS_ID,
  KB,
  MB,
  UNIDADES,
  PDF,
  DPI,
} from '../../constantes/constantes';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';

declare const bootstrap: any; // Importación para manejar Bootstrap en TS

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [SelectCatalogosComponent, CommonModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss',
})
export class AnexarDocumentosComponent {
  PDF = PDF;
  MB = MB;
  DPI = DPI;

  tamMaximo: number = 0;
  tiposDocumentos!: CatalogosSelect;
  documentosCargados: Array<DocumentosCargados> = [];
  documentoSeleccionado!: Catalogo;
  mostrarModal: boolean = false;
  modal: string = 'modal';
  indiceDocumento!: number;

  @ViewChild('modalConfirmacion') modalElement!: ElementRef;
  datosLogin: Login = {
    user: 'user1@example.com',
    password: 'clave1',
  };

  token!: string;
  base64File: string = '';


  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService
  ) {}

  ngOnInit() {
    this.obtenerToken(this.datosLogin);
    this.getTiposDocumentos();
  }

  /**
   * Verifica si hay documentos cargados.
   * @returns {boolean} `true` si hay documentos cargados, de lo contrario `false`.
   */
  get docCargados() {
    return this.documentosCargados.length > 0;
  }

  /**
   * Determina si el botón de carga debe estar desactivado.
   * @returns {boolean} `true` si no hay un documento seleccionado, de lo contrario `false`.
   */
  get btnDesactivado(): boolean {
    return !(this.documentoSeleccionado && this.documentoSeleccionado.id !== 0);
  }

  /**
   * Obtiene el token de autenticación.
   * @param {Login} body - Datos de inicio de sesión.
   */
  obtenerToken(body: Login): void {
    this.inicioSesionService.obtenerToken(body).subscribe({
      next: (resp): void => {
        this.token = resp.jwt;
      },
      error: (error): void => {
        console.log(error);
      },
    });
  }

  /**
   * Obtiene los tipos de documentos disponibles.
   */
  getTiposDocumentos(): void {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.tiposDocumentos = {
              labelNombre: 'Tipo de documento',
              required: true,
              primerOpcion: 'Selecciona un tipo de documento',
              catalogos: resp,
            };
          }
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }

  /**
   * Maneja la selección de un documento.
   * @param {Catalogo} e - El documento seleccionado.
   */
  docSeleccionado(e: Catalogo) {
    this.documentoSeleccionado = e;
    this.tamMaximo = this.documentoSeleccionado.tam
      ? this.convertirKilobytesAMegabytes(
          parseInt(this.documentoSeleccionado.tam)
        )
      : 0;
  }

  /**
   * Maneja la carga de un documento.
   * @param {Event} event - El evento de carga del archivo.
   */
  async cargarDoc(event: Event) {
    const archivo = event.target as HTMLInputElement;
    const informacionArchivo = (archivo.files as FileList)[0];

    if (informacionArchivo) {
      let extArchivo = informacionArchivo.name.split('.').pop()?.toLowerCase();

      if (extArchivo !== this.PDF.toLowerCase()) {
        this.toastr.error('Solo se aceptan archivos pdf');
        return;
      }

      const tamanioRequerido = this.documentoSeleccionado.tam
        ? this.convertirKilobytesABytes(
            parseInt(this.documentoSeleccionado.tam)
          )
        : 0;
      const tamanioArchivo = informacionArchivo.size;

      if (tamanioArchivo > tamanioRequerido) {
        this.toastr.error(
          'El tamaño del documento que intenta cargar excede el tamaño permitido'
        );
        return;
      }

      // this.subirDocumentoService
      //   .subirDocumento(this.token, informacionArchivo)
      //   .subscribe({
      //     next: (): void => {
      //       alert('Documento subido');
      //     },
      //     error: (error): void => {
      //       console.log(error);
      //     },
      //   });

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: informacionArchivo.name,
      });
    }
  }

  /**
   * Convierte kilobytes a megabytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en megabytes.
   */
  convertirKilobytesAMegabytes(kilobytes: number): number {
    return Math.round(kilobytes / 1024);
  }

  /**
   * Convierte kilobytes a bytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en bytes.
   */
  convertirKilobytesABytes(kilobytes: number): number {
    return kilobytes * 1024;
  }

  /**
   * Muestra el modal para ver un documento.
   * @param {number} i - El índice del documento.
   * @param {string} accion - La acción a realizar.
   */
  verDocumento(i: number, accion: string) {
    this.mostrarModal = accion === 'v';
  }

  /**
   * Abre el modal para eliminar un documento.
   * @param {number} i - El índice del documento.
   */
  abrirModal(i: number) {
    this.modal = 'show';
    this.indiceDocumento = i;
  }

  /**
   * Elimina un documento de la lista.
   * @param {number} i - El índice del documento.
   */
  eliminarDocumento(i: number) {
    this.documentosCargados.splice(i, 1);
    this.cerrarModal();
    this.toastr.success('Se ha eliminado el archivo exitosamente');
  }

  /**
   * Cierra el modal.
   */
  cerrarModal(): void {
    if (this.modalElement) {
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
      modal.hide();
    }
  }
}
