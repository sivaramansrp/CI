import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoData, Detalles, Fila } from '../../models/220203/importacion-de-acuicultura.module';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';


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
  detallesSeleccionados: Detalles = {} as Detalles;
    /**
     * Evento emitido al cerrar el formulario de destinatario.
     * @type {EventEmitter<void>}
     */
    @Output() cerrar = new EventEmitter<void>();
   /**
     * Datos de la mercancía almacenados en el store.
     * @type {DatosMercancia220203}
     */
    datosMercanciaStore: Fila = {} as Fila;
    mercanciaGroup!:FormGroup;
    detallesGroup!: FormGroup;
    detallesCatalogo:CatalogoData={} as CatalogoData;
    eliminarDatosTabla: boolean = false;
      /**
       * Tipo de selección para la tabla principal.
       * @type {TablaSeleccion}
       */
      tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;
        /**
         * Configuración de columnas para la tabla principal.
         * @type {ConfiguracionColumna<Fila>[]}
         */
        configuracionColumnas: ConfiguracionColumna<Detalles>[] = [
          { encabezado: 'Nombre científico', clave: (fila) => fila.nombreCientifico, orden: 1 },
      
      
        ];
        cuerpoTablaDetalle: Detalles[] = [];
    /**
     * Subject para controlar la destrucción de suscripciones.
     * @type {Subject<void>}
     */
    private destroyNotifier$ = new Subject<void>();
  
  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;
      /**
       * Representa una nueva notificación que será utilizada en el componente.
       * @type {Notificacion}
       */
      public nuevaNotificacion!: Notificacion;
  constructor(private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService, private readonly fb: FormBuilder,private readonly acuiculturaStore: AcuiculturaStore,private readonly acuiculturaQuery:AcuiculturaQuery) {
this.obtenerCatalogosTransporte();
this.obtenerNicoCatalogosTransporte();
this.obtenerUMCCatalogosTransporte();
  this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.datosMercanciaStore = datos.selectedmercanciaGroupDatos || {} as Fila;
    })
  }
  ngOnInit():void {
    this.mercanciaGroup =this.createMercanciaGroup();
    this.detallesGroup = this.createDetallesGroup();

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
        this.detallesCatalogo.tipoRequisitoList = data.data as Catalogo[];
        this.detallesCatalogo.arancelariaList = data.data as Catalogo[];
      }, (error) => {
          this.detallesCatalogo.tipoRequisitoList=[];
          this.detallesCatalogo.arancelariaList=[];
      });
  }
   /**
   * Obtiene los datos del catálogo de transporte.
   * @method
   * @returns {void}
   */
  public obtenerNicoCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('nico.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.detallesCatalogo.nicoList = data.data as Catalogo[];
      }, (error) => {
          this.detallesCatalogo.nicoList=[];
      });
  }
   /**
   * Obtiene los datos del catálogo de transporte.
   * @method
   * @returns {void}
   */
  public obtenerUMCCatalogosTransporte(): void {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('umc.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.detallesCatalogo.umcList = data.data as Catalogo[];
        this.detallesCatalogo.usoList = data.data as Catalogo[];
        this.detallesCatalogo.paisDeOrigenList = data.data as Catalogo[];
        this.detallesCatalogo.paisDeProcedenciaList = data.data as Catalogo[];
      }, (error) => { 
        this.detallesCatalogo.usoList=[];
        this.detallesCatalogo.paisDeOrigenList=[];    
        this.detallesCatalogo.paisDeProcedenciaList=[];
          this.detallesCatalogo.umcList=[];
      });
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
     * Guarda los valores en el store.
     * @method
     * @param form El formulario que contiene los valores.
     * @param campo El campo a guardar en el store.
     * @returns {void}
     */
    public setValoresDetalleStore(
    ): void {
    // Obtiene el estado actual del grupo de mercancía desde el query
    const ESTADO_ACTUAL = this.acuiculturaQuery.getValue().mercanciaGroup;
      const VALOR = this.detallesGroup.getRawValue();
      ESTADO_ACTUAL.push(VALOR);
    }
    agregarFilaDetalle(): void {
      this.cuerpoTablaDetalle.push(this.detallesGroup.getRawValue());
      this.detallesGroup.reset();
    }
     /**
       * Crea el grupo de formularios 'mercanciaGroup'.
       * @method
       * @returns {FormGroup}
       */
      public createMercanciaGroup(): FormGroup {
        const MERCANCIADATA = this.datosMercanciaStore || {}
        return this.buildMercanciaFormGroup(MERCANCIADATA);
      }

      private buildMercanciaFormGroup(MERCANCIADATA: Fila): FormGroup {
        return this.fb.group({
          tipoRequisito: [MERCANCIADATA.tipoRequisito || '', Validators.required],
          requisito: [MERCANCIADATA.requisito || '',Validators.required],
          numeroCertificadoInternacional: [MERCANCIADATA.numeroCertificadoInternacional || '', Validators.required],
          numeroOficioCasoEspecial: [MERCANCIADATA.numeroOficioCasoEspecial || ''],
          fraccionArancelaria: [MERCANCIADATA.fraccionArancelaria || '', Validators.required],
          descripcionFraccionArancelaria: [{value: MERCANCIADATA.descripcionFraccionArancelaria || '', disabled: true}, Validators.required],
          nico: [MERCANCIADATA.nico || '', Validators.required],
          descripcionNico: [{value: MERCANCIADATA.descripcionNico || '', disabled: true}, Validators.required],
          descripcion: [MERCANCIADATA.descripcion || '', Validators.required],
          cantidadUMT: [MERCANCIADATA.cantidadUMT || '', Validators.required],
          umt: [{value:MERCANCIADATA.umt|| '', disabled: true}, Validators.required],
          cantidadUMC: [MERCANCIADATA.cantidadUMC || '', Validators.required],
          umc: [MERCANCIADATA.umc || '', Validators.required],
          uso: [MERCANCIADATA.uso || '', Validators.required],
          numeroDeLote: [MERCANCIADATA.numeroDeLote || '', Validators.required],
          faseDeDesarrollo: [MERCANCIADATA.faseDeDesarrollo || '', Validators.required],
          especie: [MERCANCIADATA.especie || '', Validators.required],
          paisDeOrigen: [MERCANCIADATA.paisDeOrigen || '', Validators.required],
          paisDeProcedencia: [MERCANCIADATA.paisDeProcedencia || '', Validators.required],
        });
      }
       /**
   * Crea el grupo de formularios 'detalles'.
   * @method
   * @returns {FormGroup}
   */
  public createDetallesGroup(): FormGroup {
    return this.fb.group({
      nombreCientifico: [ ''],
    });
  }
  eliminarFila(): void {
    this.mercanciaGroup.reset();
      this.cerrar.emit();
  }
  onLimpiarDestinatario(): void {
    this.mercanciaGroup.reset();
    this.detallesGroup.reset();
  }
  agregarFila(): void {
      const NUEVO_DETALLE: Fila = this.mercanciaGroup.getRawValue(); 
      const ESTADO_ACTUAL = this.acuiculturaQuery.getValue().mercanciaGroup;
      let FILTERED_VALOR:Fila[]=[];
      if(this.datosMercanciaStore){
      FILTERED_VALOR = ESTADO_ACTUAL.filter(
        (item) => item !== this.datosMercanciaStore
      );
      }
      else{
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
  * Elimina un pedimento de la lista si el parámetro `borrar` es verdadero.
  * @method eliminarPedimento
  * @param borrar - Indica si se debe eliminar el pedimento seleccionado.
  */
  eliminarPedimentoDatos(borrar: boolean): void {
    if (borrar) {
      this.eliminarDatosTabla = false;
      this.cuerpoTablaDetalle = this.cuerpoTablaDetalle.filter(
        (item) => item !== this.detallesSeleccionados
      );
      this.detallesSeleccionados = {} as Detalles;
  }
  else{
    this.eliminarDatosTabla=false;
  }
}
seleccionTabla(event: Detalles[]): void {
  this.detallesSeleccionados = event[0] || {} as Detalles;
}
}
