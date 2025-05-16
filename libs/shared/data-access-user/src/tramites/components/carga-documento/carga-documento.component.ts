import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, ChangeDetectorRef, DestroyRef, inject, OnChanges, SimpleChanges } from '@angular/core';
import { Documento, DocumentosParaCargar, TipoDocumentos } from '../../../core/models/shared/anexar-documentos.model';
import { ESTATUS_CARGA_DOCUMENTO, MENSAJES_DOCUMENTOS, UNIDADES_DOCUMENTOS } from '../../../core/enums/mensajes-documentos.enum';
import { Notificacion, NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { CommonModule } from '@angular/common';
import { CatalogoDocumentosService } from '../../../core/services/shared/catalogos/catalogo-documentos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'carga-documento',
    standalone: true,
    imports: [CommonModule, FormsModule, NgSelectModule, NotificacionesComponent],
    templateUrl: './carga-documento.component.html',
    styleUrl: './carga-documento.component.scss',
})
export class CargaDocumentoComponent implements OnChanges {
    @Input() idTipoTRamite: string = '';
    @Input() tipoTramite: string = '';

    @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

    /**
 * Referencia inyectada para gestionar la destrucción del componente y terminar las suscripciones.
 * @type {DestroyRef}
 */
    private destroyRef = inject(DestroyRef)

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
        opcionales: []
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

    public nuevaNotificacion!: Notificacion;



    constructor(
        private cdr: ChangeDetectorRef,
        private catalogoDocumentosService: CatalogoDocumentosService,

    ) { }



    ngOnChanges(changes: SimpleChanges): void {
        if (changes['idTipoTRamite'] && this.idTipoTRamite) {
            this.getListaDocumentoObligatorios();
            this.getListaDocumentoOpcionales();
        }
    }

    getListaDocumentoObligatorios(): void {
        this.catalogoDocumentosService.getDocumentosObligatorios(this.idTipoTRamite, { especifico: false })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((response) => {
                    response.datos.documento_tramite.forEach((documento: Documento) => {
                        return documento.tipo_documento ? this.catalogoDocumentosObligatorios.push(documento.tipo_documento) : null;
                    });
                }))
            .subscribe();
    }

    getListaDocumentoOpcionales(): void {
        const TRAMITE = '5701';
        this.catalogoDocumentosService.getDocumentosObligatorios(TRAMITE, { especifico: true })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((response) => {
                    response.datos.documento_tramite.forEach((documento: Documento) => {
                        return documento.tipo_documento ? this.catalogoDocumentosOpcionales.push(documento.tipo_documento) : null;
                    });
                    console.log(this.catalogoDocumentosOpcionales);
                }))
            .subscribe();
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
                    mensaje: MENSAJES_DOCUMENTOS.ONL_YPDF,
                    cerrar: false,
                    txtBtnAceptar: '',
                    txtBtnCancelar: '',
                }
                fileInput.value = '';
                return;
            }

            this.documentoSeleccionado = this.catalogoDocumentosObligatorios.find(doc => doc.id_tipo_documento === id) as TipoDocumentos;
            const TAMANIO_REQUERIDO: number = CargaDocumentoComponent.convertirKbaBytes(this.documentoSeleccionado.tamanio_maximo);
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

            // this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
        }
    }

    /**
     * Agrega una parte adicional a un documento.
     * @param {CatalogoDocumento} item - El documento al que se le agregará la parte.
     * @param {string} origen - El origen del documento (obligatorios u opcionales).
     * @returns {void}
     */
    agregarParte(item: TipoDocumentos, origen: string): void {
        console.log(item, origen);
        
        if (origen === 'obligatorios') {
            const INDICE: number = this.catalogoDocumentosObligatorios.findIndex(doc => doc.id_tipo_documento === item.id_tipo_documento);
            if (INDICE !== -1) {
                const NUEVO_ID: number = (this.catalogoDocumentosObligatorios[INDICE]?.adicionales?.length ?? 0) + 1;
                const PARTE_DOCUMENTO: TipoDocumentos = {
                    id_tipo_documento: parseInt(`${item.id_tipo_documento}0${NUEVO_ID}`, 10),
                    tipo_documento: item.tipo_documento,
                    tamanio_maximo: item.tamanio_maximo,
                    ide_rango_resolucion_imagen: item.ide_rango_resolucion_imagen,
                    // nuevo: true,
                    // uniqueId: crypto.randomUUID()
                };
                this.catalogoDocumentosObligatorios[INDICE].adicionales?.push(PARTE_DOCUMENTO);
            }
        } else {
            const INDICE: number = this.documentosOpcionalesSeleccionados.findIndex(doc => doc.id_tipo_documento === item.id_tipo_documento);
            if (INDICE !== -1) {
                const NUEVO_ID: number = (this.documentosOpcionalesSeleccionados[INDICE]?.adicionales?.length ?? 0) + 1;
                const PARTE_DOCUMENTO: TipoDocumentos = {
                    id_tipo_documento: parseInt(`${item.id_tipo_documento}0${NUEVO_ID}`, 10),
                    tipo_documento: item.tipo_documento,
                    tamanio_maximo: item.tamanio_maximo,
                    ide_rango_resolucion_imagen: item.ide_rango_resolucion_imagen,
                    // nuevo: true,
                    // uniqueId: crypto.randomUUID()
                };
                this.documentosOpcionalesSeleccionados[INDICE].adicionales?.push(PARTE_DOCUMENTO);
            }
        }
    }

    /**
 * Verifica si un archivo ya existe en la lista de archivos cargados.
 * @param {number} id - El ID del archivo a verificar.
 * @returns {boolean} `true` si el archivo ya existe, de lo contrario `false`.
 */
    existePreview(id: number): boolean {
        const ENCONTRADO = this.listadoArchivos.find(f => f.id === id);
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
            FILE_INPUT = document.getElementById(`formFile${item.id_tipo_documento}`) as HTMLInputElement;
        } else if (tipo === 'opcionales') {
            FILE_INPUT = document.getElementById(`formFileOpcionales${item.id_tipo_documento}`) as HTMLInputElement;
        }

        if (FILE_INPUT) {
            FILE_INPUT.value = ''; // Limpia el archivo seleccionado
        }

        const INDEX_ARCHIVO: number = this.listadoArchivos.findIndex(f => f.id === item.id_tipo_documento);
        if (INDEX_ARCHIVO !== -1) {
            this.listadoArchivos.splice(INDEX_ARCHIVO, 1);
        }

        // const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

        // this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
    }

    /**
* Abre un archivo PDF en una nueva pestaña del navegador.
* @returns {void}
* @param id
*/
    verPdf(id: number): void {
        const RUTA = this.listadoArchivos.find(f => f.id === id)?.ruta;
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
            tamanioModal: 'modal-lg'
        }
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
            tamanioModal: ''
        }
    }

    confirmarCargaArchivos(acepta: boolean): void {
        if (acepta) {
            this.cargarDocumentos = true;
            this.mostrarSeccionCargaArchivos = false;
            this.archivosCargando.obligatorios = this.listadoArchivos.filter(f => f.tipo === 'obligatorio');
            this.archivosCargando.opcionales = this.listadoArchivos.filter(f => f.tipo === 'opcional');
            // this.cargarArchivos(this.archivosCargando.obligatorios);
            // this.cargarArchivos(this.archivosCargando.opcionales);
            // this.cargaRealizada.emit(this.cargarDocumentos);
        }
    }

    /**
     * Agrega documentos opcionales a la lista de documentos opcionales.
     * @returns {void}
     * @description Esta función recorre la lista de documentos opcionales a agregar y verifica si ya existen en la lista de documentos opcionales.
     */
    agregarOpcionales(): void {
        this.listDocOpcionalesAgregar.forEach((doc: number) => {

            const INDICE = this.documentosOpcionalesSeleccionados.findIndex((f: TipoDocumentos) => f.id_tipo_documento === doc);
            if (INDICE === -1) {
                const OPCIONAL = this.catalogoDocumentosOpcionales.find(f => f.id_tipo_documento === doc) as TipoDocumentos;

                this.documentosOpcionalesSeleccionados.push(OPCIONAL);
                const INDICE_OPCIONAL = this.catalogoDocumentosOpcionales.findIndex(f => f.id_tipo_documento === doc);
                if (INDICE_OPCIONAL !== -1) {
                    this.catalogoDocumentosOpcionales[INDICE_OPCIONAL] = {
                        ...this.catalogoDocumentosOpcionales[INDICE_OPCIONAL]
                    };
                }
            }
        });

        // this.documentosStore.establecerCatalogoDocumentos(this.documentosOpcionalesSeleccionados);
        // this.listDocOpcionalesAgregar = [];
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
            const INDICE_ADICIONAL = item.item.adicionales.findIndex((adicional: TipoDocumentos) => adicional.id_tipo_documento === item.adicional.id_tipo_documento);
            item.item.adicionales.splice(INDICE_ADICIONAL, 1);
            const INDICE: number = this.listadoArchivos.findIndex(f => f.id === item.id_tipo_documento);
            this.listadoArchivos.splice(INDICE, 1);

            const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

            // this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
        }
    }

    /**
     * Elimina un documento opcional de la lista de documentos opcionales.
     * @param {CatalogoDocumento} item - El documento a eliminar.
     * @returns {void}
     */
    eliminarOpcional(item: TipoDocumentos): void {
        const INDICE: number = this.documentosOpcionalesSeleccionados.findIndex(f => f.id_tipo_documento === item.id_tipo_documento);
        if (INDICE !== -1) {
            if (this.documentosOpcionalesSeleccionados[INDICE] &&
                this.documentosOpcionalesSeleccionados[INDICE].adicionales) {
                /*         if (this.documentosOpcionalesSeleccionados[INDICE].adicionales.length > 0) {
                 */
                this.documentosOpcionalesSeleccionados[INDICE]?.adicionales?.forEach((adicional: TipoDocumentos) => {
                    const INDICE_LISTADO: number = this.listadoArchivos.findIndex(f => f.id === adicional.id_tipo_documento);
                    this.listadoArchivos.splice(INDICE_LISTADO, 1);
                });
                // }
            }

            const INDICE_LISTADO: number = this.listadoArchivos.findIndex(f => f.id === item.id_tipo_documento);
            this.listadoArchivos.splice(INDICE_LISTADO, 1);

            this.documentosOpcionalesSeleccionados.splice(INDICE, 1);
        }
        const INDICE_AGREGAR: number = this.listDocOpcionalesAgregar.findIndex(id => id === item.id_tipo_documento);
        if (INDICE_AGREGAR !== -1) {
            this.listDocOpcionalesAgregar.splice(INDICE_AGREGAR, 1);
            this.listDocOpcionalesAgregar = [...this.listDocOpcionalesAgregar];
        }
        this.cdr.detectChanges();

        // const ARCHIVOS_PARA_CARGAR = this.listadoArchivos.some(item => item.archivo !== undefined && item.archivo !== null);

        // this.activarBotonCargaArchivos.emit(ARCHIVOS_PARA_CARGAR);
    }

    static convertirKbaBytes(size: number | undefined): number {
        if (size === undefined) {
            return 0;
        }
        return size * 1000;
    }


}
