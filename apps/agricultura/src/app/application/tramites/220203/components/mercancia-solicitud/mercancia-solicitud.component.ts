import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoData, Detalles, Fila } from '../../models/220203/importacion-de-acuicultura.module';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

/**
 * Componente para gestionar la solicitud de mercancías en el trámite de importación de acuicultura 220203.
 * Proporciona funcionalidades para agregar, editar y eliminar detalles de mercancías.
 * 
 * @export
 * @class MercanciaSolicitudComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-mercancia-solicitud',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule,
    NotificacionesComponent
],
  templateUrl: './mercancia-solicitud.component.html',
  styleUrl: './mercancia-solicitud.component.scss',
})
export class MercanciaSolicitudComponent implements OnInit {
  /**
   * Detalles seleccionados de la tabla para operaciones de edición o eliminación.
   * @type {Detalles}
   * @memberof MercanciaSolicitudComponent
   */
  detallesSeleccionados: Detalles = {} as Detalles;

  /**
   * Evento emitido al cerrar el formulario de mercancía.
   * @type {EventEmitter<void>}
   * @memberof MercanciaSolicitudComponent
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Datos de la mercancía almacenados en el store.
   * @type {Fila}
   * @memberof MercanciaSolicitudComponent
   */
  datosMercanciaStore: Fila = {} as Fila;

  /**
   * Grupo de formularios para los datos principales de la mercancía.
   * @type {FormGroup}
   * @memberof MercanciaSolicitudComponent
   */
  mercanciaGroup!: FormGroup;

  /**
   * Grupo de formularios para los detalles adicionales de la mercancía.
   * @type {FormGroup}
   * @memberof MercanciaSolicitudComponent
   */
  detallesGroup!: FormGroup;

  /**
   * Datos de catálogos necesarios para los selectores del formulario.
   * @type {CatalogoData}
   * @memberof MercanciaSolicitudComponent
   */
  detallesCatalogo: CatalogoData = {} as CatalogoData;

  /**
   * Bandera que indica si se debe mostrar la confirmación para eliminar datos de la tabla.
   * @type {boolean}
   * @memberof MercanciaSolicitudComponent
   */
  eliminarDatosTabla: boolean = false;

  /**
   * Tipo de selección para la tabla principal.
   * @type {TablaSeleccion}
   * @memberof MercanciaSolicitudComponent
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de detalles.
   * @type {ConfiguracionColumna<Detalles>[]}
   * @memberof MercanciaSolicitudComponent
   */
  configuracionColumnas: ConfiguracionColumna<Detalles>[] = [
    { encabezado: 'Nombre científico', clave: (fila) => fila.nombreCientifico, orden: 1 },
  ];

  /**
   * Datos del cuerpo de la tabla de detalles.
   * @type {Detalles[]}
   * @memberof MercanciaSolicitudComponent
   */
  cuerpoTablaDetalle: Detalles[] = [];

  /**
   * Subject para controlar la destrucción de suscripciones y evitar memory leaks.
   * @type {Subject<void>}
   * @private
   * @memberof MercanciaSolicitudComponent
   */
  private readonly DESTROY_NOTIFIER$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   * @memberof MercanciaSolicitudComponent
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * @type {Notificacion}
   * @public
   * @memberof MercanciaSolicitudComponent
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Constructor del componente MercanciaSolicitudComponent.
   * Inicializa los servicios necesarios y obtiene los catálogos requeridos.
   * 
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices - Servicio para operaciones de importación de acuicultura
   * @param {FormBuilder} fb - Constructor de formularios de Angular
   * @param {AcuiculturaStore} acuiculturaStore - Store para el manejo del estado de acuicultura
   * @param {AcuiculturaQuery} acuiculturaQuery - Query para acceder al estado de acuicultura
   * @memberof MercanciaSolicitudComponent
   */
  constructor(
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService, 
    private readonly fb: FormBuilder,
    private readonly acuiculturaStore: AcuiculturaStore,
    private readonly acuiculturaQuery: AcuiculturaQuery
  ) {
    this.obtenerCatalogosTransporte();
    this.obtenerNicoCatalogosTransporte();
    this.obtenerUMCCatalogosTransporte();
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.DESTROY_NOTIFIER$)).subscribe((datos) => {
      this.datosMercanciaStore = datos.selectedmercanciaGroupDatos || {} as Fila;
    })
  }
  /**
   * Método del ciclo de vida OnInit de Angular.
   * Inicializa los grupos de formularios principales del componente.
   * 
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  ngOnInit(): void {
    this.mercanciaGroup = this.createMercanciaGroup();
    this.detallesGroup = this.createDetallesGroup();
  }
  /**
   * Obtiene los datos del catálogo de puntos y fracciones arancelarias.
   * Carga los datos necesarios para los selectores de tipo de requisito y fracción arancelaria.
   * 
   * @public
   * @method obtenerCatalogosTransporte
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  public obtenerCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.DESTROY_NOTIFIER$))
      .subscribe((data) => {
        this.detallesCatalogo.tipoRequisitoList = data.data as Catalogo[];
        this.detallesCatalogo.arancelariaList = data.data as Catalogo[];
      }, (_error) => {
          this.detallesCatalogo.tipoRequisitoList = [];
          this.detallesCatalogo.arancelariaList = [];
      });
  }
  /**
   * Obtiene los datos del catálogo NICO (Nomenclatura de Identificación de Comercio Exterior).
   * Carga los códigos NICO necesarios para la clasificación de mercancías.
   * 
   * @public
   * @method obtenerNicoCatalogosTransporte
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  public obtenerNicoCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('nico.json')
      .pipe(takeUntil(this.DESTROY_NOTIFIER$))
      .subscribe((data) => {
        this.detallesCatalogo.nicoList = data.data as Catalogo[];
      }, (_error) => {
          this.detallesCatalogo.nicoList = [];
      });
  }
  /**
   * Obtiene los datos del catálogo UMC (Unidad de Medida Comercial) y otros catálogos relacionados.
   * Carga las unidades de medida, usos, países de origen y procedencia necesarios para el formulario.
   * 
   * @public
   * @method obtenerUMCCatalogosTransporte
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  public obtenerUMCCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('umc.json')
      .pipe(takeUntil(this.DESTROY_NOTIFIER$))
      .subscribe((data) => {
        this.detallesCatalogo.umcList = data.data as Catalogo[];
        this.detallesCatalogo.usoList = data.data as Catalogo[];
        this.detallesCatalogo.paisDeOrigenList = data.data as Catalogo[];
        this.detallesCatalogo.paisDeProcedenciaList = data.data as Catalogo[];
      }, (_error) => { 
        this.detallesCatalogo.usoList = [];
        this.detallesCatalogo.paisDeOrigenList = [];    
        this.detallesCatalogo.paisDeProcedenciaList = [];
        this.detallesCatalogo.umcList = [];
      });
  }
  /**
   * Actualiza valores específicos en el formulario principal basado en el campo seleccionado.
   * Maneja la lógica de actualización automática de campos dependientes.
   * 
   * @public
   * @method setValoresStore
   * @param {FormGroup} [form] - El formulario que contiene los valores (opcional)
   * @param {string} [campo] - El campo específico a actualizar en el store
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  public setValoresStore(
    form?: FormGroup,
    campo?: string,
  ): void {
    if (campo === 'fraccionArancelaria') {
      this.mercanciaGroup.patchValue({
        descripcionFraccionArancelaria: 'Nuevo valor para descripcion',
      });
    }
    else if (campo === 'nico') {
      this.mercanciaGroup.patchValue({
        descripcionNico: 'Nuevo valor para descripcionNico',
      });
    }
    else if (campo === 'cantidadUMT') {
      this.mercanciaGroup.patchValue({
        umt: 'Nuevo valor para cantidadUMT',
      });
    }
  }
  /**
   * Guarda los valores del formulario de detalles en el store de acuicultura.
   * Agrega el nuevo detalle al estado actual del grupo de mercancías.
   * 
   * @public
   * @method setValoresDetalleStore
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  public setValoresDetalleStore(): void {
    // Obtiene el estado actual del grupo de mercancía desde el query
    const ESTADO_ACTUAL = this.acuiculturaQuery.getValue().mercanciaGroup;
    const VALOR = this.detallesGroup.getRawValue();
    ESTADO_ACTUAL.push(VALOR);
  }
  /**
   * Agrega una nueva fila de detalle a la tabla de detalles.
   * Toma los valores del formulario de detalles y los añade a la tabla local.
   * 
   * @public
   * @method agregarFilaDetalle
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  agregarFilaDetalle(): void {
    this.cuerpoTablaDetalle.push(this.detallesGroup.getRawValue());
    this.detallesGroup.reset();
  }
  /**
   * Crea el grupo de formularios principal para los datos de mercancía.
   * Inicializa el formulario con los datos almacenados en el store.
   * 
   * @public
   * @method createMercanciaGroup
   * @memberof MercanciaSolicitudComponent
   * @returns {FormGroup} El grupo de formularios configurado para mercancía
   */
  public createMercanciaGroup(): FormGroup {
    const MERCANCIA_DATA = this.datosMercanciaStore || {}
    return this.buildMercanciaFormGroup(MERCANCIA_DATA);
  }

  /**
   * Construye el grupo de formularios para los datos de mercancía con validaciones.
   * Define todos los campos necesarios con sus validadores correspondientes.
   * 
   * @private
   * @method buildMercanciaFormGroup
   * @param {Fila} MERCANCIA_DATA - Los datos de mercancía para inicializar el formulario
   * @memberof MercanciaSolicitudComponent
   * @returns {FormGroup} El grupo de formularios construido con validaciones
   */
  private buildMercanciaFormGroup(MERCANCIA_DATA: Fila): FormGroup {
    return this.fb.group({
      tipoRequisito: [MERCANCIA_DATA.tipoRequisito || '', Validators.required],
      requisito: [MERCANCIA_DATA.requisito || '', Validators.required],
      numeroCertificadoInternacional: [MERCANCIA_DATA.numeroCertificadoInternacional || '', Validators.required],
      numeroOficioCasoEspecial: [MERCANCIA_DATA.numeroOficioCasoEspecial || ''],
      fraccionArancelaria: [MERCANCIA_DATA.fraccionArancelaria || '', Validators.required],
      descripcionFraccionArancelaria: [{value: MERCANCIA_DATA.descripcionFraccionArancelaria || '', disabled: true}, Validators.required],
      nico: [MERCANCIA_DATA.nico || '', Validators.required],
      descripcionNico: [{value: MERCANCIA_DATA.descripcionNico || '', disabled: true}, Validators.required],
      descripcion: [MERCANCIA_DATA.descripcion || '', Validators.required],
      cantidadUMT: [MERCANCIA_DATA.cantidadUMT || '', Validators.required],
      umt: [{value: MERCANCIA_DATA.umt || '', disabled: true}, Validators.required],
      cantidadUMC: [MERCANCIA_DATA.cantidadUMC || '', Validators.required],
      umc: [MERCANCIA_DATA.umc || '', Validators.required],
      uso: [MERCANCIA_DATA.uso || '', Validators.required],
      numeroDeLote: [MERCANCIA_DATA.numeroDeLote || '', Validators.required],
      faseDeDesarrollo: [MERCANCIA_DATA.faseDeDesarrollo || '', Validators.required],
      especie: [MERCANCIA_DATA.especie || '', Validators.required],
      paisDeOrigen: [MERCANCIA_DATA.paisDeOrigen || '', Validators.required],
      paisDeProcedencia: [MERCANCIA_DATA.paisDeProcedencia || '', Validators.required],
    });
  }
  /**
   * Crea el grupo de formularios para los detalles adicionales de la mercancía.
   * Inicializa un formulario simple para capturar información científica de la mercancía.
   * 
   * @public
   * @method createDetallesGroup
   * @memberof MercanciaSolicitudComponent
   * @returns {FormGroup} El grupo de formularios para detalles
   */
  public createDetallesGroup(): FormGroup {
    return this.fb.group({
      nombreCientifico: [''],
    });
  }
  /**
   * Elimina la fila actual del formulario y cierra el modal.
   * Resetea el formulario principal y emite el evento de cierre.
   * 
   * @public
   * @method eliminarFila
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  eliminarFila(): void {
    this.mercanciaGroup.reset();
    this.cerrar.emit();
  }
  /**
   * Limpia todos los formularios del componente.
   * Resetea tanto el formulario principal como el de detalles.
   * 
   * @public
   * @method onLimpiarDestinatario
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  onLimpiarDestinatario(): void {
    this.mercanciaGroup.reset();
    this.detallesGroup.reset();
  }
  /**
   * Agrega una nueva fila de mercancía al store y cierra el modal.
   * Maneja la lógica de agregar o actualizar una mercancía existente.
   * 
   * @public
   * @method agregarFila
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  agregarFila(): void {
    const NUEVO_DETALLE: Fila = this.mercanciaGroup.getRawValue(); 
    const ESTADO_ACTUAL = this.acuiculturaQuery.getValue().mercanciaGroup;
    let FILTERED_VALOR: Fila[] = [];
    
    if (this.datosMercanciaStore) {
      FILTERED_VALOR = ESTADO_ACTUAL.filter(
        (item) => item !== this.datosMercanciaStore
      );
    } else {
      FILTERED_VALOR = ESTADO_ACTUAL;
    }
    
    const NUEVA_DETALLE_LIST = [
      ...(FILTERED_VALOR || []),
      NUEVO_DETALLE
    ];
    
    this.acuiculturaStore.actualizarMercanciaGroup(NUEVA_DETALLE_LIST);
    this.detallesGroup.reset();
    this.cerrar.emit();
  }
  /**
   * Inicia el proceso de eliminación de una fila de detalle.
   * Muestra una notificación de confirmación antes de proceder con la eliminación.
   * 
   * @public
   * @method eliminarFilaDetalle
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  eliminarFilaDetalle(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Eliminar datos de la tabla',
      mensaje: 'Está seguro que desea eliminar estos datos?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };

    this.eliminarDatosTabla = true;
  }
  /**
   * Ejecuta la eliminación de datos de la tabla basado en la confirmación del usuario.
   * Si el usuario confirma, elimina el elemento seleccionado de la tabla de detalles.
   * 
   * @public
   * @method eliminarPedimentoDatos
   * @param {boolean} borrar - Indica si se debe proceder con la eliminación
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  eliminarPedimentoDatos(borrar: boolean): void {
    if (borrar) {
      this.eliminarDatosTabla = false;
      this.cuerpoTablaDetalle = this.cuerpoTablaDetalle.filter(
        (item) => item !== this.detallesSeleccionados
      );
      this.detallesSeleccionados = {} as Detalles;
    } else {
      this.eliminarDatosTabla = false;
    }
  }
  /**
   * Maneja la selección de elementos en la tabla de detalles.
   * Almacena el primer elemento seleccionado para operaciones posteriores.
   * 
   * @public
   * @method seleccionTabla
   * @param {Detalles[]} event - Array de detalles seleccionados de la tabla
   * @memberof MercanciaSolicitudComponent
   * @returns {void}
   */
  seleccionTabla(event: Detalles[]): void {
    this.detallesSeleccionados = event[0] || {} as Detalles;
  }
}
