import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Subject, delay, map, takeUntil, tap } from 'rxjs';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import {
  ERROR_FORMA_ALERT,
  EXPEDICION_FACTURA_FECHA,
  VALIDO,
} from '../../constantes/elegibilidad-de-textiles.enums';

import {
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';

import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';

import { CapturarColumns } from '../../models/elegibilidad-de-textiles.model';

import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';

import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';


/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 */
@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
})
export class CapturarFacturasComponent implements OnInit, OnDestroy {
  /**
   * Getter para exponer el FormGroup principal como 'formGroup' para integración con el padre.
   */
  public get formGroup(): FormGroup {
    return this.facturaForm;
  }
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input()
  formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} facturaForm - El grupo de formularios para capturar los datos de las facturas.
   */
  facturaForm!: FormGroup;

    /**
   * @property {string} formularioAlertaError
   * @description
   * Mensaje HTML que se muestra cuando el formulario no es válido y faltan campos requeridos por capturar.
   * Se utiliza para mostrar una alerta visual al usuario en la interfaz.
   * Vacío cuando el formulario es válido.
   */
  public formularioAlertaError: string = '';

  /**
   * @property {boolean} esFormaValido
   * @description
   * Bandera booleana que indica si el formulario tiene errores de validación.
   * Si es `true`, se muestra el mensaje de error; si es `false`, el formulario es válido y no se muestra la alerta.
   */
  public esFormaValido: boolean = false;

  /**
   * @property {EventEmitter<boolean>} mostrarTabs - Emite un valor booleano para mostrar las pestañas adicionales.
   * EventEmitter que comunica al componente padre cuándo debe mostrar las pestañas de navegación.
   * Se activa cuando el usuario completa exitosamente el proceso de guardado o validación.
   * Permite la coordinación entre componentes para la navegación de la interfaz.
   */
  @Output() mostrarTabs: EventEmitter<boolean> = new EventEmitter<boolean>();
    
  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable de la interfaz.
   * Permite mostrar u ocultar secciones de la interfaz de usuario.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para datos de la constancia de registro.
   * Contiene los controles del formulario relacionados con la constancia del registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {CapturarColumns[]} facturas - Array de datos de facturas para mostrar en la tabla.
   * Contiene la información de todas las facturas capturadas que se visualizan en la tabla dinámica.
   */
  facturas: CapturarColumns[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$ - Notificador para cancelar suscripciones y evitar fugas de memoria.
   * Utilizado con operadores como `takeUntil`.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} capturarState - Estado actual relacionado con la captura de datos textiles.
   */
  private capturarState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección en el módulo de librerías.
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {TablaSeleccion} TablaSeleccion - Referencia a la enumeración o constante `TablaSeleccion`
   * para su uso en la plantilla o lógica del componente.
   * Utilizada para configurar opciones de selección en las tablas dinámicas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} tableColumns - Array de configuración de columnas de la tabla.
   * Define la estructura, encabezados y orden de las columnas que se mostrarán en la tabla de facturas.
   * Cada elemento especifica el encabezado, la clave de acceso a los datos y el orden de visualización.
   */
  tableColumns: ConfiguracionColumna<CapturarColumns>[] = [
    {
      encabezado: 'Número de la factura',
      clave: (fila) => fila.numeroDeLaFactura,
      orden: 1,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 3,
    },
    {
      encabezado: 'Fecha de expedición de la factura',
      clave: (fila) => fila.fechaExpedicionFactura,
      orden: 4,
    },
    {
      encabezado: 'Cantidad total',
      clave: (fila) => fila.cantidadTotal,
      orden: 5,
    },
    {
      encabezado: 'Cantidad disponible',
      clave: (fila) => fila.cantidadDisponible,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (fila) => fila.unidadMedida,
      orden: 7,
    },
    {
      encabezado: 'Valor en dólares',
      clave: (fila) => fila.valorDolares,
      orden: 8,
    },
  ];

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios para el funcionamiento del componente.
   * Se inyectan todas las dependencias requeridas para el manejo de formularios, peticiones HTTP,
   * gestión de estado y consultas de datos relacionados con la elegibilidad de textiles.
   * @param {ElegibilidadTextilesService} ElegibilidadTextilesService - Servicio para manejar la lógica de elegibilidad de textiles.
   * @param {HttpClient} httpServicios - Cliente HTTP de Angular para realizar peticiones HTTP.
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular para crear y gestionar formularios.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para gestionar el estado de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para recuperar el estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para gestionar el estado relacionado con secciones.
   * @param {SeccionLibQuery} seccionQuery - Query para recuperar el estado relacionado con secciones.
   * @param {ChangeDetectorRef} cdr - ChangeDetectorRef para detectar cambios en la vista.
   */
  constructor(
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
    private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private cdr: ChangeDetectorRef
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones a los observables del estado, inicializa el formulario,
   * obtiene las listas desplegables, recupera los datos de las facturas y establece
   * la validación del formulario. También maneja el estado de habilitación/deshabilitación del formulario.
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.ElegibilidadDeTextilesQuery.selectTextile$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.capturarState = state as TextilesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.obtenerListasDesplegables();
    this.recuperarDatos();

    this.seccionStore.establecerFormaValida([false]);

    this.facturaForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.facturaForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.capturarState.formaValida,
              { id: 2, descripcion: 'Valida' },
            ]);
          }
        })
      )
      .subscribe();
    if (
      this.capturarState.formaValida &&
      this.capturarState.formaValida[0] &&
      this.capturarState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
    if (this.formularioDeshabilitado) {
      this.facturaForm.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de las facturas.
   * Crea todos los controles del formulario con sus validadores correspondientes,
   * incluyendo campos para número de factura, cantidad total, unidad de medida,
   * valor en dólares, información del proveedor y datos de dirección.
   * Los valores iniciales se obtienen del estado actual almacenado.
   * @returns {void} No retorna ningún valor.
   */
  initActionFormBuild(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: [this.capturarState.numeroFactura, Validators.required],
      cantidadTotal: [
        this.capturarState.cantidadTotal,
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
      ],
      unidadDeMedida: [this.capturarState.unidadDeMedida, Validators.required],
      fechaInicioInput: [''],
      valorDolares: [
        this.capturarState.valorDolares,
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
      ],
      taxId: [this.capturarState.taxId],
      razonSocial: [this.capturarState.razonSocial, Validators.required],
      calle: [this.capturarState.calle, Validators.required],
      ciudad: [this.capturarState.ciudad, Validators.required],
      cp: [
        this.capturarState.cp,
        [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
      ],
      pais: [
        { value: this.capturarState.pais, disabled: true },
        [Validators.required],
      ],
      fechaExpedicionFactura: ['2025-04-30'],
    });
  }
  /**
   * @property {Catalogo[]} unidadDeMedida - Configuración para el select de unidad de medida.
   * Array que contiene las opciones disponibles para el campo de unidad de medida en el formulario.
   * Se carga dinámicamente desde el servicio al inicializar el componente.
   */
  unidadDeMedida: Catalogo[] = [];
  
  /**
   * @property {InputFecha} fechaInicioInputs - Configuración para el input de fecha de expedición de la factura.
   * Contiene la configuración específica para el campo de fecha, incluyendo formato,
   * validaciones y restricciones de fechas permitidas.
   */
  fechaInicioInputs: InputFecha = EXPEDICION_FACTURA_FECHA;
  
  /**
   * @method obtenerListasDesplegables
   * @description Obtiene las listas desplegables necesarias para el formulario.
   * Método coordinador que ejecuta la carga de todos los catálogos y listas
   * requeridas para poblar los campos de selección del formulario.
   * @returns {void} No retorna ningún valor.
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * Método utilitario que extrae el valor de un campo específico del formulario
   * y lo almacena en el store utilizando el método especificado.
   * @param {FormGroup} form - El formulario del cual extraer el valor.
   * @param {string} campo - El nombre del campo del formulario a extraer.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El nombre del método del store a ejecutar.
   * @returns {void} No retorna ningún valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

  /**
   * @method obtenerIngresoSelectList
   * @description Obtiene la lista para el select de unidad de medida.
   * Realiza una petición HTTP al servicio para cargar las opciones disponibles
   * del catálogo de unidades de medida y las asigna a la propiedad correspondiente.
   * La suscripción se maneja con takeUntil para evitar fugas de memoria.
   * @returns {void} No retorna ningún valor.
   */
  obtenerIngresoSelectList(): void {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable(
      'unidad-de-medida.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.unidadDeMedida = data as Catalogo[];
        },
      });
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de las facturas desde el servicio.
   * Realiza una petición HTTP para cargar los datos de las facturas desde un archivo JSON
   * y los asigna a la propiedad facturas para su visualización en la tabla.
   * Incluye validación para asegurar que la respuesta sea un array válido.
   * @returns {void} No retorna ningún valor.
   */
  recuperarDatos(): void {
    this.ElegibilidadTextilesService.obtenerTablaDatos<CapturarColumns>(
      'capturar-facturas.json'
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response)) {
            this.facturas = response as CapturarColumns[];
          }
        },
      });
  }

  /**
   * Método para continuar al siguiente paso, validando el campo cantidadFacturas.
   * Si el formulario es inválido, muestra el mensaje de error y no permite continuar.
   * Si es válido, limpia el error y permite continuar.
   */
    continuar(): void {
    this.facturaForm.markAllAsTouched();
    this.facturaForm.updateValueAndValidity();
    this.cdr.detectChanges();

    if (!this.facturaForm.valid) {
      this.formularioAlertaError = ERROR_FORMA_ALERT;
      this.esFormaValido = true;
      window.scrollTo(0, 0);
      return;
    }
    this.esFormaValido = false;
    this.formularioAlertaError = '';
    window.scrollTo(0, 0);

    this.mostrarTabs.emit(true);
  }
  
  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   * Implementa la limpieza necesaria para evitar fugas de memoria cancelando
   * todas las suscripciones activas mediante el subject destroyNotifier$.
   * Es una implementación estándar del patrón de limpieza en Angular.
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
