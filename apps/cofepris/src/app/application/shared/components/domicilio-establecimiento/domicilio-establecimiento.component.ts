import {
  CROSLISTA_DE_ADUANAS_ENTRADA,
  CROSLISTA_DE_PAISES,
  DEFAULT_CONFIGURACION_VISIBILIDAD,
  INPUT_FECHA_CADUCIDAD_CONFIG,
} from '../../constantes/datos-domicilio-legal.enum';
import {
  Catalogo,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  REGEX_CODIGO_POSTAL,
  REGEX_NUMERO_15_ENTEROS_3_DECIMALES,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  ConfiguracionVisibilidad,
  MERCANCIAS_DATA,
  MercanciasInfo,
  NICO_TABLA,
  NicoInfo,
} from '../../models/datos-domicilio-legal.model';
import {
  DatosDomicilioLegalState,
  DatosDomicilioLegalStore,
} from '../../estados/stores/datos-domicilio-legal.store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
import { Modal } from 'bootstrap';
import { TablePaginationComponent } from '@ng-mf/data-access-user';

export interface RespuestaTabla {
  code: number;
  data: NicoInfo[];
  message: string;
}

export interface MercanciasTabla {
  code: number;
  data: MercanciasInfo[];
  message: string;
}

/**
 * Componente para el domicilio del establecimiento.
 */
@Component({
  selector: 'app-domicillo',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    TablePaginationComponent
  ],
  templateUrl: './domicilio-establecimiento.component.html',
  styleUrls: ['./domicilio-establecimiento.component.scss'],
})
export class DomicilioComponent implements OnInit, OnDestroy {
  /**
     * Indica si el campo GarantiasOfrecidasVisible es visible.
     */
  @Input() isGarantiasOfrecidasVisible: boolean = false;
  /**
   * Indica si el campo AvisoLicenciaVisible es visible.
   */
  @Input() isAvisoLicenciaVisible: boolean = true;

  /**
   * Indica si el campo AduanasEntradaVisible es visible.
   */
  @Input() isAduanasEntradaVisible: boolean = false;

  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para el mensaje de alerta.
   */
  INPUT_FECHA_CADUCIDAD_CONFIG = INPUT_FECHA_CADUCIDAD_CONFIG;
  /**
   * Configuración de visibilidad de los campos.
   */
  @Input() configuracionVisibilidad: ConfiguracionVisibilidad = DEFAULT_CONFIGURACION_VISIBILIDAD

  /**
     * Indica si el campo esPaginacionVisible es visible.
     */
  @Input() esPaginacionVisible: boolean = false;

  /**
    * Número total de elementos en la tabla.
    */
  totalElementos: number = 0;

  /**
   * Página actual de la paginación.
   */
  paginaActual: number = 1;

  /**
   * Cantidad de elementos por página en la paginación.
   */
  elementosPorPagina: number = 5;
  /**
    * Encabezados de la tabla de establecimientos.
    */
  public establecimientoHeaderData: string[] = [];

  /**
   * Contiene los datos del cuerpo de la tabla de establecimientos.
   */
  public establecimientoBodyData = [];

  /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario es de actualización.
   */
  private esFormularioActualizacion: boolean = false;

  /**
   * Datos completos de los establecimientos.
   */
  public fullEstablecimientoBodyData = [];
  /**
   * Constructor del componente.
   * @param fb
   * @param DatosDomicilioLegalStore
   * @param DatosDomicilioLegalQuery
   * @param service
   */
  constructor(
    public readonly fb: FormBuilder,
    private datosDomicilioLegalStore: DatosDomicilioLegalStore,
    private datosDomicilioLegalQuery: DatosDomicilioLegalQuery,
    private service: DatosDomicilioLegalService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioActualizacion = seccionState.update;
        })
      )
      .subscribe()
  }

  /**
    * Evalúa si se debe inicializar o cargar datos en el formulario.
    * Además, obtiene la información del catálogo de estados.
    */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
    if (this.esFormularioSoloLectura || this.esFormularioActualizacion) {
      this.obtenerScianTablaDatos();
      this.obtenerDataMercanciasDatos();
    }
  }

  /**
 * Método para obtener el valor de la fecha seleccionada.
 */
  obtenerScianTablaDatos(): void {
    this.service
      .getObtenerScianTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.nicoTablaDatos = data?.data;
      });
  }

  /**
   * Método para obtener el valor de la fecha seleccionada.
   */
  obtenerDataMercanciasDatos(): void {
    this.service
      .getObtenerDataMercanciasDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }

  /**
 * Carga datos y deshabilita el formulario si es solo lectura.
 */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();

    if (this.esFormularioSoloLectura) {
      this.domicilio.disable();
    } else {
      this.domicilio.enable();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el estado seleccionado.
   */
  inicializarFormulario(): void {
    this.datosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.configurarFormularioDomicillio();
  }

  configurarFormularioDomicillio(): void {
    this.domicilio = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.maxLength(12), Validators.pattern(REGEX_CODIGO_POSTAL)]],
      estado: [this.solicitudState?.estado, Validators.required],
      muncipio: [this.solicitudState?.muncipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      colonia: [this.solicitudState?.colonia],
      calle: [this.solicitudState?.calle, Validators.required],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox, Validators.required],
      licenciaSanitaria: [
        { value: this.solicitudState?.licenciaSanitaria, disabled: false }, Validators.required
      ],
      regimen: [this.solicitudState?.regimen],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas],
      numeroPermiso: [this.solicitudState?.numeroPermiso],
      paisDeOriginDatos: [this.solicitudState?.aduanasDeEntrada || []],
      garantiasOfrecidas: [this.solicitudState?.garantiasOfrecidas],
    });
  }


  /**
   * Grupo de formularios principal.
   * @property {FormGroup} domicilio
   */
  domicilio!: FormGroup;

  /**
   * Lista de países disponibles para la selección de origen.
   */
  public seleccionarAduanasEntrada = CROSLISTA_DE_ADUANAS_ENTRADA;

  /**
   * Botones para gestionar la lista cruzada de países de origen.
   */
  aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Etiquetas para la lista cruzada de países de origen.
   */
  public aduanasEntradaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas de entrada disponibles:',
    derecha: 'Aduanas de entrada seleccionadas*:',
  };

  /**
   * Lista de países seleccionados como origen.
   */
  public seleccionadasAduanasEntradaDatos: string[] = [];


  /**
   * Maneja el evento de cambio para las entradas de aduanas seleccionadas.
   * Actualiza el estado interno y el control del formulario con los eventos proporcionados.
   *
   * @param events - Un arreglo de cadenas que representan las entradas de aduanas seleccionadas.
   */
  aduanasEntradaSeleccionadasChange(events: string[]): void {
    this.seleccionadasAduanasEntradaDatos = events;
    this.domicilio.patchValue({
      paisDeOriginDatos: events,
    });
    this.setValoresStore(this.domicilio, 'paisDeOriginDatos', 'setPaisDeOriginDatos');
  }

  /**
   * Grupo de formularios para el agente aduanal.
   */
  formAgente!: FormGroup;

  /**
   * Grupo de formularios para las mercancias.
   */
  formMercancias!: FormGroup;

  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Control de formulario para la aduanasDeEntradaFechaSeleccionada.
   */
  estado: Catalogo[] = [];

  /**
   * Lista de paises.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Tabla de selección de checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Tabla de selección de radio.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos de la tabla de selección de radio.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Tabla de selección de checkbox.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de selección de checkbox.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Lista de aduanas de entrada seleccionadas.
   */
  aduanasDeEntradaSeleccionadas: string[] = [];

  /**
   * Lista de aduanas de entrada seleccionadas.
   */
  aduanasDeEntradaDatos: string[] = [];

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;

  /**
   * Indica si la sección es colapsableDuos.
   * @property {boolean} colapsableDuos
   */
  colapsableDuos: boolean = false;

  /**
   * @property {NicoInfo[]} personaparas - Arreglo que contiene información de personas relacionadas.
   * @description Lista de objetos NicoInfo que representan las personas asociadas al establecimiento.
   * @type {NicoInfo[]}
   */
  personaparas: NicoInfo[] = [];

  /**
   * Indica si la sección es colapsableTres.
   * @property {boolean} colapsableTres
   */
  colapsableTres: boolean = false;
 /**
   * Indica si la sección es colapsableTres.
   * @property {boolean} colapsableTress
   */
  colapsableTress: boolean = false;
  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * Lista de rangos de días seleccionarOrigenDelPaisDuos.
   */
  seleccionarOrigenDelPaisDuos: string[] = this.crosListaDePaises;

  /**
   * Lista de rangos de días seleccionarOrigenDelPaisTres.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
   * Lista de rangos de días seleccionarOrigenDelPaisCuatro.
   */
  seleccionarOrigenDelPaisCuatro: string[] = this.crosListaDePaises;
  /**
   * Instancia del Modal de Bootstrap utilizada para controlar la visualización y el comportamiento del cuadro de diálogo modal
   * dentro del componente DomicilioEstablecimientoComponent.
   *
   * */
  modalInstance!: Modal; /**
   * Lista de mercancías agregadas por el usuario.
   */
  listaMercancias: MercanciasInfo[] = [];
  /**
   * Etiqueta de la lista de fechas.
   * */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País productor del ingrediente activo:',
    derecha: 'País(es) seleccionado(s)*:',
  };

 /**
   * Etiqueta de la lista de fechas.
   * */
  public paisDeDondeLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País donde se elabora el producto',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Etiqueta de la lista de fechas.
   * */
  public paisOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Etiqueta de la lista de fechas.
   * */
  public paisEmbarqueLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Objeto que representa la configuración de etiquetas para la selección del país donde se elabora el producto.
   * 
   * @property {string} tituluDeLaIzquierda - Etiqueta que se muestra a la izquierda, indicando el título "país donde se elabora el producto".
   * @property {string} derecha - Etiqueta que se muestra a la derecha, indicando los países seleccionados.
   */
  public paisDondeSeElabora: CrossListLable = {
    tituluDeLaIzquierda: 'País donde se elabora el producto:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Objeto que representa la configuración de la lista cruzada para el campo "País de procedencia".
   * 
   * @property {string} tituluDeLaIzquierda - Etiqueta que se muestra en el lado izquierdo de la lista, indicando el país de procedencia.
   * @property {string} derecha - Etiqueta que se muestra en el lado derecho de la lista, indicando los países seleccionados.
   */
  public paisDeProcedencia: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * @method
   * @description
   * Muestra el modal asociado al modelo de clave.
   * 
   * @returns {void}
   * 
   * @memberof DomicilioEstablecimientoComponent
   */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }


  /**
   * Objeto que representa la configuración de etiquetas para la selección de país de origen.
   * 
   * @property {string} tituluDeLaIzquierda - Etiqueta que se muestra a la izquierda, indicando el título "País de origen".
   * @property {string} derecha - Etiqueta que se muestra a la derecha, indicando los países seleccionados.
   */
  public paisDeOrigen: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Catálogo de fracciones arancelarias y sus descripciones.
   * @property {Array<{ fraccion: string, descripcion: string }>} fraccionesCatalogo
   */
  fraccionesCatalogo = [
    { fraccion: '0101.21.01', descripcion: 'Caballos de carrera' },
    { fraccion: '0201.30.00', descripcion: 'Carne de bovino congelada' },
    { fraccion: '0402.10.01', descripcion: 'Leche en polvo, sin azúcar' },
    { fraccion: '1006.30.99', descripcion: 'Arroz semiblanqueado' }
  ];
  /**
   * Etiqueta de la lista de fechas.
   * */
  ngOnInit(): void {
    this.datosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
    this.configurarFormularioDomicillio()

    this.formAgente = this.fb.group({
      claveScianModal: [this.solicitudState?.claveScianModal, Validators.required],
      claveDescripcionModal: [this.solicitudState?.claveDescripcionModal],
    });
    this.formMercancias = this.fb.group({
      nombreComercial: [
        '',
        [Validators.required, Validators.maxLength(1000)],
      ],
      nombreComun: ['', [Validators.required, Validators.maxLength(250)]],
      nombreCientifico: ['', [Validators.maxLength(250)]],
      usoEspecifico: ['', [Validators.required, Validators.maxLength(1000)]],
      fraccionArancelaria: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_SOLO_DIGITOS)],
        Validators.minLength(8),
      ],

      descripcionFraccion: [{ value: '', disabled: true }],
      cantidadUMT: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_NUMERO_15_ENTEROS_3_DECIMALES),
        ],
      ],
      UMT: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_NUMERO_15_ENTEROS_3_DECIMALES),
        ],
      ],
      UMC: ['', Validators.required],
      porcentajeConcentracion: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
        ],
      ],
      numeroRegistro: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      clasificacionToxicologica: ['', Validators.required],
      objetoImportacion: ['', Validators.required],
    });
    this.seleccionadasAduanasEntradaDatos = this.solicitudState?.aduanasDeEntrada;

    this.inicializarEstadoFormulario();

  }

  /**
   * @method cerrarModalScian
   * @description Oculta el modal relacionado con el catálogo SCIAN.
   * @returns {void}
   *
   * @memberof DomicilioEstablecimientoComponent
   */
  cerrarModalScian(): void {
    this.modalInstance.hide();
  }

  /**
   * @method limpiarScianForm
   * @description Limpia y reinicia el formulario asociado al agente SCian.
   * @returns {void}
   * 
   * @memberof DomicilioEstablecimientoComponent
   */
  limpiarScianForm(): void {
    this.formAgente.reset();
  }

  /**
   * Guarda los datos del formulario del agente SCIAN en la tabla Nico.
   * 
   * Si el formulario `formAgente` es válido, crea un nuevo objeto `NicoInfo` con los valores
   * de los campos `claveScianModal` y `claveDescripcionModal`, lo agrega al arreglo `nicoTablaDatos`,
   * limpia el formulario y cierra el modal correspondiente.
   *
   * @returns {void}
   * @memberof DomicilioComponent
   */
  guardarScian(): void {
    if (this.formAgente.valid) {
      const NUEVO_DATO: NicoInfo = {
        clave_Scian: this.formAgente.get('claveScianModal')?.value,
        descripcion_Scian: this.formAgente.get('claveDescripcionModal')?.value,
      };
      this.nicoTablaDatos.push(NUEVO_DATO);
      this.formAgente.reset();
      this.cerrarModalScian();
    }

    this.formMercancias.get('fraccionArancelaria')?.valueChanges.subscribe((valor: string) => {
      const MATCHED = this.fraccionesCatalogo.find(item =>
        item.fraccion.startsWith(valor)
      );
      const DESCRIPCION = MATCHED ? MATCHED.descripcion : '';
      this.formMercancias.get('descripcionFraccion')?.setValue(DESCRIPCION);
    });
  }

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotonesDuos = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].quitar('t'),
    },
  ];

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotonesTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].quitar('t'),
    },
  ];
  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotonesCuatro = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[3].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[3].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[3].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[3].quitar('t'),
    },
  ];

  /**
   * Método para obtener el valor de la fecha seleccionada.
   * @param event
   */
  obtenerEstadoList(): void {
    this.service
      .getObtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.estado = data;
      });
  }
  /**
    * @method onClaveScianChange
    * @description Maneja el evento de cambio del dropdown y actualiza el campo de descripción.
    * @param {Event} event - Evento de cambio del dropdown.
    */
  onClaveScianChange(event: Event): void {
    const SELECTED_VALUE = (event.target as HTMLSelectElement).value;
    const SELECTED_OPTION = this.estado.find((item) => item.id === Number(SELECTED_VALUE));

    if (SELECTED_OPTION) {
      this.formAgente.patchValue({
        claveDescripcionModal: SELECTED_OPTION.descripcion,
      });
    }
  }
  /**
   * Método para obtener el valor de la fecha seleccionada.
   */

  /**
   * Método para obtener el valor de la fecha seleccionada.
   */
  obtenerMercanciasDatos(): void {
    this.mercanciasTablaDatos = this.listaMercancias
  }

  /**
   * Método para obtener el valor de la fecha seleccionada.
   * @param event
   */
  onAvisoCheckboxChange(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement;
    if (CHECKBOX.checked) {
      this.domicilio.get('licenciaSanitaria')?.disable();
    } else {
      this.domicilio.get('licenciaSanitaria')?.enable();
    }
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsableDuos
   */
  mostrar_colapsableDuos(): void {
    this.colapsableDuos = !this.colapsableDuos;
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsableTres
   */
  mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }

   /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsableTress
   */
  mostrar_procedencia(): void {
    this.colapsableTress = !this.colapsableTress;
  }

  /**
   * Sets the value of the 'descripcionFraccion' field in the 'formMercancias' form group to the string 'descripcionFraccion'.
   * If the control does not exist, no action is taken.
   */
  setDescripcionFraccion():void{
    this.formMercancias.get('descripcionFraccion')?.setValue('descripcionFraccion');
    this.formMercancias.get('UMT')?.setValue('UMT32131');
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.datosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * Agrega una nueva mercancía a la lista de mercancías si el formulario es válido.
   * 
   * - Si el formulario `formMercancias` es válido, obtiene los valores actuales del formulario,
   *   crea un nuevo objeto de mercancía y lo agrega a `listaMercancias`.
   * - Luego, imprime la lista actualizada en la consola y reinicia el formulario.
   * 
   * @remarks
   * Este método se utiliza para gestionar la adición dinámica de mercancías en el componente.
   */
  agregarMercancia(): void {
    if (this.formMercancias.valid) {
      const NUEVA_MERCANCIA = { ...this.formMercancias.getRawValue() };
      this.listaMercancias.push(NUEVA_MERCANCIA);
      this.formMercancias.reset();
    }
  }

  /**
    * Actualiza la paginación de la tabla de establecimientos.
    * Corta los datos de la tabla según la página actual y el número de elementos por página.
    */
  /**
   * Actualiza la paginación de la tabla de establecimientos.
   * Corta los datos de la tabla según la página actual y el número de elementos por página.
   */
  actualizarPaginacion(): void {
    const INDICE_INICIAL = (this.paginaActual - 1) * this.elementosPorPagina;
    this.establecimientoBodyData = this.fullEstablecimientoBodyData.slice(
      INDICE_INICIAL,
      INDICE_INICIAL + this.elementosPorPagina
    );
  }
/**   * Autocompleta el campo de fracción arancelaria con la descripción correspondiente.
   *   * Si el campo de fracción arancelaria tiene un valor, realiza una solicitud al servicio para obtener
   *   * la descripción asociada y actualiza el formulario con esa información.
   */
  autoCompleteFraccionArancelaria(): void {
    const FRACCION = this.formMercancias.get('fraccionArancelaria')?.value;
    if (FRACCION) {
      this.service
        .getFraccionArancelaria()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data): void => {
          this.formMercancias.patchValue({
            descripcionFraccion: data?.descripcion,
            UMT: data?.umt
          });
        });
    }
  }

  /**
     * Método que se ejecuta cuando se cambia de página en la paginación.
     * @param {number} page - Número de la página seleccionada.
     */
  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} pagina - Número de la página seleccionada.
   */
  onCambioDePagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} elementosPorPagina - Número de elementos a mostrar por página.
   */
  onCambioElementosPorPagina(elementosPorPagina: number): void {
    this.elementosPorPagina = elementosPorPagina;
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }


  /**
  * @method limpiar
  * @description
  * Método que limpia el formulario del agente aduanal.
  * @param {forma}
  */
  // eslint-disable-next-line class-methods-use-this
  public limpiar(forma: FormGroup): void {
    if (forma) {
      forma.reset();
    }
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
