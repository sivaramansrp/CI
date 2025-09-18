import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  Notificacion,
  NotificacionesComponent,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  ERROR_FORMA_ALERT,
  EXPEDICION_FACTURA_FECHA,
  VALIDO,
} from '../../constantes/elegibilidad-de-textiles.enums';
import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CONFIGURACION_ENCABEZADO_FACTURAS } from '../../constantes/elegibilidad-de-textiles.enums';
import { CommonModule } from '@angular/common';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { FacturaTplCapturaRequest } from '../../models/request/facturas-tpl-captura-requet.model';
import { FacturasAsociadasService } from '../../services/facturas-asociadas.service';
import { FacturasTplCapturaResponse } from '../../models/response/facturas-tpl-captura-response.model';
import { Solicitud120301State } from '../../estados/tramites/tramite120301.store';
import { Tramite120301Query } from '../../estados/queries/tramite120301.query';
import { UnidadMedidaService } from '../../services/catalogos/unidad-medida.service';

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
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputFechaComponent, CatalogoSelectComponent, TablaDinamicaComponent, NotificacionesComponent],
})
export class CapturarFacturasComponent implements OnInit, OnDestroy {
  /**  Getter para exponer el FormGroup principal como 'formGroup' para integración con el padre.*/
  public get formGroup(): FormGroup { return this.facturaForm; }
  /** @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado. */
  @Input()
  formularioDeshabilitado: boolean = false;
  /** @property {FormGroup} facturaForm - El grupo de formularios para capturar los datos de las facturas. */
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

  /** @property {string[]} selectRangoDias - Array de rangos de días seleccionables. */
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
  facturas: FacturasTplCapturaResponse[] = [];
  /**
   *  @property {CapturarColumns[]} facturaSeleccionada - Array de facturas seleccionadas en la tabla. 
   */
  facturaSeleccionada: FacturasTplCapturaResponse[] = [];
  /**  
   * @property {CapturasColumns} facturaModificar - Objeto que contiene los datos de la factura a modificar. 
   */
  facturaModificar!: FacturasTplCapturaResponse;
  /**
   * @property {Subject<void>} destroyNotifier$ - Notificador para cancelar suscripciones y evitar fugas de memoria.
   * Utilizado con operadores como `takeUntil`.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**  @property {TextilesState} capturarState - Estado actual relacionado con la captura de datos textiles. */
  private capturarState!: TextilesState;

  /**  @property {SeccionLibState} seccionState - Estado actual de la sección en el módulo de librerías. */
  private seccionState!: SeccionLibState;

  /**
     * @property {Solicitud120301State} solicitudState - Estado de la solicitud en el store de Akita.
     * Almacena el estado completo de la solicitud según la arquitectura Akita,
     * incluyendo todos los datos relevantes para el manejo del estado de la aplicación.
     * Se actualiza mediante los correspondientes stores y queries de Akita.
     */
  public solicitudState!: Solicitud120301State;
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
  tableColumns = CONFIGURACION_ENCABEZADO_FACTURAS;
  /**
   * @property {boolean} agregarFacturas - Bandera que indica si se deben agregar nuevas facturas.
   * Controla la visualización del formulario para agregar facturas.
   */
  agregarFacturas: boolean = false;
  /**
   * @property {boolean} tablaFactura - Bandera que indica si se debe mostrar la tabla de facturas.
   * Controla la visualización de la tabla que lista las facturas capturadas.
   */
  tablaFactura: boolean = true;
  /**
     * Notificación que se muestra al usuario en caso de error o éxito en el proceso de firma.
     * Incluye información sobre el tipo de notificación, categoría, título y mensaje.
     */
  nuevaNotificacion!: Notificacion;

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
    private readonly fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private unidadMedidaService: UnidadMedidaService,
    private cdr: ChangeDetectorRef,
    private facturasAsociadasService: FacturasAsociadasService,
    private tramite120301Query: Tramite120301Query,
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
      unidadDeMedida: [{ value: this.capturarState.unidadDeMedida, disabled: false }, Validators.required],
      fechaExpedicionFactura: ['', Validators.required],
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
      pais: [{ value: this.solicitudState.pais_origen_destino || this.capturarState.pais, disabled: true }, Validators.required],
    });
  }

  /**
   * @property {Catalogo[]} unidadDeMedida - Configuración para el select de unidad de medida.
   * Array que contiene las opciones disponibles para el campo de unidad de medida en el formulario.
   * Se carga dinámicamente desde el servicio al inicializar el componente.
   */
  unidadDeMedida!: Catalogo[];

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
    this.unidadMedidaService.getUnidadMedida()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          if (data.codigo === '00') {
            this.unidadDeMedida = data.datos || [];
            if (this.solicitudState?.unidadMedida) {
              const MATCH = this.unidadDeMedida.find(
                (item) => item.descripcion?.toLowerCase() === this.solicitudState.unidadMedida.toLowerCase()
              );
              if (MATCH) {
                this.facturaForm.get('unidadDeMedida')?.setValue(MATCH.clave || '');
                this.ElegibilidadDeTextilesStore.setUnidadDeMedida(MATCH.clave || '');
              }
            }
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.unidadDeMedida = [];
        }
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
    this.facturasAsociadasService
      .getFacturasTplAll(
        "AAL0409235E6",
        this.solicitudState.idExpedicion,
        this.solicitudState.identificadorRegimen
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          if (response.codigo === '00' && response.datos) {
            this.facturas = response.datos;
          } else {
            this.facturas = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.facturas = [];
        }
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

  /**
   * @method VisualizarAgregar
   * @description Método para cambiar la vista y permitir la captura de una nueva factura.
   * Cambia las banderas internas para mostrar el formulario de captura y ocultar la tabla de facturas.
   * @returns {void} No retorna ningún valor.
   */
  VisualizarAgregarFactura(): void {
    this.agregarFacturas = true;
    this.tablaFactura = false;
  }

  /**
   * @method agregarFactura
   * @description Método para cambiar la vista y permitir la captura de una nueva factura.
   * Cambia las banderas internas para mostrar el formulario de captura y ocultar la tabla de facturas.
   * @returns {void} No retorna ningún valor.
   */
  agregarModificarFactura(): void {
    this.facturaForm.markAllAsTouched();
    this.facturaForm.updateValueAndValidity();
    this.cdr.detectChanges();

    if (!this.facturaForm.valid) {
      this.formularioAlertaError = ERROR_FORMA_ALERT;
      this.esFormaValido = true;
      window.scrollTo(0, 0);
      return;
    }

    this.formularioAlertaError = '';
    this.esFormaValido = false;

    const RAWFECHA = this.facturaForm.get('fechaExpedicionFactura')?.value;
    let fechaFormateada = '';

    if (RAWFECHA) {
      const PARTES = RAWFECHA.split('/');
      if (PARTES.length === 3) {
        const [DIA, MES, ANIO] = PARTES;
        fechaFormateada = `${ANIO}-${MES.padStart(2, '0')}-${DIA.padStart(2, '0')}`;
      } else {
        const FECHAOBJ = new Date(RAWFECHA);
        fechaFormateada = FECHAOBJ.toISOString().split('T')[0];
      }
    }

    const FACTURA: FacturaTplCapturaRequest = {
      id_factura_expedicion: this.facturaModificar?.id_factura_expedicion || null,
      num_factura: this.facturaForm.get('numeroFactura')?.value,
      fecha_expedicion: fechaFormateada,
      razon_social_consig_emisor: this.facturaForm.get('razonSocial')?.value,
      ide_regimen: this.solicitudState.identificadorRegimen ?? '',
      cantidad: this.facturaForm.get('cantidadTotal')?.value,
      importe_dolares: this.facturaForm.get('valorDolares')?.value,
      domicilio: this.facturaForm.get('calle')?.value,
      cve_unidad_medida: this.facturaForm.get('unidadDeMedida')?.value,
      tax_id: this.facturaForm.get('taxId')?.value,
      ciudad: this.facturaForm.get('ciudad')?.value,
      cp: this.facturaForm.get('cp')?.value,
      pais: this.facturaForm.get('pais')?.value,
    };

    this.facturasAsociadasService.postFacturasTplAgregar(this.solicitudState.idSolicitud, FACTURA).subscribe({
      next: (response) => {
        if (response.codigo === '00') {
          this.agregarFacturas = false;
          this.tablaFactura = true;
          this.recuperarDatos();
          this.limpiarFormulario();
        } else {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'error',
            modo: 'action',
            titulo: '',
            mensaje: `No se pudo agregar la factura: ${response.mensaje}`,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          this.nuevaNotificacion = { ...this.nuevaNotificacion };
          this.formularioAlertaError = `No se pudo agregar la factura: ${response.mensaje}`;
          this.esFormaValido = true;
        }
      },
      error: (error) => {
        console.error('Error al agregar la factura:', error);
        this.formularioAlertaError = 'Error inesperado al agregar la factura.';
        this.esFormaValido = true;
      }
    });
  }

  /**
   * @method modificarFactura
   * @description Método para cambiar la vista y permitir la modificación de una factura existente.
   * Cambia las banderas internas para mostrar el formulario de captura y ocultar la tabla de facturas.
   * @returns {void} No retorna ningún valor.
   */
  visualizarModificarFactura(): void {
    if (!this.facturaSeleccionada || this.facturaSeleccionada.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: '',
        mensaje: 'Debe seleccionar una factura para modificar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    if (this.facturaSeleccionada.length > 1) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: '',
        mensaje: 'Solo puede modificar una factura a la vez.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.agregarFacturas = true;
    this.tablaFactura = false;

    const FACTURA_SELECCIONADA = this.facturaSeleccionada[0];
    this.facturaModificar = FACTURA_SELECCIONADA;
    // Buscar la unidad de medida en el catálogo
    let unidadClave: string | null = null;
    if (FACTURA_SELECCIONADA.descripcion && this.unidadDeMedida?.length > 0) {
      const MATCH = this.unidadDeMedida.find(
        (item) => item.descripcion?.toLowerCase() === FACTURA_SELECCIONADA.descripcion.toLowerCase()
      );
      if (MATCH) {
        unidadClave = MATCH.clave || null;
      }
    }

    let fechaFormateada = '';
    if (FACTURA_SELECCIONADA.fecha_expedicion) {
      const PARTES = FACTURA_SELECCIONADA.fecha_expedicion.split(' ')[0].split('-'); // ["DD", "MM", "YYYY"]
      if (PARTES.length === 3) {
        fechaFormateada = `${PARTES[0]}/${PARTES[1]}/${PARTES[2]}`;
      }
    }

    this.facturaForm.patchValue({
      numeroFactura: FACTURA_SELECCIONADA.num_factura,
      razonSocial: FACTURA_SELECCIONADA.razon_social_consig_emisor,
      calle: FACTURA_SELECCIONADA.direccion_consig_emisor,
      fechaExpedicionFactura: fechaFormateada,
      cantidadTotal: FACTURA_SELECCIONADA.cantidad,
      unidadDeMedida: unidadClave,
      valorDolares: FACTURA_SELECCIONADA.imp_dls,
    });

    this.facturaSeleccionada = [];
  }

  /**
   * @method eliminarSeleccionados
   * @description Método para cancelar la acción de agregar o modificar facturas.
   * Cambia las banderas internas para ocultar el formulario de captura y mostrar la tabla de facturas.
   * @returns {void} No retorna ningún valor.
   */
  eliminarSeleccionados(): void {
    this.agregarFacturas = false;
    if (!this.facturaSeleccionada || this.facturaSeleccionada.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: '',
        mensaje: 'Debe seleccionar al menos una factura para eliminar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
    if (this.facturaSeleccionada.length > 1) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: '',
        mensaje: 'Solo puede eliminar una factura a la vez.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
    const IDS_A_ELIMINAR = this.facturaSeleccionada.map(factura => factura.id_factura_expedicion).filter(id => id !== null) as number[];
    this.facturasAsociadasService.deleteFactura(IDS_A_ELIMINAR[0]).subscribe({
      next: (response) => {
        if (response.codigo === '00') {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'success',
            modo: 'action',
            titulo: '',
            mensaje: 'Factura(s) eliminada(s) correctamente.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          this.recuperarDatos();
          this.facturaSeleccionada = [];
        }
      },
      error: (error) => {
        console.error('Error al eliminar la factura:', error);
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'success',
          modo: 'action',
          titulo: '',
          mensaje: 'Error inesperado al eliminar la(s) factura(s).',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    });
  }

  /**
   * @method limpiarFormulario
   * @description Método para limpiar el formulario de captura de facturas.
   * Resetea todos los campos del formulario y limpia cualquier mensaje de error o estado de validación.
   * @returns {void} No retorna ningún valor.
   */
  limpiarFormulario(): void {
    const PAIS_ACTUAL = this.facturaForm.get('pais')?.value;
    const UNIDAD_MEDIDA = this.facturaForm.get('unidadDeMedida')?.value;
    this.facturaForm.reset();
    this.facturaForm.get('pais')?.setValue(PAIS_ACTUAL);
    this.facturaForm.get('pais')?.disable();
    this.facturaForm.get('unidadDeMedida')?.setValue(UNIDAD_MEDIDA);
    this.facturaForm.get('unidadDeMedida')?.disable();

    this.formularioAlertaError = '';
    this.esFormaValido = false;
  }

  /**
   * @method cerrarFormulario
   * @description Método para cerrar el formulario de captura de facturas.
   * Cambia las banderas internas para ocultar el formulario y mostrar la tabla de facturas.
   */
  cerrarFormulario(): void {
    this.agregarFacturas = false;
    this.tablaFactura = true;

    // Guardar valor actual de campos a conservar
    const PAIS_ACTUAL = this.facturaForm.get('pais')?.value;
    const UNIDAD_MEDIDA = this.facturaForm.get('unidadDeMedida')?.value;

    // Resetear el formulario
    this.facturaForm.reset();

    // Restaurar valor de los campos a conservar
    this.facturaForm.get('pais')?.setValue(PAIS_ACTUAL);
    this.facturaForm.get('unidadDeMedida')?.setValue(UNIDAD_MEDIDA);

    // Si el campo debe seguir deshabilitado
    this.facturaForm.get('pais')?.disable();
    this.facturaForm.get('unidadDeMedida')?.disable();

    this.formularioAlertaError = '';
    this.esFormaValido = false;
  }
}
