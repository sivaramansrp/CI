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
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';


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
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
})
export class CapturarFacturasComponent implements OnInit, OnDestroy {
  /**
   * Marca todos los controles de un formulario como "touched" y "dirty".
   * Esto fuerza la visualización de los mensajes de error de validación en la interfaz,
   * siguiendo el patrón robusto de validación utilizado en 40402.
   * @param form FormGroup del formulario a procesar
   */
  private static markAllControlsTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
  /**
   * Maneja el evento de cambio de valor en el campo de fecha de expedición de la factura.
   * Actualiza el valor del control correspondiente en el formulario y lo marca como "dirty" y "touched"
   * para asegurar que se muestren los mensajes de validación si corresponde.
   * @param fecha Valor de la fecha seleccionada (formato string)
   */
  onFechaExpedicionFacturaChange(fecha: string): void {
    this.facturaForm.get('fechaExpedicionFactura')?.setValue(fecha);
    this.facturaForm.get('fechaExpedicionFactura')?.markAsDirty();
    this.facturaForm.get('fechaExpedicionFactura')?.markAsTouched();
  }
  /**
   * @property {boolean} showFechaExpedicionFactura
   * @description
   * Controla la visualización del campo de fecha de expedición de la factura en el formulario.
   * Se utiliza principalmente en el método limpiarFacturaForm() para forzar el reinicio visual del componente de fecha,
   * asegurando que el campo se limpie correctamente y se actualice en la interfaz de usuario.
   * Es útil cuando el componente de fecha necesita ser reseteado completamente, ya que Angular no siempre actualiza los controles visuales solo con cambios en el valor del formulario.
   */
  showFechaExpedicionFactura: boolean = true;
  /**
   * Limpia el formulario de captura de facturas, restaurando los valores y estados de los controles clave.
   * - Restablece el campo de fecha de expedición y lo marca como "pristine" y "untouched".
   * - Preserva y deshabilita los campos de país y unidad de medida, restaurando sus valores por defecto.
   * - Marca todos los controles como "pristine" y "untouched" para evitar mostrar mensajes de error.
   * Este método sigue el patrón robusto de limpieza de formularios utilizado en 40402.
   */
  limpiarFacturaForm(): void {
    this.showFechaExpedicionFactura = false;
    setTimeout(() => {
      this.showFechaExpedicionFactura = true;
      const FECHA_CONTROL = this.facturaForm.get('fechaExpedicionFactura');
      FECHA_CONTROL?.setValue(null);
      FECHA_CONTROL?.markAsPristine();
      FECHA_CONTROL?.markAsUntouched();
    });
    const PAISES_VALUE = this.facturaForm.get('pais')?.value || 'ESTADOS UNIDOS DE AMERICA';
    const UNIDAD_DE_MEDIDA_VALUE = this.facturaForm.get('unidadDeMedida')?.value || '1';
    this.facturaForm.reset();
    this.facturaForm.get('pais')?.enable();
    this.facturaForm.get('pais')?.setValue(PAISES_VALUE);
    this.facturaForm.get('unidadDeMedida')?.enable();
    this.facturaForm.get('unidadDeMedida')?.setValue(UNIDAD_DE_MEDIDA_VALUE);
    setTimeout(() => {
      this.facturaForm.get('pais')?.disable();
      this.facturaForm.get('unidadDeMedida')?.disable();
    });
    Object.keys(this.facturaForm.controls).forEach(key => {
      this.facturaForm.get(key)?.markAsPristine();
      this.facturaForm.get(key)?.markAsUntouched();
    });
  }
  /**
   * @property {number | null} indiceSeleccionado
   * @description
   * Índice de la fila seleccionada en la tabla de facturas para su modificación.
   * Si es `null`, no hay ninguna factura seleccionada para editar.
   * Se actualiza al seleccionar una factura en la tabla y se utiliza para cargar los datos en el formulario de edición.
   */
  indiceSeleccionado: number | null = null;
  /**
   * @property {CapturarColumns[]} selectedRows
   * @description
   * Almacena las filas seleccionadas en la tabla de facturas para su eliminación o modificación.
   * Se actualiza al seleccionar una o varias facturas mediante la interfaz (checkbox o selección directa).
   * Es utilizada para habilitar/deshabilitar los botones de modificar y eliminar, y para realizar operaciones en lote.
   */
  selectedRows: CapturarColumns[] = [];
  /**
   * @property {'agregar' | 'modificar'} modalMode
   * @description
   * Estado actual del modal de facturas, indica si el formulario está en modo "agregar" (nueva factura)
   * o en modo "modificar" (edición de factura existente). Se utiliza para controlar la lógica de guardado
   * y la visualización de los datos en el formulario modal.
   */
  modalMode: 'agregar' | 'modificar' = 'agregar';
  /**
   * @method formGroup
   * @description
   * Getter que expone el FormGroup principal del formulario de facturas como 'formGroup'.
   * Permite que el componente padre acceda directamente al estado y los controles del formulario reactivo,
   * facilitando la integración, validación y manipulación desde otros componentes o servicios.
   * @returns {FormGroup} El grupo de controles reactivos del formulario de facturas.
   */
  public get formGroup(): FormGroup {
    return this.facturaForm;
  }
  /**
   * @property {boolean} formularioDeshabilitado
   * @description
   * Propiedad de entrada que indica si el formulario de facturas debe estar deshabilitado.
   * Cuando es `true`, todos los controles del formulario se desactivan y el usuario no puede editar los datos.
   * Se utiliza para controlar el acceso y la edición desde el componente padre según el flujo de la aplicación.
   */
  @Input()
  formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} facturaForm
   * @description
   * Grupo de controles reactivos que representa el formulario principal para capturar los datos de las facturas.
   * Incluye todos los campos requeridos, sus validaciones y el estado actual de cada control.
   * Es inicializado en el método initActionFormBuild() y utilizado en toda la lógica de captura, edición y validación.
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
   * @property {string[]} selectRangoDias
   * @description
   * Arreglo que contiene los rangos de días disponibles para selección en el formulario de facturas.
   * Se utiliza para poblar opciones en campos select relacionados con fechas o periodos.
   * Puede ser configurado dinámicamente según la lógica de negocio o los catálogos cargados.
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
      clave: (fila): string => {
        const UNIDAD_CATALOGO: Catalogo[] = this.unidadDeMedida || [];
        const UNIDAD = UNIDAD_CATALOGO.find((item) => String(item.id) === String(fila.unidadMedida));
        return UNIDAD ? UNIDAD.descripcion : String(fila.unidadMedida);
      },
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
  this.facturas = [];
  this.facturaForm.reset();

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
    this.facturaForm.get('unidadDeMedida')?.disable();
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
    /**
     * @method initActionFormBuild
     * @description
     * Inicializa el formulario reactivo principal para capturar los datos de las facturas.
     * Crea todos los controles del formulario con sus validadores correspondientes, incluyendo:
     * - Número de factura, cantidad total, unidad de medida, valor en dólares, información fiscal y de dirección, país y fecha de expedición.
     * Los valores iniciales de cada campo se obtienen del estado actual (`capturarState`).
     * Incluye validaciones personalizadas, como el formato de fecha de expedición (acepta DD/MM/AAAA y fechas válidas).
     * Este método se invoca al inicializar el componente y cada vez que se requiere reiniciar el formulario.
     * No recibe parámetros y no retorna ningún valor.
     * @returns {void} No retorna ningún valor.
     */
    initActionFormBuild(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: [this.capturarState.numeroFactura, Validators.required],
      cantidadTotal: [
        this.capturarState.cantidadTotal,
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
      ],
      unidadDeMedida: [{value: '1', disabled: true}, Validators.required],
      valorDolares: [
        this.capturarState.valorDolares,
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
      ],
      taxId: [this.capturarState.taxId],
      razonSocial: [this.capturarState.razonSocial, Validators.required],
      domicilio: [this.capturarState.domicilio || '5th Avenue 123 New York NY México 12345'],
      calle: [this.capturarState.calle, Validators.required],
      ciudad: [this.capturarState.ciudad, Validators.required],
      cp: [
        this.capturarState.cp,
        [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
      ],
      pais: [
        { value: this.capturarState.pais || 'ESTADOS UNIDOS DE AMERICA', disabled: true },
        [Validators.required],
      ],
      fechaExpedicionFactura: [
        this.capturarState.fechaExpedicionFactura,
        [
          (control: import('@angular/forms').AbstractControl): { [key: string]: unknown } | null => {
            const VALUE = control.value;
            if (VALUE instanceof Date && !isNaN(VALUE.getTime())) {
              return null;
            }
            if (typeof VALUE === 'string' && VALUE.trim() !== '') {
              // Acepta el formato DD/MM/AAAA
              const PARTS = VALUE.split('/');
              if (PARTS.length === 3) {
                const DAY = parseInt(PARTS[0], 10);
                const MONTH = parseInt(PARTS[1], 10) - 1;
                const YEAR = parseInt(PARTS[2], 10);
                const DATE = new Date(YEAR, MONTH, DAY);
                if (!isNaN(DATE.getTime())) {
                  return null;
                }
              }
              // Alternativa: pruebe el análisis de fechas nativo
              const DATE = new Date(VALUE);
              if (!isNaN(DATE.getTime())) {
                return null;
              }
            }
            return { required: true };
          }
        ]
      ],
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
   * @property {CapturarColumns[]} seleccionadasParaEliminar
   * @description
   * Almacena las filas seleccionadas en la tabla de facturas que están marcadas para eliminación múltiple.
   * Se actualiza cuando el usuario selecciona varias facturas mediante la interfaz (checkbox o selección directa).
   * Es utilizada para realizar operaciones de eliminación en lote y para controlar la lógica de los botones de acción.
   * Si el arreglo está vacío, no hay facturas seleccionadas para eliminar.
   */
  seleccionadasParaEliminar: CapturarColumns[] = [];

  /**
   * @method abrirModalAgregar
   * @description
   * Abre el modal para agregar una nueva factura.
   * Establece el modo del formulario en "agregar", limpia la selección actual y reinicia el formulario de captura de facturas.
   * Asigna valores por defecto a los campos de domicilio, unidad de medida y país, habilitándolos temporalmente para su edición.
   * Posteriormente, deshabilita estos campos para mantener la integridad de los datos.
   * Finalmente, muestra el modal correspondiente mediante Bootstrap o lógica Angular.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  abrirModalAgregar(): void {
    const ELEMENTO_MODAL = document.getElementById('modalAgregar');
    if (ELEMENTO_MODAL && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
      const INSTANCIA_ANTIGUA = window.bootstrap.Modal.getInstance(ELEMENTO_MODAL);
      if (INSTANCIA_ANTIGUA) {
        INSTANCIA_ANTIGUA.hide();
      }
    }
    this.modalMode = 'agregar';
    this.indiceSeleccionado = null;
    this.facturaForm.reset();
    this.facturaForm.get('domicilio')?.setValue('5th Avenue 123 New York NY México 12345');
    this.facturaForm.get('unidadDeMedida')?.enable();
    this.facturaForm.get('unidadDeMedida')?.setValue('1');
    this.facturaForm.get('pais')?.enable();
    this.facturaForm.get('pais')?.setValue('ESTADOS UNIDOS DE AMERICA');
    setTimeout(() => {
      this.facturaForm.get('unidadDeMedida')?.disable();
      this.facturaForm.get('pais')?.disable();
      if (ELEMENTO_MODAL && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
        const MODAL_INSTANCE = new window.bootstrap.Modal(ELEMENTO_MODAL);
        MODAL_INSTANCE.show();
      }
    });
  }

  /**
   * @method abrirModalModificar
   * @description
   * Abre el modal para modificar la factura seleccionada en la tabla.
   * Establece el modo del formulario en "modificar" y carga los datos de la factura seleccionada en el formulario reactivo.
   * Habilita temporalmente el campo de unidad de medida para permitir su edición y asigna los valores correspondientes a cada control.
   * Posteriormente, deshabilita los campos de unidad de medida y país para mantener la integridad de los datos.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  abrirModalModificar(): void {
    const ELEMENTO_MODAL = document.getElementById('modalAgregar');
    if (ELEMENTO_MODAL && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
      const INSTANCIA_ANTIGUA = window.bootstrap.Modal.getInstance(ELEMENTO_MODAL);
      if (INSTANCIA_ANTIGUA) {
        INSTANCIA_ANTIGUA.hide();
      }
    }
    if (this.indiceSeleccionado !== null) {
      this.modalMode = 'modificar';
      const FACTURA = this.facturas[this.indiceSeleccionado];
      if (FACTURA) {
        this.facturaForm.reset();
        this.facturaForm.get('unidadDeMedida')?.enable();
        this.poblarFacturaForm(FACTURA);
        setTimeout(() => {
          this.facturaForm.get('unidadDeMedida')?.disable();
          this.facturaForm.get('pais')?.disable();
          if (ELEMENTO_MODAL && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
            const MODAL_INSTANCE = new window.bootstrap.Modal(ELEMENTO_MODAL);
            MODAL_INSTANCE.show();
          }
        });
      }
    }

  }

  /**
   * Rellena los campos del formulario de factura (`facturaForm`) con los valores de un objeto `CapturarColumns`.
   * Este método se utiliza para cargar los datos de una factura seleccionada en el formulario de edición,
   * asegurando que cada control del formulario reciba el valor correspondiente del modelo.
   * Si algún valor está ausente en el objeto, se asigna un valor por defecto adecuado.
   *
   * @param {CapturarColumns} FACTURA - El objeto de factura cuyos datos se van a cargar en el formulario.
   * @returns {void} No retorna ningún valor.
   */
  private poblarFacturaForm(FACTURA: CapturarColumns): void {
    this.facturaForm.get('numeroFactura')?.setValue(FACTURA.numeroDeLaFactura ?? '');
    this.facturaForm.get('razonSocial')?.setValue(FACTURA.razonSocial ?? '');
    this.facturaForm.get('domicilio')?.setValue(FACTURA.domicilio ?? '');
    this.facturaForm.get('fechaExpedicionFactura')?.setValue(FACTURA.fechaExpedicionFactura ?? '');
    this.facturaForm.get('cantidadTotal')?.setValue(FACTURA.cantidadTotal ?? '');
    this.facturaForm.get('cantidadDisponible')?.setValue(FACTURA.cantidadDisponible ?? FACTURA.cantidadTotal ?? '');
    this.facturaForm.get('unidadDeMedida')?.setValue(FACTURA.unidadMedida ?? '1');
    this.facturaForm.get('valorDolares')?.setValue(FACTURA.valorDolares ?? '');
    this.facturaForm.get('taxId')?.setValue(FACTURA.taxId ?? '');
    this.facturaForm.get('calle')?.setValue(FACTURA.calle ?? '');
    this.facturaForm.get('ciudad')?.setValue(FACTURA.ciudad ?? '');
    this.facturaForm.get('cp')?.setValue(FACTURA.cp ?? '');
    this.facturaForm.get('pais')?.setValue(FACTURA.pais ?? 'ESTADOS UNIDOS DE AMERICA');
  }

  /**
   * @method guardarFactura
   * @description
   * Agrega una nueva factura o actualiza una existente en la tabla de facturas.
   * Marca todos los controles del formulario como "touched" y "dirty" para activar la validación visual.
   * Verifica explícitamente que todos los campos obligatorios estén completos y válidos antes de continuar.
   * Si el formulario es válido, crea un objeto de factura con los datos capturados y lo agrega o actualiza en el arreglo de facturas según el modo actual ("agregar" o "modificar").
   * Finalmente, cierra el modal y muestra una alerta de éxito, limpiando la selección y el estado del formulario.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  guardarFactura(): void {
    Object.keys(this.facturaForm.controls).forEach(_key => {
      // No operativo: se eliminó la asignación de variables no utilizadas anteriormente para corregir errores de pelusa
    });
    CapturarFacturasComponent.markAllControlsTouched(this.facturaForm);
    this.facturaForm.updateValueAndValidity();

    // Verifique explícitamente los campos obligatorios
    const REQUIRED_FIELDS = [
      'numeroFactura',
      'cantidadTotal',
      'unidadDeMedida',
      'valorDolares',
      'razonSocial',
      'domicilio',
      'calle',
      'ciudad',
      'cp',
      'pais',
      'fechaExpedicionFactura'
    ];
    for (const FIELD of REQUIRED_FIELDS) {
      const CONTROL = this.facturaForm.get(FIELD);
      if (!CONTROL || CONTROL.invalid || CONTROL.value === null || CONTROL.value === undefined || CONTROL.value === '') {
        //console.log('Blocking submission due to field:', FIELD, 'value:', CONTROL?.value, 'errors:', CONTROL?.errors);
        // Opcionalmente, desplácese hasta el primer campo no válido o muestre un mensaje.
        return;
      }
    }
    const DATOS = this.facturaForm.getRawValue();
    const NUEVA_FACTURA: CapturarColumns = {
      numeroDeLaFactura: DATOS['numeroFactura'],
      razonSocial: DATOS['razonSocial'],
      domicilio: DATOS['domicilio'],
      fechaExpedicionFactura: DATOS['fechaExpedicionFactura'],
      cantidadTotal: DATOS['cantidadTotal'],
      cantidadDisponible: DATOS['cantidadDisponible'] ?? DATOS['cantidadTotal'],
      unidadMedida: DATOS['unidadDeMedida'],
      valorDolares: DATOS['valorDolares'],
      taxId: DATOS['taxId'],
      calle: DATOS['calle'],
      ciudad: DATOS['ciudad'],
      cp: DATOS['cp'],
      pais: DATOS['pais'],
    };
    if (this.modalMode === 'agregar') {
      this.facturas = [...this.facturas, NUEVA_FACTURA];
      this.indiceSeleccionado = null;
    } else if (this.modalMode === 'modificar' && this.indiceSeleccionado !== null) {
      this.facturas[this.indiceSeleccionado] = NUEVA_FACTURA;
      this.facturas = [...this.facturas];
      this.indiceSeleccionado = null;
    }

    setTimeout(() => {
      const ELEMENTO_MODAL = document.getElementById('modalAgregar');
      if (ELEMENTO_MODAL && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
        const MODAL_INSTANCE = window.bootstrap.Modal.getInstance(ELEMENTO_MODAL);
        if (MODAL_INSTANCE) {
          MODAL_INSTANCE.hide();
        }
      }

      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
    }, 300);
  }

  /**
   * @method seleccionarRegistro
   * @description
   * Selecciona una fila de la tabla de facturas para modificar, utilizando el objeto de factura como referencia.
   * Actualiza el índice de la factura seleccionada (`indiceSeleccionado`) para cargar sus datos en el formulario de edición.
   * No recibe parámetros adicionales y no retorna ningún valor.
   * @param {CapturarColumns} registro - El objeto de factura seleccionado en la tabla.
   * @returns {void} No retorna ningún valor.
   */
  seleccionarRegistro(registro: CapturarColumns): void {
    this.indiceSeleccionado = this.facturas.findIndex(f => f === registro);
  }

  /**
   * @method onFilasSeleccionadas
   * @description
   * Maneja la selección de una o varias filas en la tabla de facturas para su eliminación o modificación.
   * Actualiza los arreglos de filas seleccionadas (`selectedRows` y `seleccionadasParaEliminar`) y el índice de la factura seleccionada si solo hay una fila seleccionada.
   * Si hay más de una fila seleccionada, el índice se establece en `null` para evitar la edición múltiple.
   * No retorna ningún valor.
   * @param {CapturarColumns[]} filas - Arreglo de facturas seleccionadas en la tabla.
   * @returns {void} No retorna ningún valor.
   */
  onFilasSeleccionadas(filas: CapturarColumns[]): void {
    this.selectedRows = filas;
    this.seleccionadasParaEliminar = filas;
    if (filas.length === 1) {
      this.indiceSeleccionado = this.facturas.findIndex(f => f === filas[0]);
    } else {
      this.indiceSeleccionado = null;
    }
  }

  /**
   * @method eliminarSeleccionados
   * @description
   * Elimina las facturas seleccionadas de la tabla.
   * Si no hay filas seleccionadas, no realiza ninguna acción.
   * Actualiza el arreglo de facturas, limpia la selección y reinicia el formulario, restaurando los valores por defecto de los campos clave.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  eliminarSeleccionados(): void {
    if (this.selectedRows.length === 0) {
      return;
    }
    this.facturas = this.facturas.filter(f => !this.selectedRows.includes(f));
    this.selectedRows = [];
    this.seleccionadasParaEliminar = [];
    this.indiceSeleccionado = null;
    this.facturaForm.reset();
    this.facturaForm.get('unidadDeMedida')?.enable();
    this.facturaForm.get('unidadDeMedida')?.setValue('1');
    this.facturaForm.get('pais')?.enable();
    this.facturaForm.get('pais')?.setValue('ESTADOS UNIDOS DE AMERICA');
    setTimeout(() => {
      this.facturaForm.get('unidadDeMedida')?.disable();
      this.facturaForm.get('pais')?.disable();
    });
  }

  /**
   * @method onSeleccionEliminar
   * @description
   * Maneja el evento de selección de filas en la tabla de facturas asociadas para su eliminación.
   * Convierte el evento en un arreglo y lo pasa al método de selección de filas.
   * No retorna ningún valor.
   * @param {CapturarColumns[]} event - Arreglo de facturas seleccionadas para eliminar.
   * @returns {void} No retorna ningún valor.
   */
  onSeleccionEliminar(event: CapturarColumns[]): void {
    this.onFilasSeleccionadas(Array.isArray(event) ? event : []);
  }
  
  /**
   * @method abrirModalEliminar
   * @description
   * Abre el modal de confirmación de eliminación según la selección actual de facturas.
   * Si no hay filas seleccionadas, muestra el modal de confirmación para selección vacía; si hay filas seleccionadas, muestra el modal de confirmación estándar.
   * Utiliza Bootstrap para mostrar el modal correspondiente.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  abrirModalEliminar(): void {
    if (!Array.isArray(this.selectedRows) || this.selectedRows.length === 0) {
      const ELEMENTO_MODAL = document.getElementById('confirmarEliminarSeleccion');
      if (ELEMENTO_MODAL && typeof window !== 'undefined' && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
        const MODAL_INSTANCE = new window.bootstrap.Modal(ELEMENTO_MODAL);
        MODAL_INSTANCE.show();
      }
      return;
    }
    const ELEMENTO_MODAL = document.getElementById('confirmarEliminar');
    if (ELEMENTO_MODAL && typeof window !== 'undefined' && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
      const MODAL_INSTANCE = new window.bootstrap.Modal(ELEMENTO_MODAL);
      MODAL_INSTANCE.show();
    }
  }
  /**
   * @method eliminarFacturasAsociadas
   * @description
   * Elimina las facturas asociadas seleccionadas de la tabla.
   * Si no hay filas seleccionadas, no realiza ninguna acción.
   * Actualiza el arreglo de facturas asociadas, limpia la selección y deja la tabla actualizada.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
   */
  /**
   * @method eliminarFacturasAsociadas
   * @description
   * Elimina las facturas asociadas seleccionadas de la tabla y limpia el TELONES_DE_FONDO modal persistente si existe.
   * Si no hay filas seleccionadas, no realiza ninguna acción.
   * Actualiza el arreglo de facturas asociadas, limpia la selección y elimina el TELONES_DE_FONDO modal si está presente.
   * @returns {void} No retorna ningún valor.
   */
  eliminarFacturasAsociadas(): void {
    if (this.seleccionadasParaEliminar.length === 0) {
      return;
    }
    this.facturas = this.facturas.filter(
      item => !this.seleccionadasParaEliminar.includes(item)
    );
    this.seleccionadasParaEliminar = [];
    // Cerrar el modal de eliminar si está abierto
    setTimeout(() => {
      const ELEMENTO_MODAL = document.getElementById('confirmarEliminar');
      if (ELEMENTO_MODAL && typeof window !== 'undefined' && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
        const MODAL_INSTANCE = window.bootstrap.Modal.getInstance(ELEMENTO_MODAL) || new window.bootstrap.Modal(ELEMENTO_MODAL);
        MODAL_INSTANCE.hide();
      }
      // Eliminar el TELONES_DE_FONDO modal persistente si está presente
      const TELONES_DE_FONDO = document.querySelectorAll('.modal-backdrop');
      TELONES_DE_FONDO.forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
    }, 350);
  }
  /**
   * @property {boolean} puedeModificar
   * @description
   * Indica si el botón de modificar debe estar habilitado.
   * El botón se habilita solo si hay una fila seleccionada y el índice de selección no es nulo.
   * @returns {boolean} `true` si se puede modificar, `false` en caso contrario.
   */
  get puedeModificar(): boolean {
    return this.indiceSeleccionado !== null && this.selectedRows.length === 1;
  }
  /**
   * @property {boolean} puedeEliminar
   * @description
   * Indica si el botón de eliminar debe estar habilitado.
   * El botón se habilita si hay al menos una fila seleccionada en la tabla de facturas.
   * @returns {boolean} `true` si se puede eliminar, `false` en caso contrario.
   */
  get puedeEliminar(): boolean {
    return this.indiceSeleccionado !== null && this.selectedRows.length === 1;
  }
  /**
   * @method continuar
   * @description
   * Valida el formulario de facturas y permite continuar al siguiente paso del flujo si es válido.
   * Marca todos los controles como "touched" para activar la validación visual, actualiza el estado y detecta cambios en la vista.
   * Si el formulario es inválido, muestra el mensaje de error y no permite avanzar; si es válido, limpia el error y emite el evento para mostrar las pestañas siguientes.
   * No recibe parámetros y no retorna ningún valor.
   * @returns {void} No retorna ningún valor.
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
