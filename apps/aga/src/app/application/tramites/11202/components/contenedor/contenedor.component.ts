/* eslint-disable @typescript-eslint/no-explicit-any */
import { Catalogo, ConfiguracionColumna, ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Contenedor11202State, Contenedor11202Store } from '../../estados/contenedor11202.store';
import { DatosDelContenedor, GridContenedores } from '../../models/datos-tramite.model';
import { ENCABEZADO_DE_TABLA, GRID_CONTENEDORES, TEXTOS_REQUISITOS } from '../../../../constantes/11202/retorno-contenedores.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { Contenedor11202Query } from '../../estados/contenedor11202.query';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import preOperativo from '@libs/shared/theme/assets/json/11202/preOperativo.json';
import { Modal } from 'bootstrap';

/**
 * @component ContenedorComponent
 * @description
 * This component is responsible for managing the container-related operations in the application.
 * It provides functionality for handling forms, displaying dynamic tables, managing file uploads,
 * and interacting with services to fetch and submit data.
 *
 * @selector app-contenedor
 * @templateUrl ./contenedor.component.html
 * @styleUrl ./contenedor.component.scss
 *
 * @implements OnInit, OnDestroy
 */

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',

})
export class ContenedorComponent implements OnInit, OnDestroy {
  /**
  * @property {Contenedor11202State} contenedorState
  * Stores the state of the container-related data.
  */
  public contenedorState!: Contenedor11202State;

  /**
   * @property {string} TEXTOS
   * Stores the text constants for the component.
   */
  TEXTOS = TEXTOS_REQUISITOS;
  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  /**
  * Define los datos que se mostrarán en la tabla dinámica.
  */
  datosTabla: any[] = [];

  /**
 * @property {any} radioOptions
 * Options for the radio buttons.
 */
  radioOptions = preOperativo;

  /**
   * @property {Subject<void>} destroyNotifier$
   * Emits a signal to clean up subscriptions when the component is destroyed.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {FormGroup} solicitudForm
   * Form group for the container form.
   */
  solicitudForm!: FormGroup;

  /**
   * @property {boolean} seccionAdjuntarArchivoVisible
   * Indicates whether the file upload section is visible.
   */
  isAdjuntarArchivoVisible: boolean = false;

  /**
   * @property {boolean} seccionAduanaaFechaVisible
   * Indicates whether the customs and date section is visible.
   */
  seccionAduanaaFechaVisible: boolean = false;

  /**
   * @property {boolean} agregarTipoContenedorVisible
   * Indicates whether the add container type section is visible.
   */
  seccionContenedor: boolean = false;

  /**
   * @property {boolean} seccionExcelVisible
   * Indicates whether the Excel section is visible.
   */
  agregarTipoContenedorVisible: boolean = false;

  /**
   * @property {boolean} cargarArchivoVisible
   * Indicates whether the file upload section is visible.
   */
  seccionExcelVisible: boolean = false;

  /**
   * @property {Catalogo[]} catalogAduanas
   * Stores the customs catalog
   * */
  catalogAduanas: Catalogo[] = [];

  /**
   * @property {Catalogo[]} catalogContenedores
   * Stores the container catalog
   * */
  catalogContenedores: string[] = [];

  /**
   * @property {any[]} contenedores
   * Stores the container data
   * */
  contenedores: GridContenedores[] = [];

  /**
   * @property {string} archivoSeleccionado
   * Stores the selected file
   */
  archivoSeleccionado: string = '';

  /**
   * @property {boolean} cargarArchivoVisible
   * Indicates whether the file upload section is visible.
   */
  cargarArchivoVisible: boolean = false;

  /**
   * @property {boolean} exceptionCaught
   * Indicates whether an exception was caught.
   */
  exceptionCaught: boolean = false;

  /**
   * @property {boolean} showCargarArchivoTable
   * Indicates whether the file upload table is visible.
   */
  actionBean = { requiereGuardadoParcial: false };

  /**
   * @property {boolean} showArchivoSeleccionadoTable
   * Indicates whether the selected file table is visible.
   */
  nonSelectionTextTipoContendor: string = 'Selecciona un valor';

  /**
   * @property {number} currentIdx
   * Stores the current index of the tab.
   */
  cargarArchivo: boolean = false;

  /**
   * @property {number} currentIdx
   * Stores the current index of the tab.
   */
  currentIdx: number = 0;

  /**
   * @property {boolean} showCargarArchivoTable
   * Indicates whether the file upload table is visible.
   */
  showCargarArchivoTable: boolean = false;

  /**
   * @property {boolean} showArchivoSeleccionadoTable
   * Indicates whether the selected file table is visible.
   */
  showArchivoSeleccionadoTable: boolean = false;
  /**
     * @property {ConsultaioState} consultaDatos
     * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
     */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;

  /**
   * Evento para continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
  * Configuración de las columnas de la tabla.
  */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = ENCABEZADO_DE_TABLA;

  /**
   * Configuración de las columnas de la tabla.
   */
  public gridContenedores: ConfiguracionColumna<GridContenedores>[] = GRID_CONTENEDORES;

  /**
   * Bandera para mostrar los botones de búsqueda.
   */
  mostrarBotonesBuscar: boolean = true;

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarConstanciaTransferencia') modalElement!: ElementRef;

  /**
   * Contenedores.
   */
  contenedore: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Bandera para mostrar el tipo de contenedor.
   */
  mostrarAgregarTipoContenedor: boolean = false;

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private contenedorStore: Contenedor11202Store,
    private contenedorQuery: Contenedor11202Query,
    private consultaioQuery: ConsultaioQuery,
  ) { 
    this.contenedore = {
      catalogos: [],
      labelNombre: 'Tipo de contendedor',
      primerOpcion: 'Seleccione una opción',
    };
  }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.contenedorQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.contenedorState = {
            ...this.contenedorState,
            ...seccionState,
          }
        })
      )
      .subscribe()
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.contenedores = this.contenedorState.contenedores;
    this.cargarCatalogAduanas();
    this.crearFormSolicitud();
    this.solicitudForm.get('tipoBusqueda')?.valueChanges
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(value => {
      if (value) {
        this.solicitudForm.get('tipoBusqueda')?.disable();
      }
    });
    this.cargarCatalogContenedores();
    this.tabSeleccionado();
    this.loadDatosTablaData();
  }

  /**
   * Carga el catálogo de aduanas.
   */
  cargarCatalogAduanas(): void {
    this.datosTramiteService
      .getAduanas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]): void => {
        this.options = data as Catalogo[];
      });
  }

  /**
   * Carga el catálogo de contenedores.
   */
  cargarCatalogContenedores(): void {
    this.datosTramiteService
      .getContenedores()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.contenedore.catalogos = data;
      });
  }

  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    if (TIPO_BUSQUEDA === 'Contenedor') {
      this.seccionContenedor = true;
      this.seccionAduanaaFechaVisible = true;
      this.cargarArchivoVisible = false;
      this.seccionExcelVisible = false;
      this.cargarArchivo = true;
    } else if (TIPO_BUSQUEDA === 'Archivo CSV') {
      this.seccionExcelVisible = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedor = false;
      this.cargarArchivo = true;
    } else {
      this.seccionAduanaaFechaVisible = false;
      this.seccionExcelVisible = false;
    }
  }

  /**
   * Limpia los campos del formulario.
   */
  limpiarCampos(): void {
    const TIPOBUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    this.solicitudForm.reset();
    this.solicitudForm.get('tipoBusqueda')?.setValue(TIPOBUSQUEDA);
    this.mostrarCampos();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }

  /**
   * Inicializa el modal.
   */
  encontradaModal(): void {
    if (this.solicitudForm.valid) {
      if (this.modalElement) {
        const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
        MODAL_INSTANCE.show();
      }
    } else {
      this.solicitudForm.markAllAsTouched();
    }
  }

  /**
   * Captura los datos del formulario y los envía.
   */
  datosCaptura(): void {
    this.mostrarAgregarTipoContenedor = true;
    this.mostrarBotonesBuscar = false;
  }

  /**
   * Agrega un nuevo contenedor al grid.
   */
  agregarGrid(): void {
    const ADUANA = this.solicitudForm.value.datosGenerales.aduana;
    const TIPOCONTENEDOR = this.solicitudForm.value.datosContenedor.tipoContenedor;
    const TIPOBUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    if (ADUANA && TIPOCONTENEDOR) {
      this.datosTramiteService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
        (respuesta) => {
          if (respuesta?.success) {
            respuesta.datos.id = this.contenedores.length + 1;
            this.contenedores = [...this.contenedores, respuesta.datos];
            (this.contenedorStore.setContenedores as (valor: GridContenedores[]) => void)(this.contenedores);
            this.solicitudForm.reset();
            this.solicitudForm.markAsUntouched();
            this.solicitudForm.markAsPristine();
            this.solicitudForm.get('tipoBusqueda')?.setValue(TIPOBUSQUEDA);
            this.mostrarCampos();
          }
        }
      );
    }
  }

  /**
   * Adjuntar archivo CSV y parsear su contenido.
   */
  adjuntarArchivo(): void {
    const FILE_INPUT = document.getElementById(
      'archivoSeleccionado'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.showArchivoSeleccionadoTable = true;
      };
      READER.readAsText(FILE);
    }
  }

  /**
   * Cargar archivo CSV y parsear su contenido.
   */
  parseCSV(csv: string): void {
    const LINES = csv.split('\n').filter((line) => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      'Aduana': 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de equipo': 'tipoEquipo',
      'Número de equipo': 'numeroEquipo',
      'Dígito Verificador': 'digitoVerificador',
      'Fecha Ingreso': 'fechaIngreso',
      'Vigencia': 'vigencia',
      'Estado de constancia': 'estadoConstancia',
      'Existe en VUCEM': 'existeEnVUCEM',
      'Id constancia': 'idConstancia',
      'Número manifiesto': 'numeroManifiesto',
      'Id solicitud': 'idSolicitud',
      'Fecha inicio': 'fechaInicio'
    };
    const DATA = LINES.slice(1)
      .map((line) => {
        const VALUES = line.split(',');
        const OBJ: Record<string, string | undefined> = {};
        HEADERS.forEach((header, index) => {
          const KEY = HEADER_MAP[header.trim()] || header.trim();
          OBJ[KEY] = VALUES[index]?.trim();
        });
        return OBJ;
      })
      .filter((artículo) => Object.values(artículo).some((value) => value));
    this.datosTabla = DATA;
  }

  /**
   * Cargar archivo CSV y parsear su contenido.
   */
  Archivo(): void {
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.showCargarArchivoTable = true;
      };
      READER.readAsText(FILE);
    }
  }

  /**
   * Selecciona la pestaña activa basada en el índice almacenado en localStorage.
   */
  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('currentIdx');
    if (CURRENT_IDX !== null) {
      this.currentIdx = Number(CURRENT_IDX ?? 0);
    }
  }

  /**
   * Crea el formulario de solicitud.
   */
  crearFormSolicitud(): void {
    this.solicitudForm = this.fb.group({
      idSolicitud: [this.contenedorState?.idSolicitud],
      tipoBusqueda: [this.contenedorState?.tipoBusqueda, Validators.required],
      datosGenerales: this.fb.group({
        aduana: [this.contenedorState?.aduana],
      }),
      datosContenedor: this.fb.group({
        inicialesContenedor: [{ value: this.contenedorState?.inicialesContenedor, disabled: true }],
        numeroContenedor: [{ value: this.contenedorState?.numeroContenedor, disabled: true }],
        tipoContenedor: [this.contenedorState?.tipoContenedor],
      }),
    });

    this.mostrarCampos();
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      this.setValoresStore(
        this.solicitudForm,
        'tipoBusqueda',
        'setTipoBusqueda'
      );
      this.mostrarCampos();
    });
    this.inicializarEstadoFormulario();
  }
  /**
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura.
  * 
  * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
  * En caso contrario, habilita los controles del formulario.
  * 
  * @returns {void}
  */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.solicitudForm?.disable();
    } else {
      this.solicitudForm?.enable();
      this.solicitudForm.get('datosContenedor.inicialesContenedor')?.disable();
      this.solicitudForm.get('datosContenedor.numeroContenedor')?.disable();
    }
  }

  /**
   * Carga los datos de la tabla dinámica.
   */
  loadDatosTablaData(): void {
    this.datosTramiteService.getDatosTableData()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((data) => {
        this.datosTabla = data;
      });
  }

  /**
   * Establece los valores en el store.
   * @param form El formulario del cual se obtienen los valores.
   * @param campo El campo del formulario.
   * @param metodoNombre El nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Contenedor11202Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.contenedorStore[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Emitir evento de continuar.
   * Este método emite un evento para continuar con el proceso.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * cancelar del formulario.
   */
  cancelar(): void {
    this.solicitudForm.reset();
    this.seccionAduanaaFechaVisible = false;
    this.seccionContenedor = false;
    this.seccionExcelVisible = false;
    this.cargarArchivoVisible = false;
    this.cargarArchivo = false;
    this.mostrarAgregarTipoContenedor = false;
    this.solicitudForm.get('tipoBusqueda')?.enable();
  }


  /**
   * Obtiene el formulario de datos generales.
   */
  get datosGenerales(): FormGroup {
    return this.solicitudForm.get('datosGenerales') as FormGroup;
  }

  /**
   * Obtiene el formulario de datos del contenedor.
   */
  get datosContenedor(): FormGroup {
    return this.solicitudForm.get('datosContenedor') as FormGroup;
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
