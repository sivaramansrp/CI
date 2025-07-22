import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion, TableBodyData, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DatoTabla, Fila, FilaSolicitud, RealizarGroup } from '../../models/220203/importacion-de-acuicultura.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { MENSAJE_DOBLE_CLIC } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { MercanciaSolicitudComponent } from '../mercancia-solicitud/mercancia-solicitud.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

/**
 * @fileoverview
 * Componente Angular para gestionar los datos de la solicitud de importación de acuicultura.
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
    CommonModule,
    ModalComponent
  ],
})
export class DatosDeLaSolicitudComponent implements OnDestroy, OnInit, AfterViewInit {
    @ViewChild('modalRef') modalRef!: ModalComponent;
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
    {encabezado:'Descripción Nico', clave: (fila) => fila.descripcionNico, orden: 8},
    { encabezado: 'Descripción', clave: (fila) => fila.descripcion, orden: 9 },
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.medidadetarifa, orden: 10 },
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 11 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.umc, orden: 12 },
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 13 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 14 },
    { encabezado: 'Especie', clave: (fila) => fila.especie, orden: 15 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisDeOrigen, orden: 16 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisDeProcedencia, orden: 17 },
    { encabezado: 'Número de lote', clave: (fila) => fila.numeroDeLote, orden: 18 },
    { encabezado: 'Fase de desarrollo', clave: (fila) => fila.faseDeDesarrollo, orden: 19 },
    { encabezado: 'Certificado Internacional Electrónico', clave: (fila) => fila.certificadoInternacional, orden: 20 }


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
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 1 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 2 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad.toString(), orden: 3 },
    { encabezado: 'Proveedor', clave: (fila) => fila.proveedor, orden: 4 },
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
   * Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];

  /**
   * Datos de la mercancía almacenados en el store.
   * @type {DatosMercancia220203}
   */
  datosMercanciaStore: RealizarGroup = {} as RealizarGroup;

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
      this.datosMercanciaStore = datos.realizarGroup;
    })
  }

  /**
   * Crea el grupo de formularios para los datos de la mercancía.
   * @method
   * @returns {void}
   */
  public createFromGroup(): void {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.createRealizarGroup(),
    });
  }

  /**
   * Crea el grupo de formularios 'realizarGroup'.
   * @method
   * @returns {FormGroup}
   */
  public createRealizarGroup(): FormGroup {
    return this.fb.group({
      aduanaIngreso: [this.datosMercanciaStore.aduanaIngreso || '', Validators.required],
      oficinaInspeccion: [this.datosMercanciaStore.oficinaInspeccion || '', Validators.required],
      puntoInspeccion: [this.datosMercanciaStore.puntoInspeccion || '', Validators.required],
      numeroGuia: [this.datosMercanciaStore.numeroGuia || ''],
      regimen: [this.datosMercanciaStore.regimen || '', Validators.required],
    });
  }
 

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.createFromGroup();
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosArancelaria();
    this.obtenerCatalogosUMC();
    this.obtenerCatalogosUMT();
    this.obtenerCatalogosUSO();
  }

  /**
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
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
   * @method
   * @returns {void}
   */
  public obtenerCatalogosTransporte(): void {
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
   * @method
   * @returns {void}
   */
  public obtenerCatalogosArancelaria(): void {
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
   * @method
   * @returns {void}
   */
  public obtenerCatalogosUMC(): void {
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
   * @method
   * @returns {void}
   */
  public obtenerCatalogosUMT(): void {
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
   * @method
   * @returns {void}
   */
  public obtenerCatalogosUSO(): void {
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
   * @method
   * @returns {void}
   */
  public mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Verifica el estado del formulario y habilita o deshabilita el botón según su validez.
   * @method
   * @returns {void}
   */
  public verificarEstadoDelBoton(): void {
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
   * @method
   * @param form El formulario que contiene los valores.
   * @param campo El campo a guardar en el store.
   * @returns {void}
   */
  public setValoresStore(
    form?: FormGroup,
    campo?: string,
  ): void {
    const VALOR = this.datosMercanciaFormGroup.getRawValue();
    (this.importacionDeAcuiculturaServices.actualizarSoloRealizarGroup as (value: RealizarGroup) => void)(
      VALOR.realizarGroup as RealizarGroup
    );
  }

  /**
   * Inicializa el estado del formulario según si está en modo solo lectura o no.
   * @method
   * @returns {void}
   */
  public inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.datosMercanciaFormGroup.disable();
    }
    else {
      this.datosMercanciaFormGroup.enable();
    }
  }
  agregarFila(): void {
       this.modalRef.abrir(MercanciaSolicitudComponent);
  }

  /**
   * @inheritdoc
   * @method
   */
  public ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

