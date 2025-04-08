import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges, OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  Catalogo,
  DocumentosCargados,
  ModalConfirmarComponent
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MB, PDF, DPI } from '../../constantes/constantes';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';
import { CatalogoSelectComponent } from '../catalogo-select/catalogo-select.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import {
  PreviewDocumentoComponent
} from '@libs/shared/data-access-user/src/tramites/components/preview-documento/preview-documento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { MensajesDocumentos } from '@libs/shared/data-access-user/src/core/enums/mensajes-documentos.enum';
import { URL_PRUEBA } from '../../../core/enums/constantes-alertas.enum';

declare const bootstrap: any; // Importación para manejar Bootstrap en TS

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [CatalogoSelectComponent, CommonModule, ReactiveFormsModule, ToastrModule, ModalModule, NgSelectModule, FormsModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss'
})
export class AnexarDocumentosComponent implements OnInit, OnChanges, OnDestroy {

  @Input() catalogoDocumentos: Catalogo[] = [];
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;


  subscription: Subscription[] = [];
  documentoForma!: FormGroup;

  PDF = PDF;
  MB = MB;
  DPI = DPI;

  tamMaximo = 0;
  documentosCargados: DocumentosCargados[] = [];
  documentoSeleccionado!: Catalogo;
  modal = '';
  datosLogin: Login = {
    user: 'user1@example.com',
    password: 'clave1'
  };
  token!: string;
  listDocOpcionalesAgregar: any[] = [];
  listadoArchivos: any[] = [];
  archivosOpcionales: any[] = [
    { descripcion: 'Documento_opcional_01', dpi: '300', id: '11', tam: '10000' },
    { descripcion: 'Documento_opcional_02', dpi: '301', id: '12', tam: '11000' },
    { descripcion: 'Documento_opcional_03', dpi: '302', id: '13', tam: '12000' },
    { descripcion: 'Documento_opcional_04', dpi: '303', id: '14', tam: '13000' },
    { descripcion: 'Documento_opcional_05', dpi: '304', id: '15', tam: '14000' },
    { descripcion: 'Documento_opcional_06', dpi: '305', id: '16', tam: '15000' },
    { descripcion: 'Documento_opcional_07', dpi: '306', id: '17', tam: '16000' },
    { descripcion: 'Documento_opcional_08', dpi: '307', id: '18', tam: '17000' },
    { descripcion: 'Documento_opcional_09', dpi: '308', id: '19', tam: '18000' },
    { descripcion: 'Documento_opcional_10', dpi: '309', id: '20', tam: '19000' }
  ];
  archivosOpcionalesOriginal: any[] = [];
  listDocOpcionales: any[] = [];
  listDocOpcionalesDuplicado: any[] = [];
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;
  cargarDocumentos = false;
  archivosCargando: any = {
    obligatorios: [],
    opcionales: []
  };

  constructor(
    private toastr: ToastrService,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {
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
        return error;
      },
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
   * @param fileInput file proveniente del input
   * @param id del catalog de documentos a cargar
   * @param tipo de documento que se está agregando obligatorio u opcional
   */
  cargarDoc(event: Event, fileInput: HTMLInputElement, id: any, tipo: string): void {
    const archivo = event.target as HTMLInputElement;
    const informacionArchivo = (archivo.files as FileList)[0];

    if (informacionArchivo) {
      const extArchivo = informacionArchivo.name.split('.').pop()?.toLowerCase();
      if (extArchivo !== this.PDF.toLowerCase()) {
        this.toastr.error(MensajesDocumentos.ONLYPDF);
        fileInput.value = '';
        return;
      }

      const sizeRequire: number = 10 * 1048576;
      const sizeFile: number = informacionArchivo.size;
      if (sizeFile > sizeRequire) {
        this.toastr.error(MensajesDocumentos.MAXSIZE);
        fileInput.value = '';
        return;
      }
      this.listadoArchivos.push({
        name: informacionArchivo.name,
        id,
        archivo: informacionArchivo,
        ruta: URL.createObjectURL(informacionArchivo),
        cargado: false,
        tipo,
        mensaje: '',
        estatus: 'Pendiente'
      });
    }
  }

  existePreview(id: any): boolean {
    const encontrado = this.listadoArchivos.find(f => f.id === id);
    return encontrado !== undefined;
  }

  uploadFiles(informacionArchivo: any): Promise<any> {
    return new Promise((resolve) => {
      this.subirDocumentoService.subirDocumento(this.token, informacionArchivo).subscribe({
        next: () => resolve({ cargado: true, mensaje: 'Correcto', estatus: 'OK' }),
        error: (error): void => resolve({ cargado: false, mensaje: 'Error al cargar', estatus: 'Error al cargar' })
      });
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
   * Abre un archivo PDF en una nueva pestaña del navegador.
   * @returns {void}
   * @param id
   */
  verPdf(id: any): void {
    const ruta = this.listadoArchivos.find(f => f.id === id)?.ruta;
    const initialState: ModalOptions = {
      initialState: {
        ruta: ruta.toString(),
        title: 'Vista previa documento'
      }
    };
    this.bsModalRef = this.modalService.show(PreviewDocumentoComponent, initialState);
  }

  /**
   * Abre el modal para confirmar la carga de documentos
   */
  confirmUpload(): void {
    const initialState: ModalOptions = {
      initialState: {
        cancelarBtnTxt: 'Cerrar',
        confirmarBtnTxt: 'Cargar archivos',
        titulo: 'Carga de archivos',
        txtCuerpoHtml: `
          <div class="d-flex flex-column">
            <div class="mb-3">
              <span>Para poder adjuntar sus documentos, deberá cumplir con las siguientes caracteristicas:</span>
            </div>
            <div class="px-3">
              <ul>
                <li>Formato PDF, que no contenga formulario, objetos OLE incrustados, codigo javascript, etc.</li>
                <li>No debe contener páginas en blanco</li>
              </ul>
            </div>
          </div>`
      }
    };
    this.modalRef = this.modalService.show(ModalConfirmarComponent, initialState);
    if (this.modalRef?.onHide) {
      this.subscription.push(
        this.modalRef.onHide.subscribe((response: boolean | string) => {
          if (typeof response === 'boolean' && response) {
            console.log('cargando documentos');
            this.cargarDocumentos = true;
            this.archivosCargando.obligatorios = this.listadoArchivos.filter(f => f.tipo === 'obligatorio');
            this.archivosCargando.opcionales = this.listadoArchivos.filter(f => f.tipo === 'opcional');
            this.cargarArchivos(this.archivosCargando.obligatorios);
            this.cargarArchivos(this.archivosCargando.opcionales);
          }
        })
      );
    }
  }

  limpiarFile(item: any, index: number): void {

    // Obtén el input file correspondiente a la fila
    const fileInput = this.fileInputs.toArray()[index].nativeElement as HTMLInputElement;

    if (fileInput) {
      fileInput.value = ''; // Limpia el archivo seleccionado
    }
    
    const indexArchivo: number = this.listadoArchivos.findIndex(f => f.id === item.id);
    if (indexArchivo !== -1) {
      this.listadoArchivos.splice(indexArchivo, 1);
    }        
  }

  agregarParte(fileInput: HTMLInputElement, item: any, origen: string) {
    if (origen == 'obligatorios') {
      const index: number = this.catalogoDocumentos.findIndex(doc => doc.id === item.id);
      if (index !== -1) {
        const nuevoId: number = (this.catalogoDocumentos[index]?.adicionales?.length ?? 0) + 1;
        const parteDocumento: any = {
          id: `${item.id}-${nuevoId}`,
          descripcion: item.descripcion,
          clave: item.clave,
          tam: item.tam,
          dpi: item.dpi,
          nuevo: true,
          uniqueId: crypto.randomUUID()
        };
        this.catalogoDocumentos[index].adicionales?.push(parteDocumento);
      } else {
        return;
      }
    } else {
      const index: number = this.listDocOpcionales.findIndex(doc => doc.id === item.id);
      if (index !== -1) {
        const nuevoId: number = (this.listDocOpcionales[index]?.adicionales?.length ?? 0) + 1;
        const parteDocumento: any = {
          id: `${item.id}-${nuevoId}`,
          descripcion: item.descripcion,
          clave: item.clave,
          tam: item.tam,
          dpi: item.dpi,
          nuevo: true,
          uniqueId: crypto.randomUUID()
        };
        this.listDocOpcionales[index].adicionales?.push(parteDocumento);
      }
    }
  }

  convertKbToMb(size: string | undefined): string {
    if (size === undefined) {
      return '0';
    }
    return String((parseInt(size) / 1000).toFixed(2));
  }

  agregarOpcionales(): void {
    this.listDocOpcionalesAgregar.forEach((doc: any) => {
      const index = this.listDocOpcionales.findIndex((f: any) => f.id === doc);
      if (index === -1) {
        const opcional = {
          ...this.archivosOpcionales.find(f => f.id === doc),
          adicionales: []
        };
        this.listDocOpcionales.push(opcional);
        const indexOpcional = this.archivosOpcionales.findIndex(f => f.id === doc);
        if (indexOpcional !== -1) {
          this.archivosOpcionales[indexOpcional] = {
            ...this.archivosOpcionales[indexOpcional]
          };
        }
        this.listDocOpcionalesDuplicado = this.listDocOpcionales.map(op => op.id);
      }
    });
  }

  async cargarArchivos(archivosCargando: any[]): Promise<void> {
    for (const archivo of archivosCargando) {
      const data = await this.uploadFiles(archivo.archivo);
      archivo.mensaje = data.mensaje;
      archivo.cargado = data.cargado;
      archivo.estatus = data.estatus;
    }
  }

  eliminarOpcional(item: any): void {
    const index: number = this.listDocOpcionales.findIndex(f => f.id === item.id);
    if (index !== -1) {
      if (this.listDocOpcionales[index].adicionales?.length > 0) {
        this.listDocOpcionales[index].adicionales.forEach((adicional: any) => {
          const indexListado: number = this.listadoArchivos.findIndex(f => f.id === adicional.id);
          this.listadoArchivos.splice(indexListado, 1);
        });
      }
      const indexListado: number = this.listadoArchivos.findIndex(f => f.id === item.id);
      this.listadoArchivos.splice(indexListado, 1);

      this.listDocOpcionales.splice(index, 1);
      this.listDocOpcionalesDuplicado = this.listDocOpcionales.map(op => op.id);
    }
    const indexAgregar: number = this.listDocOpcionalesAgregar.findIndex(id => id === item.id);
    if (indexAgregar !== -1) {
      this.listDocOpcionalesAgregar.splice(indexAgregar, 1);
      this.listDocOpcionalesAgregar = [...this.listDocOpcionalesAgregar];
    }
    this.cdr.detectChanges();
  }

  eliminarNuevo(item: any, adicional = false): void {
    if (adicional) {
      const indexAdicional = item.item.adicionales.findIndex((adicional: any) => adicional.id === item.adicional.id);
      item.item.adicionales.splice(indexAdicional, 1);
      const index: number = this.listadoArchivos.findIndex(f => f.id === item.id);
      this.listadoArchivos.splice(index, 1);
    }
  }

  ngOnInit() {
    this.archivosOpcionalesOriginal = [...this.archivosOpcionales];
    this.obtenerToken(this.datosLogin);
    this.crearFormaDocumento();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['catalogoDocumentos']) {
      this.catalogoDocumentos = this.catalogoDocumentos.map(item => ({
        ...item,
        adicionales: []
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
