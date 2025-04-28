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

import { CatalogoDocumento } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { DocumentosCargados } from '../../../core/models/shared/components.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { Login } from '../../../core/models/shared/inicio-sesion.model';
import { ESTATUS_CARGA_DOCUMENTO, MENSAJES_DOCUMENTOS, UNIDADES_DOCUMENTOS } from '../../../core/enums/mensajes-documentos.enum';
import { ModalConfirmarComponent } from '../modal-confirmar/modal-confirmar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  PreviewDocumentoComponent
} from '../preview-documento/preview-documento.component';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';

import { DocumentosState, DocumentosStore } from '../../../core/estados/documentos.store';
import { DocumentosQuery } from '../../../core/queries/documentos.query';

import { Notificacion, NotificacionesComponent } from '../notificaciones/notificaciones.component';

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
  imports: [CommonModule, ReactiveFormsModule, ToastrModule, ModalModule, NgSelectModule, FormsModule, NotificacionesComponent],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss'
})
export class AnexarDocumentosComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * @description Catalogo de documentos obligatorios.
   * @type {CatalogoDocumento[]}
   */
  @Input() catalogoDocumentos: CatalogoDocumento[] = [];

  /**
   * @description Catalogo de documentos opcionales.
   * @type {CatalogoDocumento[]}
   */
  @Input() catalogoDocumentosOpcionales: CatalogoDocumento[] = [];

  /**
   * @description Evento para cargar archivos.
   * @type {EventEmitter<void>}
   */
  @Input() cargaArchivosEvento!: EventEmitter<void>;

  /**
   * @description Evento para regresar a la sección de carga de documentos.
   * @type {EventEmitter<void>}
   */
  @Input() regresarSeccionCargarDocumentoEvento!: EventEmitter<void>;

  /**
   * @description Evento para indicar que la carga de documentos se ha realizado.
   * @type {EventEmitter<boolean>}
   */
  @Output() cargaRealizada = new EventEmitter<boolean>();

  /**
   * @description Evento para activar el botón de carga de archivos.
   * @type {EventEmitter<boolean>}
   */
  @Output() activarBotonCargaArchivos = new EventEmitter<boolean>();

  /**
   * @description Lista de referencias a los elementos del DOM con la etiqueta 'fileInput'.
   * Utilizada para gestionar múltiples inputs de archivo en el componente.
   * @type {QueryList<ElementRef>}
   */
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;



  /**
   * @description Arreglo de suscripciones para gestionar y limpiar observables en el componente.
   * @type {Subscription[]}
   */
  subscription: Subscription[] = [];

  /**
   * @description Formulario reactivo para gestionar la carga de documentos.
   * @type {FormGroup}
   */
  documentoForma!: FormGroup;


  /**
   * @description Constantes para la unidad del tamaño de los archivos.
   * @type {string}
   */
  readonly MB = UNIDADES_DOCUMENTOS.MB;

  /**
   * @description Constantes para la unidad de DPI.
   * @type {string}
   */
  readonly DPI = UNIDADES_DOCUMENTOS.DPI;

  /**
   * @description Estatus de la carga del documento
   * @type {string}
   */

  readonly ESTATUS_CARGA_DOCUMENTO = ESTATUS_CARGA_DOCUMENTO;

  /**
   * @description Tamaño máximo permitido para los archivos en megabytes.
   */
  tamMaximo = 0;

  /**
   * @description Arreglo para almacenar los documentos cargados.
   * @type {DocumentosCargados[]}
   */
  documentosCargados: DocumentosCargados[] = [];

  /**
   * @description Objeto para almacenar el documento seleccionado.
   * @type {CatalogoDocumento}
   */
  documentoSeleccionado!: CatalogoDocumento;



  /**
   *@description Variable que almacena el identificador o estado del modal.
   * Se utiliza para controlar la visibilidad o el contenido del modal en el componente.
   */
  modal = '';

  /**
   * @description Objeto para almacenar los datos de inicio de sesión.
   * @type {Login}
   */
  datosLogin: Login = {
    user: 'user1@example.com',
    password: 'clave1'
  };

  /**
   * @description VAriable para almacenar el token de autenticación.
   * @type {string}
   */
  token!: string;

  /**
   * @description Arreglo para almacenar los documentos opcionales agregados.
   * @type {number[]}
   */
  listDocOpcionalesAgregar: number[] = [];

  /**
   * @description Arreglo para almacenar los documentos para cargar.
   * @type {DocumentosParaCargar[]}
   */
  listadoArchivos: DocumentosParaCargar[] = [];

  /**
   * @description Arreglo para almacenar los documentos opcionales.
   * @type {CatalogoDocumento[]}
   */
  archivosOpcionales: CatalogoDocumento[] = [];

  /**
   * @description Arreglo para almacenar los documentos opcionales inicial.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  archivosOpcionalesOriginal: any[] = [];

  /**
   * @description Arreglo para almacenar los documentos opcionales duplicados.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listDocOpcionales: any[] = [];

  /**
   * @description Arreglo para almacenar los documentos opcionales duplicados.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listDocOpcionalesDuplicado: any[] = [];

  /**
   * @description Variable para almacenar el estado del modal de vista previa.
   * @type {BsModalRef}
   */
  bsModalRef?: BsModalRef;

  /**
   * @description Variable para almacenar el estado del modal de confirmación.
   * @type {BsModalRef}
   */
  modalRef?: BsModalRef;

  /**
   * @description Variable para almacenar el estado de la carga de documentos.
   * @type {boolean}
   */
  cargarDocumentos = false;

  /**
   * @description Objeto para almacenar los archivos que se están cargando.
   * @type {any}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  archivosCargando: any = {
    obligatorios: [],
    opcionales: []
  };

  /**
   * @description Variable para controlar la visibilidad de la sección de carga de archivos.
   * @type {boolean}
   */
  mostrarSeccionCargaArchivos: boolean = true;

  /**
   * @description Notificador utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * @description Estado de los documentos.
   * @type {DocumentosState}
   */
  private documentosState!: DocumentosState;

  public nuevaNotificacion!: Notificacion;

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

    this.regresarSeccionCargarDocumentoEvento
      .pipe(takeUntil(this.destroyNotifier$),
        map(() => this.mostrarSeccionCargaArchivosAccion())
      )
      .subscribe();
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

  /**
   * Crea el formulario reactivo para la carga de documentos.
   * @returns {void} Esta función no retorna ningún valor.
   */
  crearFormaDocumento(): void {
    this.documentoForma = this.fb.group({
      documento: ['', [Validators.required]]
    });
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
      if (EXTENSION_ARCHIVO !== UNIDADES_DOCUMENTOS.PDF.toLowerCase()) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          modo: '',
          titulo: '',
          mensaje: MENSAJES_DOCUMENTOS.ONLYPDF,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
        fileInput.value = '';
        return;
      }

      this.documentoSeleccionado = this.catalogoDocumentos.find(doc => doc.id === id) as CatalogoDocumento;
      console.log(this.documentoSeleccionado);


      const TAMANIO_REQUERIDO: number = AnexarDocumentosComponent.convertirKbaBytes(this.documentoSeleccionado.tam);

      console.log(TAMANIO_REQUERIDO);

      const TAMANIO_ARCHIVO: number = INFORMACION_ARCHIVO.size;
      console.log(TAMANIO_ARCHIVO);

      if (TAMANIO_ARCHIVO > TAMANIO_REQUERIDO) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          modo: '',
          titulo: '',
          mensaje: MENSAJES_DOCUMENTOS.MAXSIZE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
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

      const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

      this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
    }
  }

  /**
   * Verifica si un archivo ya existe en la lista de archivos cargados.
   * @param {any} id - El ID del archivo a verificar.
   * @returns {boolean} `true` si el archivo ya existe, de lo contrario `false`.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  existePreview(id: any): boolean {
    const ENCONTRADO = this.listadoArchivos.find(f => f.id === id);
    return ENCONTRADO !== undefined;
  }

  /**
   * Sube un archivo al servidor.
   * @param {any} informacionArchivo - Información del archivo a subir.
   * @returns {Promise<any>} Promesa que se resuelve cuando la carga se completa.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
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
            this.mostrarSeccionCargaArchivos = false;
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

  /**
   * Limpia el archivo seleccionado y lo elimina de la lista de archivos.
   * @param {CatalogoDocumento} item - El documento a limpiar.
   * @param {string} tipo - El tipo de documento (obligatorio u opcional).
   * @returns {void}
   */
  limpiarFile(item: CatalogoDocumento, tipo: string): void {
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

    const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

    this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
  }

  /**
   * Agrega una parte adicional a un documento.
   * @param {CatalogoDocumento} item - El documento al que se le agregará la parte.
   * @param {string} origen - El origen del documento (obligatorios u opcionales).
   * @returns {void}
   */
  agregarParte(item: CatalogoDocumento, origen: string): void {
    if (origen === 'obligatorios') {
      const INDICE: number = this.catalogoDocumentos.findIndex(doc => doc.id === item.id);
      if (INDICE !== -1) {
        const NUEVO_ID: number = (this.catalogoDocumentos[INDICE]?.adicionales?.length ?? 0) + 1;
        const PARTE_DOCUMENTO: CatalogoDocumento = {
          id: parseInt(`${item.id}0${NUEVO_ID}`, 10),
          descripcion: item.descripcion,
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
        const PARTE_DOCUMENTO: CatalogoDocumento = {
          id: parseInt(`${item.id}0${NUEVO_ID}`, 10),
          descripcion: item.descripcion,
          tam: item.tam,
          dpi: item.dpi,
          nuevo: true,
          uniqueId: crypto.randomUUID()
        };
        this.listDocOpcionales[INDICE].adicionales?.push(PARTE_DOCUMENTO);
      }
    }
  }

  /**
   * Convierte un tamaño en kilobytes a megabytes.
   * @param {string | undefined} size - El tamaño en kilobytes como cadena o indefinido.
   * @returns {string} El tamaño convertido a megabytes como cadena.
   */
  // eslint-disable-next-line class-methods-use-this
  convertKbToMb(size: string | undefined): string {
    if (size === undefined) {
      return '0';
    }
    return String((parseInt(size, 10) / 1000).toFixed(2));
  }

  static convertirKbaBytes(size: string | undefined): number {
    if (size === undefined) {
      return 0;
    }
    return (parseInt(size, 10) * 1000);
  }

  /**
   * Agrega documentos opcionales a la lista de documentos opcionales.
   * @returns {void}
   * @description Esta función recorre la lista de documentos opcionales a agregar y verifica si ya existen en la lista de documentos opcionales.
   */
  agregarOpcionales(): void {
    this.listDocOpcionalesAgregar.forEach((doc: number) => {

      const INDICE = this.listDocOpcionales.findIndex((f: CatalogoDocumento) => f.id === doc);
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

  /**
   * Carga los archivos seleccionados.
   * @param {any[]} archivosCargando - Lista de archivos a cargar.
   * @returns {Promise<void>} Promesa que se resuelve cuando la carga se completa.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  async cargarArchivos(archivosCargando: any[]): Promise<void> {
    for (const ARCHIVO of archivosCargando) {
      const DATA = await this.uploadFiles(ARCHIVO.archivo);
      ARCHIVO.mensaje = DATA.mensaje;
      ARCHIVO.cargado = false;
      ARCHIVO.estatus = 'cargado';
    }
  }

  /**
   * Elimina un documento opcional de la lista de documentos opcionales.
   * @param {CatalogoDocumento} item - El documento a eliminar.
   * @returns {void}
   */
  eliminarOpcional(item: CatalogoDocumento): void {
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

    const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

    this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
  }

  /**
   * Elimina un nuevo documento de la lista de documentos.
   * @param {any} item - El documento a eliminar.
   * @param {boolean} adicional - Indica si el documento es adicional.
   * @returns {void}
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  eliminarNuevo(item: any, adicional = false): void {
    if (adicional) {
      const INDICE_ADICIONAL = item.item.adicionales.findIndex((adicional: any) => adicional.id === item.adicional.id);
      item.item.adicionales.splice(INDICE_ADICIONAL, 1);
      const INDICE: number = this.listadoArchivos.findIndex(f => f.id === item.id);
      this.listadoArchivos.splice(INDICE, 1);

      const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

      this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
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

  /**
   * Muestra la sección de carga de archivos y emite un evento para activar el botón de carga de archivos.
   * @returns {void}
   */
  mostrarSeccionCargaArchivosAccion(): void {
    this.mostrarSeccionCargaArchivos = true;
    const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.cargado === true);

    this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
    this.cargaRealizada.emit(false);
  }

  aceptarModal(aceptar: boolean) {

  }
}
