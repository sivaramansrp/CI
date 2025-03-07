import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import {
  CatalogosSelect,
  DocumentosCargados
} from '../../../core/models/shared/components.model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  CATALOGOS_ID,
  MB,
  PDF,
  DPI
} from '../../constantes/constantes';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';
import { CatalogosService } from '../../../core/services/shared/catalogos/catalogos.service';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { URL_PRUEBA } from '../../constantes/servicios-extraordinarios.enum';

declare const bootstrap: any; // Importación para manejar Bootstrap en TS

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [CatalogoSelectComponent, CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss'
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
    password: 'clave1'
  };

  token!: string;
  base64File: string = '';

  readonly url: string = URL_PRUEBA;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileNames: string = '';


  @ViewChild('modalConfirmacion') modalConfirmacion!: ElementRef;
  rutaArchivoPreview: string = '';
  listadoArchivos: any[] = [];
  documentosOpcionales: FormControl = new FormControl<any>('');
  archivosOpcionales: any[] = [
    { "value": 1, "label": "Lorem ipsum" },
    { "value": 2, "label": "Lorem ipsum" },
    { "value": 3, "label": "Lorem ipsum" },
    { "value": 4, "label": "Lorem ipsum" },
    { "value": 5, "label": "Lorem ipsum" },
    { "value": 6, "label": "Lorem ipsum" },
    { "value": 7, "label": "Lorem ipsum" },
    { "value": 8, "label": "Lorem ipsum" },
    { "value": 9, "label": "Lorem ipsum" },
    { "value": 10, "label": "Lorem ipsum" }
  ];

  constructor(
    private toastr: ToastrService,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.obtenerToken(this.datosLogin);
    this.crearFormaDocumento();
    console.log(this.catalogoDocumentos);
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
      }
    });
  }

  crearFormaDocumento(): void {
    this.documentoForma = this.fb.group({
      documento: ['', [Validators.required]]
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
    const documento = this.documentoForma.get('documento')?.value;
    const documentoEncontrado = this.catalogoDocumentos.find(
      (doc) => doc.id === documento
    );
    if (documentoEncontrado) {
      this.documentoSeleccionado = documentoEncontrado;
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
  cargarDoc(event: Event, fileInput: HTMLInputElement, id: any): void {
    const archivo = event.target as HTMLInputElement;
    const informacionArchivo = (archivo.files as FileList)[0];
    console.log(informacionArchivo);

    if (informacionArchivo) {
      const extArchivo = informacionArchivo.name.split('.').pop()?.toLowerCase();

      if (extArchivo !== this.PDF.toLowerCase()) {
        this.toastr.error('Solo se aceptan archivos pdf');
        fileInput.value = '';
        return;
      }

      // const tamanioRequerido = this.documentoSeleccionado.tam ? this.convertirKilobytesABytes(parseInt(this.documentoSeleccionado.tam, 10)) : 0;
      const tamanioRequerido: number = 10 * 1048576;
      const tamanioArchivo: number = informacionArchivo.size;
      console.log(tamanioArchivo);
      if (tamanioArchivo > tamanioRequerido) {
        this.toastr.error('El tamaño del documento que intenta cargar excede el tamaño permitido');
        fileInput.value = '';
        return;
      }
      this.listadoArchivos.push({
        name: informacionArchivo.name,
        id,
        archivo: informacionArchivo,
        ruta: URL.createObjectURL(informacionArchivo)
      });
      console.log(this.listadoArchivos);

      /*this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: informacionArchivo.name
      });*/
    }
  }

  existePreview(id: any): boolean {
    // console.log(id);
    const encontrado = this.listadoArchivos.find(f => f.id === id);
    return encontrado !== undefined;
  }

  uploadFiles(informacionArchivo: any): void {
    this.subirDocumentoService.subirDocumento(this.token, informacionArchivo).subscribe({
      next: (): void => {
        this.toastr.success('Documento subido');
      },
      error: (error): void => {
        console.error(error);
        this.toastr.error('Error al subir el documento');
      }
    });
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
  verPdf(id: any): void {

    console.log(this.rutaArchivoPreview);
    const ruta = this.listadoArchivos.find(f => f.id === id)?.ruta;
    window.open(ruta, '_blank');
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
   * Muestra el modal para ver un documento.
   * @param {number} i - El índice del documento.
   * @param {string} accion - La acción a realizar.
   */
  verDocumento(i: number, accion: string) {
    this.mostrarModal = accion === 'v';
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
    this.modal = '';
    return;
    const modalElement = this.modalConfirmacion.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileNames = Array.from(input.files).map(file => file.name).join(', ');
    }
  }

  limpiarFile(fileInput: HTMLInputElement, item: any): void {
    fileInput.value = '';
    const index = this.listadoArchivos.findIndex(f => f.id === item.id);
    this.listadoArchivos.splice(index, 1);
  }

  agregarParte(fileInput: HTMLInputElement, i: any) {
    console.log(i);
    console.log(fileInput);

  }

  convertKbToMb(size: string | undefined): string {
    if (size === undefined) {
      return '0';
    }
    return String((parseInt(size) / 1000).toFixed(2));
  }
}
