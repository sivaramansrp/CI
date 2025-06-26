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
 */

import { CommonModule } from '@angular/common';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Subject, delay, map, takeUntil, tap } from 'rxjs';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  ConsultaioQuery,
  SeccionLibQuery,
  SeccionLibState,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { SeccionLibStore } from '@libs/shared/data-access-user/src';

import { NicoService } from '../../servicios/nico/nico.service';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';

import { ImmexRegistroQuery } from '../../estados/queries/tramite80203.query';
import { ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';

import {
  FRACCION_EXPORTACION,
  IMMEX_SERVICIO,
  NICO_TABLA,
  fraccionInfo,
  immexInfo,
  immexRegistroform,
  nicoInfo,
} from '../../modelos/immex-registro-de-solicitud-modality.model';

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
export class Anexo1Component implements OnInit, OnDestroy, AfterViewInit {
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
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para manejar la desuscripción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {any[]} permisoImmexDatos - Array de datos permiso immex.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permisoImmexDatos: any[] = [];

  /**
   * @property {any[]} fraccionDatos - Array de datos fraccion.
   */
  fraccionDatos: fraccionInfo[] = [];

  /**
   * @property {any[]} nicoDatos - Array de datos nico
   */
  nicoDatos: nicoInfo[] = [];

  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} nico
   */
  nico: Catalogo[] = [];
  /**
   * Estado de visibilidad de las tablas y secciones del formulario.
   */
  showFraccionExport: boolean = false;
  showTableExport: boolean = false;
  showTableImport: boolean = false;
  showTableFractionExp: boolean = false;
  showTableNicoExp: boolean = false;
  showTableNicoImp: boolean = false;
  showProductoImport: boolean = false;
  showCommodityImport: boolean = false;

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
    public readonly consultaQuery: ConsultaioQuery
  ) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos necesarios.
   */
  ngOnInit(): void {
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

          this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
        })
      )
      .subscribe();
  }
  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   *
   * Suscribe al observable `selectConsultaioState$` para escuchar cambios en el estado de la consulta.
   * Si el estado indica que no se está creando y el `procedureId` es '80203', actualiza la propiedad `esFormularioSoloLectura`
   * según el valor de `readonly` en el estado. Luego, inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$` para evitar fugas de memoria.
   *
   */
  ngAfterViewInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (!seccionState.create && seccionState.procedureId === '80203') {
            this.esFormularioSoloLectura = seccionState.readonly;
          }
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method
   * @name creatFormSolicitud
   * @description
   * [ES] Inicializa el formulario reactivo `immexRegistroform` con los grupos de controles necesarios para la exportación e importación,
   * utilizando los valores actuales del estado `immexRegitroAnexoState`. Cada grupo contiene los campos requeridos para el trámite,
   * permitiendo la gestión y validación de los datos relacionados con la exportación e importación de mercancías.
   *
   * @returns {void}
   */
  creatFormSolicitud(): void {
    this.immexRegistroform = this.fb.group({
      exportacionForm: this.fb.group({
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
        productoArancelariaExportacion: [
          this.immexRegitroAnexoState?.productoArancelariaExportacion || '',
          [],
        ],
        fraccionArancelariaDesc: [
          this.immexRegitroAnexoState?.fraccionArancelariaDesc || '',
          [],
        ],
        productoDescExportacion: [
          this.immexRegitroAnexoState?.productoDescExportacion || '',
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
      }),
      importacionForm: this.fb.group({
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
      }),
    });
  }

  /**
   * @method inicializarEstadoFormulario
   * @description
   * Inicializa el estado del formulario dependiendo si está en modo solo lectura.
   * Si el formulario no existe, lo crea. Si el formulario debe ser solo de lectura,
   * lo deshabilita; de lo contrario, lo habilita.
   */
  inicializarEstadoFormulario(): void {
    if (!this.immexRegistroform) {
      this.creatFormSolicitud();
    }
    if (this.esFormularioSoloLectura) {
      this.immexRegistroform.disable();
    } else {
      this.immexRegistroform.enable();
    }
  }
  /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * @method fetchData
   * @description Obtiene los datos de los fabricantes desde el servicio.
   */
  fetchData(): void {
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
            this.immexTableDatos = RESPONSE_DATA.permisoImmexDatos;
            this.nicoTablaDatos = RESPONSE_DATA.nicoDatos;
            this.fraccionTablaDatos = RESPONSE_DATA.fraccionDatos;

            this.permisoImmexDatos = RESPONSE_DATA.permisoImmexDatos;
            this.fraccionDatos = RESPONSE_DATA.fraccionDatos;
            this.nicoDatos = RESPONSE_DATA.nicoDatos;

            if (this.permisoImmexDatos.length > 0) {
              this.immexRegistroform.get('exportacionForm')?.patchValue({
                fraccionArancelariaExportacion:
                  this.permisoImmexDatos[0].IMMEX_Columna_3,
              });
            }

            if (this.fraccionDatos.length > 0) {
              this.immexRegistroform.get('exportacionForm')?.patchValue({
                productoArancelariaExportacion:
                  this.fraccionDatos[0].FRACCION_Columna_2,
                productoDescExportacion:
                  this.fraccionDatos[0].FRACCION_Columna_5,
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
                commodityNicoDescImportacion:
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
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(): void {
    this.nicoService.obtenerMenuDesplegable('nico.json').subscribe((data) => {
      this.nico = data as Catalogo[];
    });
  }

  /**
   * Muestra la sección de fracción de exportación.
   * @method showFraccionExportacion
   */
  showFraccionExportacion(): void {
    this.showFraccionExport = true;
  }

  /**
   * Muestra la sección de fracción de exportación.
   * @method showTableExportacion
   */
  showTableExportacion(): void {
    this.showTableExport = true;
  }
  /**
   * Muestra la sección de fracción de exportación.
   * @method showTableExportacion
   */
  showTableImportacion(): void {
    this.showTableImport = true;
  }
  /**
   * Muestra la sección de fracción de exportación.
   * @method showTableExportacion
   */
  showTableFractionExport(): void {
    this.showTableFractionExp = true;
  }
  /**
   * Muestra la sección de fracción de exportación.
   * @method showTableExportacion
   */
  showTableNicoExport(): void {
    this.showTableNicoExp = true;
  }
  /**
   * Muestra la sección de fracción de exportación.
   * @method showTableExportacion
   */
  showTableNicoImport(): void {
    this.showTableNicoImp = true;
  }

  /**
   * Muestra la sección de producto de importación.
   * @method showProductoImportacion
   */
  showProductoImportacion(): void {
    this.showProductoImport = true;
  }

  /**
   * Muestra la sección de commodity de importación.
   * @method showCommodityImportacion
   */
  showCommodityImportacion(): void {
    this.showCommodityImport = true;
  }
  /**
   * @description
   * Deshabilita los controles específicos del formulario relacionados con la exportación e importación
   * dentro del formulario `immexRegistroform`. Los campos deshabilitados incluyen descripciones y códigos
   * arancelarios de productos de exportación e importación.
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
}
