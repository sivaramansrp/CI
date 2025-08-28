import {
  ALERTA_TEXTO,
  CATALOGOS_ID,
  OPCIONES_DE_BOTON_DE_RADIO,
  PRODUCTO_TABLA_CONFIGURACION,
  SCIAN_TABLA_CONFIGURACION,
} from '../../constantes/aviso-enum';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AvisoSanitarioState,
  Tramite260601Store,
} from '../../../../estados/tramites/tramite260601.store';
import { Catalogo, ConsultaioQuery, REGEX_REEMPLAZAR } from '@ng-mf/data-access-user';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputCheckComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Manifiestos, ManifiestosRespuesta,ProductoInput,ProductoTable,ScianTable} from '../../models/aviso-model';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { Modal } from 'bootstrap';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import productoTable from '@libs/shared/theme/assets/json/260601/producto-table.json';
import scianTable from '@libs/shared/theme/assets/json/260601/scian-table.json';

/**
 * Componente para gestionar el datos del establecimiento.
 */
@Component({
  selector: 'app-datos-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputCheckComponent,
    DatosMercanciaComponent,
    InputRadioComponent,
    RepresentanteLegalComponent,
    NotificacionesComponent,
    TablaDinamicaComponent,
    TooltipModule,
  ],
  providers: [AvisoSanitarioService],
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.css',
})
export class DatosDelEstablecimientoComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Formulario principal para los datos del establecimiento.
   */
  datosDelEstablecimientoForm!: FormGroup;

  /**
   * Formulario para los datos del domicilio del establecimiento.
   */
  domicilloDelEstablecimientoForm!: FormGroup;

  /**
   * Formulario para los datos SCIAN.
   */
  scianForm!: FormGroup;

  /**
   * Formulario para los manifiestos relacionados con el establecimiento.
   */
  manifiestosForm!: FormGroup;

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Catálogo de estados disponibles.
   */
  estado!: Catalogo[];

  /**
   * Catálogo de claves SCIAN.
   */
  claveScian!: Catalogo[];

  /**
   * Catálogo de descripciones SCIAN.
   */
  descripcionScian!: Catalogo[];

    /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
    tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

     /**
   * Configuración de las columnas de la tabla de subfabricantes.
   * @property {ConfiguracionColumna<SubfabricanteDireccionModelo>[]} configuracionTabla
   */
  configuracionTabla: ConfiguracionColumna<ProductoTable>[] =
  PRODUCTO_TABLA_CONFIGURACION;
  
  /**
   * Configuración de las columnas de la tabla SCIAN.
   */
  configuracionTablaSCIAN: ConfiguracionColumna<ScianTable>[] =
  SCIAN_TABLA_CONFIGURACION;
  /**
   * Catálogo de regímenes fiscales disponibles.
   */
  regimenes!: Catalogo[];

  /**
   * Catálogo de aduanas disponibles.
   */
  aduanas!: Catalogo[];

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Cabeceras de la tabla de SCIAN.
   */
  public scianHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla SCIAN.
   */
  public scianBodyData: ScianTable[] = [];

  /**
   * Cabeceras de la tabla de productos.
   */
  public productoHeaderData: string[] = [];

  /**
   * Cuerpo de datos de la tabla de productos.
   */
  public productoBodyData: ProductoTable[] = [];

  /**
   * Datos de la tabla SCIAN desde un archivo JSON.
   */
  public getSCIANTableData = scianTable;

  /**
   * Datos de la tabla de productos desde un archivo JSON.
   */
  public getProductoTableData = productoTable;

  /**
   * Estado del modal.
   */
  modal: string = 'modal';

  /**
   * Lista de productos seleccionados.
   */

  productoSeleccionados:ProductoTable[] = [];
  /**
   * Lista de SCIAN seleccionados.
   */
  scianSeleccionados:ScianTable[] = [];

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAlerta') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Indica si el estado del formulario está habilitado.
   */
  habilitarEstado: boolean = true;

  /**
   * Lista de manifiestos obtenidos desde el servicio.
   */
  manifiestos: Manifiestos[] = [];

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

    /**
   * @property {boolean} modalAlerta
   * @description Indica si el modal de alerta está visible. Se utiliza para mostrar mensajes de advertencia al usuario.
   */
  modalAlerta: boolean = false;

  /**
   * @property {Notificacion} nuevaNotificacion
   * @description Objeto que contiene la información de la notificación a mostrar en el componente de notificaciones.
   */
  public nuevaNotificacion!: Notificacion;

    /**
   * @property {boolean} limpiar
   * @description
   * Indica si se deben limpiar los campos del formulario de mercancía.
   * Cuando es `true`, se reinician todos los campos en el formulario de mercancía.
   */
  limpiar: boolean = false;

  /**
   * @property {boolean} showModalAgregarMercancia
   * @description
   * Controla la visibilidad del modal para agregar una nueva mercancía.
   * Cuando es `true`, el modal se muestra en la interfaz de usuario.
   */
  showModalAgregarMercancia: boolean = false;

  /**
   * @property {Modal} modalInstance
   * @description
   * Instancia del modal de Bootstrap utilizada para controlar programáticamente
   * las acciones del modal (mostrar, ocultar) desde el componente.
   */
  modalInstance!: Modal;

  /**
   * @property {Modal} modalAddSCIANInstance
   * @description
   * Instancia del modal de Bootstrap utilizada para controlar programáticamente
   * el modal para agregar registros SCIAN desde el componente.
   * Permite mostrar y ocultar el modal mediante métodos de la API de Bootstrap.
   */
  modalAddSCIANInstance!: Modal;

  /**
   * @property {ElementRef} modalAlerta
   * @description
   * Referencia al elemento DOM del modal de alerta.
   */
  @ViewChild('modalAddSCIAN', { static: false }) modalAddSCIAN!: ElementRef;

  /**
   * @property {ElementRef} modifyModal
   * @description
   * Referencia al elemento DOM del modal de modificación de datos.
   * Se utiliza para inicializar la instancia del modal de Bootstrap.
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  /**
   * @property {RepresentanteLegalComponent} representanteLegal
   * @description
   * Referencia al componente hijo RepresentanteLegalComponent.
   * Se utiliza para acceder a sus propiedades y métodos, especialmente para la validación de formularios
   * relacionados con la información del representante legal del establecimiento.
   */
  @ViewChild('representanteLegal') representanteLegal!: RepresentanteLegalComponent;

  /**
   * Constructor del componente. Utilizado para inyectar servicios necesarios.
   *
   * @param fb FormBuilder para construir formularios reactivos.
   * @param avisoSanitarioService Servicio para gestionar datos del aviso sanitario.
   * @param tramite260601Store Store para manejar el estado del trámite.
   * @param tramite260601Query Query para observar cambios en el estado del trámite.
   * @param consultaioQuery Query para observar cambios en el estado de la consulta.
   */
  constructor(
    public fb: FormBuilder,
    public avisoSanitarioService: AvisoSanitarioService,
    public tramite260601Store: Tramite260601Store,
    public tramite260601Query: Tramite260601Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destruirNotificador$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
      
  }

  /**
   * Método de inicialización que configura formularios, catálogos y suscripciones.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();

    this.nuevaNotificacion = {} as Notificacion;
    this.tramite260601Query.selectSeccionState$
    .pipe(
      takeUntil(this.destruirNotificador$),
      map((seccionState) => {
        this.productoBodyData = seccionState.productoBodyData;
        this.scianBodyData = seccionState.scianBodyData;
        this.avisoSanitarioState = seccionState;
      })
    )
      
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.inicializaCatalogos();

    this.obtenerManifiestos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
          this.productoBodyData = seccionState.productoBodyData;
          this.scianBodyData = seccionState.scianBodyData;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();

    this.estadoSeleccion();
    this.claveScianSeleccion();
    this.regimenesSeleccion();
    this.aduanaSeleccion();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.datosDelEstablecimientoForm.disable();
      this.domicilloDelEstablecimientoForm.disable();
      this.scianForm.disable();
      this.manifiestosForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosDelEstablecimientoForm.enable();
      this.domicilloDelEstablecimientoForm.enable();
      this.scianForm.enable();
      this.manifiestosForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Crea y configura los formularios principales y sus validaciones.
   */
  crearFormulario(): void {
    this.datosDelEstablecimientoForm = this.fb.group({
      RFCResponsableSanitario: [
        {
          value: this.avisoSanitarioState?.RFCResponsableSanitario,
          disabled: true,
        },
      ],
      razonSocial: [
        { value: this.avisoSanitarioState?.razonSocial, disabled: true },
        Validators.required,
      ],
      correoElectronico: [
        { value: this.avisoSanitarioState?.correoElectronico, disabled: true },
        [Validators.maxLength(320), Validators.pattern(REGEX_REEMPLAZAR)],
      ],
    });
    this.domicilloDelEstablecimientoForm = this.fb.group({
      codigoPostal: [
        { value: this.avisoSanitarioState?.codigoPostal, disabled: true },
        [Validators.required, Validators.maxLength(12)],
      ],
      cveEstado: [
        { value: this.avisoSanitarioState?.cveEstado, disabled: true },
      ],
      descripcionMunicipio: [
        {
          value: this.avisoSanitarioState?.descripcionMunicipio,
          disabled: true,
        },
        [Validators.required, Validators.maxLength(120)],
      ],
      informacionExtra: [
        { value: this.avisoSanitarioState?.informacionExtra, disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],
      descripcionColonia: [
        { value: this.avisoSanitarioState?.descripcionColonia, disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],
      calle: [
        { value: this.avisoSanitarioState?.calle, disabled: true },
        [Validators.required, Validators.maxLength(90)],
      ],
      lada: [{ value: this.avisoSanitarioState?.lada, disabled: true }],
      telefono: [
        { value: this.avisoSanitarioState?.telefono, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      avisoFuncionamiento: [this.avisoSanitarioState?.avisoFuncionamiento],
      cveRegimenes: [
        this.avisoSanitarioState?.cveRegimenes,
        [Validators.required],
      ],
      cveAduanas: [this.avisoSanitarioState?.cveAduanas, [Validators.required]],
    });
    this.scianForm = this.fb.group({
      cveSCIAN: [this.avisoSanitarioState?.cveSCIAN, [Validators.required]],
      cveSCIANDescripcion: [
        {
          value: this.avisoSanitarioState?.cveSCIANID,
          disabled: true,
        },
      ],
    });
    this.manifiestosForm = this.fb.group({
      seleccionadaManifiesto: this.fb.array(
        this.avisoSanitarioState?.seleccionadaManifiesto
      ),
      informacionConfidencial: [
        this.avisoSanitarioState?.informacionConfidencial,
        Validators.required,
      ],
    });
  }

  /**
   * Obtiene el FormArray correspondiente a 'seleccionadaManifiesto' dentro del formulario de registro de donación.
   *
   * @returns {FormArray} El FormArray de 'seleccionadaManifiesto'.
   */
  get seleccionadaManifiesto(): FormArray {
    return this.manifiestosForm.get('seleccionadaManifiesto') as FormArray;
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const ESTADO$: Observable<void> = this.avisoSanitarioService
      .getEstado(CATALOGOS_ID.CAT_ESTADO)
      .pipe(
        map((resp) => {
          this.estado = resp?.data;
        })
      );

    const CLAVE_SCIAN$: Observable<void> = this.avisoSanitarioService
      .getClaveScian(CATALOGOS_ID.CAT_CLAVE_SCIAN)
      .pipe(
        map((resp) => {
          this.claveScian = resp.data;
        })
      );

    const DESCRIPCION_SCIAN$: Observable<void> = this.avisoSanitarioService
      .getDescripcionScian()
      .pipe(
        map((resp) => {
          this.descripcionScian = resp.data;
        })
      );

    const REGIMENES$: Observable<void> = this.avisoSanitarioService
      .getRegimenes(CATALOGOS_ID.CAT_REGIMENES)
      .pipe(
        map((resp) => {
          this.regimenes = resp.data;
        })
      );

    const ADUANAS$: Observable<void> = this.avisoSanitarioService
      .getAduanas(CATALOGOS_ID.CAT_ADUANAS)
      .pipe(
        map((resp) => {
          this.aduanas = resp.data;
        })
      );

    merge(ESTADO$, CLAVE_SCIAN$, DESCRIPCION_SCIAN$, REGIMENES$, ADUANAS$)
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Maneja la selección del estado y lo actualiza en el store.
   */
  estadoSeleccion(): void {
    const ESTADO = this.domicilloDelEstablecimientoForm.get('cveEstado')?.value;
    this.tramite260601Store.setEstado(ESTADO);
  }

  /**
   * Maneja la selección de la clave SCIAN y obtiene su descripción.
   */
  claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.avisoSanitarioService
      .getDescripcionScian()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const SCIAN_DESCRIPCION = result.data[0].descripcion;
          this.scianForm
            .get('cveSCIANDescripcion')
            ?.setValue(result.data[0].id);
          this.tramite260601Store.cveSCIANID(result.data[0].id);
          this.tramite260601Store.setDescripcionScian(SCIAN_DESCRIPCION);
        },
      });
    this.tramite260601Store.setClaveScian(CLAVE_SCIAN);
  }

  /**
   * Maneja la selección de la descripción SCIAN.
   */
  descripcionScianSeleccion(): void {
    const DESCRIPCION_SCIAN = this.scianForm.get('cveSCIANDescripcion')?.value;
    this.tramite260601Store.setDescripcionScian(DESCRIPCION_SCIAN);
  }

  /**
   * Maneja la selección del régimen fiscal y lo actualiza en el store.
   */
  regimenesSeleccion(): void {
    const REGIMENES =
      this.domicilloDelEstablecimientoForm.get('cveRegimenes')?.value;
    this.tramite260601Store.setCveRegimenes(REGIMENES);
  }

  /**
   * Maneja la selección de la aduana y lo actualiza en el store.
   */
  aduanaSeleccion(): void {
    const ADUANAS =
      this.domicilloDelEstablecimientoForm.get('cveAduanas')?.value;
    this.tramite260601Store.setCveAduanas(ADUANAS);
  }

  /**
   * Obtiene los datos para la tabla SCIAN.
   */
   obtenerSCIAN(): void {
     this.avisoSanitarioService.obtenerScianTabla()
   .pipe(takeUntil(this.destruirNotificador$))
   .subscribe((result: ScianTable[]) => {
    this.tramite260601Store.setScianTabla(result);
    this.scianBodyData = result;
   });


  }

  seleccionarDomicilios(scian:ScianTable[]): void {
    this.scianSeleccionados = scian;
  }

  /**
   * Obtiene los datos para la tabla de productos.
   */
   obtenerProducto(): void {
    this.avisoSanitarioService.obtenerProducto()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((result: ProductoTable[]) => {
        this.tramite260601Store.setProductoTabla(result);
        this.productoBodyData = result;
      });
    
  }

  /**
   * Muestra el modal para la selección del establecimiento.
   */
  seleccionarEstablecimiento(): void {
    this.modalAlerta = true;
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: '',
      mensaje: ALERTA_TEXTO,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Habilita todos los campos en los formularios del establecimiento y domicilio.
   */
  aceptar(): void {
    this.datosDelEstablecimientoForm.enable();

    // Habilitar todos los campos en el formulario Domicilio del Establecimiento
    this.domicilloDelEstablecimientoForm.enable();
    this.habilitarEstado = false;
  }

  /**
   * Obtiene los manifiestos y los guarda en `manifiestos`.
   * Inicializa `manifiestosSeleccionados` con valores `false`.
   */
  obtenerManifiestos(): void {
    this.avisoSanitarioService
      .getManifiestos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result: ManifiestosRespuesta) => {
          this.manifiestos = result?.data; 
        },
      });
  }

  /**
   * Cambia el estado de la casilla de verificación según el índice.
   *
   * @param event - El evento que se dispara al cambiar el estado del checkbox.
   * @param {number} index - Índice de la casilla de verificación.
   *
   * @returns {void}
   */
  onManifiestoCheckboxCambiar(event: Event, index: number): void {
    const VALOR_ENTRADA = event.target as HTMLInputElement;
    this.seleccionadaManifiesto.controls[index].setValue(VALOR_ENTRADA.checked);
    this.setValoresStore(
      this.manifiestosForm,
      'seleccionadaManifiesto',
      'setSeleccionadaManifiesto'
    );
  }

  /**
   * Método para abrir dialogo mercancías.
   *
   * @returns {void}
   */
  agregarMercanciaGrid2606(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
    this.showModalAgregarMercancia = true;
    if (this.modalInstance) {
        this.modalInstance.show();
      }
  }

  /**
   * Cierra el modal.
   *
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Establece los valores en el store de tramite260601.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260601Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Elimina los productos seleccionados de la tabla de productos.
   * Si no hay productos seleccionados, no realiza ninguna acción.
   * Actualiza el cuerpo de datos de la tabla y el store con los datos restantes.
   * @param {ProductoTable[]} productoSeleccionados - Lista de productos seleccionados para eliminar.
   * @return {void}
   * @memberof DatosDelEstablecimientoComponent
   * @description
   * Este método filtra los productos seleccionados y actualiza el estado del store
   * con los productos restantes. Si no hay productos seleccionados, no realiza ninguna acción.
   * */
  eliminarScianGrid(): void {
    if (!this.scianSeleccionados?.length) {
      return;
    }
  
    const CLAVES_A_ELIMINAR = this.scianSeleccionados.map(
      (SCIAN) => SCIAN.claveScian
    );
  
    const DATOS_ACTUALIZADOS = this.scianBodyData.filter(
      (SCIAN) => !CLAVES_A_ELIMINAR.includes(SCIAN.claveScian)
    );
  
    this.scianBodyData = DATOS_ACTUALIZADOS;
    this.scianSeleccionados = [];
  
    this.tramite260601Store?.setScianTabla?.(DATOS_ACTUALIZADOS);
  }

    /**
   * @method agregarSCIAN
   * @description
   * Agrega un nuevo registro SCIAN a la tabla y actualiza el store.
   * Toma los valores de los campos cveSCIAN y cveSCIANDescripcion del formulario
   * y los agrega al arreglo de datos de la tabla SCIAN.
   * @returns {void}
   */
  agregarSCIAN(): void {
    // Tomar los valores del formulario y agregarlos a scianBodyData
    const CLAVEACIAN = this.scianForm.get('cveSCIAN')?.value;
    const DESCRIPCION_SC = this.avisoSanitarioState?.cveSCIANDescripcion;
    this.scianBodyData = [
      ...this.scianBodyData,
      { claveScian: CLAVEACIAN, descripcionScian: DESCRIPCION_SC }
    ];
    this.tramite260601Store.setScianTabla(this.scianBodyData);
  }

  /**
   * @method limpiarSCIAN
   * @description
   * Limpia todos los campos del formulario SCIAN, reiniciándolos a su estado inicial.
   * @returns {void}
   */
  limpiarSCIAN(): void {
    this.scianForm.reset();
  }

  /**
   * @method limpiarMercancia
   * @description
   * Limpia la clasificación del producto en el store y activa la bandera de limpieza
   * para que el componente de datos de mercancía reinicie sus campos.
   * @returns {void}
   */
  limpiarMercancia(): void {
    this.tramite260601Store.setProductoClasificacion('');
    this.limpiar = true    
  }

  /**
   * @method ngAfterViewInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que Angular inicializa las vistas del componente.
   * Inicializa la instancia del modal Bootstrap si existe la referencia al elemento DOM.
   * @returns {void}
   */
  ngAfterViewInit(): void {
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
    if (this.modalAddSCIAN) {
      this.modalAddSCIANInstance = new Modal(this.modalAddSCIAN.nativeElement);
    }
  }

  /**
   * @method cerrarModificarModal
   * @description
   * Cierra el modal de modificación si existe una instancia del modal Bootstrap.
   * @returns {void}
   */
  cerrarModificarModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * @method abrirModificarModal
   * @description
   * Abre el modal de modificación y carga los datos del producto seleccionado.
   * Crea un nuevo objeto ProductoTable con los datos recibidos y actualiza la tabla y el store.
   * @param {ProductoInput} data - Datos del producto a modificar.
   * @returns {void}
   */
  abrirModificarModal(data: ProductoInput): void {
    const NEW_ARRAY: ProductoTable = {
      clasificacionDelProducto: data.cveEspecificoProductoClasifi ?? '',
      tipoDeProducto: data.cveTipoProducto ?? '',
      fraccionArancelaria: data.fraccionArancelaria ?? '',
      descripcionDeLaFraccion: data.fraccionArancelariaDescripcion ?? '',
      modelo: data.modelo ?? '',
      descripcionDelProducto: data.productoDescripcion ?? '',
      paisDeOrigen: data.paisDeOrigen ?? ''
    };
    this.productoBodyData = [NEW_ARRAY] as ProductoTable[];
    this.tramite260601Store.setProductoTabla(this.productoBodyData);
  }

  /**
   * @method abrirModalAgregarSCIAN
   * @description
   * Abre el modal para agregar un nuevo registro SCIAN.
   * Utiliza la instancia del modal Bootstrap para mostrarlo en la interfaz.
   * @returns {void}
   */
  abrirModalAgregarSCIAN(): void {
    if (this.modalAddSCIANInstance) {
      this.modalAddSCIANInstance.show();
    }
  }

  /**
   * @method cancelarAgregarSCIAN
   * @description
   * Cierra el modal para agregar un nuevo registro SCIAN sin guardar cambios.
   * Utiliza la instancia del modal Bootstrap para ocultarlo de la interfaz.
   * @returns {void}
   */
  cancelarAgregarSCIAN(): void {
    if (this.modalAddSCIANInstance) {
      this.modalAddSCIANInstance.hide();
    }
  }

  /**
   * @method validarFormularios
   * @description
   * Valida todos los formularios relacionados con los datos del establecimiento.
   * Si todos los formularios son válidos, retorna true.
   * Si alguno es inválido, marca todos los campos como tocados para mostrar los errores y retorna false.
   * 
   * @returns {boolean} true si todos los formularios son válidos, false en caso contrario.
   */
  validarFormularios(): boolean {
    if (this.datosDelEstablecimientoForm.valid &&
      this.domicilloDelEstablecimientoForm.valid &&
      this.scianForm.valid &&
      this.manifiestosForm.valid
    ) {
      return true;
    }
    this.datosDelEstablecimientoForm.markAllAsTouched();
    this.domicilloDelEstablecimientoForm.markAllAsTouched();
    this.scianForm.markAllAsTouched();
    this.manifiestosForm.markAllAsTouched();
    if(this.representanteLegal){
      if(!this.representanteLegal.validarFormulario()){
        return false
      }
      return false
    }
    return false
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
