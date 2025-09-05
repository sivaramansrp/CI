/**
 * @component FormularioAsociacionFacturaComponent
 * @description Este componente es responsable de manejar las facturas asociadas.
 * Incluye un formulario para capturar los datos de las facturas y tablas para mostrar las facturas disponibles y asociadas.
 */

import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, delay, map, takeUntil, tap } from 'rxjs';

import {
  ConfiguracionColumna,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { ERROR_FORMA_ALERT, VALIDO } from '../../constantes/elegibilidad-de-textiles.enums';

import {
  AsociadasTableColumns,
  CapturarColumns,
} from '../../models/elegibilidad-de-textiles.model';

import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { FacturasAsociadasService } from '../../services/facturas-asociadas.service';
import { FacturasTplAsociadasRequest } from '../../models/request/facturas-tpl-asociadas-request.model';
import { FacturasTplEliminarRequest } from '../../models/request/facturas-tpl-eliminar-request.model';
import { Solicitud120301State } from '../../estados/tramites/tramite120301.store';
import { Tramite120301Query } from '../../estados/queries/tramite120301.query';



/**
 * @component FormularioAsociacionFacturaComponent
 * @description
 * Componente responsable de manejar las facturas asociadas en el trámite de elegibilidad de textiles.
 * Permite capturar, mostrar y asociar facturas mediante formularios y tablas dinámicas.
 * Gestiona el estado de validez del formulario y la sincronización con el store de la aplicación.
 *
 * @example
 * <app-facturas-asociadas [formularioDeshabilitado]="true"></app-facturas-asociadas>
 *
 * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
 * @property {FormGroup} formularioAsociacionFactura - Formulario reactivo para capturar datos de facturas asociadas.
 * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
 * @property {boolean} colapsable - Controla el estado colapsable del panel.
 * @property {FormGroup} ConstanciaDelRegistro - Formulario para datos del certificado de registro.
 * @property {ConfiguracionColumna<CapturarColumns>[]} tableColumns - Columnas de la tabla de facturas disponibles.
 * @property {ConfiguracionColumna<AsociadasTableColumns>[]} asociadastableColumns - Columnas de la tabla de facturas asociadas.
 * @property {CapturarColumns[]} facturasDisponible - Datos de facturas disponibles.
 * @property {AsociadasTableColumns[]} facturasAsociadas - Datos de facturas asociadas.
 *
 * @method ngOnInit Inicializa el componente y obtiene los datos de las facturas.
 * @method ngOnDestroy Limpia las suscripciones al destruir el componente.
 * @method initActionFormBuild Inicializa el formulario reactivo.
 * @method recuperarDatos Obtiene los datos de facturas disponibles.
 * @method recuperarDatosAsociadas Obtiene los datos de facturas asociadas.
 * @method setValoresStore Establece valores en el store de textiles.
 *
 * @see ElegibilidadDeTextilesStore
 * @see ElegibilidadDeTextilesQuery
 * @see SeccionLibStore
 * @see SeccionLibQuery
 * @see ElegibilidadTextilesService
 */
@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrls: ['./facturas-asociadas.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
})
export class FormularioAsociacionFacturaComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   * Propiedad de entrada que controla si todos los controles del formulario deben estar deshabilitados.
   * Cuando es true, impide la edición de cualquier campo del formulario de asociación de facturas.
   * Se utiliza para casos donde el formulario debe ser de solo lectura.
   */
  @Input()
  formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} formularioAsociacionFactura - El grupo de formularios para capturar los datos de las facturas asociadas.
   * Formulario reactivo principal que contiene todos los controles necesarios para la gestión
   * de facturas asociadas, incluyendo cantidad de facturas, totales y metros cuadrados equivalentes.
   * Maneja validaciones y sincronización con el estado global de la aplicación.
   */
  formularioAsociacionFactura!: FormGroup;

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
   * Contiene las opciones disponibles para seleccionar rangos de días en los controles temporales.
   * Se utiliza para limitar las opciones de selección de fechas en el formulario.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable del panel.
   * Determina si las secciones de la interfaz pueden expandirse o contraerse.
   * Mejora la experiencia de usuario permitiendo organizar la información en paneles colapsables.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   * Formulario secundario que maneja información complementaria relacionada con la constancia del registro.
   * Se utiliza en conjunto con el formulario principal para completar la información requerida.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   * Subject privado utilizado con el operador takeUntil para cancelar automáticamente
   * todas las suscripciones activas cuando el componente es destruido.
   * Implementa el patrón estándar para prevenir fugas de memoria en Angular.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} facturasState - Estado actual de las facturas.
   * Almacena el estado completo relacionado con las facturas en el contexto de elegibilidad de textiles.
   * Se actualiza mediante suscripciones al query correspondiente y contiene
   * toda la información necesaria para el funcionamiento del componente de facturas asociadas.
   * @private
   */
  private facturasState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   * Mantiene el estado específico de la sección dentro del módulo de librerías.
   * Controla aspectos como la validez de la sección y su estado de activación.
   * @private
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   * Referencia a la enumeración o constante TablaSeleccion que define las opciones
   * de selección disponibles para las tablas dinámicas en el componente.
   * Se utiliza para configurar el comportamiento de selección en las tablas de facturas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {ConfiguracionColumna<CapturarColumns>[]} tableColumns - Configuración de las columnas de la tabla de facturas disponibles.
   * Define la estructura, comportamiento y apariencia de cada columna en la tabla de facturas disponibles.
   * Cada elemento especifica el encabezado, la función de acceso a los datos (clave),
   * y el orden de visualización. Incluye información sobre número de factura, razón social,
   * domicilio, fechas, cantidades, unidades de medida y valores monetarios.
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
   * @property {ConfiguracionColumna<AsociadasTableColumns>[]} asociadastableColumns - Configuración de las columnas de la tabla de facturas asociadas.
   * Define la estructura y comportamiento de las columnas en la tabla de facturas ya asociadas.
   * Incluye configuración para cantidad asociada, información de la factura, datos del proveedor,
   * fechas de expedición y cantidades disponibles. Se diferencia de tableColumns al incluir
   * campos específicos para el proceso de asociación de facturas.
   */
  asociadastableColumns: ConfiguracionColumna<AsociadasTableColumns>[] = [
    {
      encabezado: 'Candidad asociada',
      clave: (fila) => fila.candidadAsociada,
      orden: 1,
    },
    {
      encabezado: 'Número de la factura',
      clave: (fila) => fila.numeroDeLaFactura,
      orden: 2,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 3,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 4,
    },
    {
      encabezado: 'Fecha de expedición de la factura',
      clave: (fila) => fila.fechaExpedicionFactura,
      orden: 5,
    },
    {
      encabezado: 'Cantidad total',
      clave: (fila) => fila.cantidadTotal,
      orden: 6,
    },
    {
      encabezado: 'Cantidad disponible',
      clave: (fila) => fila.cantidadDisponible,
      orden: 7,
    },
  ];

  /**
   * @property {CapturarColumns[]} facturasDisponible - Array de datos de facturas disponibles.
   * Contiene la información completa de todas las facturas disponibles para asociación.
   * Se carga dinámicamente desde el servicio y se actualiza según los criterios de búsqueda.
   * Cada elemento representa una factura con todos sus datos asociados como número,
   * proveedor, cantidades, fechas y valores monetarios.
   */
  facturasDisponible: CapturarColumns[] = [];

  /**
   * @property {AsociadasTableColumns[]} facturasAsociadas - Array de datos de facturas asociadas.
   * Almacena la información de las facturas que ya han sido asociadas al trámite actual.
   * Se diferencia de facturasDisponible al incluir información específica del proceso
   * de asociación como cantidades asociadas y estado de la asociación.
   * Se actualiza cuando se completan procesos de asociación de facturas.
   */
  facturasAsociadas: AsociadasTableColumns[] = [];

  /**
    * @property {Solicitud120301State} solicitudState - Estado de la solicitud en el store de Akita.
    * Almacena el estado completo de la solicitud según la arquitectura Akita,
    * incluyendo todos los datos relevantes para el manejo del estado de la aplicación.
    * Se actualiza mediante los correspondientes stores y queries de Akita.
    */
  public solicitudState!: Solicitud120301State;

  /**
   * @property {string} idFacturaExpedicion - Identificador único de la factura de expedición.
   * Contiene el ID que identifica de manera única una factura de expedición específica.
   * Se utiliza para operaciones de búsqueda, asociación y validación de facturas.
   */
  public idFacturaExpedicion!: string;

  /**
   * @property {CapturarColumns | undefined} filaSeleccionada - Fila seleccionada en la tabla de facturas.
   * Almacena la referencia a la fila de factura seleccionada por el usuario en la interfaz.
   * Contiene todos los datos de la factura seleccionada para operaciones posteriores.
   * Es undefined cuando no hay ninguna factura seleccionada.
   */
  filaSeleccionada?: CapturarColumns;

  /**
   * @property {AsociadasTableColumns | undefined} filaSeleccionadaAsociada
   * Fila seleccionada en la tabla de facturas asociadas.
   * Contiene los datos de la factura que ya está vinculada a la expedición y que
   * puede ser eliminada o modificada.
   * Es `undefined` cuando no hay ninguna factura seleccionada en la tabla de asociadas.
   */
  filaSeleccionadaAsociada?: AsociadasTableColumns;

  /**
   * @property {boolean} mostrarTabla - Indica si se debe mostrar la tabla de facturas disponibles.
   * Controla la visibilidad de la tabla de facturas disponibles en la interfaz.
   * Se utiliza para alternar la visibilidad de la tabla según el estado de la aplicación.
   */
  mostrarTabla = true;

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios para el funcionamiento del componente.
   * Inyecta todas las dependencias requeridas para el manejo de formularios reactivos,
   * gestión de estado global y local, consultas de datos y servicios específicos del dominio.
   * Establece la base para la comunicación entre el componente y los servicios del sistema
   * relacionados con la gestión de facturas asociadas en el contexto de elegibilidad de textiles.
   * @param {FormBuilder} fb - Servicio de Angular para la creación y gestión de formularios reactivos.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado global de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar y suscribirse al estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado específico de las secciones del módulo.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar y suscribirse al estado de las secciones.
   * @param {ElegibilidadTextilesService} elegibilidadTextilesService - Servicio de dominio para manejar la lógica de negocio de elegibilidad de textiles.
   * @param {ChangeDetectorRef} cdr - Referencia al ChangeDetectorRef para manejar la detección de cambios en el componente.
   */
  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService,
    private facturasAsociadasService: FacturasAsociadasService,
    private tramite120301Query: Tramite120301Query,
    private cd: ChangeDetectorRef,
    private cdr: ChangeDetectorRef
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de las facturas.
   * Configura todas las suscripciones necesarias para el manejo del estado del componente,
   * inicializa el formulario reactivo, carga los datos de facturas disponibles y asociadas,
   * establece la validación del formulario y configura el monitoreo de cambios.
   * También maneja el estado de habilitación del formulario basado en las propiedades de entrada
   * y sincroniza el estado de validez con el store global de la aplicación.
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.tramite120301Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();

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
          this.facturasState = state as TextilesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.recuperarDatos();
    //this.recuperarDatosAsociadas();

    this.formularioAsociacionFactura.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.formularioAsociacionFactura.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.facturasState.formaValida,
              { id: 1, descripcion: 'Valida' },
            ]);
          }
        })
      )
      .subscribe();
    this.seccionStore.establecerFormaValida([false]);
    if (
      this.facturasState.formaValida &&
      this.facturasState.formaValida[0] &&
      this.facturasState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
    if (this.formularioDeshabilitado) {
      this.formularioAsociacionFactura.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de las facturas asociadas.
   * Crea todos los controles del formulario con sus valores iniciales obtenidos del estado actual,
   * aplicando las validaciones necesarias para cada campo. Configura campos para cantidad de facturas,
   * cantidad total de facturas y metros cuadrados equivalentes. Algunos campos se configuran
   * como deshabilitados para mostrar valores calculados o de solo lectura.
   * @returns {void} No retorna ningún valor.
   */
  initActionFormBuild(): void {
    this.formularioAsociacionFactura = this.fb.group({
      cantidadFacturas: [
        this.facturasState.cantidadFacturas,
        [Validators.required],
      ],
      cantidadFacturasTotal: [
        { value: this.facturasState.cantidadFacturasTotal, disabled: true },
      ],
      metrosCuadradosEquivalentes: [
        {
          value: this.facturasState.metrosCuadradosEquivalentes,
          disabled: true,
        },
      ],
    });
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de las facturas disponibles desde el servicio.
   * Realiza una petición HTTP al servicio para cargar las facturas disponibles desde un archivo JSON.
   * Los datos obtenidos se asignan a la propiedad facturasDisponible para su visualización
   * en la tabla correspondiente. La suscripción se maneja con takeUntil para evitar fugas de memoria.
   * Los datos incluyen información completa de cada factura disponible para asociación.
   * @returns {void} No retorna ningún valor.
   */
  recuperarDatos(): void {
    this.facturasAsociadasService
      .getFacturasTpl(
        "AAL0409235E6",
        this.solicitudState.idExpedicion,
        this.solicitudState.identificadorRegimen
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00' && response.datos?.content) {
            this.facturasDisponible = response.datos.content.map((factura) => ({
              numeroDeLaFactura: factura.num_factura,
              razonSocial: factura.razon_social_consig_emisor,
              domicilio: factura.direccion_consig_emisor,
              fechaExpedicionFactura: factura.fecha_expedicion,
              cantidadTotal: factura.cantidad_total.toString(),
              cantidadDisponible: factura.cantidad_disponible.toString(),
              unidadMedida: factura.descripcion,
              valorDolares: factura.imp_dls.toString(),

              idFacturaExpedicion: factura.id_factura_expedicion,
              idExpedicion: this.solicitudState.idExpedicion,
            }));
          } else {
            this.facturasDisponible = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.facturasDisponible = [];
        }
      });
  }

  /**
   * @method guardadoFila
   * @description Almacena la fila seleccionada de la tabla de facturas disponibles.
   * Recibe la fila seleccionada por el usuario y la asigna a la propiedad filaSeleccionada
   * para su posterior uso en operaciones de asociación. Valida que la fila no sea nula o undefined
   * antes de realizar la asignación.
   * @param {CapturarColumns} fila - Objeto que representa la fila seleccionada con todos sus datos.
   * @returns {void} No retorna ningún valor.
  */
  guardadoFila(fila: CapturarColumns): void {
    if (!fila) {
      return;
    }
    this.filaSeleccionada = fila;
  }

  /**
   * @method asociarEvaluate
   * @description Realiza el proceso de asociación de una factura al trámite actual.
   * Construye el payload con los datos necesarios (ID expedición, ID factura y cantidad)
   * y realiza una petición POST al servicio de asociación. Si la respuesta es exitosa (código '00'),
   * actualiza los datos disponibles y asociados. Maneja errores de conexión o validación.
   * @returns {void} No retorna ningún valor.
  */
  asociarEvaluate(): void {
    const PAYLOAD: FacturasTplAsociadasRequest = {
      id_expedicion: this.filaSeleccionada?.idExpedicion,
      id_factura_expedicion: this.filaSeleccionada?.idFacturaExpedicion,
      cantidad_asociada: this.formularioAsociacionFactura.get('cantidadFacturas')?.value
    };
    this.facturasAsociadasService
      .postFacturasAsociar(PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.recuperarDatos();
            this.recuperarDatosAsociadas();
            this.setValoresCantidadTotal();
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
  }

  /**
   * @method recuperarDatosAsociadas
   * @description Obtiene los datos de las facturas asociadas desde el servicio.
   * Realiza una petición HTTP al servicio para cargar las facturas que ya han sido asociadas
   * al trámite actual desde un archivo JSON. Los datos obtenidos se asignan a la propiedad
   * facturasAsociadas para su visualización en la tabla de facturas asociadas.
   * La suscripción se maneja con takeUntil para evitar fugas de memoria.
   * Estos datos incluyen información específica del proceso de asociación.
   * @returns {void} No retorna ningún valor.
   */
  recuperarDatosAsociadas(): void {
    this.facturasAsociadasService
      .getFacturasTplAsociadas(
        this.solicitudState.idExpedicion,
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00' && response.datos?.content) {
            this.facturasAsociadas = response.datos.content.map((factura) => ({
              candidadAsociada: factura.cantidad_asociada.toString(),
              numeroDeLaFactura: factura.factura_expedicion.num_factura,
              razonSocial: factura.factura_expedicion.razon_social,
              domicilio: factura.factura_expedicion.domicilio,
              fechaExpedicionFactura: factura.factura_expedicion.fecha_expedicion,
              cantidadTotal: factura.factura_expedicion.cantidad.toString(),
              cantidadDisponible: factura.factura_expedicion.cantidad_disponible.toString(),
              unidadMedida: factura.factura_expedicion.unidad_medida.descripcion,
              valorDolares: factura.factura_expedicion.importe_dolares.toString(),

              idFacturaExpedicion: factura.id_factura_expedicion,
              idExpedicion: factura.id_expedicion
            }));
          } else {
            this.facturasAsociadas = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.facturasAsociadas = [];
        }
      });
  }

  /**
   * @method setValoresCantidadTotal
   * @description Obtiene los totales de facturas asociadas y metros cuadrados equivalentes
   * desde el servicio y actualiza los valores en el formulario reactivo.
   * Realiza una petición HTTP al servicio `getFacturaTplTotalUnida` utilizando `idExpedicion`
   * como parámetro. Los valores recibidos se asignan a los controles `cantidadFacturasTotal`
   * y `metrosCuadradosEquivalentes` del formulario.
   * La suscripción se maneja con `takeUntil` para evitar fugas de memoria.
   * @returns {void} No retorna ningún valor.
 */
  setValoresCantidadTotal(): void {
    this.facturasAsociadasService
      .getFacturaTplTotalUnida(this.solicitudState.idExpedicion)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00' && response.datos) {
            this.formularioAsociacionFactura.patchValue({
              cantidadFacturasTotal: response.datos.cantidad,
              metrosCuadradosEquivalentes: response.datos.total
            });
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
  }

  /**
   * @method guardadoFilaAsociada
   * @description Asigna la fila seleccionada de la tabla de facturas asociadas
   * a la propiedad `filaSeleccionadaAsociada` para su posterior uso.
   * Este método evita asignar un valor `null` o `undefined`.
   * @param {AsociadasTableColumns} fila - Fila seleccionada de la tabla de facturas asociadas.
   * @returns {void} No retorna ningún valor.
   */
  guardadoFilaAsociada(fila: AsociadasTableColumns): void {
    if (!fila) {
      return;
    }
    this.filaSeleccionadaAsociada = fila;
  }

  /**
   * @method eliminarSeleccionado
   * @description Elimina la fila de factura asociada actualmente seleccionada.
   * Construye un payload con los IDs de expedición y factura y llama al servicio `deleteFacturaTpl`.
   * La operación se realiza utilizando un arreglo de `FacturasTplEliminarRequest` aunque solo
   * se elimine un elemento, para mantener compatibilidad con el endpoint que espera un array.
   * La suscripción se maneja con `takeUntil` para evitar fugas de memoria.
   * @returns {void} No retorna ningún valor.
   */
  eliminarSeleccionado(): void {
    if (!this.filaSeleccionadaAsociada) {
      return;
    }
    const PAYLOAD: FacturasTplEliminarRequest[] = [
      {
        id_expedicion: this.filaSeleccionadaAsociada?.idExpedicion,
        id_factura_expedicion: this.filaSeleccionadaAsociada?.idFacturaExpedicion
      }
    ];
    this.facturasAsociadasService.deleteFacturaTpl(PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.facturasAsociadas = [];
            this.facturasDisponible = [];
            this.filaSeleccionada = undefined;
            this.filaSeleccionadaAsociada = undefined;
            this.recuperarDatos();
            this.recuperarDatosAsociadas();
            this.formularioAsociacionFactura.reset();

            this.mostrarTabla = false;
            this.cd.detectChanges();
            this.mostrarTabla = true;
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * Método utilitario que extrae el valor de un campo específico del formulario
   * y lo almacena en el store global utilizando el método especificado.
   * Facilita la sincronización entre el estado del formulario de facturas asociadas
   * y el estado global de la aplicación, asegurando consistencia de datos.
   * @param {FormGroup} form - El formulario reactivo del cual extraer el valor.
   * @param {string} campo - El nombre del campo del formulario a extraer.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El nombre del método del store a invocar para guardar el valor.
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
   * Método para continuar al siguiente paso, validando el campo cantidadFacturas.
   * Si el formulario es inválido, muestra el mensaje de error y no permite continuar.
   * Si es válido, limpia el error y permite continuar.
   */
  continuar(): void {
    this.formularioAsociacionFactura.markAllAsTouched();
    this.formularioAsociacionFactura.updateValueAndValidity();
    this.cdr.detectChanges();

    if (!this.formularioAsociacionFactura.valid) {
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
   * Es una implementación estándar del patrón de limpieza en Angular que asegura
   * que todas las suscripciones del componente sean correctamente finalizadas
   * cuando el componente se destruye.
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
