import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion, TableBodyData, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

import { DatosMercancia220203 } from '../../models/220203/importacion-de-acuicultura.module';

import { MENSAJE_DOBLE_CLIC } from '../../constantes/220203/importacion-de-acuicultura.enum';

import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';


interface DatoTabla {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number; // O string, dependiendo del tipo de dato
  proveedor: string;
}
interface Fila {
  noPartida: string;
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
}
interface FilaSolicitud {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}
/**
 * @description Componente para gestionar los datos de la solicitud de importación de acuicultura.
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
  private destroyNotifier$ = new Subject<void>();

  /**
   * @description Mensaje que se muestra en una alerta al hacer doble clic.
   * @type {string}
   */
  alertMessage: string = MENSAJE_DOBLE_CLIC;

  /**
   * @description Tipo de selección para la tabla principal.
   * @type {TablaSeleccion}
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Tipo de selección para la tabla de solicitudes.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @description Datos de la tabla de solicitudes.
   * @type {DatoTabla[]}
   */
  cuerpoTablasoli: DatoTabla[] = [];

  /**
   * @description Configuración de columnas para la tabla principal.
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
   * @description Datos de la tabla de detalles.
   * @type {Fila[]}
   */
  cuerpoTablaFila: Fila[] = [];

  /**
   * @description Configuración de columnas para la tabla de solicitudes.
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
   * @description Indica si la sección es colapsable.
   * @type {boolean}
   */
  colapsable: boolean = false;

  /**
   * @description Grupo de formularios para los datos de la mercancía.
   * @type {FormGroup}
   */
  datosMercanciaFormGroup!: FormGroup;

  /**
   * @description Lista de catálogos para las aduanas de ingreso.
   * @type {Catalogo[]}
   */
  aduanaDeIngresoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las oficinas de inspección.
   * @type {Catalogo[]}
   */
  oficinaInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los puntos de inspección.
   * @type {Catalogo[]}
   */
  puntoInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los tipos de requisitos.
   * @type {Catalogo[]}
   */
  tipoRequisitoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las fracciones arancelarias.
   * @type {Catalogo[]}
   */
  arancelariaList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los regímenes.
   * @type {Catalogo[]}
   */
  regimenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los NICO (Números de Identificación Comercial).
   * @type {Catalogo[]}
   */
  nicoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las UMC (Unidades de Medida Comercial).
   * @type {Catalogo[]}
   */
  umcList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los usos.
   * @type {Catalogo[]}
   */
  usoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de origen.
   * @type {Catalogo[]}
   */
  paisDeOrigenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de procedencia.
   * @type {Catalogo[]}
   */
  paisDeProcedenciaList: Catalogo[] = [];

  /**
   * @description Encabezados de la tabla de detalles.
   * @type {string[]}
   */
  detalleTable: string[] = ["Nombre científico"];

  /**
   * @description Datos de la tabla de detalles.
   * @type {TableBodyData[]}
   */
  detallecuerpoTabla: TableBodyData[] = [];

  /**
   * @description Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];
  datosMercanciaStore: DatosMercancia220203 = {} as DatosMercancia220203;
  /**
   * @description Datos de la tabla de solicitudes.
   * @type {FilaSolicitud[]}
   */
  cuerpoTablaSolicitud: FilaSolicitud[] = [];

  /**
   * @description Indica si se debe mostrar la barra de desplazamiento.
   * @type {boolean}
   */
  myScrollbarValue: boolean = true;

  /**
   * @description Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @description Constructor del componente.
   * @param {FormBuilder} fb Servicio para construir formularios.
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   */
  constructor(private readonly fb: FormBuilder, private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService, private consultaQuery: ConsultaioQuery) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.datosMercanciaStore = datos.datosMercancia;
    })
  }

  /**
   * @description Crea el grupo de formularios para los datos de la mercancía.
   */
  createFromGroup(): void {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.createRealizarGroup(),
      mercanciaGroup: this.createMercanciaGroup(),
      detalles: this.createDetallesGroup(),
    });
  }

  /**
   * Creates the 'realizarGroup' form group.
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
   * Creates the 'mercanciaGroup' form group.
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
   * Creates the 'detalles' form group.
   */
  createDetallesGroup(): FormGroup {
    return this.fb.group({
      nombreCientifico: [this.datosMercanciaStore.detalles.nombreCientifico || ''],
    });
  }

  ngOnInit(): void {
     this.createFromGroup();
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosArancelaria();
    this.obtenerCatalogosUMC();
    this.obtenerCatalogosUMT();
    this.obtenerCatalogosUSO();
  }

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
   * @description Obtiene los datos del catálogo de transporte.
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
   * @description Obtiene los datos del catálogo de arancelaria.
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
   * @description Obtiene los datos del catálogo de UMC.
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
   * @description Obtiene los datos del catálogo de UMT.
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
   * @description Obtiene los datos del catálogo de USO.
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
   * @description Muestra o esconde la sección colapsable.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * @description Verifica el estado del formulario y habilita o deshabilita el botón según su validez.
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
   * @description Guarda los valores en el store.
   * @param form El formulario que contiene los valores.
   * @param campo El campo a guardar en el store.
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
   * @description Inicializa el estado del formulario según si está en modo solo lectura o no.
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
   * @description Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}