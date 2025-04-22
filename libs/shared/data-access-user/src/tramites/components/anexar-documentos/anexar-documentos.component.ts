import { BsModalRef, BsModalService, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { DocumentosCargados } from '../../../core/models/shared/components.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { MensajesDocumentos } from '../../../core/enums/mensajes-documentos.enum';
import { ModalConfirmarComponent } from '../modal-confirmar/modal-confirmar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  PreviewDocumentoComponent
} from '../preview-documento/preview-documento.component';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';

import { DPI, MB, PDF } from '../../constantes/constantes';
import { DocumentosState, DocumentosStore } from '../../../core/estados/documentos.store';
import { DocumentosQuery } from '../../../core/queries/documentos.query';

interface DocumentosParaCargar {
  name: string;
  id: number;
  archivo?: File;
  ruta: string;
  cargado: boolean;
  tipo: string;
  mensaje: string;
  estatus: string;
}

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastrModule, ModalModule, NgSelectModule, FormsModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss'
})
export class AnexarDocumentosComponent implements OnInit, OnChanges, OnDestroy {

  @Input() catalogoDocumentos: Catalogo[] = [];
  @Input() catalogoDocumentosOpcionales: Catalogo[] = [];
  @Input() cargaArchivosEvento!: EventEmitter<void>;

  @Output() cargaRealizada = new EventEmitter<boolean>();
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
  listDocOpcionalesAgregar: number[] = [];
  listadoArchivos: DocumentosParaCargar[] = [];
  archivosOpcionales: Catalogo[] = [];
  
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

  private destroyNotifier$: Subject<void> = new Subject<void>();
  private documentosState!: DocumentosState;

  constructor(
    private documentosQuery: DocumentosQuery,
    private documentosStore: DocumentosStore,
    private toastr: ToastrService,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.documentosQuery.selectDocumentoState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((documentosState) => {
          this.documentosState = documentosState;
        })
      )
      .subscribe();

    this.listDocOpcionales = (this.documentosState.catalogoDocumentos.length > 0) ? this.documentosState.catalogoDocumentos : [];

    this.archivosOpcionalesOriginal = [...this.archivosOpcionales];
    this.obtenerToken(this.datosLogin);
    this.crearFormaDocumento();

    this.cargaArchivosEvento
      .pipe(takeUntil(this.destroyNotifier$),
      map(() => this.confirmUpload())
      )
      .subscribe();
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
    const DOCUMENTO = this.documentoForma.get('documento')?.value;
    const DOCUMENTO_ENCONTRADO = this.catalogoDocumentos.find(
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
   * @param fileInput file proveniente del input
   * @param id del catalog de documentos a cargar
   * @param tipo de documento que se está agregando obligatorio u opcional
   */
  cargarDoc(event: Event, fileInput: HTMLInputElement, id: number, tipo: string): void {
    const ARCHIVO = event.target as HTMLInputElement;
    const INFORMACION_ARCHIVO = (ARCHIVO.files as FileList)[0];

    if (INFORMACION_ARCHIVO) {
      const EXTENSION_ARCHIVO = INFORMACION_ARCHIVO.name.split('.').pop()?.toLowerCase();
      if (EXTENSION_ARCHIVO !== this.PDF.toLowerCase()) {
        this.toastr.error(MensajesDocumentos.ONLYPDF);
        fileInput.value = '';
        return;
      }

      const TAMANIO_REQUERIDO: number = 10 * 1048576;
      const TAMANIO_ARCHIVO: number = INFORMACION_ARCHIVO.size;
      if (TAMANIO_ARCHIVO > TAMANIO_REQUERIDO) {
        this.toastr.error(MensajesDocumentos.MAXSIZE);
        fileInput.value = '';
        return;
      }
      this.listadoArchivos.push({
        name: INFORMACION_ARCHIVO.name,
        id,
        archivo: INFORMACION_ARCHIVO,
        ruta: URL.createObjectURL(INFORMACION_ARCHIVO),
        cargado: false,
        tipo,
        mensaje: '',
        estatus: 'Pendiente'
      });
    }
  }

  existePreview(id: any): boolean {
    const ENCONTRADO = this.listadoArchivos.find(f => f.id === id);
    return ENCONTRADO !== undefined;
  }

  uploadFiles(informacionArchivo: any): Promise<any> {
    return new Promise((resolve) => {
      this.subirDocumentoService.subirDocumento(this.token, informacionArchivo).subscribe({
        next: () => resolve({ cargado: true, mensaje: 'Correcto', estatus: 'OK' }),
        error: (_error): void => resolve({ cargado: false, mensaje: 'Error al cargar', estatus: 'Error al cargar' })
      });
    });
  }

  /**
   * Convierte kilobytes a megabytes.
   * @param {number} kilobytes - El tamaño en kilobytes.
   * @returns {number} El tamaño en megabytes.
   */
  // eslint-disable-next-line class-methods-use-this
  convertirKilobytesAMegabytes(kilobytes: number): number {
    return Math.round(kilobytes / 1024);
  }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   * @returns {void}
   * @param id
   */
  verPdf(id: number): void {
    const RUTA = this.listadoArchivos.find(f => f.id === id)?.ruta;
    const ESTADO_INICIAL: ModalOptions = {
      initialState: {
        ruta: RUTA ? RUTA.toString() : '',
        title: 'Vista previa documento'
      }
    };
    this.bsModalRef = this.modalService.show(PreviewDocumentoComponent, ESTADO_INICIAL);
  }

  /**
   * Abre el modal para confirmar la carga de documentos
   */
  confirmUpload(): void {
    const ESTADO_INICIAL: ModalOptions = {
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
    this.modalRef = this.modalService.show(ModalConfirmarComponent, ESTADO_INICIAL);
    if (this.modalRef?.onHide) {
      this.subscription.push(
        this.modalRef.onHide.subscribe((response: boolean | string) => {
          if (typeof response === 'boolean' && response) {
            this.cargarDocumentos = true;
            this.archivosCargando.obligatorios = this.listadoArchivos.filter(f => f.tipo === 'obligatorio');
            this.archivosCargando.opcionales = this.listadoArchivos.filter(f => f.tipo === 'opcional');
            this.cargarArchivos(this.archivosCargando.obligatorios);
            this.cargarArchivos(this.archivosCargando.opcionales);
            this.cargaRealizada.emit(this.cargarDocumentos);
          }
        })
      );
    }
  }

  limpiarFile(item: Catalogo, tipo: string): void {
    let FILE_INPUT: HTMLInputElement | null = null;
    if (tipo === 'obligatorios') {
      FILE_INPUT = document.getElementById(`formFile${item.id}`) as HTMLInputElement;
    } else if (tipo === 'opcionales') {
      FILE_INPUT = document.getElementById(`formFileOpcionales${item.id}`) as HTMLInputElement;
    }

    if (FILE_INPUT) {
      FILE_INPUT.value = ''; // Limpia el archivo seleccionado
    }

    const INDEX_ARCHIVO: number = this.listadoArchivos.findIndex(f => f.id === item.id);
    if (INDEX_ARCHIVO !== -1) {
      this.listadoArchivos.splice(INDEX_ARCHIVO, 1);
    }
  }

  agregarParte(item: Catalogo, origen: string): void {
    if (origen === 'obligatorios') {
      const INDICE: number = this.catalogoDocumentos.findIndex(doc => doc.id === item.id);
      if (INDICE !== -1) {
        const NUEVO_ID: number = (this.catalogoDocumentos[INDICE]?.adicionales?.length ?? 0) + 1;
        const PARTE_DOCUMENTO: any = {
          id: `${item.id}-${NUEVO_ID}`,
          descripcion: item.descripcion,
          clave: item.clave,
          tam: item.tam,
          dpi: item.dpi,
          nuevo: true,
          uniqueId: crypto.randomUUID()
        };
        this.catalogoDocumentos[INDICE].adicionales?.push(PARTE_DOCUMENTO);
      }
    } else {
      const INDICE: number = this.listDocOpcionales.findIndex(doc => doc.id === item.id);
      if (INDICE !== -1) {
        const NUEVO_ID: number = (this.listDocOpcionales[INDICE]?.adicionales?.length ?? 0) + 1;
        const PARTE_DOCUMENTO: any = {
          id: `${item.id}-${NUEVO_ID}`,
          descripcion: item.descripcion,
          clave: item.clave,
          tam: item.tam,
          dpi: item.dpi,
          nuevo: true,
          uniqueId: crypto.randomUUID()
        };
        this.listDocOpcionales[INDICE].adicionales?.push(PARTE_DOCUMENTO);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  convertKbToMb(size: string | undefined): string {
    if (size === undefined) {
      return '0';
    }
    return String((parseInt(size, 10) / 1000).toFixed(2));
  }

  agregarOpcionales(): void {    
    this.listDocOpcionalesAgregar.forEach((doc: number) => {
     
      const INDICE = this.listDocOpcionales.findIndex((f: Catalogo) => f.id === doc);
      if (INDICE === -1) {
        const OPCIONAL = {
          ...this.archivosOpcionales.find(f => f.id === doc),
          adicionales: []
        };
        this.listDocOpcionales.push(OPCIONAL);
        const INDICE_OPCIONAL = this.archivosOpcionales.findIndex(f => f.id === doc);
        if (INDICE_OPCIONAL !== -1) {
          this.archivosOpcionales[INDICE_OPCIONAL] = {
            ...this.archivosOpcionales[INDICE_OPCIONAL]
          };
        }
        this.listDocOpcionalesDuplicado = this.listDocOpcionales.map(op => op.id);
      }
    });

    this.documentosStore.establecerCatalogoDocumentos(this.listDocOpcionales);
  }

  async cargarArchivos(archivosCargando: any[]): Promise<void> {
    for (const ARCHIVO of archivosCargando) {
      const DATA = await this.uploadFiles(ARCHIVO.archivo);
      ARCHIVO.mensaje = DATA.mensaje;
      ARCHIVO.cargado = true;
      ARCHIVO.estatus = 'cargado';
    }
  }

  eliminarOpcional(item: Catalogo): void {
    const INDICE: number = this.listDocOpcionales.findIndex(f => f.id === item.id);
    if (INDICE !== -1) {
      if (this.listDocOpcionales[INDICE].adicionales?.length > 0) {
        this.listDocOpcionales[INDICE].adicionales.forEach((adicional: any) => {
          const INDICE_LISTADO: number = this.listadoArchivos.findIndex(f => f.id === adicional.id);
          this.listadoArchivos.splice(INDICE_LISTADO, 1);
        });
      }
      const INDICE_LISTADO: number = this.listadoArchivos.findIndex(f => f.id === item.id);
      this.listadoArchivos.splice(INDICE_LISTADO, 1);

      this.listDocOpcionales.splice(INDICE, 1);
      this.listDocOpcionalesDuplicado = this.listDocOpcionales.map(op => op.id);
    }
    const INDICE_AGREGAR: number = this.listDocOpcionalesAgregar.findIndex(id => id === item.id);
    if (INDICE_AGREGAR !== -1) {
      this.listDocOpcionalesAgregar.splice(INDICE_AGREGAR, 1);
      this.listDocOpcionalesAgregar = [...this.listDocOpcionalesAgregar];
    }
    this.cdr.detectChanges();
  }

  eliminarNuevo(item: any, adicional = false): void {
    if (adicional) {
      const INDICE_ADICIONAL = item.item.adicionales.findIndex((adicional: any) => adicional.id === item.adicional.id);
      item.item.adicionales.splice(INDICE_ADICIONAL, 1);
      const INDICE: number = this.listadoArchivos.findIndex(f => f.id === item.id);
      this.listadoArchivos.splice(INDICE, 1);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['catalogoDocumentos']) {
      this.catalogoDocumentos = this.catalogoDocumentos.map(item => ({
        ...item,
        adicionales: []
      }));
    }

    if (changes['catalogoDocumentosOpcionales']) {     
      this.archivosOpcionales = this.catalogoDocumentosOpcionales.map(item => ({
        ...item,
        adicionales: []
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
