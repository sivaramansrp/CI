import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import {
  AlertComponent,
  CatalogoSelectComponent,
  CrosslistComponent,
  InputFecha,
  InputFechaComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_DECIMAL,
  SOLO_REGEX_NUMEROS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import {
  CAMPOS_CLAVE,
  DATOS_MERCANCIA_CAMPO,
  DATOS_MERCANCIA_CLAVE_TABLA,
  DESCRIPCION_FRACCION_DESHABILITADO_VALOR,
  ES_VALIDO_REGISTRO_O_VENCIMIENTO,
  FEACCION_AFRACCION_ARANCELARIA_CATALOG,
  FECHA_DE_MOVIMIENTO,
  TIPO_PRODUCTO_ESPECIAL,
  UMT_DESHABILITADO_VALOR,
} from '../../../constantes/shared2606/datos-solicitud.enum';
import {
  Catalogo,
  CrossListLable,
  MercanciaForm,
  TablaMercanciaClaveConfig,
  TablaMercanciasDatos,
} from '../../../models/shared2606/datos-solicitud.model';
import { CommonModule, Location } from '@angular/common';
import {
  FECHA_DE_CADUCIDAD_MERCANICA,
  FECHA_DE_CADUCIDAD_PAGO,
  FECHA_DE_FABRICACIO_PAGO,
} from '../../../models/shared2606/terceros-relacionados.model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CatalogoServices } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../../services/shared2606/datos-solicitud.service';
import { DetalleMercancia } from '../../../models/shared2606/detalle-mercancia.model';
import { DetalleMercanciaComponent } from '../detalle-mercancia/detalle-mercancia.component';
import { NUMERO_REGISTRO_SANITARIO } from '../../../constantes/shared2606/terceros-relacionados-fabricante.enum';
import { Observable } from 'rxjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
/**
 * @component DatosMercanciaComponent
 * @description Componente encargado de capturar y emitir los datos de una mercancía.
 * Utiliza formularios reactivos y listas cruzadas para países de origen, procedencia y uso específico.
 */
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    DetalleMercanciaComponent,
    TablaDinamicaComponent,
    TooltipModule,
    NotificacionesComponent,
    InputFechaComponent,
    AlertComponent
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  providers: [DatosSolicitudService],
})
export class DatosMercanciaComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /**
  * Event emitter to notify parent component to close the modal
  */
  @Output() cerrarModal = new EventEmitter<void>();

  requiedField: boolean = false;


  fraccionArancelariaCatalog: boolean = true;
  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;
  /**
   * @property {boolean} detalleMercancia
   * Indica si el componente debe mostrar detalles de mercancía.
   * Se utiliza para determinar la configuración del formulario y la tabla.
   */
  @Input() detalleMercancia = false;

  /**
   * @property {DetalleMercancia} datosDetalleMercancia
   * Datos de detalle de la mercancía recibidos como entrada.
   */
  @Input() datosTablaDetalleMercancia!: Observable<DetalleMercancia[]>;
  /**
   * @property {FormGroup} mercanciaForm
   * Formulario reactivo principal para capturar los datos de la mercancía.
   */
  public mercanciaForm!: FormGroup;

  /**
   * @property {MercanciaForm} mercanciaFormState
   * Input que recibe el estado inicial del formulario de mercancía.
   */
  @Input() public mercanciaFormState!: MercanciaForm;

  /**
   * @property {TablaMercanciasDatos} datoSeleccionado
   * Dato seleccionado de la tabla de mercancías recibido como entrada desde el componente padre.
   */
  @Input() public datoSeleccionado!: TablaMercanciasDatos | undefined;

  /**
   * @event mercanciaSeleccionado
   * Evento emitido cuando el usuario selecciona o guarda una mercancía.
   */
  @Output() mercanciaSeleccionado = new EventEmitter<TablaMercanciasDatos>();

  /**
   * @event agregarMercanciaDatos
   * @description EventEmitter that emits a single merchandise item to be added.
   * This is used to notify the parent component about the addition of a new merchandise item.
   */
  @Output() agregarMercanciaDatos: EventEmitter<DetalleMercancia> =
    new EventEmitter<DetalleMercancia>(true);

  /**
   * Referencias a los componentes de listas cruzadas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
   * @property {Catalogo[]} clasificacionProductoDatos
   * @description Catalog of product classifications used to populate the form.
   */
  public clasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} especificarClasificacionProductoDatos
   * @description Catalog of specific product classifications used to populate the form.
   */
  public especificarClasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} tipoProductoDatos
   * @description Catalog of product types used to populate the form.
   */
  public tipoProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} formaFarmaceuticaDatos
   * @description Catalog of pharmaceutical forms used to populate the form.
   */
  public formaFarmaceuticaDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} estadoFisicoDatos
   * @description Catalog of physical states used to populate the form.
   */
  public estadoFisicoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} cantidadUmcDatos
   * @description Catalog of commercial unit quantities used to populate the form.
   */
  public cantidadUmcDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} fraccionArancelariaDatos
   * @description Catalog of tariff fractions used to populate the form.
   */
  public fraccionArancelariaDatos!: Catalogo[];

  /**
   * @property {boolean} paisDeOriginColapsable
   * Controla la visibilidad del listado de país de origen.
   */
  public paisDeOriginColapsable = false;

  /**
   * @property {boolean} paisDeProcedenciaColapsable
   * Controla la visibilidad del listado de país de procedencia.
   */
  public paisDeProcedenciaColapsable = false;

  /**
   * @property {boolean} usoEspesificoColapsable
   * Controla la visibilidad del listado de uso específico.
   */
  public usoEspesificoColapsable = false;

  /**
   * @property {boolean} showLimitError
   * Controla la visibilidad del mensaje de error por límite de caracteres.
   */
  public showLimitError = false;

  /**
   * @property {string[]} elementosRequirdos
   * Lista de elementos requeridos para el formulario.
   */
  public elementosRequirdos: string[] = [];

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];


  /**
   * @property {CrossListLable} usoEspesificoLabel
   * Etiqueta personalizada para el componente de lista cruzada de uso específico.
   * Define los títulos para los elementos disponibles y seleccionados.
   */
  public usoEspesificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico',
  };

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];


  /**
   * @property {string[]} seleccionadasPaisDeOriginDatos
   * Lista de países seleccionados como origen.
   */
  public seleccionadasPaisDeOriginDatos: string[] = [];

  /**
   * @property {string[]} seleccionadasUsoEspesificoDatos
   * Lista de usos específicos seleccionados.
   */
  public seleccionadasUsoEspesificoDatos: string[] = [];

  /**
   * @property {Catalogo[]} usoEspesificoDatos
   * Datos de usos específicos para lista cruzada.
   */
  public usoEspesificoDatos: string[] = [];

  /**
   * @property {Catalogo[]} seleccionarOrigenDelPais
   * Datos de países para lista cruzada de país de origen.
   */
  public seleccionarOrigenDelPais: string[] = [];

  /**
   * Indica si se debe mostrar el campo de datos de mercancía en la interfaz.
   * @type {boolean}
   */
  public datosMercanciaCampo = false;

  /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];

  /**
   * @property {typeof TIPO_PRODUCTO_ESPECIAL} tipoProductoEspecial - Referencia a la constante que define los tipos especiales de producto.
   *
   * @remarks
   * Esta propiedad se utiliza para acceder y manejar los diferentes tipos de productos especiales dentro del componente.
   *
   * @comando
   * Utilice esta propiedad para mostrar o validar los tipos de productos especiales en la interfaz de usuario.
   */
  tipoProductoEspecial = TIPO_PRODUCTO_ESPECIAL;

  tipoFOFA = 'FOFA.OTR';

  /**
   * @property {Subscription} subscription
   * @description Suscripción utilizada para gestionar y limpiar las suscripciones a observables dentro del componente.
   * Se inicializa como una nueva instancia de Subscription y se utiliza para evitar fugas de memoria.
   */
  private subscription: Subscription = new Subscription();

  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para cancelar suscripciones activas al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Catalogo[] | undefined} tipoProductoObj
   * @description Objeto(s) de catálogo que representan el tipo de producto seleccionado.
   * Se utiliza para almacenar la información detallada del tipo de producto en el formulario.
   */
  tipoProductoObj: Catalogo[] | undefined;

  /**
   * Indica si el registro o vencimiento es válido para el procedimiento actual.
   * Se utiliza para controlar la lógica de validación de los campos relacionados con registro sanitario y fechas de vencimiento.
   */
  esValidoRegistroOVencimiento: boolean = false;

  /**
   * @property {string} mensajeDeError
   * @description Mensaje de error mostrado cuando el formulario de mercancía no es válido o faltan campos por capturar.
   */
  mensajeDeError: string = '';

  /**
   * @constructor
   * Inicializa el formulario de mercancía y carga catálogos desde archivos JSON.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datosSolicitudService - Servicio que carga catálogos desde assets.
   * @param ubicaccion - Servicio para manejar navegación (si es necesario).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private validacionesService: ValidacionesFormularioService,
    private catalogoService: CatalogoServices
  ) {
    this.datosMercanciaCampo = DATOS_MERCANCIA_CAMPO.includes(
      this.idProcedimiento
    )
      ? true
      : false;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de inicializar las vistas del componente.
   *
   * Aquí se configuran los **grupos de botones** (`paisDeProcedenciaBotonsUno`, `paisDeProcedenciaBotonsDos`,
   * `paisDeProcedenciaBotonsTres`) que permiten al usuario interactuar con las listas de países de procedencia.
   *
   * Cada grupo de botones ofrece las siguientes acciones:
   * - **Agregar todos** → Inserta todos los elementos en la lista.
   * - **Agregar selección** → Inserta únicamente los elementos seleccionados.
   * - **Restar selección** → Elimina únicamente los elementos seleccionados.
   * - **Restar todos** → Elimina todos los elementos de la lista.
   *
   * Estos botones están asociados a instancias de `crossList` y llaman a los métodos
   * `agregar()` o `quitar()` según corresponda.
   */
  ngAfterViewInit(): void {
    this.paisDeProcedenciaBotonsTres = [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[0].agregar('t'),
      },
      {
        btnNombre: 'Agregar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[0].agregar(''),
      },
      {
        btnNombre: 'Restar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[0].quitar(''),
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[0].quitar('t'),
      },
    ];

    if (this.mercanciaForm.get('clasificacionProducto')?.value) {
      this.onCambioClasificacionProducto(this.datoSeleccionado?.claveClasificacionProductoObj);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoProducto'] || changes['formaFarmaceutica']) {
      this.updateValidation();
    }
  }

  onSeleccionarPaisDeOrigen(event: any): void {
    const SELECCIONADOS = event.seleccionados;
    this.mercanciaForm
      .get('paisDeOrigen')
      ?.setValue(SELECCIONADOS.length > 0 ? SELECCIONADOS : null);
  }

  onSeleccionarPaisDeProcedencia(event: any): void {
    const SELECCIONADOS = event.seleccionados;
    this.mercanciaForm
      .get('paisProcedencia')
      ?.setValue(SELECCIONADOS.length > 0 ? SELECCIONADOS : null);
  }

  onSeleccionarPaisDeDestino(event: any): void {
    const SELECCIONADOS = event.seleccionados;
    this.mercanciaForm
      .get('paisDestino')
      ?.setValue(SELECCIONADOS.length > 0 ? SELECCIONADOS : null);
  }
  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Llama al método `crearMercanciaForm` para construir el formulario.
   */
  ngOnInit(): void {
    this.inicializarCatalogo(String(this.idProcedimiento));
    this.requiedField = NUMERO_REGISTRO_SANITARIO.includes(this.idProcedimiento);
    this.esValidoRegistroOVencimiento = ES_VALIDO_REGISTRO_O_VENCIMIENTO.includes(this.idProcedimiento);
    this.validarElementos();
    this.crearMercanciaForm();
    this.crossListRequirdos();
    this.inicializarCrosslist();
  }

  /**
   * Inicializa los datos de los crosslists de países y uso específico.
   * Realiza llamadas básicas a la API para obtener los catálogos y asignarlos a las propiedades correspondientes.
   */
  inicializarCrosslist(): void {

    //pais de procedencia
    this.subscription.add(
      this.catalogoService
        .paisesCatalogo(String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.paisDeProcedenciaDatos = DATOS;
          }
        })
    );

    // País de procedencia
    this.subscription.add(
      this.catalogoService
        .paisesCatalogo(String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.paisDestinoDatos = DATOS;
          }
        })
    );

    // País de origen
     this.subscription.add(
      this.catalogoService
        .paisesCatalogo(String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.paisDeOrigenDatos = DATOS;
          }
        })
    );


    // Uso específico
    this.subscription.add(
      this.catalogoService
        .usosEspecificoMercanciaCatalogo(String(this.idProcedimiento), String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          if (response && Array.isArray(response.datos)) {
            this.usoEspesificoDatos = response.datos.map((item: Catalogo) => item.descripcion);
            const SELECTED = this.mercanciaForm.getRawValue();
            this.seleccionadasUsoEspesificoDatos = Array.isArray(SELECTED.usoEspecifico)
              ? SELECTED.usoEspecifico
              : SELECTED.usoEspecifico
                ? [SELECTED.usoEspecifico]
                : [];
            this.seleccionadasUsoEspesificoDatos = JSON.parse(JSON.stringify(this.seleccionadasUsoEspesificoDatos));
          }
        })
    );
  }

  /**
   * Maneja el cambio de clasificación de producto.
   * Actualiza el valor en el formulario y carga el catálogo de especificar clasificación de producto.
   *
   * @param event - Objeto con el valor seleccionado de clasificación de producto.
   */
  onCambioClasificacionProducto(event: any): void {
    const CLASIFICACION_SELECCIONADA = event.clave;
    this.mercanciaForm
      .get('clasificacionProducto')
      ?.setValue(CLASIFICACION_SELECCIONADA);
    this.subscription.add(
      this.catalogoService
        .especificarClasificacionProductoCatalogo(
          String(this.idProcedimiento),
          String(CLASIFICACION_SELECCIONADA)
        )
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.especificarClasificacionProductoDatos = DATOS;
          }
        })
    );
  }

  /**
   * Inicializa los catálogos requeridos para el formulario de mercancía.
   * Carga los catálogos de clasificación de producto, tipo de producto, forma farmacéutica,
   * estado físico y unidades de medida comercial.
   *
   * @param tramite - Identificador del trámite para cargar los catálogos correspondientes.
   */
  inicializarCatalogo(tramite: string): void {
    this.subscription.add(
      this.catalogoService
        .clasificacionProductoCatalogo(tramite, String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.clasificacionProductoDatos = DATOS;
          }
        })
    );

    this.subscription.add(
      this.catalogoService
        .tiposProductoCatalogo(tramite, String(this.idProcedimiento))
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.tipoProductoDatos = DATOS;
          }
        })
    );

    // this.subscription.add(
    //   this.catalogoService
    //     .formaFarmaceuticaCatalogo(tramite)
    //     .pipe(takeUntil(this.destroyNotifier$))
    //     .subscribe((response) => {
    //       const DATOS = response.datos as Catalogo[];

    //       if (response) {
    //         this.formaFarmaceuticaDatos = DATOS;
    //       }
    //     })
    // );

    this.subscription.add(
      this.catalogoService
        .estadoFisicoMercanciaCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.estadoFisicoDatos = DATOS;
          }
        })
    );

    this.subscription.add(
      this.catalogoService
        .unidadesMedidaComercialCatalogo(tramite)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response) => {
          const DATOS = response.datos as Catalogo[];

          if (response) {
            this.cantidadUmcDatos = DATOS;
          }
        })
    );
  }

  /**
   * Lista de elementos que no son válidos.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que no cumplen con los criterios de validación.
   */
  public elementosNoValidos: string[] = [];
  /**
   * Arreglo que almacena los elementos añadidos.
   *
   * Este arreglo se utiliza para guardar una lista de cadenas que representan
   * los elementos que han sido agregados en el componente.
   */
  public elementosAnadidos: string[] = [];
  /**
   * Arreglo que almacena los elementos mandatorios.
   *
   * Este arreglo se utiliza para guardar una lista de cadenas que representan
   * los elementos que son obligatorios en el componente.
   */
  public elementosMandatorios: string[] = [];
  /**
   * @method crearMercanciaForm
   * @description Construye el formulario reactivo `mercanciaForm` con sus controles y validaciones.
   * Si `mercanciaFormState` tiene datos, los utiliza para inicializar los controles del formulario.
   */
  public elementosBelow: boolean = false;
  /**
   * Configuración para la clave de mercancía.
   *
   * Esta propiedad define la configuración utilizada para la tabla de selección
   * de claves de mercancía. Incluye el tipo de selección, la configuración de la tabla
   * y los datos asociados.
   *
   * Propiedades:
   * - `tipoSeleccionTabla`: Define el tipo de selección en la tabla (por ejemplo, CHECKBOX).
   * - `configuracionTabla`: Configuración específica de la tabla para mostrar las claves de mercancía.
   * - `datos`: Arreglo que contiene los datos de configuración de las claves de mercancía.
   */
  public claveConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: DATOS_MERCANCIA_CLAVE_TABLA,
    datos: [] as TablaMercanciaClaveConfig[],
  };
  /**
   * @property {TablaMercanciaClaveConfig[]} scianLista
   * Lista de registros Clave seleccionados.
   */
  public claveLista: TablaMercanciaClaveConfig[] = [];

  /**
   * @property {InputFecha} fechaDeFabricacioInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaDeFabricacioInput: InputFecha = FECHA_DE_FABRICACIO_PAGO;

  fechaDeCaducidadInputMercanica: InputFecha = FECHA_DE_CADUCIDAD_MERCANICA;

  fechaDeMovimientoInput: InputFecha = FECHA_DE_MOVIMIENTO;

  paisDestinoDatos: Catalogo[] = [];

  paisDeProcedenciaDatos: Catalogo[] = [];

  paisDeOrigenDatos: Catalogo[] = [];
  /**
   * @property {InputFecha} fechaDeCaducidadInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaDeCaducidadInput: InputFecha = FECHA_DE_CADUCIDAD_PAGO;

  /**
   * @method crossListRequirdos
   * @description Actualiza las etiquetas de los crosslists según los elementos requeridos.
   * Esta función verifica si los elementos requeridos están presentes y actualiza las etiquetas
   */
  crossListRequirdos(): void {
    this.usoEspesificoLabel.derecha = this.elementosRequirdos.includes(
      'usoEspecífico'
    )
      ? 'Uso específico seleccionado*:'
      : 'Uso específico seleccionado*:';
  }

  /**
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
  validarElementos(): void {
    this.elementosNoValidos = [];
    this.elementosAnadidos = [];
    this.elementosMandatorios = [];
    switch (this.idProcedimiento) {
      case 260604:
        this.elementosNoValidos = [
          'denominacionDistintiva',
          'denominacionComun',
          'numeroRegistroSanitario',
          'formaFarmaceutica',
        ];
        this.elementosAnadidos = [
          'estadoFisico',
          'especifique',
          'fechaDeFabricacio',
          'presentacion',
        ];
        break;
      default:
        if (this.detalleMercancia) {
          this.elementosNoValidos = [
            'denominacionDistintiva',
            'denominacionComun',
            'numeroRegistroSanitario',
            'formaFarmaceutica',
          ];
          this.elementosAnadidos = [
            'estadoFisico',
            'especifique',
            'fechaDeFabricacio',
            'presentacion',
          ];
        }
        break;
    }
  }


  /**
   * Crea y configura el formulario reactivo para la gestión de datos de mercancía.
   *
   * Este método inicializa un formulario con validaciones requeridas para cada campo,
   * utilizando los valores iniciales proporcionados por el estado `mercanciaFormState`.
   *
   * Campos incluidos en el formulario:
   * - `clasificacionProducto`: Clasificación del producto (requerido).
   * - `especificarClasificacionProducto`: Detalle de la clasificación del producto (requerido).
   * - `denominacionEspecificaProducto`: Denominación específica del producto (requerido).
   * - `denominacionDistintiva`: Denominación distintiva del producto (requerido).
   * - `denominacionComun`: Denominación común del producto (requerido).
   * - `tipoProducto`: Tipo de producto (requerido).
   * - `formaFarmaceutica`: Forma farmacéutica del producto (requerido).
   * - `estadoFisico`: Estado físico del producto (requerido).
   * - `fraccionArancelaria`: Fracción arancelaria del producto (requerido).
   * - `descripcionFraccion`: Descripción de la fracción arancelaria (requerido).
   * - `cantidadUmtValor`: Cantidad en unidad de medida de transporte (requerido).
   * - `cantidadUmt`: Unidad de medida de transporte (requerido).
   * - `cantidadUmcValor`: Cantidad en unidad de medida comercial (requerido).
   * - `cantidadUmc`: Unidad de medida comercial (requerido).
   * - `presentacion`: Presentación del producto (requerido).
   * - `numeroRegistroSanitario`: Número de registro sanitario (requerido).
   * - `fechaDeMovimiento`: Fecha de caducidad del producto (opcional).
   * - `paisDeOriginDatos`: País de origen del producto (requerido).
   * - `paisDeProcedenciaDatos`: País de procedencia del producto (requerido).
   *
   * @returns void
   */
  crearMercanciaForm(): void {
    const USO_ESPECIFICOS = this.obtenerValor('usoEspecifico') || [];
    this.seleccionadasUsoEspesificoDatos = this.convertToStringArray(USO_ESPECIFICOS);
    this.usoEspesificoColapsable = this.seleccionadasUsoEspesificoDatos.length > 0;


    this.mercanciaForm = this.fb.group({
      clasificacionProducto: [
        this.obtenerValor('clasificacionProducto'),
        [Validators.required],
      ],
      especificarClasificacionProducto: [
        this.obtenerValor('especificarClasificacionProducto'),
        [Validators.required],
      ],
      marcaComercialODenominacionDistintiva: [
        this.obtenerValor('marcaComercialODenominacionDistintiva'),
        [Validators.required],
      ],
      denominacionComunInternacional: [
        this.obtenerValor('denominacionComunInternacional'),
        [Validators.required],
      ],
      denominacionDistintiva: [
        this.obtenerValor('denominacionDistintiva'),
        [Validators.required],
      ],
      denominacionComun: [
        this.obtenerValor('denominacionComun'),
        [Validators.required],
      ],
      PorcentajeDeConcentracion: [
        this.obtenerValor('PorcentajeDeConcentracion'),
        [Validators.required],
      ],
      valorComercial: [
        this.obtenerValor('valorComercial'),
        [Validators.required],
      ],
      formaFarmaceutica: [this.obtenerValor('formaFarmaceutica'), [Validators.required]],
      tipoProducto: [this.obtenerValor('tipoProducto'), [Validators.required]],
      estadoFisico: [this.obtenerValor('estadoFisico'), [Validators.required]],
      fraccionArancelaria: [
        this.obtenerValor('fraccionArancelaria'),
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(SOLO_REGEX_NUMEROS),
        ],
      ],
      descripcionFraccion: [
        {
          value: this.obtenerValor('descripcionFraccion'),
          disabled: this.elementosDeshabilitados.includes('descripcionFraccion'),
        },
        [Validators.required],
      ],
      cantidadUmcValor: [
        this.obtenerValor('cantidadUmcValor'),
        [
          Validators.required,
          Validators.pattern(REGEX_DECIMAL),
          DatosMercanciaComponent.numeroUMCDecimalesValidator(),

        ],
      ],
      cantidadUmc: [this.obtenerValor('cantidadUmc'), [Validators.required]],
      presentacion: [this.obtenerValor('presentacion'), [Validators.required]],
      numeroRegistroSanitario: [
        this.obtenerValor('numeroRegistroSanitario')
      ],
      fechaDeMovimiento: [this.obtenerValor('fechaDeMovimiento')],
      paisDestino: [
        this.obtenerValor('paisDestino'),
        [Validators.required],
      ],
      paisProcedencia: [
        this.obtenerValor('paisProcedencia'),
        [Validators.required],
      ],
      paisDeOrigen: [
        this.obtenerValor('paisDeOrigen'),
        [Validators.required],
      ],
      usoEspecifico: [
        this.seleccionadasUsoEspesificoDatos,
        [Validators.required, matrizRequerida]
      ],
      especifique: [
        this.obtenerValor('especifique')
      ],
      especifiqueForma: [
        this.obtenerValor('especifiqueForma')
      ],
      especifiqueEstado: [this.obtenerValor('especifiqueEstado')],
      id: [this.obtenerValor('id')]
    });
    const MERCANCIA_FORM_DETALLE = this.mercanciaForm.getRawValue();
    setTimeout(() => {

      MERCANCIA_FORM_DETALLE.clasificacionProducto = this.getIdFromDescripcion(this.clasificacionProductoDatos, MERCANCIA_FORM_DETALLE.clasificacionProducto);
      MERCANCIA_FORM_DETALLE.especificarClasificacionProducto = this.getIdFromDescripcion(this.especificarClasificacionProductoDatos, MERCANCIA_FORM_DETALLE.especificarClasificacionProducto);
      MERCANCIA_FORM_DETALLE.tipoProducto = this.getIdFromDescripcion(this.tipoProductoDatos, MERCANCIA_FORM_DETALLE.tipoProducto);
      MERCANCIA_FORM_DETALLE.formaFarmaceutica = this.getIdFromDescripcion(this.formaFarmaceuticaDatos, MERCANCIA_FORM_DETALLE.formaFarmaceutica);
      MERCANCIA_FORM_DETALLE.estadoFisico = this.getIdFromDescripcion(this.estadoFisicoDatos, MERCANCIA_FORM_DETALLE.estadoFisico);
      MERCANCIA_FORM_DETALLE.fraccionArancelaria = this.getIdFromDescripcion(this.fraccionArancelariaDatos, MERCANCIA_FORM_DETALLE.fraccionArancelaria);
      MERCANCIA_FORM_DETALLE.cantidadUmc = this.getIdFromDescripcion(this.cantidadUmcDatos, MERCANCIA_FORM_DETALLE.cantidadUmc);
      this.mercanciaForm.patchValue(MERCANCIA_FORM_DETALLE);
    }, 500);

    const CONTROLS_A_ELIMINAR = [...this.elementosNoValidos];
    if (this.detalleMercancia) {
      CONTROLS_A_ELIMINAR.push('formaFarmaceutica', 'denominacionDistintiva');
    }

    for (const NOMBRE_DEL_CONTROL of CONTROLS_A_ELIMINAR) {
      if (this.mercanciaForm.contains(NOMBRE_DEL_CONTROL)) {
        this.mercanciaForm.removeControl(NOMBRE_DEL_CONTROL, {
          emitEvent: false,
        });
      }
    }

    // Add dynamic controls
    for (const NOMBRE_DEL_CONTROL of this.elementosAnadidos) {
      if (!this.mercanciaForm.contains(NOMBRE_DEL_CONTROL)) {
        // Determine if this field is mandatory
        const IS_MANDATORY = this.elementosMandatorios.includes(NOMBRE_DEL_CONTROL);
        const VALIDATORS = IS_MANDATORY ? [Validators.required] : [];

        this.mercanciaForm.addControl(
          NOMBRE_DEL_CONTROL,
          new FormControl(
            this.obtenerValor(NOMBRE_DEL_CONTROL as keyof MercanciaForm),
            { validators: VALIDATORS }
          )
        );
      }
    }
  }
  updateValidation(): void {
    const TIPO_PRODUCTO = this.mercanciaForm.get('tipoProducto')?.value;
    if (this.elementosAnadidos.includes('especifique') && TIPO_PRODUCTO === this.tipoProductoEspecial) {
      this.mercanciaForm.get('especifique')?.setValidators([Validators.required]);
    }
    const FORMA_FARMACEUTICA = this.mercanciaForm.get('formaFarmaceutica')?.value;
    if (this.elementosAnadidos.includes('especifiqueForma') && FORMA_FARMACEUTICA === this.tipoProductoEspecial) {
      this.mercanciaForm.get('especifiqueForma')?.setValidators([Validators.required]);
    }
    this.mercanciaForm.get('especifique')?.updateValueAndValidity();
    this.mercanciaForm.get('especifiqueForma')?.updateValueAndValidity();
  }


  static numeroConDecimalesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const VALUE = control.value;

      // Skip validation if empty
      if (!VALUE) {
        return null;
      }

      // Regex pattern: up to 12 digits before decimal, up to 10 after
      const PATTERN = /^\d{1,12}(\.\d{1,5})?$/;

      if (!PATTERN.test(VALUE)) {
        return { formatoInvalido: true };
      }

      return null;
    };
  }
  public getIdFromDescripcion(
    array: Catalogo[],
    descripcion: string | number
  ): number | string | undefined {
    // If descripcion is a string, find by descripcion (case-insensitive)
    if (typeof descripcion === 'string') {
      const ITEM = array.find(el => el.descripcion.toLowerCase() === descripcion.toLowerCase());
      return ITEM ? ITEM.id : descripcion; // Return ID if found, else return original descripcion
    }

    // If descripcion is already a number (ID), just return it
    return descripcion;
  }

  static numeroUMCDecimalesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const VALUE = control.value;

      // Skip validation if empty
      if (!VALUE) {
        return null;
      }

      // Regex pattern: up to 12 digits before decimal, up to 10 after
      const PATTERN = /^\d{1,12}(\.\d{1,10})?$/;

      if (!PATTERN.test(VALUE)) {
        return { formatoInvalido: true };
      }

      return null;
    };
  }

  /**
  * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
  * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
  * @returns {string | number | undefined | string[]} - Valor del campo especificado.
  */
  public obtenerValor(
    field: keyof TablaMercanciasDatos | keyof MercanciaForm
  ): string | number | undefined | string[] | Catalogo | undefined {
    return (
      (this.datoSeleccionado && this.datoSeleccionado[field as keyof TablaMercanciasDatos]) ??
      (this.mercanciaFormState && this.mercanciaFormState[field as keyof MercanciaForm])
    );
  }


  public convertToStringArray(value: unknown): string[] {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return [value];
    }
    if (typeof value === 'number') {
      return [value.toString()];
    }
    return [];
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Método que se ejecuta cuando cambia la selección de países de origen.
   * Actualiza la lista de países seleccionados y sincroniza el formulario de mercancía
   * con los datos seleccionados.
   *
   * @param events - Arreglo de cadenas que representa los países seleccionados.
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.mercanciaForm.patchValue({
      paisDeOriginDatos: events,
    });
  }


  /**
   * Maneja el evento de cambio para las selecciones de uso específico.
   *
   * @param events - Un arreglo de cadenas que representa las selecciones actuales de uso específico.
   *
   * Este método actualiza la propiedad `seleccionadasUsoEspesificoDatos` con las selecciones proporcionadas
   * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `usoEspecifico`.
   */
  usoEspesificoSeleccionadasChange(events: string[]): void {
    this.seleccionadasUsoEspesificoDatos = events;
    this.mercanciaForm.get('usoEspecifico')?.setValue(events);
  }

  /**
   * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
   *
   * @param orden - Número que indica la sección a modificar:
   *   - 1: Alterna el estado de `paisDeOriginColapsable`.
   *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
   *   - 3: Alterna el estado de `usoEspesificoColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
    } else if (orden === 2) {
      this.paisDeProcedenciaColapsable = !this.paisDeProcedenciaColapsable;
    } else if (orden === 3) {
      this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
    }
  }

  /**
   * Agrega una nueva mercancía utilizando los datos del formulario actual
   * y emite un evento con la información de la mercancía seleccionada.
   * Luego, navega de regreso a la ubicación anterior.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancia(): void {

    Object.keys(this.mercanciaForm.controls).forEach(c => {
      console.log(c, this.mercanciaForm.get(c)?.errors);
    });
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
      this.mensajeDeError = 'Faltan campos por capturar.';
      return;
    }
    this.mensajeDeError = '';
    const VALORTABLAMERCANCIA: TablaMercanciasDatos = this.mercanciaForm.getRawValue();

    /**
    * @description
    * Genera un identificador aleatorio compuesto únicamente por números.
    * El resultado siempre será un número entero de 6 dígitos (entre 100000 y 999999).
    * @returns {number} Un número aleatorio de 6 dígitos.
    */
    const ID = Math.floor(100000 + Math.random() * 900000);
    VALORTABLAMERCANCIA.id = this.mercanciaForm.get('id')?.value ? this.mercanciaForm.get('id')?.value : ID
    // Set additional values
    VALORTABLAMERCANCIA.usoEspecifico = this.mercanciaForm.get('usoEspecifico')?.value;
    VALORTABLAMERCANCIA.unidadMedidaComercializacion = this.mercanciaForm.get('cantidadUmcValor')?.value;
    VALORTABLAMERCANCIA.cantidadUMC = this.mercanciaForm.get('cantidadUmc')?.value;
    VALORTABLAMERCANCIA.unidadMedidaTarifa = this.mercanciaForm.get('cantidadUmtValor')?.value;
    VALORTABLAMERCANCIA.cantidadUMT = this.mercanciaForm.get('cantidadUmt')?.value;
    const CLASIFICACIONID = this.mercanciaForm.get('clasificacionProducto')?.value;
    const CLASIFICACIONOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.clasificacionProductoDatos, CLASIFICACIONID);
    VALORTABLAMERCANCIA.clasificacionProducto = CLASIFICACIONOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.claveClasificacionProductoObj = CLASIFICACIONOBJ?.[0] ?? undefined;

    /**
     * @description
     * Obtiene y asigna los valores correspondientes al campo **"Especificar Clasificación del Producto"**
     * desde el formulario reactivo, utilizando el catálogo `especificarClasificacionProductoDatos`.
     * * @constant {string | number} ESPECIFICARCLASIFICACIONID - Valor seleccionado en el campo del formulario.
     * @constant {any[]} ESPECIFICARCLASIFICACIONOBJ - Objeto obtenido del catálogo correspondiente.
     * @property {string} especificarClasificacionProducto - Descripción del valor seleccionado.
     * @property {object | undefined} especificarClasificacionObj - Objeto completo del catálogo.
     */
    const ESPECIFICARCLASIFICACIONID = this.mercanciaForm.get('especificarClasificacionProducto')?.value;
    const ESPECIFICARCLASIFICACIONOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.especificarClasificacionProductoDatos, ESPECIFICARCLASIFICACIONID);
    VALORTABLAMERCANCIA.especificarClasificacionProducto = ESPECIFICARCLASIFICACIONOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.especificarClasificacionObj = ESPECIFICARCLASIFICACIONOBJ?.[0] ?? undefined;

    /**
     * @description
     * Obtiene y asigna los valores correspondientes al campo **"Tipo de Producto"**
     * desde el formulario reactivo, utilizando el catálogo `tipoProductoDatos`.
     *
     * @constant {string | number} TIPOPRODUCTOID - Valor seleccionado en el formulario.
     * @constant {any[]} TIPOPRODUCTOOBJ - Objeto obtenido del catálogo correspondiente.
     * @property {string} tipoProducto - Descripción del tipo de producto seleccionado.
     * @property {object | undefined} tipoProductoObj - Objeto completo asociado al tipo de producto.
     */
    const TIPOPRODUCTOID = this.mercanciaForm.get('tipoProducto')?.value;
    const TIPOPRODUCTOOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.tipoProductoDatos, TIPOPRODUCTOID);
    VALORTABLAMERCANCIA.tipoProducto = TIPOPRODUCTOOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.tipoProductoObj = TIPOPRODUCTOOBJ?.[0] ?? undefined;

    /**
     * @description
     * Obtiene y asigna los valores correspondientes al campo **"Forma Farmacéutica"**
     * utilizando el catálogo `formaFarmaceuticaDatos`.
     *
     * @constant {string | number} FORMAFARMACEUTICAID - ID del valor seleccionado.
     * @constant {any[]} FORMAFARMACEUTICAOBJ - Objeto del catálogo con la descripción correspondiente.
     * @property {string} formaFarmaceutica - Descripción de la forma farmacéutica seleccionada.
     * @property {object | undefined} formaFarmaceuticaObj - Objeto completo de la forma farmacéutica.
     */
    const FORMAFARMACEUTICAID = this.mercanciaForm.get('formaFarmaceutica')?.value;
    const FORMAFARMACEUTICAOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.formaFarmaceuticaDatos, FORMAFARMACEUTICAID);
    VALORTABLAMERCANCIA.formaFarmaceutica = FORMAFARMACEUTICAOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.formaFarmaceuticaObj = FORMAFARMACEUTICAOBJ?.[0] ?? undefined;

    /**
     * @description
     * Obtiene y asigna los valores correspondientes al campo **"Estado Físico"**
     * utilizando el catálogo `estadoFisicoDatos`.
     *
     * @constant {string | number} ESTADOFISICOID - ID seleccionado del formulario.
     * @constant {any[]} ESTADOFISICOOBJ - Objeto del catálogo con su descripción.
     * @property {string} estadoFisico - Descripción del estado físico seleccionado.
     * @property {object | undefined} estadoFisicoObj - Objeto completo con la información del estado físico.
     */
    const ESTADOFISICOID = this.mercanciaForm.get('estadoFisico')?.value;
    const ESTADOFISICOOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.estadoFisicoDatos, ESTADOFISICOID);
    VALORTABLAMERCANCIA.estadoFisico = ESTADOFISICOOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.estadoFisicoObj = ESTADOFISICOOBJ?.[0] ?? undefined;

    /**
     * @description
     * Obtiene y asigna los valores correspondientes al campo **"Unidad de Medida Comercialización (UMC)"**
     * utilizando el catálogo `cantidadUmcDatos`.
     *
     * @constant {string | number} UMCID - ID del valor seleccionado.
     * @constant {any[]} UMCOBJ - Objeto obtenido del catálogo.
     * @property {string} cantidadUMC - Descripción de la unidad de medida comercialización.
     * @property {object | undefined} cantidadUMCObj - Objeto completo con los datos de la UMC.
     */
    const UMCID = this.mercanciaForm.get('cantidadUmc')?.value;
    const UMCOBJ = DatosMercanciaComponent.generarCatalogoObjeto(this.cantidadUmcDatos, UMCID);
    VALORTABLAMERCANCIA.cantidadUMC = UMCOBJ?.[0]?.descripcion ?? '';
    VALORTABLAMERCANCIA.cantidadUMCObj = UMCOBJ?.[0] ?? undefined;

    // Emit the merchandise data
    this.mercanciaSeleccionado.emit(VALORTABLAMERCANCIA);

    // Reset form for next use
    this.mercanciaForm.reset();

    // Close the modal
    this.cerrarModal.emit();
  }

  /**
   * Genera un arreglo de objetos de catálogo que coinciden con el identificador proporcionado.
   *
   * @param {Catalogo[]} catalogo - Arreglo de objetos de catálogo.
   * @param {string} id - Identificador para filtrar los objetos del catálogo.
   * @returns {Catalogo[] | undefined} - Arreglo de objetos de catálogo que coinciden con el identificador, o undefined si no hay coincidencias.
   */
  static generarCatalogoObjeto(catalogo: Catalogo[] | undefined | null, id: string): Catalogo[] | undefined {
    if (!catalogo || catalogo.length === 0) {
      return undefined;
    }
    return catalogo.filter(item => item.clave === id);
  }

  /**
   * Restablece el formulario de mercancía a su estado inicial.
   * Este método se utiliza para limpiar todos los campos del formulario,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarMercancia(): void {
    this.seleccionadasUsoEspesificoDatos = [];
    this.seleccionadasPaisDeOriginDatos = [];
    this.mercanciaForm.reset();
  }

  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(): void {
    this.cerrarModal.emit();
  }
  /**
   * @method cambiarFraccionArancelaria
   * @description Actualiza los valores de los campos `descripcionFraccion` y `cantidadUmt` en el formulario reactivo `mercanciaForm`
   * cuando el campo `fraccionArancelaria` está presente.
   *
   * @remarks
   * Este método verifica si el control `fraccionArancelaria` existe en el formulario. Si es así, establece valores predeterminados
   * para los campos `descripcionFraccion` y `cantidadUmt` utilizando las constantes `DESCRIPCION_FRACCION_DESHABILITADO_VALOR` y
   * `UMT_DESHABILITADO_VALOR`, respectivamente.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cambiarFraccionArancelaria(): void {
    const FRACCION = this.mercanciaForm.get('fraccionArancelaria')?.value;
    if (!FRACCION || FRACCION.length < 8) {
      this.mercanciaForm.get('descripcionFraccion')?.setValue('');
      this.mercanciaForm.get('cantidadUmt')?.setValue('');
    } else if (FRACCION.length === 8) {
      if (isNaN(Number(FRACCION))) {
        this.abrirModal();
      } else {
        this.datosSolicitudService.obtenerFraccionesArancelarias(this.idProcedimiento, FRACCION)
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe(
            (response) => {
              if (response.codigo === "00") {
                const DATOS_FRACCION = response.datos as { descripcionAlternativa: string };
                this.mercanciaForm.get('descripcionFraccion')?.setValue(DATOS_FRACCION.descripcionAlternativa);
              } else {
                this.abrirModal();
              }
            }
          );
        this.datosSolicitudService.obtenerUMT(this.idProcedimiento, FRACCION)
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe(
            (response) => {
              if (response.codigo === "00") {
                const DATOS_UMT = response.datos as { descripcion: string };
                this.mercanciaForm.get('cantidadUmt')?.setValue(DATOS_UMT.descripcion);
              } else {
                this.abrirModal();
              }
            }
          );
      }
    }
  }


  /**
   * Valida la longitud de la fracción arancelaria ingresada en el formulario.
   * Si la longitud es menor a 8 caracteres, establece `showLimitError` en true,
   * de lo contrario, lo establece en false.
   * */
  public validarFraccionArancelaria(): void {
    const FRACCION_ARANCELARIA = this.mercanciaForm.get(
      'fraccionArancelaria'
    )?.value;
    if (FRACCION_ARANCELARIA?.length < 8) {
      this.showLimitError = true;
    } else {
      this.showLimitError = false;
    }
  }

  /**
   * Método que se llama cuando se elimina un pedimento.
   * @param {boolean} borrar - Indica si se debe eliminar el pedimento.
   * Si es verdadero, se elimina el pedimento en la posición `elementoParaEliminar` del arreglo `pedimentos`.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Actualiza el valor del campo `fechaDeFabricacio` en el formulario `mercanciaForm`.
   *
   * @param valor - Cadena que representa la fecha de fabricación seleccionada.
   *
   * @example
   * this.fechaDeFabricacioValor('17/09/2025');
   */
  fechaDeFabricacioValor(valor: string): void {
    this.mercanciaForm.patchValue({
      fechaDeFabricacio: valor,
    });
  }

  /**
   * Actualiza el valor del campo `fechaDeCaducidad` en el formulario `mercanciaForm`.
   *
   * @param valor - Cadena que representa la fecha de caducidad seleccionada.
   *
   * @example
   * this.fechaDeMovimientoValor('01/01/2026');
   */
  fechaDeMovimientoValor(valor: string): void {
    this.mercanciaForm.patchValue({
      fechaDeMovimiento: valor,
    });
  }

  /**
   * Maneja el cambio de tipo de producto.
   * Actualiza el objeto `tipoProductoObj` en el componente con el catálogo correspondiente
   * al tipo de producto seleccionado en el formulario.
   *
   * @param clave - Objeto de catálogo seleccionado para el tipo de producto.
   */
  onCambioTipoProduct(clave: Catalogo): void {
    const TIPOPRODUCTOID = this.mercanciaForm.get('tipoProducto')?.value;
    this.tipoProductoObj = DatosMercanciaComponent.generarCatalogoObjeto(
      this.tipoProductoDatos,
      TIPOPRODUCTOID
    );
  }

  /**
   * Método que se llama cuando se envía el formulario.
   * Se utiliza para establecer los valores en el store de DatosDomicilioLegal.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'La fracción ingresada no se encuentra en el acuerdo de fracciones reguladas, favor de verificar.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

export function matrizRequerida(
  control: AbstractControl
): ValidationErrors | null {
  const VALUE = control.value;
  return Array.isArray(VALUE) && VALUE.length === 0 ? { required: true } : null;
}
