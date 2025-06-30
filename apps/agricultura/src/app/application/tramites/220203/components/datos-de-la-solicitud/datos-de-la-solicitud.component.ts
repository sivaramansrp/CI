import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion, TableBodyData, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosMercancia220203 } from '../../models/220203/importacion-de-acuicultura.module';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { MENSAJE_DOBLE_CLIC } from '../../constantes/220203/importacion-de-acuicultura.enum';

/**
 * @fileoverview
 * Componente para gestionar los datos de la solicitud de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con la mercancía, así como mostrar tablas dinámicas y catálogos.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module DatosDeLaSolicitudComponent
 */

/**
 * Componente para gestionar los datos de la solicitud de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con la mercancía, así como mostrar tablas dinámicas y catálogos.
 * @component DatosDeLaSolicitudComponent
 * @selector app-datos-de-la-solicitud
 * @templateUrl ./datos-de-la-solicitud.component.html
 * @styleUrl ./datos-de-la-solicitud.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    TableComponent,
    CommonModule
  ],
})
export class DatosDeLaSolicitudComponent implements OnDestroy, OnInit, AfterViewInit {
  /**
   * Subject para controlar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Mensaje que se muestra en una alerta al hacer doble clic.
   * @type {string}
   */
  alertMessage: string = MENSAJE_DOBLE_CLIC;

  /**
   * Tipo de selección para la tabla principal.
   * @type {TablaSeleccion}
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Tipo de selección para la tabla de solicitudes.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Datos de la tabla de solicitudes.
   * @type {DatoTabla[]}
   */
  cuerpoTablasoli: DatoTabla[] = [];

  /**
   * Configuración de columnas para la tabla principal.
   * @type {ConfiguracionColumna<Fila>[]}
   */
  configuracionColumnas: ConfiguracionColumna<Fila>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificado, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
  ];

  /**
   * Datos de la tabla de detalles.
   * @type {Fila[]}
   */
  cuerpoTablaFila: Fila[] = [];

  /**
   * Configuración de columnas para la tabla de solicitudes.
   * @type {ConfiguracionColumna<FilaSolicitud>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'Solicitud', clave: (fila) => fila.solicitud, orden: 1 },
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 2 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 3 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad.toString(), orden: 4 },
    { encabezado: 'Proveedor', clave: (fila) => fila.proveedor, orden: 5 },
  ];

  /**
   * Indica si la sección es colapsable.
   * @type {boolean}
   */
  colapsable: boolean = false;

  /**
   * Grupo de formularios para los datos de la mercancía.
   * @type {FormGroup}
   */
  datosMercanciaFormGroup!: FormGroup;

  /**
   * Lista de catálogos para las aduanas de ingreso.
   * @type {Catalogo[]}
   */
  aduanaDeIngresoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las oficinas de inspección.
   * @type {Catalogo[]}
   */
  oficinaInspeccionList: Catalogo[] = [];

  /**
   * Lista de catálogos para los puntos de inspección.
   * @type {Catalogo[]}
   */
  puntoInspeccionList: Catalogo[] = [];

  /**
   * Lista de catálogos para los tipos de requisitos.
   * @type {Catalogo[]}
   */
  tipoRequisitoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las fracciones arancelarias.
   * @type {Catalogo[]}
   */
  arancelariaList: Catalogo[] = [];

  /**
   * Lista de catálogos para los regímenes.
   * @type {Catalogo[]}
   */
  regimenList: Catalogo[] = [];

  /**
   * Lista de catálogos para los NICO (Números de Identificación Comercial).
   * @type {Catalogo[]}
   */
  nicoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las UMC (Unidades de Medida Comercial).
   * @type {Catalogo[]}
   */
  umcList: Catalogo[] = [];

  /**
   * Lista de catálogos para los usos.
   * @type {Catalogo[]}
   */
  usoList: Catalogo[] = [];

  /**
   * Lista de catálogos para los países de origen.
   * @type {Catalogo[]}
   */
  paisDeOrigenList: Catalogo[] = [];

  /**
   * Lista de catálogos para los países de procedencia.
   * @type {Catalogo[]}
   */
  paisDeProcedenciaList: Catalogo[] = [];

  /**
   * Encabezados de la tabla de detalles.
   * @type {string[]}
   */
  detalleTable: string[] = ["Nombre científico"];

  /**
   * Datos de la tabla de detalles.
   * @type {TableBodyData[]}
   */
  detallecuerpoTabla: TableBodyData[] = [];

  /**
   * Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];

  /**
   * Datos de la mercancía almacenados en el store.
   * @type {DatosMercancia220203}
   */
  datosMercanciaStore: DatosMercancia220203 = {} as DatosMercancia220203;

  /**
   * Datos de la tabla de solicitudes.
   * @type {FilaSolicitud[]}
   */
  cuerpoTablaSolicitud: FilaSolicitud[] = [];

  /**
   * Indica si se debe mostrar la barra de desplazamiento.
   * @type {boolean}
   */
  myScrollbarValue: boolean = true;

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa el store y obtiene los datos de la mercancía.
   * @param {FormBuilder} fb Servicio para construir formularios.
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   * @param {ConsultaioQuery} consultaQuery Servicio para consultar el estado de solo lectura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.datosMercanciaStore = datos.datosMercancia;
    })
  }

  /**
   * Crea el grupo de formularios para los datos de la mercancía.
   * @method createFromGroup
   * @returns {void}
   */
  createFromGroup(): void {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.createRealizarGroup(),
      mercanciaGroup: this.createMercanciaGroup(),
      detalles: this.createDetallesGroup(),
    });
  }

  /**
   * Crea el grupo de formularios 'realizarGroup'.
   * @method createRealizarGroup
   * @returns {FormGroup}
   */
  createRealizarGroup(): FormGroup {
    return this.fb.group({
      aduanaIngreso: [this.datosMercanciaStore.realizarGroup.aduanaIngreso || '', Validators.required],
      oficinaInspeccion: [this.datosMercanciaStore.realizarGroup.oficinaInspeccion || '', Validators.required],
      puntoInspeccion: [this.datosMercanciaStore.realizarGroup.puntoInspeccion || '', Validators.required],
      numeroGuia: [this.datosMercanciaStore.realizarGroup.numeroGuia || ''],
      regimen: [this.datosMercanciaStore.realizarGroup.regimen || '', Validators.required],
    });
  }

  /**
   * Crea el grupo de formularios 'mercanciaGroup'.
   * @method createMercanciaGroup
   * @returns {FormGroup}
   */
  createMercanciaGroup(): FormGroup {
    const MERCANCIADATA = this.datosMercanciaStore.mercanciaGroup || {};

    const FORMGROUP = this.fb.group({
      tipoRequisito: [MERCANCIADATA.tipoRequisito || '', Validators.required],
      requisito: [MERCANCIADATA.requisito || '', Validators.required],
      numeroCertificadoInternacional: [MERCANCIADATA.numeroCertificadoInternacional || '', Validators.required],
      numeroOficioCasoEspecial: [MERCANCIADATA.numeroOficioCasoEspecial || ''],
      fraccionArancelaria: [MERCANCIADATA.fraccionArancelaria || '', Validators.required],
      descripcionFraccionArancelaria: [MERCANCIADATA.descripcionFraccionArancelaria || '', Validators.required],
      nico: [MERCANCIADATA.nico || '', Validators.required],
      descripcionNico: [MERCANCIADATA.descripcionNico || '', Validators.required],
      descripcion: [MERCANCIADATA.descripcion || '', Validators.required],
      cantidadUMT: [MERCANCIADATA.cantidadUMT || '', Validators.required],
      umt: [MERCANCIADATA.umt, Validators.required],
      cantidadUMC: [MERCANCIADATA.cantidadUMC || '', Validators.required],
      umc: [MERCANCIADATA.umc || '', Validators.required],
      uso: [MERCANCIADATA.uso || '', Validators.required],
      numeroDeLote: [MERCANCIADATA.numeroDeLote || '', Validators.required],
      faseDeDesarrollo: [MERCANCIADATA.faseDeDesarrollo || '', Validators.required],
      especie: [MERCANCIADATA.especie || '', Validators.required],
      paisDeOrigen: [MERCANCIADATA.paisDeOrigen || '', Validators.required],
      paisDeProcedencia: [MERCANCIADATA.paisDeProcedencia || '', Validators.required],
    });

    return FORMGROUP;
  }

  /**
   * Crea el grupo de formularios 'detalles'.
   * @method createDetallesGroup
   * @returns {FormGroup}
   */
  createDetallesGroup(): FormGroup {
    return this.fb.group({
      nombreCientifico: [this.datosMercanciaStore.detalles.nombreCientifico || ''],
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene los catálogos necesarios.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.createFromGroup();
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosArancelaria();
    this.obtenerCatalogosUMC();
    this.obtenerCatalogosUMT();
    this.obtenerCatalogosUSO();
  }

  /**
   * Método del ciclo de vida que se ejecuta después de inicializar la vista.
   * Suscribe a cambios en el formulario y al estado de solo lectura.
   * @method ngAfterViewInit
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.datosMercanciaFormGroup.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        this.verificarEstadoDelBoton();
      }, (error) => {
        console.error(error);
      });

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        }
      )
    ).subscribe();
  }

  /**
   * Obtiene los datos del catálogo de transporte.
   * @method obtenerCatalogosTransporte
   * @returns {void}
   */
  obtenerCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.aduanaDeIngresoList = data.data as Catalogo[];
        this.tipoRequisitoList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Obtiene los datos del catálogo de arancelaria.
   * @method obtenerCatalogosArancelaria
   * @returns {void}
   */
  obtenerCatalogosArancelaria(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.oficinaInspeccionList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Obtiene los datos del catálogo de UMC.
   * @method obtenerCatalogosUMC
   * @returns {void}
   */
  obtenerCatalogosUMC(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('aduana_de_ingreso.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.umcList = data.data as Catalogo[];
        this.arancelariaList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Obtiene los datos del catálogo de UMT.
   * @method obtenerCatalogosUMT
   * @returns {void}
   */
  obtenerCatalogosUMT(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('empresa.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.regimenList = data.data as Catalogo[];
        this.nicoList = data.data as Catalogo[];
        this.puntoInspeccionList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Obtiene los datos del catálogo de USO.
   * @method obtenerCatalogosUSO
   * @returns {void}
   */
  obtenerCatalogosUSO(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('oficina_de_inspeccion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.usoList = data.data as Catalogo[];
        this.paisDeOrigenList = data.data as Catalogo[];
        this.paisDeProcedenciaList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Muestra o esconde la sección colapsable.
   * @method mostrar_colapsable
   * @returns {void}
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Verifica el estado del formulario y habilita o deshabilita el botón según su validez.
   * @method verificarEstadoDelBoton
   * @returns {void}
   */
  verificarEstadoDelBoton(): void {
    const DATOS = {
      dataDeLaSolicitud: false,
    };
    if (this.datosMercanciaFormGroup.valid) {
      DATOS.dataDeLaSolicitud = true;
    }
    this.importacionDeAcuiculturaServices.actualizarFormaValida(DATOS);
  }

  /**
   * Guarda los valores en el store.
   * @method setValoresStore
   * @param form El formulario que contiene los valores.
   * @param campo El campo a guardar en el store.
   * @returns {void}
   */
  setValoresStore(
    form?: FormGroup,
    campo?: string,
  ): void {
    if (campo === 'fraccionArancelaria') {
      this.datosMercanciaFormGroup.patchValue({
        mercanciaGroup: {
          descripcionFraccionArancelaria: 'Nuevo valor para descripcion',
        }
      });
    }
    else if (campo === 'nico') {
      this.datosMercanciaFormGroup.patchValue({
        mercanciaGroup: {
          descripcionNico: 'Nuevo valor para descripcionNico',
        }
      });
    }
    else if (campo === 'cantidadUMT') {
      this.datosMercanciaFormGroup.patchValue({
        mercanciaGroup: {
          umt: 'Nuevo valor para cantidadUMT',
        }
      });
    }
    const VALOR = this.datosMercanciaFormGroup.value;
    (this.importacionDeAcuiculturaServices.actualizarDatosMercancia as (value: DatosMercancia220203) => void)(
      VALOR
    );
  }

  /**
   * Inicializa el estado del formulario según si está en modo solo lectura o no.
   * @method inicializarEstadoFormulario
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.datosMercanciaFormGroup.disable();
    }
    else {
      this.datosMercanciaFormGroup.enable();
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera recursos y cancela las suscripciones.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

/**
 * Interfaz para los datos de la tabla de solicitudes.
 * @interface DatoTabla
 * @property {string} solicitud
 * @property {string} fechaCreacion
 * @property {string} mercancia
 * @property {number} cantidad
 * @property {string} proveedor
 */
interface DatoTabla {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}

/**
 * Interfaz para los datos de la tabla de detalles.
 * @interface Fila
 * @property {string} noPartida
 * @property {string} tipoRequisito
 * @property {string} requisito
 * @property {string} numeroCertificado
 * @property {string} fraccionArancelaria
 * @property {string} descripcionFraccion
 * @property {string} nico
 */
interface Fila {
  noPartida: string;
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
}

/**
 * Interfaz para los datos de la tabla de solicitudes.
 * @interface FilaSolicitud
 * @property {string} solicitud
 * @property {string} fechaCreacion
 * @property {string} mercancia
 * @property {number} cantidad
 * @property {string} proveedor
 */
interface FilaSolicitud {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}