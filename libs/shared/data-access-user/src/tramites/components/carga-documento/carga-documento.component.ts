import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  Documento,
  DocumentosParaCargar,
  TipoDocumentos,
} from '../../../core/models/shared/anexar-documentos.model';
import {
  DocumentosState,
  DocumentosStore,
} from '../../../core/estados/documentos.store';
import {
  ESTATUS_CARGA_DOCUMENTO,
  MENSAJES_DOCUMENTOS,
  MENSAJES_MODAL,
  OPCIONAL,
  UNIDADES_DOCUMENTOS,
} from '../../../core/enums/mensajes-documentos.enum';
import {
  Notificacion,
  NotificacionesComponent,
} from '../notificaciones/notificaciones.component';
import { CatalogoDocumentosService } from '../../../core/services/shared/catalogos/catalogo-documentos.service';
import { CommonModule } from '@angular/common';
import { DocumentosQuery } from '../../../core/queries/documentos.query';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'carga-documento',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, NotificacionesComponent],
  templateUrl: './carga-documento.component.html',
  styleUrl: './carga-documento.component.scss',
})
export class CargaDocumentoComponent implements OnInit, OnChanges {
  /**
   * @description ID del tipo de trámite.
   * @type {string}
   */
  @Input() idTipoTRamite: string = '';

  /**
   * @description ID de la solicitud.
   * @type {string}
   */
  @Input() idSolicitud: string = '';

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

  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

  /**
   * Referencia inyectada para gestionar la destrucción del componente y terminar las suscripciones.
   * @type {DestroyRef}
   */
  private destroyRef$ = inject(DestroyRef);

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

  catalogoDocumentosObligatorios: TipoDocumentos[] = [];
  catalogoDocumentosOpcionales: TipoDocumentos[] = [];

  /**
   * @description Objeto para almacenar el documento seleccionado.
   * @type {TipoDocumentos}
   */
  documentoSeleccionado!: TipoDocumentos;

  /**
   * @description Arreglo para almacenar los documentos para cargar.
   * @type {DocumentosParaCargar[]}
   */
  listadoArchivos: DocumentosParaCargar[] = [];

  /**
   * @description Arreglo para almacenar los documentos opcionales duplicados.
   */
  documentosOpcionalesSeleccionados: TipoDocumentos[] = [];

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
    opcionales: [],
  };

  /**
   * @description Variable para controlar la visibilidad de la sección de carga de archivos.
   * @type {boolean}
   */
  mostrarSeccionCargaArchivos: boolean = true;

  /**
   * @description Arreglo para almacenar los documentos opcionales agregados.
   * @type {number[]}
   */
  listDocOpcionalesAgregar: number[] = [];

  /**
   * @description Estado de los documentos.
   * @type {DocumentosState}
   */
  private documentosState!: DocumentosState;

  /**
   * @description Referencia a la notificación.
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;

  constructor(
    private documentosQuery: DocumentosQuery,
    private documentosStore: DocumentosStore,
    private cdr: ChangeDetectorRef,
    private catalogoDocumentosService: CatalogoDocumentosService
  ) { }

  ngOnInit(): void {
    this.documentosQuery.selectDocumentoState$
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        map((documentosState) => {
          this.documentosState = documentosState;
        })
      )
      .subscribe();

    this.documentosOpcionalesSeleccionados =
      this.documentosState.catalogoDocumentosRequeridos.length > 0
        ? this.documentosState.catalogoDocumentosRequeridos
        : [];

    this.cargaArchivosEvento
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        map(() => this.confirmUpload())
      )
      .subscribe();

    this.regresarSeccionCargarDocumentoEvento
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        map(() => this.mostrarSeccionCargaArchivosAccion())
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTipoTRamite'] && this.idTipoTRamite) {
      if (this.idTipoTRamite === '130118') {
        this.getDocumentosDesdeSolicitud130118();
        this.getDocumentosDesdeSolicitud130118Opcionales();
      } else {
        this.getListaDocumentoObligatorios();
        this.getListaDocumentoOpcionales();
      }
    }
  }

  /**
   * Obtiene la lista de documentos obligatorios para el trámite.
   * @description Esta función realiza una llamada al servicio de documentos para obtener la lista de documentos obligatorios
   * @returns {void} No retorna nada.
   */
  getListaDocumentoObligatorios(): void {
    this.catalogoDocumentosService
      .getDocumentosObligatorios(this.idTipoTRamite, { especifico: false })
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        map((response) => {
          response.datos.documento_tramite.forEach((documento: Documento) => {
            if (documento.tipo_documento) {
              this.catalogoDocumentosObligatorios.push({
                ...documento.tipo_documento,
                adicionales: [],
                cargado: false,
              });
            }
          });
        })
      )
      .subscribe(() => {
        // Validar estado inicial después de cargar documentos obligatorios
        this.actualizarEstadoBotonCargarArchivos();
      });
  }

  /**
   * Obtiene la lista de documentos opcionales para el trámite.
   * @description Esta función realiza una llamada al servicio de documentos para obtener la lista de documentos opcionales
   * @return {void} No retorna nada.
   */
  getListaDocumentoOpcionales(): void {
    const TRAMITE = '5701';
    this.catalogoDocumentosService
      .getDocumentosObligatorios(TRAMITE, { especifico: true })
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        map((response) => {
          response.datos.documento_tramite.forEach((documento: Documento) => {
            if (documento.tipo_documento) {
              this.catalogoDocumentosOpcionales.push({
                ...documento.tipo_documento,
                adicionales: [],
                cargado: false,
              });
            }
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene los documentos desde la solicitud 130118.
   * @description Esta función realiza una llamada al servicio de documentos para obtener los documentos obligatorios y opcionales de la solicitud 130118.
   * @returns {void} No retorna nada.
   */
  getDocumentosDesdeSolicitud130118(): void {
    const ESPECIFICO = true;
    this.catalogoDocumentosService
      .getDocumentosSolicitud130118(ESPECIFICO)
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (response) => {
          this.catalogoDocumentosObligatorios = response.datos.documento_tramite.map((doc) => ({
            ...doc.tipo_documento,
            adicionales: [],
            cargado: false,
          }));
          
          // Validar estado inicial después de cargar documentos 130118
          this.actualizarEstadoBotonCargarArchivos();
        },
        error: (err) => {
          console.error('Error obteniendo documentos desde 130118', err);
        }
      });
  }

  /**
   * Obtiene los documentos opcionales desde la solicitud 130118.
   * @description Esta función realiza una llamada al servicio de documentos para obtener los documentos opcionales de la solicitud 130118.
   * @returns {void} No retorna nada.
   */
  getDocumentosDesdeSolicitud130118Opcionales(): void {
    const ESPECIFICO = false;
    this.catalogoDocumentosService
      .getDocumentosSolicitud130118(ESPECIFICO)
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: (response) => {
          this.catalogoDocumentosOpcionales = response.datos.documento_fraccion.map((doc) => ({
            ...doc.tipo_documento,
            adicionales: [],
            cargado: false,
          }));
        },
        error: (err) => {
          console.error('Error obteniendo documentos desde 130118', err);
        }
      });
  }

  /**
   * Maneja la carga de un documento.
   * @param {Event} event - El evento de carga del archivo.
   * @param fileInput file proveniente del input
   * @param id del catalog de documentos a cargar
   * @param tipo de documento que se está agregando obligatorio u opcional
   */
  cargarDoc(
    event: Event,
    fileInput: HTMLInputElement,
    id: number,
    tipo: string
  ): void {
    const ARCHIVO = event.target as HTMLInputElement;
    const INFORMACION_ARCHIVO = (ARCHIVO.files as FileList)[0];

    if (INFORMACION_ARCHIVO) {
      const EXTENSION_ARCHIVO = INFORMACION_ARCHIVO.name
        .split('.')
        .pop()
        ?.toLowerCase();
      if (EXTENSION_ARCHIVO !== UNIDADES_DOCUMENTOS.PDF.toLowerCase()) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          modo: '',
          titulo: '',
          mensaje: MENSAJES_DOCUMENTOS.ONL_YPDF,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
        fileInput.value = '';
        return;
      }

      // Buscar el documento tanto en catálogos principales como en adicionales
      const DOCUMENTO_ENCONTRADO = this.encontrarDocumento(id);
      
      if (DOCUMENTO_ENCONTRADO) {
        this.documentoSeleccionado = DOCUMENTO_ENCONTRADO;
      } else {
        // Fallback al método anterior si no se encuentra
        this.documentoSeleccionado =
          tipo === OPCIONAL
            ? (this.catalogoDocumentosOpcionales.find(
              (doc) => doc.id_tipo_documento === id
            ) as TipoDocumentos)
            : (this.catalogoDocumentosObligatorios.find(
              (doc) => doc.id_tipo_documento === id
            ) as TipoDocumentos);
      }

      if (!this.documentoSeleccionado) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          modo: '',
          titulo: '',
          mensaje: 'No se pudo encontrar la configuración del documento',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
        fileInput.value = '';
        return;
      }

      const TAMANIO_REQUERIDO: number =
        CargaDocumentoComponent.convertirMbaBytes(
          this.documentoSeleccionado.tamanio_maximo
        );


      const TAMANIO_ARCHIVO: number = INFORMACION_ARCHIVO.size;

      if (TAMANIO_ARCHIVO > TAMANIO_REQUERIDO) {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          modo: '',
          titulo: '',
          mensaje: MENSAJES_DOCUMENTOS.MAX_SIZE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
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
        estatus: 'Pendiente',
      });

      // Actualizar estado del botón después de cargar archivo
      this.actualizarEstadoBotonCargarArchivos();
    }
  }

  /**
   * Agrega una parte adicional a un documento.
   * @param {CatalogoDocumento} item - El documento al que se le agregará la parte.
   * @param {string} origen - El origen del documento (obligatorios u opcionales).
   * @returns {void}
   */
  agregarParte(item: TipoDocumentos, origen: string): void {
    if (origen === 'obligatorios') {
      const INDICE: number = this.catalogoDocumentosObligatorios.findIndex(
        (doc) => doc.id_tipo_documento === item.id_tipo_documento
      );
      if (INDICE !== -1) {
        // Inicializar adicionales si no existe
        if (!this.catalogoDocumentosObligatorios[INDICE].adicionales) {
          this.catalogoDocumentosObligatorios[INDICE].adicionales = [];
        }
        
        const NUEVO_ID: number =
          (this.catalogoDocumentosObligatorios[INDICE]?.adicionales?.length ??
            0) + 1;

        const PARTE_DOCUMENTO: TipoDocumentos = {
          id_tipo_documento: parseInt(
            `${item.id_tipo_documento}0${NUEVO_ID}`,
            10
          ),
          tipo_documento: item.tipo_documento,
          tamanio_maximo: item.tamanio_maximo,
          ide_rango_resolucion_imagen: item.ide_rango_resolucion_imagen,
          // nuevo: true,
          // uniqueId: crypto.randomUUID()
        };
        this.catalogoDocumentosObligatorios[INDICE].adicionales?.push(
          PARTE_DOCUMENTO
        );
      }
    } else {
      const INDICE: number = this.documentosOpcionalesSeleccionados.findIndex(
        (doc) => doc.id_tipo_documento === item.id_tipo_documento
      );
      if (INDICE !== -1) {
        // Inicializar adicionales si no existe
        if (!this.documentosOpcionalesSeleccionados[INDICE].adicionales) {
          this.documentosOpcionalesSeleccionados[INDICE].adicionales = [];
        }
        
        const NUEVO_ID: number =
          (this.documentosOpcionalesSeleccionados[INDICE]?.adicionales
            ?.length ?? 0) + 1;
        const PARTE_DOCUMENTO: TipoDocumentos = {
          id_tipo_documento: parseInt(
            `${item.id_tipo_documento}0${NUEVO_ID}`,
            10
          ),
          tipo_documento: item.tipo_documento,
          tamanio_maximo: item.tamanio_maximo,
          ide_rango_resolucion_imagen: item.ide_rango_resolucion_imagen,
          // nuevo: true,
          // uniqueId: crypto.randomUUID()
        };
        this.documentosOpcionalesSeleccionados[INDICE].adicionales?.push(
          PARTE_DOCUMENTO
        );
      }
    }
    
    // Forzar detección de cambios y actualizar estado del botón después de agregar una parte
    this.cdr.detectChanges();
    this.actualizarEstadoBotonCargarArchivos();
  }

  /**
   * Valida que todos los documentos obligatorios estén completos, incluyendo sus partes adicionales.
   * @returns {boolean} `true` si todos los documentos obligatorios están cargados, de lo contrario `false`.
   */
  private validarDocumentosObligatoriosCompletos(): boolean {
    return this.catalogoDocumentosObligatorios.every((doc) => {
      // Verificar documento principal
      const DOCUMENTO_PRINCIPAL_CARGADO = this.listadoArchivos.some(
        (archivo) => archivo.id === doc.id_tipo_documento && archivo.archivo
      );
      
      if (!DOCUMENTO_PRINCIPAL_CARGADO) {
        return false;
      }

      // Verificar partes adicionales si las hay
      if (doc.adicionales && doc.adicionales.length > 0) {
        return doc.adicionales.every((adicional) => {
          return this.listadoArchivos.some(
            (archivo) => archivo.id === adicional.id_tipo_documento && archivo.archivo
          );
        });
      }

      return true;
    });
  }

  /**
   * Encontrar un documento por ID en catalogos principales o adicionales.
   * @param {number} id - El ID del documento a buscar.
   * @returns {TipoDocumentos | null} El documento encontrado o null.
   */
  private encontrarDocumento(id: number): TipoDocumentos | null {
    // Buscar en documentos obligatorios principales
    const DOC_OBLIGATORIO = this.catalogoDocumentosObligatorios.find(
      (doc) => doc.id_tipo_documento === id
    );
    if (DOC_OBLIGATORIO) {
      return DOC_OBLIGATORIO;
    }

    // Buscar en documentos adicionales de obligatorios
    for (const DOC of this.catalogoDocumentosObligatorios) {
      if (DOC.adicionales) {
        const ADICIONAL = DOC.adicionales.find(
          (add) => add.id_tipo_documento === id
        );
        if (ADICIONAL) {
          return ADICIONAL;
        }
      }
    }

    // Buscar en documentos opcionales principales
    const DOC_OPCIONAL = this.documentosOpcionalesSeleccionados.find(
      (doc) => doc.id_tipo_documento === id
    );
    if (DOC_OPCIONAL) {
      return DOC_OPCIONAL;
    }

    // Buscar en documentos adicionales de opcionales
    for (const DOC of this.documentosOpcionalesSeleccionados) {
      if (DOC.adicionales) {
        const ADICIONAL = DOC.adicionales.find(
          (add) => add.id_tipo_documento === id
        );
        if (ADICIONAL) {
          return ADICIONAL;
        }
      }
    }

    return null;
  }

  /**
   * Actualiza el estado del botón "Cargar archivos" basado en la validación completa de documentos obligatorios.
   * Debe llamarse después de cualquier operación que modifique los documentos (agregar, eliminar, limpiar).
   * @returns {void}
   */
  private actualizarEstadoBotonCargarArchivos(): void {
    const TODOS_OBLIGATORIOS_COMPLETOS = this.validarCompletitudDocumentosObligatorios();
    this.activarBotonCargaArchivos.emit(TODOS_OBLIGATORIOS_COMPLETOS);
  }

  /**
 * Verifica si todos los documentos obligatorios han sido cargados
 * @returns true si todos los docs están listos, false en caso contrario
 */
private validarCompletitudDocumentosObligatorios(): boolean {
  // Si no hay documentos configurados, no podemos continuar
  if (!this.catalogoDocumentosObligatorios?.length) {
    return false;
  }

  // Revisamos cada documento obligatorio
  for (const DOCUMENTO of this.catalogoDocumentosObligatorios) {
    // Buscamos si este documento ya fue cargado
    const ARCHIVO_SUBIDO = this.listadoArchivos.find(
      archivo => archivo.id === DOCUMENTO.id_tipo_documento
    );
    
    // El documento principal debe estar cargado y sin errores
    if (!ARCHIVO_SUBIDO?.archivo || ARCHIVO_SUBIDO.estatus === 'Error') {
      return false;
    }

    // Si tiene partes adicionales, también las revisamos
    if (Array.isArray(DOCUMENTO.adicionales) && DOCUMENTO.adicionales.length > 0) {
      for (const PARTE_ADICIONAL of DOCUMENTO.adicionales) {
        const ARCHIVO_ADICIONAL = this.listadoArchivos.find(
          archivo => archivo.id === PARTE_ADICIONAL.id_tipo_documento
        );
        
        // Cada parte adicional también debe estar completa
        if (!ARCHIVO_ADICIONAL?.archivo || ARCHIVO_ADICIONAL.estatus === 'Error') {
          return false;
        }
      }
    }
  }

  // Si llegamos hasta aquí, todo está en orden
  return true;
}

  /**
   * Verifica si un archivo ya existe en la lista de archivos cargados.
   * @param {number} id - El ID del archivo a verificar.
   * @returns {boolean} `true` si el archivo ya existe, de lo contrario `false`.
   */
  existePreview(id: number): boolean {
    const ENCONTRADO = this.listadoArchivos.find((f) => f.id === id);
    return ENCONTRADO !== undefined;
  }

  /**
   * Limpia el archivo seleccionado y lo elimina de la lista de archivos.
   * @param {CatalogoDocumento} item - El documento a limpiar.
   * @param {string} tipo - El tipo de documento (obligatorio u opcional).
   * @returns {void}
   */
  limpiarFile(item: TipoDocumentos, tipo: string): void {
    let FILE_INPUT: HTMLInputElement | null = null;
    if (tipo === 'obligatorios') {
      FILE_INPUT = document.getElementById(
        `formFile${item.id_tipo_documento}`
      ) as HTMLInputElement;
    } else if (tipo === 'opcionales') {
      FILE_INPUT = document.getElementById(
        `formFileOpcionales${item.id_tipo_documento}`
      ) as HTMLInputElement;
    }

    if (FILE_INPUT) {
      FILE_INPUT.value = ''; // Limpia el archivo seleccionado
    }

    const INDEX_ARCHIVO: number = this.listadoArchivos.findIndex(
      (f) => f.id === item.id_tipo_documento
    );
    if (INDEX_ARCHIVO !== -1) {
      this.listadoArchivos.splice(INDEX_ARCHIVO, 1);
    }

    // Actualizar estado del botón después de limpiar archivo
    this.actualizarEstadoBotonCargarArchivos();
  }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   * @returns {void}
   * @param id
   */
  verPdf(id: number): void {
    const RUTA = this.listadoArchivos.find((f) => f.id === id)?.ruta;
    this.limpiarNotificacion();
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'pdf',
      titulo: 'Vista previa documento',
      mensaje: RUTA ? RUTA.toString() : '',
      cerrar: false,
      txtBtnAceptar: 'Cargar archivos',
      txtBtnCancelar: 'Cerrar',
      tamanioModal: 'modal-lg',
    };
  }

  limpiarNotificacion(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: '',
      categoria: '',
      modo: '',
      titulo: '',
      mensaje: '',
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
      tamanioModal: '',
    };
  }

  confirmarCargaArchivos(acepta: boolean): void {
    if (acepta) {
      this.cargarDocumentos = true;
      this.mostrarSeccionCargaArchivos = false;
      this.archivosCargando.obligatorios = this.listadoArchivos.filter(
        (f) => f.tipo === 'obligatorio'
      );
      this.archivosCargando.opcionales = this.listadoArchivos.filter(
        (f) => f.tipo === 'opcional'
      );
      this.cargarArchivos(this.archivosCargando.obligatorios);
      this.cargarArchivos(this.archivosCargando.opcionales);
      this.cargaRealizada.emit(this.cargarDocumentos);
    }
  }

  /**
   * Agrega documentos opcionales a la lista de documentos opcionales.
   * @returns {void}
   * @description Esta función recorre la lista de documentos opcionales a agregar y verifica si ya existen en la lista de documentos opcionales.
   */
  agregarOpcionales(): void {
    this.listDocOpcionalesAgregar.forEach((doc: number) => {
      const INDICE = this.documentosOpcionalesSeleccionados.findIndex(
        (f: TipoDocumentos) => f.id_tipo_documento === doc
      );
      if (INDICE === -1) {
        const OPCIONAL = this.catalogoDocumentosOpcionales.find(
          (f) => f.id_tipo_documento === doc
        ) as TipoDocumentos;

        this.documentosOpcionalesSeleccionados.push(OPCIONAL);
        const INDICE_OPCIONAL = this.catalogoDocumentosOpcionales.findIndex(
          (f) => f.id_tipo_documento === doc
        );
        if (INDICE_OPCIONAL !== -1) {
          this.catalogoDocumentosOpcionales[INDICE_OPCIONAL] = {
            ...this.catalogoDocumentosOpcionales[INDICE_OPCIONAL],
          };
        }
      }
    });

    this.documentosStore.establecerCatalogoDocumentos(
      this.documentosOpcionalesSeleccionados
    );
    this.listDocOpcionalesAgregar = [];

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
      const INDICE_ADICIONAL = item.item.adicionales.findIndex(
        (adicional: TipoDocumentos) =>
          adicional.id_tipo_documento === item.adicional.id_tipo_documento
      );
      
      if (INDICE_ADICIONAL !== -1) {
        // Eliminar del array de adicionales
        item.item.adicionales.splice(INDICE_ADICIONAL, 1);
        
        // Eliminar archivo de la lista si existe
        const INDICE_ARCHIVO: number = this.listadoArchivos.findIndex(
          (f) => f.id === item.adicional.id_tipo_documento
        );
        if (INDICE_ARCHIVO !== -1) {
          this.listadoArchivos.splice(INDICE_ARCHIVO, 1);
        }
      }

      // Forzar detección de cambios y actualizar estado del botón
      this.cdr.detectChanges();
      this.actualizarEstadoBotonCargarArchivos();
    }
  }

  /**
   * Elimina un documento opcional de la lista de documentos opcionales.
   * @param {CatalogoDocumento} item - El documento a eliminar.
   * @returns {void}
   */
  eliminarOpcional(item: TipoDocumentos): void {
    const INDICE: number = this.documentosOpcionalesSeleccionados.findIndex(
      (f) => f.id_tipo_documento === item.id_tipo_documento
    );
    if (INDICE !== -1) {
      if (
        this.documentosOpcionalesSeleccionados[INDICE] &&
        this.documentosOpcionalesSeleccionados[INDICE].adicionales
      ) {
        this.documentosOpcionalesSeleccionados[INDICE]?.adicionales?.forEach(
          (adicional: TipoDocumentos) => {
            const INDICE_LISTADO: number = this.listadoArchivos.findIndex(
              (f) => f.id === adicional.id_tipo_documento
            );
            this.listadoArchivos.splice(INDICE_LISTADO, 1);
          }
        );
      }

      const INDICE_LISTADO: number = this.listadoArchivos.findIndex(
        (f) => f.id === item.id_tipo_documento
      );
      this.listadoArchivos.splice(INDICE_LISTADO, 1);

      this.documentosOpcionalesSeleccionados.splice(INDICE, 1);
    }
    const INDICE_AGREGAR: number = this.listDocOpcionalesAgregar.findIndex(
      (id) => id === item.id_tipo_documento
    );
    if (INDICE_AGREGAR !== -1) {
      this.listDocOpcionalesAgregar.splice(INDICE_AGREGAR, 1);
      this.listDocOpcionalesAgregar = [...this.listDocOpcionalesAgregar];
    }
    this.cdr.detectChanges();

    // Actualizar estado del botón después de eliminar documento opcional
    this.actualizarEstadoBotonCargarArchivos();
  }

  static convertirKbaBytes(size: number | undefined): number {
    if (size === undefined) {
      return 0;
    }
    return size * 1000;
  }

  static convertirMbaBytes(size: number | undefined): number {
    if (size === undefined) {
      return 0;
    }
    return size * 1024 * 1024;
  }

  /**
   * Abre el modal para confirmar la carga de documentos
   */
  confirmUpload(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'html',
      titulo: 'Carga de archivos',
      mensaje: MENSAJES_MODAL.INFORMACION_SUBIR_DOCUMENTOS,
      cerrar: false,
      txtBtnAceptar: 'Cargar archivos',
      txtBtnCancelar: 'Cerrar',
      tamanioModal: 'modal-lg',
    };
  }

  /**
   * Muestra la sección de carga de archivos y emite un evento para activar el botón de carga de archivos.
   * @returns {void}
   */
  mostrarSeccionCargaArchivosAccion(): void {
    this.mostrarSeccionCargaArchivos = true;
    const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(
      (item) => item.cargado === true
    );

    this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
    this.cargaRealizada.emit(false);
  }

  /**
   * Carga los archivos seleccionados.
   * @param {any[]} archivosCargando - Lista de archivos a cargar.
   * @returns {Promise<void>} Promesa que se resuelve cuando la carga se completa.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, require-await
  async cargarArchivos(archivosCargando: any[]): Promise<void> {
    for (const ARCHIVO of archivosCargando) {
      // const DATA = await this.uploadFiles(ARCHIVO.archivo);  TODO: Descomentar cuando funcione el API de cargar documento
      ARCHIVO.cargado = true;
      ARCHIVO.estatus = 'cargado';
    }
  }
}
