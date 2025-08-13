import { ALERT, AlertComponent, CrossListLable,CrosslistComponent } from '@libs/shared/data-access-user/src';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CROSLISTA_DE_PAISES, ScianData } from '../../models/datos-modificacion.model';
import { Catalogo, ConfiguracionColumna, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DatosSolicitudState, DatosSolicitudStore } from '../../estados/stores/datos-de-la-solicitud-modificacion.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MANIFIESTOS_DECLARACION, MERCANCIAS_DATA } from '../../constantes/aviso-de-funcionamiento.enum';
import { MercanciasInfo, PropietarioTipoPersona, ScianModel } from '../../models/datos-de-la-solicitud.model';
import { Subject, map, takeUntil } from 'rxjs';
import { ALERT_INSUMOS } from '../../constantes/datos-domicilio-legal.enum';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelEstablecimientoRFCComponent } from '../datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DatosSolicitudQuery } from '../../estados/queries/datos-de-la-solicitud-modificacion.query';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { RepresentanteLegalRfcComponent } from '../representante-legal-rfc/representante-legal-rfc.component';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
/**
 * @description
 * Componente que gestiona el formulario y las interacciones relacionadas con la modificación de datos de la solicitud.
 * Este componente permite al usuario capturar, visualizar y modificar datos relacionados con la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud-modificacion',
  standalone: true,
  providers: [BsModalService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificacionesComponent,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputCheckComponent,
    AlertComponent,
    DatosDelEstablecimientoRFCComponent,
    RepresentanteLegalRfcComponent,
    CrosslistComponent
  ],
  templateUrl: './datos-de-la-solicitud-modificacion.component.html',
  styleUrl: './datos-de-la-solicitud-modificacion.component.scss',
})
export class DatosDeLaSolicitudModificacionComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * @Input
   * Indica si los insumos están habilitados o no.
   */
  @Input() insumos: boolean = false;

  /**
   * @description
   * Formulario principal para capturar los datos de la solicitud.
   */
  public datosSolicitudform!: FormGroup;

  /**
   * @description
   * Formulario para capturar los manifiestos del representante.
   */
  public manifiestosRepresentanteForm!: FormGroup;

  /**
   * @description
   * Formulario para capturar datos SCIAN.
   */
  public scianForm!: FormGroup;

  /**
   * Grupo de formularios para mercancías.
   */
  public formMercancias!: FormGroup;

  /**
   * @description
   * Datos SCIAN agregados por el usuario.
   */
  public personaparas: ScianModel[] = [];

  /**
   * @description
   * Datos del catálogo SCIAN.
   */
  public scianJson: Catalogo[] = [];

  /**
   * @description
   * Instancia del modal de Bootstrap.
   */
  public modalInstance!: Modal;

  /**
   * @description
   * Referencia al modal del establecimiento.
   */
  @ViewChild('establecimientoModal', { static: false })
  /**
   * Referencia al elemento modal para "establecimiento".
   * Se utiliza para acceder y manipular el cuadro de diálogo modal en la plantilla del componente.
   * 
   * @remarks
   * Esta propiedad es poblada por el decorador {@link ViewChild} de Angular.
   */
  establecimientoModal!: ElementRef;
  /**
   * Un QueryList que contiene todas las instancias de {@link CrosslistComponent} encontradas dentro de la vista.
   * Esto permite interactuar con múltiples componentes hijos CrosslistComponent, como acceder a sus propiedades o invocar sus métodos.
   * 
   * @see {@link ViewChildren}
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
    /**
   * @description
   * Referencia al modal de Bootstrap.
   */
    modalRef?: BsModalRef;

  /**
   * @description
   * Textos de alerta utilizados en el componente.
   */
  public TEXTOS = ALERT;
  /**
   * @description
   * Mensaje de alerta para insumos.
   */
  public TEXTOS_INSUMOS = ALERT_INSUMOS;

  /**
   * @description
   * Clase CSS para las alertas.
   */
  public class = 'alert-warning';

  /**
   * @description
   * Configuración de columnas para la tabla de datos SCIAN.
   */
  public configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  /**
   * @description
   * Configuración de selección de tabla.
   */
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Datos cargados dinámicamente para la tabla SCIAN.
   */
  public datosData: ScianData[] = [];

  /**
   * @description
   * Enum para la selección de tablas.
   */
  public tipoSeleccionTabla = TablaSeleccion;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * @description
   * Índice del elemento que se desea eliminar de la lista de pedimentos.
   */
  public elementoParaEliminar!: number;

  /**
   * @description
   * Notificación actual que se muestra en el componente.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Lista de pedimentos gestionados en el componente.
   */
  public pedimentos: Array<Pedimento> = [];

  /**
   * @description
   * Configuración de columnas de la tabla de mercancías.
   */
  public mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * @description
   * Datos de la tabla de mercancías.
   */
  public mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * @description
   * Texto de los manifiestos.
   */
  public mensajeManifiestos: string = '';

  /**
   * @description
   * Lista de estados disponibles.
   */
  public estado: Catalogo[] = [];
  /**
   * @description
   * Lista de clasificación del producto.
   */
  public classificacionDelProducto: Catalogo[] = [];
  /**
   * @description
   * Lista de tipo de producto.
   */
  public tipoDeProducto: Catalogo[] = [];
  /**
   * @description
   * Lista de especificar clasificación del producto.
   */
  public especificarClassificacion: Catalogo[] = [];
  /**
   * @description
   * Lista de unidades de medida comercial (UMC).
   */
  public umc: Catalogo[] = [];

  /**
   * @description
   * Opciones genéricas para el formulario.
   */
  public datosGenericos: PropietarioTipoPersona[] = [];

  /**
   * @description
   * Opciones para el radio de información confidencial.
   */
  public informacionConfidencialRadioOption: PropietarioTipoPersona[] = [];

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DatosSolicitudState;

  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  public esFormularioSoloLectura: boolean = false;
  /**
   * Indica si la sección del componente es colapsable.
   * Cuando se establece en `true`, la sección puede ser expandida o colapsada por el usuario.
   */
  public colapsable: boolean = false;
  /**
   * Indica si la segunda sección colapsable está expandida o colapsada.
   * Cuando es `true`, la sección está expandida; cuando es `false`, está colapsada.
   */
  public colapsableDos: boolean = false;
  /**
   * Indica si la tercera sección colapsable está expandida o colapsada.
   * Cuando es `true`, la sección está expandida; cuando es `false`, está colapsada.
   */
  public colapsableTres: boolean = false;
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  public paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];

  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    { btnNombre: 'Agregar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[1].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[1].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].quitar('t') },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    { btnNombre: 'Agregar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[2].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[2].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].quitar('t') },
  ];

  /**
   * Etiqueta para el crosslist de país de origen.
   */
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };
  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia:',
    derecha: 'País(es) seleccionado(s)*:',
  };
  /**
   * Etiqueta para el crosslist de uso específico.
   * Esta etiqueta se utiliza para mostrar información relacionada con el uso específico de un producto o servicio.
   */
  public usoEspecificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico seleccionado*:',
  };

  public tieneMercanciaFormaEnviada: boolean = false;
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  public seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
  
  /**
   * Lista de países para seleccionar el origen de la segunda sección.
   */
  public seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
  
  /**
   * Lista de países para seleccionar el origen de la tercera sección.
   */
  public seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
* Abre el modal de confirmación para eliminar un pedimento.
* 
* Este método configura los datos de la notificación que se mostrará en el modal
* de confirmación. También almacena el índice del elemento que se desea eliminar.
* 
* @param i - Índice del pedimento que se desea eliminar. Por defecto, es 0.
*/
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };

    this.elementoParaEliminar = i;
  }
  /**
   * @description
   * Constructor del componente.
   * @param formBuilder Constructor de formularios reactivos.
   * @param establecimientoService Servicio para gestionar datos del establecimiento.
   * @param datosSolicitudStore Store para gestionar el estado de la solicitud.
   * @param datosSolicitudQuery Query para obtener datos del estado de la solicitud.
   */
  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private datosSolicitudStore: DatosSolicitudStore,
    private datosSolicitudQuery: DatosSolicitudQuery,
    private consultaioQuery: ConsultaioQuery,
    @Inject(BsModalService)
    private modalService: BsModalService,
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Método del ciclo de vida `OnInit` que inicializa el componente.
   */
  ngOnInit(): void {

    /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()

    /**
     * Se suscribe al estado de `DatosSolicitud` para obtener información actualizada del estado de la solicitud.
     * - Asigna el estado de la solicitud a la propiedad `solicitudState`.
     * - La suscripción se cancela automáticamente cuando `destroy$` emite un valor (para evitar fugas de memoria).
     */

    this.datosSolicitudQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.mensajeManifiestos = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.cargarEstado();
    this.cargarClassificacionDelProductoCatalogo();
    this.cargarTipoDeProductoCatalogo();
    this.cargarEspecificarClassificacionCatalogo();
    this.cargarUMCCatalogo();
    this.cargarScian();
    this.establecerOpcionesGenericas();
    this.manejarConfidencial();
    this.configurarGrupoForm();
    this.crearFormularioMercancias();
  }

  /**
   * @description
   * Configura los formularios reactivos del componente.
   */
  configurarGrupoForm(): void {
    this.datosSolicitudform = this.formBuilder.group({
      genericos: [this.solicitudState?.genericos, [Validators.required]],
      observaciones: [this.solicitudState?.observaciones, [Validators.required]],
      establecimientoRazonSocial: [this.solicitudState?.establecimientoRazonSocial, Validators.required],
      establecimientoCorreoElectronico: [this.solicitudState?.establecimientoCorreoElectronico, Validators.required],
      establecimientoDomicilioCodigoPostal: [this.solicitudState?.establecimientoDomicilioCodigoPostal, [Validators.required]],
      establecimientoEstados: [this.solicitudState?.establecimientoEstados, Validators.required],
      descripcionMunicipio: [this.solicitudState?.descripcionMunicipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      establishomentoColonias: [this.solicitudState?.establishomentoColonias],
      calle: [this.solicitudState?.calle, Validators.required],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox],
      noLicenciaSanitaria: [this.solicitudState?.noLicenciaSanitaria],
      regimen: [this.solicitudState?.regimen, Validators.required],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas, Validators.required],
      aifaCheckbox: [this.solicitudState?.aifaCheckbox, Validators.required],
    });

    this.manifiestosRepresentanteForm = this.formBuilder.group({
      manifests: [this.solicitudState?.manifests, Validators.required],
      informacionConfidencialRadio: [this.solicitudState?.informacionConfidencialRadio, Validators.required],
    });

    this.scianForm = this.formBuilder.group({
      scian: [this.solicitudState?.scian, Validators.required],
      descripcionScian: [this.solicitudState?.descripcionScian],
    });

    if (this.datosSolicitudform && this.manifiestosRepresentanteForm && this.scianForm) {
      this.datosSolicitudform.disable();
      this.manifiestosRepresentanteForm.disable();
      this.scianForm.disable();
    } else {
      this.datosSolicitudform.enable();
      this.manifiestosRepresentanteForm.enable();
      this.scianForm.enable();
    }
  }


  /**
   * Inicializa el FormGroup `formMercancias` con controles para varios campos relacionados con el producto,
   * utilizando los valores del `solicitudState` actual como valores predeterminados.
   */
  public crearFormularioMercancias(): void {
    this.formMercancias = this.formBuilder.group({
      clasificacion: ['', Validators.required],
      especificarClasificacionProducto: ['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: ['', Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: ['', Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      presentacion: ['', Validators.required],
      numeroRegistro: ['', Validators.required],
    });
  }

  /**
   * @description
   * Actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  actualizarValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DatosSolicitudStore): void {
    const VALOR = form.get(campo)?.value;
    (this.datosSolicitudStore[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * @description
   * Establece las opciones genéricas para el formulario.
   */
  establecerOpcionesGenericas(): void {
    this.establecimientoService
      .getJustificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.datosGenericos = data;
      });
  }

  /**
   * @description
   * Maneja las opciones de información confidencial.
   */
  manejarConfidencial(): void {
    this.establecimientoService
      .getInformacionConfidencialRadioOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.informacionConfidencialRadioOption = data;
      });
  }

  /**
   * @description
   * Carga los datos del estado desde el servicio.
   */
  cargarEstado(): void {
    this.establecimientoService
      .getEstadodata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estado = resp;
      });
  }

  /**
   * @description
   * Carga los datos SCIAN desde el servicio.
   */
  cargarScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }

  /**
   * @description
   * Cierra el modal SCIAN.
   */
  cerrarModalScian(): void {
    this.modalInstance.hide();
  }

  /**
   * @description
   * Limpia el formulario SCIAN.
   */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }

  /**
   * @description
   * Guarda un nuevo dato SCIAN y lo agrega a la tabla.
   */
  guardarScian(): void {
    if (this.scianForm.valid) {
      const SCIAN_DATA: ScianModel = {
        claveScian: this.scianForm.get('scian')?.value,
        descripcionScian: this.scianForm.get('descripcionScian')?.value,
      };

      // Agregar el nuevo dato a la tabla
      this.personaparas.push(SCIAN_DATA);

      // Limpiar el formulario
      this.scianForm.reset();

      // Cerrar el modal
      this.cerrarModalScian();
    }
  }

  /**
   * @description
   * Elimina un pedimento de la lista.
   * @param borrar Indica si se debe proceder con la eliminación.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * @description
   * Muestra el modal para la clave SCIAN.
   */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }

  /**
   * Alterna el estado colapsable de la primera sección.
   */
  public mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado colapsable de la segunda sección.
   */
  public mostrar_colapsableDos(): void {
    this.colapsableDos = !this.colapsableDos;
  }

  /**
   * Alterna el estado colapsable de la tercera sección.
   */
  public mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }

  /**
   * @description
   * Abre el modal para agregar mercancía.
   * @param template Plantilla del modal a mostrar.
   */
  public agregarMercancia(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl',});
  }

  /**
   * Limpia todos los campos del formulario `formMercancias` restableciendo su estado.
   * Este método puede usarse para revertir el formulario a sus valores iniciales,
   * eliminando cualquier entrada o cambio realizado por el usuario.
   */
  public limpiarFormulario(): void {
    this.formMercancias.reset();
    this.formMercancias.markAsPristine();
    this.formMercancias.markAsUntouched();
    this.formMercancias.updateValueAndValidity();
    this.tieneMercanciaFormaEnviada = false;
  }

  /**
   * Carga el catálogo de clasificación de producto obteniendo los datos desde el `establecimientoService`.
   * Se suscribe al observable del servicio y asigna los datos recibidos de clasificación a `classificacionDelProducto`.
   * La suscripción se cancela automáticamente cuando el componente se destruye.
   */
  public cargarClassificacionDelProductoCatalogo(): void {
    this.establecimientoService.getClasificacionProducto().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.classificacionDelProducto = API_RESPONSE.data;
      });
  }

  /**
   * Carga el catálogo de tipo de producto obteniendo los datos desde el `establecimientoService`.
   * Se suscribe al observable del servicio y asigna los datos recibidos de tipo de producto a `tipoDeProducto`.
   * La suscripción se cancela automáticamente cuando el componente se destruye.
   */
  public cargarTipoDeProductoCatalogo(): void {
    this.establecimientoService.getTipoDeProducto().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.tipoDeProducto = API_RESPONSE.data;
      });
  }

  /**
   * Carga el catálogo de especificar clasificación obteniendo los datos desde el `establecimientoService`.
   * Se suscribe al observable del servicio y asigna los datos recibidos de especificar clasificación a `especificarClassificacion`.
   * La suscripción se cancela automáticamente cuando el componente se destruye.
   */
  public cargarEspecificarClassificacionCatalogo(): void {
    this.establecimientoService.getEspecificarProducto().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.especificarClassificacion = API_RESPONSE.data;
      });
  }

  /**
   * Carga el catálogo de unidades de medida comercial (UMC) obteniendo los datos desde el `establecimientoService`.
   * Se suscribe al observable del servicio y asigna los datos recibidos de UMC a `umc`.
   * La suscripción se cancela automáticamente cuando el componente se destruye.
   */
  public cargarUMCCatalogo(): void {
    this.establecimientoService.getUMCCatalogo().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.umc = API_RESPONSE.data;
      });
  }

  /**
   * @description
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
  }

  /**
   * Agrega una nueva entrada de formulario al arreglo `mercanciasTablaDatos` utilizando los valores actuales
   * del grupo de formulario `formMercancias`. Establece `tieneMercanciaFormaEnviada` en `true`
   * y oculta el cuadro de diálogo modal si está abierto.
   *
   * La nueva entrada contiene diversos detalles del producto y mercancía como clasificación,
   * denominación, forma farmacéutica, estado físico, fracción arancelaria, unidades, cantidades,
   * presentación, número de registro, origen y uso específico.
   *
   * @remarks
   * Este método se llama normalmente cuando el usuario envía el formulario de mercancías en el flujo de solicitud de modificación.
   */
  public agregarFormulario(): void {
    this.tieneMercanciaFormaEnviada = true;
    const TABLA_DATOS = {
        clasificacion: this.formMercancias.get('clasificacion')?.value,
        especificar: this.formMercancias.get('especificarClasificacionProducto')?.value,
        denominacionEspecifica: this.formMercancias.get('denominacionEspecifica')?.value,
        denominacionDistintiva: this.formMercancias.get('denominacionDistintiva')?.value,
        denominacionComun: this.formMercancias.get('denominacionComun')?.value,
        formaFarmaceutica: this.formMercancias.get('formaFarmaceutica')?.value,
        estadoFisico: this.formMercancias.get('estadoFisico')?.value,
        estadoFormaFarmaceutica: this.formMercancias.get('estadoFormaFarmaceutica')?.value,
        fraccionArancelaria: this.formMercancias.get('fraccionArancelaria')?.value,
        descripcionFraccion: this.formMercancias.get('descripcionFraccion')?.value,
        unidad: this.formMercancias.get('unidad')?.value,
        cantidadUMC: this.formMercancias.get('cantidadUMC')?.value,
        unidadUMT: this.formMercancias.get('unidadUMT')?.value,
        cantidadUMT: this.formMercancias.get('cantidadUMT')?.value,
        presentacion: this.formMercancias.get('presentacion')?.value,
        numeroRegistro: this.formMercancias.get('numeroRegistro')?.value,
        paisDeOrigen: this.formMercancias.get('paisDeOrigen')?.value,
        paisDeProcedencia: this.formMercancias.get('paisDeProcedencia')?.value,
        tipoProducto: this.formMercancias.get('tipoProducto')?.value,
        usoEspecifico: this.formMercancias.get('usoEspecifico')?.value,
    }

    this.mercanciasTablaDatos = [...this.mercanciasTablaDatos, TABLA_DATOS];
    this.modalRef?.hide();
  }

  /**
   * @description
   * Ciclo de vida `OnDestroy`.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
