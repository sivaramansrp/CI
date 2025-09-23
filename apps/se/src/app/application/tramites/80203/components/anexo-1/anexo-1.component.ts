import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogoServices,
  ConfiguracionColumna,
  ConsultaioQuery,
  SeccionLibQuery,
  SeccionLibState,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FRACCION_EXPORTACION,
  IMMEX_SERVICIO,
  NICO_TABLA,
  fraccionInfo,
  immexInfo,
  immexRegistroform,
  nicoInfo,
} from '../../modelos/immex-registro-de-solicitud-modality.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImmexRegistroQuery } from '../../estados/queries/tramite80203.query';
import { ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';
import { Modal } from 'bootstrap';
import { NicoService } from '../../servicios/nico/nico.service';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

/**
 * @component
 * @name Anexo1Component
 * @description
 * Componente responsable de manejar el formulario de registro IMMEX.
 * Permite la captura, visualización y validación de los datos relacionados con el trámite IMMEX.
 * Gestiona la obtención de datos desde servicios, la gestión de formularios reactivos y la interacción con tablas dinámicas para exportación e importación.
 *
 * - Obtiene y muestra datos de servicios, fracciones arancelarias y NICO.
 * - Gestiona el estado y validación del formulario de registro IMMEX.
 * - Permite la interacción con tablas dinámicas para seleccionar y visualizar información.
 * - Sincroniza el estado del formulario con el store y permite el modo solo lectura.
 *
 * @example
 * <anexo-1></anexo-1>
 *
 * @property {FormGroup} immexRegistroform - Formulario principal del registro IMMEX.
 * @property {immexRegistroform} immexRegitroAnexoState - Estado del formulario de registro IMMEX.
 * @property {TablaSeleccion} tablaSeleccionRadio - Tipo de selección de la tabla (Radio).
 * @property {TablaSeleccion} tablaSeleccionCheckbox - Tipo de selección de la tabla (Checkbox).
 * @property {ConfiguracionColumna<immexInfo>[]} permisoImmexTabla - Configuración de las columnas de la tabla para servicios IMMEX.
 * @property {immexInfo[]} immexTableDatos - Datos de los servicios IMMEX.
 * @property {ConfiguracionColumna<fraccionInfo>[]} fraccionExportacionTabla - Configuración de las columnas de la tabla para fracciones de exportación.
 * @property {fraccionInfo[]} fraccionTablaDatos - Datos de las fracciones arancelarias.
 * @property {ConfiguracionColumna<nicoInfo>[]} nicoTabla - Configuración de las columnas de la tabla para NICO.
 * @property {nicoInfo[]} nicoTablaDatos - Datos de NICO.
 * @property {string} immexRegistro - Variable de estado para IMMEX Registro.
 * @property {Subject<void>} destroyNotifier$ - Subject para manejar la desuscripción de observables.
 * @property {any[]} permisoImmexDatos - Array de datos permiso immex.
 * @property {fraccionInfo[]} fraccionDatos - Array de datos fracción.
 * @property {nicoInfo[]} nicoDatos - Array de datos NICO.
 * @property {Catalogo[]} nico - Configuración para el select de unidad de medida.
 * @property {boolean} showTableExport - Estado de visibilidad de la tabla de exportación.
 * @property {boolean} showTableImport - Estado de visibilidad de la tabla de importación.
 * @property {boolean} showTableFractionExp - Estado de visibilidad de la tabla de fracción de exportación.
 * @property {boolean} showTableNicoExp - Estado de visibilidad de la tabla NICO exportación.
 * @property {boolean} showTableNicoImp - Estado de visibilidad de la tabla NICO importación.
 * @property {boolean} esFormularioSoloLectura - Indica si el formulario debe mostrarse solo en modo de lectura.
 *
 * @method ngOnInit Inicializa el componente y obtiene los datos necesarios.
 * @method ngAfterViewInit Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
 * @method creatFormSolicitud Inicializa el formulario reactivo principal.
 * @method inicializarEstadoFormulario Inicializa el estado del formulario dependiendo si está en modo solo lectura.
 * @method ngOnDestroy Maneja la limpieza de recursos antes de destruir el componente.
 * @method fetchData Obtiene los datos de los fabricantes desde el servicio.
 * @method obtenerListasDesplegables Obtiene las listas desplegables.
 * @method obtenerIngresoSelectList Obtiene la lista para el select de unidad de medida.
 * @method showFraccionExportacion Muestra la sección de fracción de exportación.
 * @method showTableExportacion Muestra la tabla de exportación.
 * @method showTableImportacion Muestra la tabla de importación.
 * @method showTableFractionExport Muestra la tabla de fracción de exportación.
 * @method showTableNicoExport Muestra la tabla NICO exportación.
 * @method showTableNicoImport Muestra la tabla NICO importación.
 * @method showProductoImportacion Muestra la sección de producto de importación.
 * @method showCommodityImportacion Muestra la sección de commodity de importación.
 * @method disableFormControls Deshabilita los controles específicos del formulario.
 *
 * @see PermisoImmexDatosService
 * @see NicoService
 * @see ImmexRegistroQuery
 * @see ImmexRegistroStore
 * @see SeccionLibQuery
 * @see SeccionLibStore
 * @see ConsultaioQuery
 */
@Component({
  selector: 'anexo-1',
  templateUrl: './anexo-1.component.html',
  styleUrls: ['./anexo-1.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
  ],
})
export class Anexo1Component implements OnInit, OnDestroy {
  /**
   * Referencia al elemento del modal de importación de mercancía.
   * Utilizado para mostrar u ocultar el modal mediante la API de Bootstrap.
   */
  @ViewChild('mercanciaImportacionModal')
  mercanciaImportacionModal!: ElementRef;

  /**
   * Referencia al elemento del modal de exportación de mercancía.
   * Utilizado para mostrar u ocultar el modal mediante la API de Bootstrap.
   */
  @ViewChild('mercanciaExportacionModal')
  mercanciaExportacionModal!: ElementRef;

  /**
   * ID del trámite actual.
   */
  tramiteId: string = '80203';

  /**
   * @property {FormGroup} immexRegistroform
   * @description Formulario principal del registro IMMEX.
   */
  immexRegistroform!: FormGroup;

  /**
   * @property {immexRegistroform} immexRegitroAnexoState
   * @description Estado del formulario de registro IMMEX.
   */
  immexRegitroAnexoState!: immexRegistroform;

  /**
   * @property {TablaSeleccion} tablaSeleccionRadio
   * @description Tipo de selección de la tabla (Radio).
   */
  tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * @property {TablaSeleccion} tablaSeleccionCheckbox
   * @description Tipo de selección de la tabla (Checkbox).
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @property {ConfiguracionColumna<immexInfo>[]} permisoImmexTabla
   * @description Configuración de las columnas de la tabla para servicios IMMEX.
   */
  permisoImmexTabla: ConfiguracionColumna<immexInfo>[] = IMMEX_SERVICIO;

  /**
   * @property {immexInfo[]} immexTableDatos
   * @description Datos de los servicios IMMEX.
   */
  immexTableDatos: immexInfo[] = [];

  /**
   * @property {ConfiguracionColumna<fraccionInfo>[]} fraccionExportacionTabla
   * @description Configuración de las columnas de la tabla para fracciones de exportación.
   */
  fraccionExportacionTabla: ConfiguracionColumna<fraccionInfo>[] =
    FRACCION_EXPORTACION;

  /**
   * @property {fraccionInfo[]} fraccionTablaDatos
   * @description Datos de las fracciones arancelarias.
   */
  fraccionTablaDatos: fraccionInfo[] = [];

  /**
   * @property {ConfiguracionColumna<nicoInfo>[]} nicoTabla
   * @description Configuración de las columnas de la tabla para NICO.
   */
  nicoTabla: ConfiguracionColumna<nicoInfo>[] = NICO_TABLA;

  /**
   * @property {nicoInfo[]} nicoTablaDatos
   * @description Datos de NICO.
   */
  nicoTablaDatos: nicoInfo[] = [];

  /**
   * @property {string} immexRegistro
   * @description Variable de estado para IMMEX Registro.
   */
  immexRegistro!: string;

  /**
   * @private
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para manejar la desuscripción de observables y evitar memory leaks.
   * Se emite cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {any[]} permisoImmexDatos
   * @description Array que contiene los datos de permisos IMMEX obtenidos del servicio.
   * Almacena la información necesaria para mostrar los permisos disponibles en la tabla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permisoImmexDatos: any[] = [];

  /**
   * @property {fraccionInfo[]} fraccionDatos
   * @description Array que contiene los datos de fracciones arancelarias obtenidos del servicio.
   * Estos datos se utilizan para poblar las tablas de fracciones de exportación e importación.
   */
  fraccionDatos: fraccionInfo[] = [];

  /**
   * @property {nicoInfo[]} nicoDatos
   * @description Array que contiene los datos de NICO (Nomenclatura de Identificación de Commodities)
   * obtenidos del servicio. Se utiliza para mostrar información relacionada con commodities.
   */
  nicoDatos: nicoInfo[] = [];

  /**
   * @property {Catalogo[]} nico
   * @description Configuración para el select de unidad de medida NICO.
   * Contiene las opciones disponibles para el catálogo desplegable de NICO.
   */
  nico: Catalogo[] = [];

  /**
   * @property {boolean} showTableExport
   * @description Controla la visibilidad de la tabla de exportación.
   * Cuando es true, muestra la tabla de datos de exportación.
   */
  showTableExport: boolean = false;

  /**
   * @property {boolean} showTableImport
   * @description Controla la visibilidad de la tabla de importación.
   * Cuando es true, muestra la tabla de datos de importación.
   */
  showTableImport: boolean = false;

  /**
   * @property {boolean} showTableFractionExp
   * @description Controla la visibilidad de la tabla de fracción de exportación.
   * Cuando es true, muestra la tabla específica para fracciones de exportación.
   */
  showTableFractionExp: boolean = false;

  /**
   * @property {boolean} showTableNicoExp
   * @description Controla la visibilidad de la tabla NICO de exportación.
   * Cuando es true, muestra la tabla de datos NICO para exportación.
   */
  showTableNicoExp: boolean = false;

  /**
   * @property {boolean} showTableNicoImp
   * @description Controla la visibilidad de la tabla NICO de importación.
   * Cuando es true, muestra la tabla de datos NICO para importación.
   */
  showTableNicoImp: boolean = false;

  /**
   * @private
   * @property {SeccionLibState} seccion
   * @description Estado de la sección actual obtenido del store.
   * Contiene información sobre el estado de validación y navegación de las secciones.
   */
  private seccion!: SeccionLibState;

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * Si es `true`, todos los controles del formulario estarán deshabilitados y solo podrán visualizarse.
   * Si es `false`, el formulario será editable.
   *
   * @type {boolean}
   * @memberof Anexo1Component
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario está en modo de actualización.
   * Si es `true`, el formulario está en estado de edición/actualización de datos existentes.
   * Si es `false`, el formulario está en modo de alta/nuevo registro.
   *
   * @type {boolean}
   * @memberof Anexo1Component
   */
  esFormularioActualizacion: boolean = false;

  /**
   * @constructor
   * @description
   * Constructor del componente Anexo1Component.
   * Inicializa los servicios y stores necesarios para la gestión del formulario IMMEX, la obtención de datos y la interacción con el estado global.
   *
   * @param {FormBuilder} fb - Servicio para la creación y gestión de formularios reactivos.
   * @param {PermisoImmexDatosService} permisoImmexDatosService - Servicio para obtener datos de permiso IMMEX.
   * @param {NicoService} nicoService - Servicio para obtener datos de NICO.
   * @param {ImmexRegistroQuery} immexRegistroQuery - Query para consultar el estado del registro IMMEX.
   * @param {ImmexRegistroStore} immexRegistroStore - Store para manejar el estado del registro IMMEX.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {ConsultaioQuery} consultaQuery - Query para consultar el estado de la consulta.
   */
  constructor(
    public fb: FormBuilder,
    public permisoImmexDatosService: PermisoImmexDatosService,
    public readonly nicoService: NicoService,
    public immexRegistroQuery: ImmexRegistroQuery,
    public immexRegistroStore: ImmexRegistroStore,
    public seccionQuery: SeccionLibQuery,
    public seccionStore: SeccionLibStore,
    public readonly consultaQuery: ConsultaioQuery,
    public catalogoService: CatalogoServices
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (!seccionState.create && seccionState.procedureId === '80203') {
            this.esFormularioSoloLectura = seccionState.readonly;
            this.esFormularioActualizacion = seccionState.update;
          }
          if (seccionState) {
            this.showTableExport = true;
            this.showTableImport = true;
            this.showTableFractionExp = true;
          }
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se inicializa.
   * Inicializa el estado del formulario dependiendo si está en modo solo lectura.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * @method creatFormSolicitud
   * @description Inicializa el formulario reactivo immexRegistroform con los grupos de controles necesarios
   * para la exportación e importación. Utiliza los valores actuales del estado immexRegitroAnexoState para
   * poblar los campos del formulario. El formulario se divide en dos secciones principales:
   * - exportacionForm: Contiene todos los campos relacionados con la exportación de mercancías
   * - importacionForm: Contiene todos los campos relacionados con la importación de mercancías
   *
   * Cada sección incluye campos para datos de permisos, fracciones arancelarias, descripciones de productos
   * y códigos NICO, permitiendo la gestión completa del trámite IMMEX.
   *
   * @returns {void}
   */
  creatFormSolicitud(): void {
    this.immexRegistroform = this.fb.group({
      exportacionForm: this.createExportacionFormGroup(),
      importacionForm: this.createImportacionFormGroup(),
    });
  }

  private createExportacionFormGroup(): FormGroup {
    return this.fb.group({
      permisoImmexDatos: [
        this.immexRegitroAnexoState.permisoImmexDatos || [],
        [],
      ],
      fraccionDatos: [this.immexRegitroAnexoState?.fraccionDatos || [], []],
      nicoDatos: [this.immexRegitroAnexoState?.nicoDatos || [], []],
      fraccionArancelariaExportacion: [
        this.immexRegitroAnexoState?.fraccionArancelariaExportacion || '',
        [],
      ],
      // Add missing controls for template binding
      productoArancelariaExportacion: [
        this.immexRegitroAnexoState?.productoArancelariaExportacion || '',
        [],
      ],
      productoDescExportacion: [
        this.immexRegitroAnexoState?.productoDescExportacion || '',
        [],
      ],
      fraccionArancelariaDesc: [
        this.immexRegitroAnexoState?.fraccionArancelariaDesc || '',
        [],
      ],
      FraccionDescExportacion: [
        this.immexRegitroAnexoState?.FraccionDescExportacion || '',
        [],
      ],
      exportacionDescExportacion: [
        this.immexRegitroAnexoState?.exportacionDescExportacion || '',
        [],
      ],
      Nico: [this.immexRegitroAnexoState?.Nico || '', []],
    });
  }

  private createImportacionFormGroup(): FormGroup {
    return this.fb.group({
      permisoImmexDatos: [
        this.immexRegitroAnexoState.permisoImmexDatos || [],
        [],
      ],
      fraccionDatos: [this.immexRegitroAnexoState?.fraccionDatos || [], []],
      nicoDatos: [this.immexRegitroAnexoState?.nicoDatos || [], []],
      commodityImportacion: [
        this.immexRegitroAnexoState?.commodityImportacion || '',
        [],
      ],
      commodityDescImportacion: [
        this.immexRegitroAnexoState?.commodityDescImportacion || '',
        [],
      ],
      commodityNicoDescImportacion: [
        this.immexRegitroAnexoState?.commodityNicoDescImportacion || '',
        [],
      ],
      candiadAnual: [this.immexRegitroAnexoState?.candiadAnual || '', []],
      capacidadPeriodo: [
        this.immexRegitroAnexoState?.capacidadPeriodo || '',
        [],
      ],
      candidadPorPeriodo: [
        this.immexRegitroAnexoState?.candidadPorPeriodo || '',
        [],
      ],
      Nico: [this.immexRegitroAnexoState?.Nico || '', []],
    });
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario basándose en la configuración de solo lectura.
   * Si el formulario no existe, lo crea mediante creatFormSolicitud(). Posteriormente, evalúa
   * si el formulario debe estar en modo solo lectura (esFormularioSoloLectura) y aplica el
   * estado correspondiente: deshabilitado para solo lectura o habilitado para edición.
   *
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.initActionFormBuild();
    }
    if (!this.immexRegistroform) {
      this.creatFormSolicitud();
    }
  }

  /**
   * Habilita o deshabilita el formulario dependiendo del modo de solo lectura.
   *
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.initActionFormBuild();
    if (this.esFormularioSoloLectura) {
      this.immexRegistroform.get('exportacionForm')?.disable();
      this.immexRegistroform.get('importacionForm')?.disable();
    } else {
      this.immexRegistroform.get('exportacionForm')?.enable();
      this.immexRegistroform.get('importacionForm')?.enable();
    }
  }

  /**
   * Inicializa el formulario de acción.
   * @method initActionFormBuild
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.immexRegistroQuery.selectImmexRegistro$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.immexRegitroAnexoState = seccionState.immexRegistro;
        })
      )
      .subscribe();

    this.creatFormSolicitud();

    // Asegúrese de que immexRegitroAnexoState esté asignado antes de acceder a sus propiedades
    this.immexRegistroQuery.selectImmexRegistro$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: { immexRegistro: immexRegistroform }) => {
          if (seccionState) {
            this.immexRegitroAnexoState = seccionState.immexRegistro;
            this.immexRegistroform.patchValue(this.immexRegitroAnexoState);
          }
        })
      )
      .subscribe();
    this.immexRegistroform.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          let ACTIVE_STATE = {
            ...this.immexRegistroform.value.exportacionForm,
          };
          ACTIVE_STATE = {
            ...ACTIVE_STATE,
            ...this.immexRegistroform.value.exportacionForm,
          };
          ACTIVE_STATE = {
            ...ACTIVE_STATE,
            ...this.immexRegistroform.value.importacionForm,
          };
          this.immexRegistroStore.setImmexRegistro(ACTIVE_STATE);
        })
      )
      .subscribe();
    this.fetchData();
    this.obtenerListasDesplegables();
    this.disableFormControls();

    // Para el botón de validación Continuar
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.immexRegistroform.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const SECCION: number = 1;
          const SECCION_STATE = this.seccionQuery.getValue();
          const FORMAS_VALIDADAS = [...SECCION_STATE.formaValida];
          const CONTROL_PATH = 'immexRegistroform.exportacionForm';
          const CONTROL_PATH_2 = 'immexRegistroform.importacionForm';
          const CONTROL = this.immexRegistroform.get(CONTROL_PATH)?.status;
          const CONTROL2 = this.immexRegistroform.get(CONTROL_PATH_2)?.status;

          FORMAS_VALIDADAS[SECCION] =
            this.immexRegistroform.valid || CONTROL === 'VALID';
          FORMAS_VALIDADAS[SECCION] =
            this.immexRegistroform.valid || CONTROL2 === 'VALID';
        })
      )
      .subscribe();
  }

  /**
   * @method fetchData
   * @description Obtiene los datos necesarios desde el servicio PermisoImmexDatosService.
   * Realiza dos llamadas principales:
   * 1. Primera llamada: Obtiene datos estructurados (permisoImmexDatos, fraccionDatos, nicoDatos)
   *    y los asigna a las propiedades del componente para poblar las tablas dinámicas.
   *    También actualiza campos específicos del formulario con los primeros elementos de cada array.
   * 2. Segunda llamada: Obtiene datos adicionales para actualizar el formulario mediante patchValue.
   *
   * Todas las suscripciones se manejan con takeUntil para evitar memory leaks.
   *
   * @returns {void}
   */
  fetchData(): void {
    const DEBE_MOSTRAR_TABLA = this.immexRegistroform.get(
      'exportacionForm.permisoImmexDatos'
    )?.value;

    this.permisoImmexDatosService
      .getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          const RESPONSE_DATA = response as unknown as {
            permisoImmexDatos: immexInfo[];
            fraccionDatos: fraccionInfo[];
            nicoDatos: nicoInfo[];
          };

          if (
            RESPONSE_DATA &&
            Array.isArray(RESPONSE_DATA.permisoImmexDatos) &&
            Array.isArray(RESPONSE_DATA.fraccionDatos) &&
            Array.isArray(RESPONSE_DATA.nicoDatos)
          ) {
            const DEBE_MOSTRAR_DATOS =
              DEBE_MOSTRAR_TABLA?.length > 0 ||
              this.esFormularioSoloLectura ||
              this.esFormularioActualizacion;

            this.immexTableDatos = DEBE_MOSTRAR_DATOS
              ? RESPONSE_DATA.permisoImmexDatos
              : [];

            this.fraccionTablaDatos = DEBE_MOSTRAR_DATOS
              ? RESPONSE_DATA.fraccionDatos
              : [];

            this.nicoTablaDatos = RESPONSE_DATA.nicoDatos;

            this.permisoImmexDatos = RESPONSE_DATA.permisoImmexDatos;
            this.fraccionDatos = RESPONSE_DATA.fraccionDatos;
            this.nicoDatos = RESPONSE_DATA.nicoDatos;

            if (this.permisoImmexDatos.length > 0 && DEBE_MOSTRAR_DATOS) {
              this.immexRegistroform.get('exportacionForm')?.patchValue({
                fraccionArancelariaExportacion:
                  this.permisoImmexDatos[0].IMMEX_Columna_3,
              });
            }

            if (this.fraccionDatos.length > 0 && DEBE_MOSTRAR_DATOS) {
              this.immexRegistroform.get('exportacionForm')?.patchValue({
                productoArancelariaExportacion:
                  this.fraccionDatos[0].FRACCION_Columna_2,
                FraccionDescExportacion:
                  this.fraccionDatos[0].FRACCION_Columna_5,
                exportacionDescExportacion:
                  this.fraccionDatos[0].FRACCION_Columna_6,
              });
            }

            if (this.permisoImmexDatos.length > 0) {
              this.immexRegistroform.get('importacionForm')?.patchValue({
                commodityImportacion: this.permisoImmexDatos[0].IMMEX_Columna_3,
                commodityDescImportacion:
                  this.permisoImmexDatos[0].IMMEX_Columna_4,
              });
            }
          }
        },
      });

    this.permisoImmexDatosService
      .getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const FORM_DATA = data as unknown as {
          [key: string]: string | number | boolean | object;
        };
        this.immexRegistroform.patchValue(FORM_DATA);
      });
  }

  /**
   * @method obtenerListasDesplegables
   * @description Método principal para obtener todas las listas desplegables necesarias
   * para el formulario. Actualmente delega la responsabilidad a obtenerIngresoSelectList()
   * para obtener los datos del catálogo NICO. Este método puede expandirse para incluir
   * otras listas desplegables en el futuro.
   *
   * @returns {void}
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
  }

  /**
   * @method obtenerIngresoSelectList
   * @description Obtiene la lista de opciones para el select de unidad de medida NICO.
   * Realiza una llamada al servicio nicoService para obtener el menú desplegable desde
   * el archivo 'nico.json' y asigna los datos obtenidos a la propiedad nico del componente.
   * Esta lista se utiliza para poblar los selects relacionados con códigos NICO.
   *
   * @returns {void}
   */
  obtenerIngresoSelectList(): void {
    const CLAVE_FRACCION = '72162101';
    this.catalogoService.nicosCatalogo(this.tramiteId, CLAVE_FRACCION)
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((datos) => {
        const TRANSFORMED_DATOS = {
          ...datos,
          datos: (datos.datos ?? []).map((item: Catalogo) => ({
            ...item,
            nicoDescription: item.descripcion,
            descripcion: item.clave
          }))
        };
        return TRANSFORMED_DATOS;
      })
    )
    .subscribe((datos)=>{
      this.nico = datos.datos as Catalogo[];
    })
  }

  /* Actualiza el formulario con los datos seleccionados de NICO
  */
  cambioSeleccionNico(params: Catalogo, childForm:string, fieldname: string): void {
    this.immexRegistroform.get(childForm)?.patchValue({
      [fieldname]: params.nicoDescription,
    });
  }

  /**
   * @method showTableExportacion
   * @description Controla la visibilidad de la tabla de exportación.
   * Establece la propiedad showTableExport en true para mostrar la tabla
   * de datos de exportación en la interfaz de usuario.
   *
   * @returns {void}
   */
  showTableExportacion(): void {
    this.showTableExport = true;
    this.fetchData();
  }

  /**
   * @method mostrarDetalleMercancia
   * @description
   * Muestra el modal de detalle de mercancía de importación.
   * Utiliza la instancia de Bootstrap Modal para mostrar el cuadro de diálogo
   * asociado al elemento mercanciaImportacionModal.
   *
   * @returns {void}
   */
  mostrarDetalleMercancia(): void {
    const MODAL_INSTANCIA = new Modal(
      this.mercanciaImportacionModal.nativeElement
    );
    MODAL_INSTANCIA.show();
  }

  /**
   * @method mostrarDetalleMercanciaExportacion
   * @description
   * Muestra el modal de detalle de mercancía de exportación.
   * Utiliza la instancia de Bootstrap Modal para mostrar el cuadro de diálogo
   * asociado al elemento mercanciaExportacionModal.
   *
   * @returns {void}
   */
  mostrarDetalleMercanciaExportacion(): void {
    const MODAL_INSTANCIA = new Modal(
      this.mercanciaExportacionModal.nativeElement
    );
    MODAL_INSTANCIA.show();
  }

  /**
   * @method showTableImportacion
   * @description Controla la visibilidad de la tabla de importación.
   * Establece la propiedad showTableImport en true para mostrar la tabla
   * de datos de importación en la interfaz de usuario.
   *
   * @returns {void}
   */
  showTableImportacion(): void {
    this.showTableImport = true;
  }

  /**
   * @method showTableFractionExport
   * @description Controla la visibilidad de la tabla de fracción de exportación.
   * Establece la propiedad showTableFractionExp en true para mostrar la tabla
   * específica de fracciones arancelarias de exportación en la interfaz de usuario.
   *
   * @returns {void}
   */
  showTableFractionExport(): void {
    this.showTableFractionExp = true;
  }

  /**
   * @method showTableNicoExport
   * @description Controla la visibilidad de la tabla NICO de exportación.
   * Establece la propiedad showTableNicoExp en true para mostrar la tabla
   * de códigos NICO relacionados con exportación en la interfaz de usuario.
   *
   * @returns {void}
   */
  showTableNicoExport(): void {
    this.showTableNicoExp = true;
  }

  /**
   * @method showTableNicoImport
   * @description Controla la visibilidad de la tabla NICO de importación.
   * Establece la propiedad showTableNicoImp en true para mostrar la tabla
   * de códigos NICO relacionados con importación en la interfaz de usuario.
   *
   * @returns {void}
   */
  showTableNicoImport(): void {
    this.showTableNicoImp = true;
  }

  /**
   * Alterna la visibilidad del cuadro de diálogo modal para el registro de enlaces operativos.
   *
   * @description
   * Oculta el modal si está visible actualmente. Utiliza la API de Bootstrap
   * para obtener la instancia del modal y controlarlo programáticamente.
   *
   */
  cambiarEstadoModal(): void {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.mercanciaImportacionModal.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }

  /**
   * Alterna la visibilidad del cuadro de diálogo modal para el registro de enlaces operativos.
   *
   * @description
   * Oculta el modal si está visible actualmente. Utiliza la API de Bootstrap
   * para obtener la instancia del modal y controlarlo programáticamente.
   *
   */
  cambiarEstadoModalExportacion(): void {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.mercanciaExportacionModal.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }
  /**
   * Cancela el cuadro de diálogo modal para el registro de enlaces operativos.
   *
   * @description
   * Cierra el modal activo y restablece el formulario a su estado inicial.
   * Se ejecuta cuando el usuario cancela la operación de agregar o editar
   * un enlace operativo.
   */
  modalCancelar(): void {
    this.cambiarEstadoModal();
  }

  /**
   * Cancela el cuadro de diálogo modal para el registro de enlaces operativos de exportación.
   *
   * @description
   * Cierra el modal activo de exportación y restablece el formulario a su estado inicial.
   * Se ejecuta cuando el usuario cancela la operación de agregar o editar
   * un enlace operativo de exportación.
   */
  modalCancelarExportacion(): void {
    this.cambiarEstadoModalExportacion();
  }

  /**
   * @method disableFormControls
   * @description Deshabilita controles específicos del formulario relacionados con la exportación e importación.
   * Los campos deshabilitados incluyen códigos arancelarios y descripciones de productos que no deben ser
   * editables por el usuario, ya que se calculan automáticamente o se obtienen de otras fuentes.
   *
   * Campos deshabilitados:
   * - productoArancelariaExportacion: Código arancelario del producto de exportación
   * - productoDescExportacion: Descripción del producto de exportación
   * - commodityImportacion: Código del commodity de importación
   * - commodityDescImportacion: Descripción del commodity de importación
   * - commodityNicoDescImportacion: Descripción NICO del commodity de importación
   *
   * @returns {void}
   */
  disableFormControls(): void {
    this.immexRegistroform
      .get('exportacionForm.productoArancelariaExportacion')
      ?.disable();
    this.immexRegistroform
      .get('exportacionForm.productoDescExportacion')
      ?.disable();
    this.immexRegistroform
      .get('importacionForm.commodityImportacion')
      ?.disable();
    this.immexRegistroform
      .get('importacionForm.commodityDescImportacion')
      ?.disable();
    this.immexRegistroform
      .get('importacionForm.commodityNicoDescImportacion')
      ?.disable();
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Se encarga de la limpieza de recursos para evitar memory leaks. Emite una señal a través de
   * destroyNotifier$ para cancelar todas las suscripciones activas y luego completa el subject.
   *
   * @returns {void}
   * @implements {OnDestroy}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
