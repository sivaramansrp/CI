import {
  CatalogosSelect,
  DocumentosCargados,
} from '../../../core/models/shared/components.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  DPI,
  MB,
  PDF
} from '../../constantes/constantes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';
import { URL_PRUEBA } from '../../../core/enums/constantes-alertas.enum';




declare const BOOTSTRAP: { Modal: { getInstance: (element: HTMLElement) => { hide: () => void } | null } }; // Importación para manejar Bootstrap en TS

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [CatalogoSelectComponent, CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss',
})
export class AnexarDocumentosComponent implements OnInit {
  @Input() catalogoDocumentos: Catalogo[] = [];
  documentoForma!: FormGroup;

  PDF = PDF;
  MB = MB;
  DPI = DPI;

  tamMaximo: number = 0;
  tiposDocumentos!: CatalogosSelect;
  documentosCargados: DocumentosCargados[] = [];
  documentoSeleccionado!: Catalogo;
  mostrarModal: boolean = false;

  modal: string = '';
  indiceDocumento!: number;

  datosLogin: Login = {
    user: 'user1@example.com',
    password: 'clave1',
  };

  token!: string;
  base64File: string = '';

  readonly url: string = URL_PRUEBA;


  @ViewChild('modalConfirmacion') modalConfirmacion!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService,
    private fb: FormBuilder,
  ) { 
    // Lógica de inicialización si es necesario
  }

  ngOnInit(): void {
    this.obtenerToken(this.datosLogin);
    this.crearFormaDocumento();
  }

  /**
   * Verifica si hay documentos cargados.
   * @returns {boolean} `true` si hay documentos cargados, de lo contrario `false`.
   */
  get docCargados(): boolean {
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
        return error;
      },
    });
  }

  crearFormaDocumento(): void {
    this.documentoForma = this.fb.group({
      documento: ['', [Validators.required]],
    });
  }

  /**
   * Selecciona un documento de la lista de documentos disponibles y actualiza
   * las propiedades `documentoSeleccionado` y `tamMaximo` en base al documento seleccionado.
   *
   * @remarks
   * - Obtiene el valor del documento desde el formulario `documentoForma`.
   * - Busca el documento en el catálogo de documentos `catalogoDocumentos` por su ID.
   * - Si el documento tiene un tamaño definido, lo convierte de kilobytes a megabytes
   *   y lo asigna a `tamMaximo`. Si no, asigna 0 a `tamMaximo`.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  seleccionarDocumento(): void {
    const DOCUMENTO = this.documentoForma.get('documento')?.value;
    const DOCUMENTO_ENCONTRADO= this.catalogoDocumentos.find(
      (doc) => doc.id === DOCUMENTO
    );
    if (DOCUMENTO_ENCONTRADO) {
      this.documentoSeleccionado = DOCUMENTO_ENCONTRADO;
    } else {
      this.toastr.error('Documento no encontrado');
      return;
    }
    this.tamMaximo = this.documentoSeleccionado?.tam
      ? this.convertirKilobytesAMegabytes(
        parseInt(this.documentoSeleccionado.tam, 10)
      )
      : 0;
  }

  /**
   * Maneja la carga de un documento.
   * @param {Event} event - El evento de carga del archivo.
   */
  cargarDoc(event: Event): void {
    const ARCHIVO = event.target as HTMLInputElement;
    const INFORMACION_ARCHIVO= (ARCHIVO.files as FileList)[0];

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
        ? this.convertirKilobytesABytes(
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

      this.subirDocumentoService.subirDocumento(
        this.token,
        INFORMACION_ARCHIVO
      ).subscribe({
        next: (): void => {
          this.toastr.success('Documento subido');
        },
        error: (_error): void => {
          this.toastr.error('Error al subir el documento');
        },
      });

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: INFORMACION_ARCHIVO.name,
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
  abrirModal(i: number):void {
    this.modal = 'show';
    this.indiceDocumento = i;
  }

  /**
   * Muestra el modal para ver un documento.
   * @param {number} i - El índice del documento.
   * @param {string} accion - La acción a realizar.
   */
  verDocumento(i: number, accion: string):void {
    this.mostrarModal = accion === 'v';
  }

  /**
   * Elimina un documento de la lista.
   * @param {number} i - El índice del documento.
   */
  eliminarDocumento(i: number): void {
    this.documentosCargados.splice(i, 1);
    this.cerrarModal();
    this.toastr.success('Se ha eliminado el archivo exitosamente');
  }

  /**
   * Cierra el modal.
   */
  cerrarModal(): void {
    const MODAL_ELEMENT= this.modalConfirmacion.nativeElement;
    const MODAL_INSTANCE = BOOTSTRAP.Modal.getInstance(MODAL_ELEMENT);
    if (MODAL_INSTANCE) {
      MODAL_INSTANCE.hide();
    }
  }
}
