import { Catalogo, ConfiguracionColumna, ConsultaioQuery, ConsultaioState, REGEX_SOLO_NÚMERO } from '@ng-mf/data-access-user';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Contenedor11202State, Contenedor11202Store } from '../../estados/contenedor11202.store';
import { CSV_DE_TABLA, ELGIR_DE_ARCHIVO, GRID_CONTENEDORES, SOLICITUD_11202_ENUM } from '../../constantes/retorno-contenedores.enum';
import { DatosDelCsvArchivo, GridContenedores } from '../../models/datos-tramite.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Contenedor11202Query } from '../../estados/contenedor11202.query';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Modal } from 'bootstrap';
import preOperativo from '@libs/shared/theme/assets/json/11202/preOperativo.json';

/**
 * @component ContenedorComponent
 * @description
 * This component is responsible for managing the container-related operations in the application.
 * It provides functionality for handling forms, displaying dynamic tables, managing file uploads,
 * and interacting with services to fetch and submit data.
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
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalArchivoCsv') modalArchivo!: ElementRef;

  /**
   * @property {Catalogo[]} catalogAduanas
   * Stores the customs catalog
   * */
  catalogAduanas: Catalogo[] = [];

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
   * @property {boolean} showCargarArchivoTable
   * Indicates whether the file upload table is visible.
   */
  actionBean = { requiereGuardadoParcial: false };

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
  public gridContenedores: ConfiguracionColumna<GridContenedores>[] = GRID_CONTENEDORES;

  /**
   * Configuración de las columnas de la tabla.
   */
  public csvTabla: ConfiguracionColumna<DatosDelCsvArchivo>[] = CSV_DE_TABLA;

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

  /**
   * Bandera para mostrar la sección de adjuntar archivo.
   */
  archivoDescripcion: boolean = false;

  /**
   * Bandera para mostrar la sección de adjuntar archivo.
   */
  mostrarSeccionArchivoCsv: boolean = false;

  /**
   * Datos del contenedor.
   */
 public datosDelCsvArchivo: DatosDelCsvArchivo[] = [];

 /**
   * Etiqueta del archivo seleccionado.
   */
  elgirDeArchivo: string = SOLICITUD_11202_ENUM.ELGIR_DE_ARCHIVO;

  /**
   * Descripción del archivo seleccionado.
   */
  archivo_descripcion: string = ELGIR_DE_ARCHIVO.ARCHIVO_DESCRIPCION;

  /**
   * Elemento de entrada de archivo HTML.
   *
   * @type {HTMLInputElement}
   */
  elgirArchivo!: HTMLInputElement;

  /**
   * Archivo de medicamentos seleccionado.
   */
  archivoMedicamentos: File | null = null;

  /**
   * Bandera para indicar si el archivo adjunto no un CSV.
   */
  archivoNoCsv: boolean = false;

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private contenedorStore: Contenedor11202Store,
    private contenedorQuery: Contenedor11202Query,
    private consultaioQuery: ConsultaioQuery,
  ) { 
    this.contenedore = {
      catalogos: [],
      labelNombre: 'Tipo de contenedor',
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
    this.cargarCatalogContenedores();
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
      this.mostrarBotonesBuscar = true;
      this.mostrarSeccionArchivoCsv = false;
    } else if (TIPO_BUSQUEDA === 'Archivo CSV') {
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedor = false;
      this.mostrarSeccionArchivoCsv = true;
    } else {
      this.seccionAduanaaFechaVisible = false;
      this.mostrarSeccionArchivoCsv = false;
    }
  }

  /**
   * Limpia los campos del formulario.
   */
  limpiarCampos(): void {
    const TIPOBUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    (this.solicitudForm.get('datosContenedor') as FormGroup)?.reset();
    this.solicitudForm.get('tipoBusqueda')?.setValue(TIPOBUSQUEDA);
    this.mostrarCampos();
    this.contenedores = [];
    this.archivoSeleccionado = '';
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
    const INICIALESCONTENEDOR = this.solicitudForm.value.datosContenedor.inicialesContenedor;
    const NUMEROCONTENEDOR = this.solicitudForm.value.datosContenedor.numeroContenedor;
    const ADUANA = this.solicitudForm.value.datosGenerales.aduana;
    const TIPOCONTENEDOR = this.solicitudForm.value.datosContenedor.tipoContenedor;
    const TIPOBUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    if ( INICIALESCONTENEDOR && NUMEROCONTENEDOR && ADUANA && TIPOCONTENEDOR ) {
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
            this.mostrarBotonesBuscar = false;
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
      'archivoMedicamentos'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (!FILE) return;

    const isCsv = FILE.type === 'text/csv' || FILE.name.toLowerCase().endsWith('.csv');
    if (isCsv) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.showArchivoSeleccionadoTable = true;
      };
      READER.readAsText(FILE);
    
      this.datosTramiteService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
        (respuesta) => {
          if (respuesta?.success) {
            respuesta.datos.id = this.datosDelCsvArchivo.length + 1;
            this.datosDelCsvArchivo = [...this.datosDelCsvArchivo, respuesta.datos];
            (this.contenedorStore.setDelCsv as (valor: DatosDelCsvArchivo[]) => void)(this.datosDelCsvArchivo);
          }
        }
      );
    } else {
      this.archivoDescripcion = true;
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
      'Existe en VUCEM': 'existeEnVUCEM'
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
   * Activa la selección del archivo de medicamentos.
   * @returns {void}
   */
  activarSeleccionArchivo(): void {
    this.elgirArchivo = document.getElementById(
      'archivoMedicamentos'
    ) as HTMLInputElement;
    if (this.elgirArchivo) {
      this.elgirArchivo.click();
    }
  }

  /**
   * Maneja el cambio de archivo en el input de archivo.
   *
   * @param event Evento de cambio de archivo.
   *
   * @returns {void}
   */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.files && TARGET.files.length > 0) {
      this.archivoMedicamentos = TARGET.files[0];
      this.elgirDeArchivo = this.archivoMedicamentos.name;
    } else {
      this.elgirDeArchivo = this.elgirArchivo?.value;
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
        inicialesContenedor: [ this.contenedorState?.inicialesContenedor, [Validators.required, Validators.maxLength(10)]],
        numeroContenedor: [ this.contenedorState?.numeroContenedor, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        tipoContenedor: [this.contenedorState?.tipoContenedor],
        digitoDeControl: [this.contenedorState?.digitoDeControl, [Validators.maxLength(1), Validators.pattern(REGEX_SOLO_NÚMERO)]],
      }),
    });
    this.mostrarCampos();
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(value => {
      this.setValoresStore(this.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
      this.mostrarCampos();
      if (value) {
        this.solicitudForm.get('tipoBusqueda')?.disable();
      }
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
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param {string} id El nombre del control del formulario.
   * @returns {boolean} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(id: string): boolean {
    const CONTROL = this.solicitudForm.get(id);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
