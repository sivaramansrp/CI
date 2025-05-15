import {
  CROSLISTA_DE_ADUANAS_ENTRADA,
  CROSLISTA_DE_PAISES,
  DEFAULT_CONFIGURACION_VISIBILIDAD,
  INPUT_FECHA_CADUCIDAD_CONFIG,
} from '../../constantes/datos-domicilio-legal.enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
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
import { CommonModule } from '@angular/common';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
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
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery,
    private service: DatosDomicilioLegalService
  ) {
    // constructor
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
    tituluDeLaIzquierda: 'Aduanas de entrada disponibles',
    derecha: 'Aduanas de entrada seleccionadas',
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
   * Indica si la sección es colapsableTres.
   * @property {boolean} colapsableTres
   */
  colapsableTres: boolean = false;

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
   * Etiqueta de la lista de fechas.
   * */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

  /**
   * Objeto que representa la configuración de etiquetas para la selección de país de origen.
   * 
   * @property {string} tituluDeLaIzquierda - Etiqueta que se muestra a la izquierda, indicando el título "País de origen".
   * @property {string} derecha - Etiqueta que se muestra a la derecha, indicando los países seleccionados.
   */
  public paisDeOrigen: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionados',
  };
  /**
   * Etiqueta de la lista de fechas.
   * */
  ngOnInit(): void {
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
    this.domicilio = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, Validators.required],
      estado: [this.solicitudState?.estado, Validators.required],
      muncipio: [this.solicitudState?.muncipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      colonia: [this.solicitudState?.colonia],
      calle: [this.solicitudState?.calle],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox],
      licenciaSanitaria: [
        { value: this.solicitudState?.licenciaSanitaria, disabled: false },
      ],
      regimen: [this.solicitudState?.regimen],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas],
      numeroPermiso: [this.solicitudState?.numeroPermiso],
      paisDeOriginDatos: [this.solicitudState?.aduanasDeEntrada || []],
      garantiasOfrecidas: [this.solicitudState?.garantiasOfrecidas],
    });

    this.formAgente = this.fb.group({
      claveScianModal: ['', Validators.required],
      claveDescripcionModal: [''],
    });
    this.formMercancias = this.fb.group({
      nombreComercial: ['', Validators.required],
      nombreComun: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      usoEspecifico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      porcentajeConcentracion: ['', Validators.required],
      numeroRegistro: ['', Validators.required],
      clasificacionToxicologica: ['', Validators.required],
      objetoImportacion: ['', Validators.required],
    });
    this.seleccionadasAduanasEntradaDatos=this.solicitudState?.aduanasDeEntrada;
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
        this.estado = data?.data;
      });
  }

  /**
   * Método para obtener el valor de la fecha seleccionada.
   */
  obtenerTablaDatos(): void {
    this.service
      .getObtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.nicoTablaDatos = data?.data;
      });
  }

  /**
   * Método para obtener el valor de la fecha seleccionada.
   */
  obtenerMercanciasDatos(): void {
    this.service
      .getObtenerMercanciasDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
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
      this.DatosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
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
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
