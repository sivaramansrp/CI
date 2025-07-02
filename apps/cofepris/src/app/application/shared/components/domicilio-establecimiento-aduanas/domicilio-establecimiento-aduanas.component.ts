import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store';
import { CROSLISTA_DE_PAISES, INPUT_FECHA_CADUCIDAD_CONFIG, } from '../../constantes/datos-domicilio-legal.enum';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrossListLable, CrosslistComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { DATOS_MERCANCIAS, MercanciasInfo, NICO_TABLA, NicoInfo, } from '../../models/datos-domicilio-legal.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
import { DatosDomicilioService } from '../../../tramites/260512/services/datos-domicilio.service'
import { InputCheckComponent } from '@libs/shared/data-access-user/src';

/**
 * Representa la estructura de la respuesta de una tabla.
 */
export interface RespuestaTabla {
  /**
   * Código de estado de la respuesta.
   * @type {number}
   */
  code: number;

  /**
   * Datos de tipo NicoInfo que contiene la respuesta.
   * @type {NicoInfo[]}
   */
  data: NicoInfo[];

  /**
   * Mensaje descriptivo de la respuesta.
   * @type {string}
   */
  message: string;
}

/**
 * Interfaz que representa la estructura de datos para la tabla de mercancías.
 */
export interface MercanciasTabla {
  /**
   * Código de estado que indica el resultado de la operación.
   * @type {number}
   */
  code: number;

  /**
   * Lista de información detallada sobre las mercancías.
   * @type {MercanciasInfo[]}
   */
  data: MercanciasInfo[];

  /**
   * Mensaje descriptivo relacionado con el resultado de la operación.
   * @type {string}
   */
  message: string;
}

/**
 * Componente para el domicilio del establecimiento.
 */
@Component({
  selector: 'app-domicillo-establecimiento-aduanas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    InputCheckComponent
  ],
  templateUrl: './domicilio-establecimiento-aduanas.component.html',
  styleUrls: ['./domicilio-establecimiento-aduanas.component.css'],
})
export class DomicilioEstablecimientoAduanasComponent implements OnInit, OnDestroy {
  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: SolicitudState;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para el mensaje de alerta.
   */
  INPUT_FECHA_CADUCIDAD_CONFIG = INPUT_FECHA_CADUCIDAD_CONFIG;
  
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param fb
   * @param DatosDomicilioLegalStore
   * @param DatosDomicilioLegalQuery
   * @param service
   */
  constructor(
    public readonly fb: FormBuilder,
    private avisocalidadStore: AvisocalidadStore,
    private avisocalidadQuery: AvisocalidadQuery,
    private service: DatosDomicilioLegalService,
    private consultaioQuery: ConsultaioQuery,
    private datosDomicilioService: DatosDomicilioService
  ) {
    // Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} domicilio
   */
  domicilio!: FormGroup;

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
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = DATOS_MERCANCIAS;

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
  public aduanasDeLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas de entrada disponibles',
    derecha: 'Aduanas de entrada seleccionadas*',
  };

  /**
  * Etiqueta de la lista de fechas.
  * */
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
    * Etiqueta de la lista de fechas.
    * */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia:',
    derecha: 'País(es) seleccionado(s)*:',
  };


  /**
   * Etiqueta de la lista de fechas.
   * */
  ngOnInit(): void {

     /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()

    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
    this.configurarGrupoForm(); // Configura el grupo de formularios con los valores iniciales.

  }

  /**
   * @method configurarGrupoForm
   * @description Configures the reactive form group for the "Datos del Establecimiento RFC" component.
   * This method initializes the form group with default values and validation rules for the fields:
   * - `rfcDel`: Optional field with a maximum length of 254 characters.
   * - `denominacionRazonSocial`: Required field with a maximum length of 254 characters.
   * - `correoElectronico`: Required field with a valid email format and a maximum length of 320 characters.
   * 
   * @memberof DatosDelEstablecimientoRfcComponent
   */
  configurarGrupoForm(): void {
     this.avisocalidadQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    /* 
    * Inicializa el grupo de formularios con los valores del estado de la solicitud.
    */
    this.domicilio = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.maxLength(12)]],
      estado: [this.solicitudState?.estado, Validators.required],
      muncipio: [this.solicitudState?.muncipio, Validators.required , Validators.maxLength(120)],
      localidad: [this.solicitudState?.localidad],
      colonia: [this.solicitudState?.colonia],
      calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(100)]],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, [Validators.required, Validators.maxLength(30)]],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox, Validators.required],
      licenciaSanitaria: [
        { value: this.solicitudState?.licenciaSanitaria, disabled: false }, [Validators.required]],
    });

    /** 
     *Inicializa el grupo de formularios para el agente aduanal y las mercancías.
     */
    this.formAgente = this.fb.group({
      claveScianModal: [this.solicitudState?.claveScianModal, Validators.required],
      claveDescripcionModal: [this.solicitudState?.claveDescripcionModal],
    });

    /** 
     * Inicializa el grupo de formularios para las mercancías con los valores del estado de la solicitud.
     */ 
    this.formMercancias = this.fb.group({
      nombreComercial: [this.solicitudState?.nombreComercial, Validators.required],
      nombreComun: [this.solicitudState?.nombreComun, Validators.required],
      nombreCientifico: [this.solicitudState?.nombreCientifico, Validators.required],
      usoEspecifico: [this.solicitudState?.usoEspecifico, Validators.required],
      estadofisico: [this.solicitudState?.estadoFisico, Validators.required],
      fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
      descripcionFraccion: [{ value: this.solicitudState?.descripcionFraccion, disabled: true }, Validators.required],
      cantidadUMT: [this.solicitudState?.cantidadUMT, Validators.required],
      UMT: [{ value: this.solicitudState?.UMT, disabled: true }, Validators.required],
      cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
      UMC: [this.solicitudState?.UMC, Validators.required],
      numerocas: [this.solicitudState?.numeroCas, Validators.required],
      porcentajeConcentracion: [this.solicitudState?.porcentajeConcentracion, Validators.required],
      clasificacionToxicologica: [this.solicitudState?.clasificacionToxicologica, Validators.required],
      objetoImportacion: [this.solicitudState?.objetoImportacion, Validators.required],
    });

     /*
     * Si el formulario está en modo solo lectura, deshabilita todos los campos.
     * En caso contrario, habilita los campos para permitir la edición.
     * Esto asegura que el formulario refleje correctamente el estado de solo lectura.
     */
    if (this.esFormularioSoloLectura && this.domicilio && this.formAgente && this.formMercancias) {
      this.domicilio.disable();
      this.formAgente.disable();
      this.formMercancias.disable();

    } else {
      this.domicilio.enable();
      this.formAgente.enable();
      this.formMercancias.enable();
    }

  }
  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  readonly paisDeProcedenciaBotones = [
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
    this.datosDomicilioService
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
    this.datosDomicilioService
      .getObtenerMercanciasDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
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
 * @description
 * Método que actualiza el estado del store con los valores del formulario.
 * @param form Formulario reactivo.
 * @param campo Campo del formulario que se desea actualizar.
 * @param metodoNombre Nombre del método del store que se invocará.
 */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof AvisocalidadStore): void {
    const VALOR = form.get(campo)?.value;
    (this.avisocalidadStore[metodoNombre] as (value: string | number) => void)(VALOR);
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
