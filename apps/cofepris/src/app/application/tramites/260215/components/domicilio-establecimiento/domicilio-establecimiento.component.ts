import {
  CROSLISTA_DE_PAISES,
  INPUT_FECHA_CADUCIDAD_CONFIG,
} from '../../enum/permiso.enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputFechaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MERCANCIAS_DATA,
  MercanciasInfo,
  NICO_TABLA,
  NicoInfo,
} from '../../models/permiso-sanitario.model';
import {
  Solicitud260215State,
  Tramite260215Store,
} from '../../estados/tramites/tramite260215.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
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
 * Componente Angular para la gestión del domicilio del establecimiento en el trámite sanitario.
 *
 * Este componente permite capturar, editar y visualizar la información del domicilio del establecimiento,
 * así como la gestión de mercancías y agentes aduanales asociados. Utiliza formularios reactivos,
 * tablas dinámicas y listas cruzadas para la selección de países y mercancías.
 *
 * Funcionalidades principales:
 * - Manejo de formularios reactivos para domicilio, agente y mercancías.
 * - Integración con servicios para la obtención y persistencia de datos.
 * - Alternancia de secciones colapsables para una mejor experiencia de usuario.
 * - Soporte para modo solo lectura y actualización automática según el estado del trámite.
 * - Gestión de listas cruzadas y tablas dinámicas para la selección de países y mercancías.
 *
 * Uso:
 * Este componente se utiliza dentro del flujo de captura de información de un trámite sanitario,
 * permitiendo al usuario ingresar y consultar los datos del domicilio del establecimiento y sus mercancías.
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
    InputFechaComponent,
  ],
  templateUrl: './domicilio-establecimiento.component.html',
  styleUrls: ['./domicilio-establecimiento.component.css'],
})
export class DomicilioComponent implements OnInit, OnDestroy {
  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
 public esFormularioSoloLectura: boolean = false;

  /**
   * Constante para el mensaje de alerta.
   */
 public INPUT_FECHA_CADUCIDAD_CONFIG = INPUT_FECHA_CADUCIDAD_CONFIG;
  /**
   * Constructor del componente.
   * @param fb
   * @param tramite260215Store
   * @param tramite260215Query
   * @param service
   */
 

  /**
   * Constructor de DomicilioEstablecimientoComponent.
   *
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param tramite260215Store Store para el manejo del estado relacionado al trámite 260215.
   * @param tramite260215Query Query para consultar el estado del trámite 260215.
   * @param service Servicio para operaciones relacionadas con permisos sanitarios.
   * @param consultaioQuery Query para consultar el estado de la sección de Consultaio.
   *
   * Suscribe al estado de `Consultaio` para obtener información actualizada sobre el estado del formulario.
   * Asigna el valor de solo lectura a la propiedad `esFormularioSoloLectura` y llama a `inicializarEstadoFormulario()`
   * cada vez que el estado cambia. La suscripción se cancela automáticamente al destruir el componente para evitar fugas de memoria.
   */
  constructor(
    private readonly fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
    private service: ServiciosPermisoSanitarioService,
    private consultaioQuery: ConsultaioQuery,
  ) {
       /**
         * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
         *
         * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
         * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
         * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
         */
        this.consultaioQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState)=>{
            this.esFormularioSoloLectura = seccionState.readonly; 
          })
        )
        .subscribe()
      }


/**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.domicilio.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.domicilio.enable();
      }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

/**
 * Inicializa los formularios reactivos utilizados en el componente, así como la obtención de datos necesarios para su funcionamiento.
 * 
 * - Suscribe al observable `selectSolicitud$` para obtener y asignar el estado de la solicitud actual.
 * - Llama a los métodos para obtener la lista de estados, la tabla de datos y los datos de mercancías.
 * - Configura los formularios `domicilio`, `formAgente` y `formMercancias` con sus respectivos controles y validadores.
 * 
 * @remarks
 * Este método debe ser llamado durante la inicialización del componente para asegurar que los formularios y datos requeridos estén disponibles.
 */
 inicializarFormulario(): void {
       this.tramite260215Query.selectSolicitud$
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
    });

    this.formAgente = this.fb.group({
      claveScianModal: ['', Validators.required],
      claveDescripcionModal: [''],
    });

    this.formMercancias = this.fb.group({
      clasificacion: ['', Validators.required],
      especificar: ['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      presentacion: ['', Validators.required],
      numeroRegistro: ['', Validators.required],
      fechaCaducidad: [''],
    });
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} domicilio
   */
 public domicilio!: FormGroup;

  /**
   * Grupo de formularios para el agente aduanal.
   */
 public formAgente!: FormGroup;

  /**
   * Grupo de formularios para las mercancias.
   */
public formMercancias!: FormGroup;

  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
 public aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
 public aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Control de formulario para la aduanasDeEntradaFechaSeleccionada.
   */
 public estado: Catalogo[] = [];

  /**
   * Lista de paises.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Tabla de selección de checkbox.
   */
 public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Tabla de selección de radio.
   */
 public nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos de la tabla de selección de radio.
   */
 public nicoTablaDatos: NicoInfo[] = [];

  /**
   * Tabla de selección de checkbox.
   */
 public mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de selección de checkbox.
   */
 public mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Lista de aduanas de entrada seleccionadas.
   */
 public aduanasDeEntradaSeleccionadas: string[] = [];

  /**
   * Lista de aduanas de entrada seleccionadas.
   */
 public aduanasDeEntradaDatos: string[] = [];

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
 public colapsable: boolean = false;

  /**
   * Indica si la sección es colapsableDuos.
   * @property {boolean} colapsableDuos
   */
public colapsableDuos: boolean = false;

  /**
   * Indica si la sección es colapsableTres.
   * @property {boolean} colapsableTres
   */
 public colapsableTres: boolean = false;

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
 public seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * Lista de rangos de días seleccionarOrigenDelPaisDuos.
   */
 public seleccionarOrigenDelPaisDuos: string[] = this.crosListaDePaises;

  /**
   * Lista de rangos de días seleccionarOrigenDelPaisTres.
   */
 public seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
   * Etiqueta de la lista de fechas.
   * */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

  
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a la función `inicializarEstadoFormulario` para configurar el estado inicial del formulario.
   */
  ngOnInit():void {
   this.inicializarEstadoFormulario();
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
  mostrar_colapsable():void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsableDuos
   */
  mostrar_colapsableDuos():void {
    this.colapsableDuos = !this.colapsableDuos;
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsableTres
   */
  mostrar_colapsableTres():void {
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
    metodoNombre: keyof Tramite260215Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramite260215Store[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
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
