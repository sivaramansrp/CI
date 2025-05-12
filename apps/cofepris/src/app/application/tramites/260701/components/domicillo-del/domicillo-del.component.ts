import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrossListLable,CrosslistComponent, InputFecha, InputFechaComponent, LISTACLAVESDELOSLOTES,Listaclaves, MERCANCIAS_DATA, MercanciasInfo, NICO_TABLA, ScianModel, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FECHA_DE_PAGO, LOCALIDAD_COLONIA } from '../../services/certificados-licencias.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud260701State, Tramite260701Store } from '../../estados/tramites/tramite260701.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CROSLISTA_DE_PAISES } from '@libs/shared/data-access-user/src/core/enums/260701/domicillo-del.enum';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { CommonModule } from '@angular/common';
import { Tramite260701Query } from '../../estados/queries/tramite260701.query';

/**
 * Componente `DomicilloDelComponent` que representa una sección de la aplicación
 * para gestionar información relacionada con domicilios, agentes y mercancías.
 * 
 * Este componente incluye formularios reactivos, tablas dinámicas y listas cruzadas
 * para la selección y gestión de datos. Además, implementa los ciclos de vida de Angular
 * `OnInit` y `OnDestroy` para inicializar y limpiar recursos.
 */
@Component({
  selector: 'app-domicillo-del',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    InputFechaComponent
  ],
  templateUrl: './domicillo-del.component.html',
  styleUrl: './domicillo-del.component.scss',
})
export class DomicilloDelComponent implements OnInit, OnDestroy {

   /**
     * Lista de componentes Crosslist disponibles en la vista.
     */
    @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
   
    /**
     * Constructor del componente DomicilloDelComponent.
     * 
     * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
     * @param certificadosLicenciasSvc - Un servicio para manejar operaciones relacionadas con certificados y licencias.
     */
    constructor(
      private readonly fb: FormBuilder,
      private certificadosLicenciasSvc: CertificadosLicenciasService,
      private tramite260701Store: Tramite260701Store,
      private tramite260701Query: Tramite260701Query
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Grupo de formularios para domicilio.
     */
    public domicilio!: FormGroup;
   
    /**
     * Grupo de formularios para agente.
     */
    public formAgente!: FormGroup;
   
    /**
     * Grupo de formularios para mercancías.
     */
    public formMercancias!: FormGroup;
   
    /**
     * Control para la fecha de aduanas de entrada.
     */
    public aduanasDeEntradaFecha: FormControl = new FormControl('');
   
    /**
     * Control para la fecha seleccionada de aduanas de entrada.
     */
    public aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');
   
    /**
     * Lista de catálogos de estados.
     */
    public estado: Catalogo[] = [];
   
    /**
     * Lista de países para la selección de origen.
     */
    public crosListaDePaises = CROSLISTA_DE_PAISES;
   
    /**
     * Configuración de tabla para selección de tipo checkbox.
     */
    public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
   
    /**
     * Configuración de columnas para la tabla NICO.
     */
    public nicoTabla: ConfiguracionColumna<ScianModel>[] = NICO_TABLA;
   
    /**
     * Datos cargados para la tabla NICO.
     */
    public nicoTablaDatos: ScianModel[] = [];
   
    /**
     * Configuración de columnas para la tabla de mercancías.
     */
    public mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
   
    /**
     * Datos cargados para la tabla de mercancías.
     */
    public mercanciasTablaDatos: MercanciasInfo[] = [];
   
    /**
     * Lista de aduanas seleccionadas.
     */
    public aduanasDeEntradaSeleccionadas: string[] = [];
   
    /**
     * Lista de datos de aduanas de entrada.
     */
    public aduanasDeEntradaDatos: string[] = [];
   
    /**
     * Indica si la sección es colapsable.
     */
    public colapsable: boolean = false;
   
    /**
     * Indica si la sección "Duo" es colapsable.
     */
    public colapsableDos: boolean = false;
   
    /**
     * Indica si la sección "Tres" es colapsable.
     */
    public colapsableTres: boolean = false;
   
    /**
     * Lista de países para seleccionar el origen de la primera sección.
     */
    seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la segunda sección.
     */
    public seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la tercera sección.
     */
    public seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;
   
    /**
     * Etiqueta para el crosslist de país de procedencia.
     */
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'País de procedencia',
      derecha: 'País(es) seleccionados',
    };

    /**
     * Un Subject que emite un valor `void` cuando el componente es destruido.
     * Se utiliza para gestionar y limpiar suscripciones, evitando fugas de memoria.
     */
    private destroyed$: Subject<void> = new Subject();

    /**
     * Una constante que contiene el valor de `LOCALIDAD_COLONIA`.
     * Probablemente se utiliza para representar o almacenar información textual
     * relacionada con una localidad o colonia específica en la aplicación.
     */
    public TEXTO = LOCALIDAD_COLONIA;
    /**
     * Representa el tipo de alerta que se mostrará.
     * El valor es típicamente una cadena que indica el estilo de alerta, como 'alert-warning'.
     */
    public infoAlert = 'alert-warning';
    
  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Representa una lista de columnas de configuración para objetos "Listaclaves".
   * Esta propiedad se inicializa con la constante `LISTACLAVESDELOSLOTES`.
   * 
   * @type {ConfiguracionColumna<Listaclaves>[]}
   */
  public listaClavesDeLosLotes: ConfiguracionColumna<Listaclaves>[] = LISTACLAVESDELOSLOTES;
  /**
   * Un arreglo que contiene una lista de objetos `Listaclaves`.
   * Esta propiedad se utiliza para almacenar datos relacionados con las claves de los lotes.
   */
  public listaClavesDeLosLotesDatos: Listaclaves[] = [];
  /**
   * Representa el estado de la Solicitud 260701.
   * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
   * Se espera que se inicialice con una instancia de `Solicitud260701State`.
   */
  public solicitudState!: Solicitud260701State;

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * Este método inicializa varios formularios y obtiene los datos necesarios para el componente.
   *
   * - Llama a métodos para recuperar listas de estados, datos de tablas, datos de mercancías y claves de lotes.
   * - Inicializa el grupo de formularios `domicilio` con controles para campos relacionados con la dirección.
   * - Inicializa el grupo de formularios `formAgente` con controles para campos relacionados con el agente.
   * - Inicializa el grupo de formularios `formMercancias` con controles para campos relacionados con las mercancías.
   */
  ngOnInit(): void {
    this.tramite260701Query.selectSolicitud$.pipe(takeUntil(this.destroyed$),map((seccionState) => {
        this.solicitudState = seccionState;
    })).subscribe();

    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
    this.obtenerListaClavesDeLosLotes();
   
    /**
     * Inicialización del formulario de domicilio.
     */
    this.domicilio = this.fb.group({
      codigoPostal: [this.solicitudState.codigoPostal],
      estado: [this.solicitudState.estado],
      muncipio: [this.solicitudState.muncipio],
      localidad: [this.solicitudState.localidad],
      colonia: [this.solicitudState.colonia],
      calle: [this.solicitudState.calle],
      lada: [this.solicitudState.lada],
      telefono: [this.solicitudState.telefono],
      avisoCheckbox: [this.solicitudState.avisoCheckbox],
      licenciaSanitaria: [this.solicitudState.licenciaSanitaria],
      marcarEnCasoDeQueSea: [this.solicitudState.marcarEnCasoDeQueSea],
      regimen: [this.solicitudState.regimen],
      aduanasEntradas: [this.solicitudState.aduanasEntradas],
      numeroPermiso: [this.solicitudState.numeroPermiso],
    });
   
    /**
     * Inicialización del formulario de agente.
     */
    this.formAgente = this.fb.group({
      claveScianModal: [this.solicitudState.claveScianModal],
      claveDescripcionModal: [this.solicitudState.claveDescripcionModal],
    });
   
    /**
     * Inicialización del formulario de mercancías.
     */
    this.formMercancias = this.fb.group({
      clasificacion: [this.solicitudState.clasificacion],
      especificarClasificacionProducto: [this.solicitudState.especificarClasificacionProducto],
      denominacionEspecifica: [this.solicitudState.denominacionEspecifica],
      denominacionDistintiva: [this.solicitudState.denominacionDistintiva],
      denominacionComun: [this.solicitudState.denominacionComun],
      tipoDeProducto: [this.solicitudState.tipoDeProducto],
      estadoFisico: [this.solicitudState.estadoFisico],
      fraccionArancelaria: [this.solicitudState.fraccionArancelaria],
      descripcionFraccion: [this.solicitudState.descripcionFraccion],
      cantidadUMT: [this.solicitudState.cantidadUMT],
      UMT: [this.solicitudState.UMT],
      cantidadUMC: [this.solicitudState.cantidadUMC],
      UMC: [this.solicitudState.UMC],
      presentacion: [this.solicitudState.presentacion],
      numeroRegistro: [this.solicitudState.numeroRegistro],
      fechaCaducidad: [this.solicitudState.fechaCaducidad],
      claveDeLosLotes: [this.solicitudState.claveDeLosLotes],
    });
  }
   
  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];
   
  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[1].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[1].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].quitar('t') },
  ];
   
  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[2].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[2].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].quitar('t') },
  ];
   
  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  public obtenerEstadoList(): void {
    this.certificadosLicenciasSvc.getEstadoCatalogo().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
        const DATOS = JSON.parse(JSON.stringify(response));
        this.estado = DATOS.data;
      });
  }
   
  /**
   * Obtiene los datos para la tabla de NICO desde un archivo JSON.
   */
  public obtenerTablaDatos(): void {
    this.certificadosLicenciasSvc.getScianTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.nicoTablaDatos = DATOS;
    });
  }
   
  /**
   * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
   */
  public obtenerMercanciasDatos(): void {
    this.certificadosLicenciasSvc.getMercanciasTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.mercanciasTablaDatos = DATOS;
    });
  }

  /**
   * Recupera una lista de claves para los lotes desde el servicio y la asigna a la propiedad del componente.
   * 
   * Este método llama al método `getListaClaveTablaDatos` del servicio `certificadosLicenciasSvc`,
   * se suscribe al observable y procesa la respuesta para poblar la propiedad `listaClavesDeLosLotesDatos`.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public obtenerListaClavesDeLosLotes(): void {
    this.certificadosLicenciasSvc.getListaClaveTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.listaClavesDeLosLotesDatos = DATOS;
    });
  }
   
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260701Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260701Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
   
  /**
   * Alterna el estado colapsable de la primera sección.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }
   
  /**
   * Alterna el estado colapsable de la segunda sección.
   */
  mostrar_colapsableDos(): void {
    this.colapsableDos = !this.colapsableDos;
  }
   
  /**
   * Alterna el estado colapsable de la tercera sección.
   */
  mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }
  
    
  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }

    /**
     * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
     * Este método completa el observable destroyed$ para cancelar las suscripciones activas.
     */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
