import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, InputFecha, InputFechaComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { CargaPorArchivoComponent } from '../carga-por-archivo/carga-por-archivo.component';
import { CatalogoSelectComponent} from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { IDPROCEDIMIENTO } from '../../constantes/modificacion.enum';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { Mercancias } from '../../models/plantas-consulta.model';
import { MercanciasModalComponent } from '../mercancias-modal/mercancias-modal.component';
import { Modal } from 'bootstrap';                     
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';


/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
*/
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

/**
 * Componente para gestionar los certificados de origen.
 * Se encarga de manejar los formularios, la carga de catálogos, la validación y la interacción con el store.
 */
@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    MercanciasModalComponent,
    CertificadoDeOrigenComponent,
    CargaPorArchivoComponent
],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy,AfterViewInit {

  /**
   * @descripcion
   * Indica si el operador está activo.
   */
  operador: boolean = true;

  /**
   * @input
   * @description
   * Indica si el formulario debe estar deshabilitado. Cuando es `true`, los controles del formulario estarán inactivos y no permitirán la edición por parte del usuario.
   * @type {boolean}
   */
   @Input() formularioDeshabilitado: boolean = false;

  /**
   * Formulario reactivo utilizado para la gestión de los datos del certificado.
   * @type {FormGroup}
   */
  formCertificado!: { [key: string]: undefined | boolean | string | number | object };

  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  /**
   * Configuración de la fecha final en el formulario de certificado de origen.
   * @type {InputFecha}
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL;
  /**
   * Observable que emite la lista de estados disponibles.
   * @type {Observable<Catalogo[]>}
   */
  estados$!: Observable<Catalogo[]>;

  /**
   * Observable que emite la lista de países y bloques disponibles.
   * @type {Observable<Catalogo[]>}
   */
  pais$!: Observable<Catalogo[]>;

  /**
   * Estado seleccionado del catálogo.
   * @type {Catalogo}
   */
  estado!: Catalogo;

  /**
   * País o bloque seleccionado.
   * @type {Catalogo}
   */
  paisBloque!: Catalogo;

  /**
   * Subject para gestionar el ciclo de vida del componente.
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();
  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {MercanciaShared[]}
   */
  datos: Mercancia[] = [];

  /**
   * Observable que emite los datos de la mercancia obtenida.
   * @type {Observable<Mercancia[]>}
   */
  datos1: Observable<Mercancia[]>;

  /**
   * Estado de la selección de la tabla.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Estado de la sección, gestionado mediante el store.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;


    /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */

    datosSeleccionados!: Mercancias;
    /**
   * Instancia del modal de modificación.
   */
    modalInstance!: Modal;

    buscarModel!: Modal

    /**
     * @descripcion
     * Indica si el campo de mercancías está activo.
     */
    cargoDeMercancias: boolean = true;

    /**
     * @descripcion
     * Indica si hay mercancías disponibles.
     */
    mercanciasDisponibles: boolean = true;

    /**
     * @descripcion
     * Indica si hay mercancías disponibles en la tabla.
     */
    mercanciasDisponiblesTabla: boolean = true;

    /**
   * Referencia al modal de modificación en la plantilla HTML.
   */
      @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

      @ViewChild('buscarMercanciaModal', { static: false }) buscarMercanciaModal!: ElementRef;

  /**
   * Constructor del componente.
   * Inicializa el formulario y las dependencias necesarias para la carga de datos.
   * @param fb FormBuilder para la creación del formulario reactivo.
   * @param store Store para gestionar los datos de estado.
   * @param tramiteQuery Consulta de estado para obtener los valores del formulario.
   * @param certificadoService Servicio para la gestión de los certificados.
   * @param toastr Servicio de notificaciones para mostrar mensajes.
   * @param seccionQuery Consulta para obtener el estado de la sección.
   * @param seccionStore Store para actualizar el estado de la sección.
   */
  private actualizandoFormulario = false;

  /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   * Cuando es verdadero, los controles del formulario estarán deshabilitados.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado de selección de la tabla.
   * @type {boolean}
   */
  tablaSeleccionEvent: boolean = false;

  /**
   * Observable que emite los datos de la mercancia en formato tabla.
   * @type {Observable<Mercancia[]>}
   */
  datosTabla$: Observable<Mercancia[]> = of([]);

  /**
   * @property {number} idProcedimiento
   * @description
   * Identificador numérico del procedimiento actual para el trámite 110204.
   * Se utiliza para configurar y asociar el proceso en los componentes y servicios relacionados.
   */
  idProcedimiento: number = IDPROCEDIMIENTO

  /**
   * Constructor del componente CertificadoOrigenComponent.
   * Inicializa las dependencias necesarias para la gestión de certificados de origen.
   * 
   * @param fb FormBuilder para la creación y gestión de formularios reactivos.
   * @param store Store para manejar el estado del trámite 110204.
   * @param tramiteQuery Query para consultar el estado del trámite 110204.
   * @param certificadoService Servicio para la gestión de certificados de origen.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   * @param seccionQuery Query para consultar el estado de la sección.
   * @param seccionStore Store para manejar el estado de la sección.
   * @param consultaQuery Query para consultar el estado de consulta.
   */
  constructor(
    private fb: FormBuilder,
    private store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    public consultaQuery: ConsultaioQuery
  ) {

    /**
     * Suscripción para cargar los valores del formulario desde el store.
     */
    this.tramiteQuery.formCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (!this.actualizandoFormulario && estado) {
        this.actualizandoFormulario = true;        
        this.formCertificado=estado;
        this.actualizandoFormulario = false;
      }
    });
  

    /**
     * Suscripción al estado de la sección para obtener y actualizar el estado.
     */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    /**
     * Asignación de los observables que contienen los catálogos de estados y países.
     */
    this.estados$ = this.tramiteQuery.selectAltaPlanta$;
    this.pais$ = this.tramiteQuery.selectPaisBloque$;
    this.datos1 = (this.tramiteQuery.selectBuscarMercancia$ as Observable<Mercancias[]>).pipe(
      map((mercancias: Mercancias[]) => mercancias as unknown as Mercancia[])
    );
    
  }

  /**
   * Método del ciclo de vida ngOnInit. Se utiliza para cargar los datos iniciales
   * y suscribirse a los cambios en el formulario.
   */
  ngOnInit(): void {
    this.cargarEstados();
    this.cargarBloque();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {          
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    this.datosTabla$ = this.tramiteQuery.selectmercanciaTabla$;
  }

  /**
   * Carga la lista de estados desde el servicio y actualiza el store con los datos.
   */
  cargarEstados(): void {
    this.certificadoService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setaltaPlanta(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Carga la lista de países y bloques desde el servicio y actualiza el store con los datos.
   */
  cargarBloque(): void {
    this.certificadoService
      .obtenerPaisBloque()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setBloque(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Establece el estado seleccionado en el store.
   * @param {Catalogo} estado El estado seleccionado.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  /**
   * Establece el bloque seleccionado en el store.
   * @param {Catalogo} estado El bloque seleccionado.
   */
  tipoSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }

  /**
   * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Busca la mercancia y actualiza los datos en el store.
   */
  buscarrMercancia(): void {

      this.certificadoService
        .obtenerMercancia()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Mercancias[]) => {
            this.store.setbuscarMercancia(data);
          },
          () => {
            this.toastr.error('Error al buscar Mercancia');
          }
        );
  }

  abrirModalCargaPorArchivo(): void {
    if(this.buscarModel) {
      this.buscarModel.show();
    }
  }
    /**
   * Método para abrir el modal de modificación.
   */
    abrirModificarModal(datos1: Mercancia): void {
      this.datosSeleccionados = datos1 as unknown as Mercancias;
      this.store.setFormMercancia({ ...datos1 });
        
      if (this.modalInstance) {
        this.modalInstance.show();
      }      
    }
    

    guardarClicado(event: Mercancia[]): void {
    this.datosTabla$ = of(event);
  }

    /**
     * Cierra el modal de modificación si está abierto.
     * 
     * @remarks
     * Este método verifica si hay una instancia de modal activa y, 
     * en caso afirmativo, la oculta.
     */
    cerrarModificarModal():void {
      if (this.modalInstance) {
        this.tablaSeleccionEvent = true;
        this.modalInstance.hide();
      }
    }

    /**
   * Establece el estado de validez del formulario en el store.
   * @param valida Indica si el formulario es válido o no.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ certificado: valida });
  }

  /**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de certificado.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormCertificado({ [CAMPO]: VALOR });
}

    /**
     * @inheritdoc
     * @method
     * @description
     * Este método se ejecuta después de que la vista del componente ha sido inicializada.
     * Inicializa el modal de modificación si está disponible.
     */
    ngAfterViewInit():void {
      // Inicializa el modal de modificación
      if (this.modifyModal) {
        this.modalInstance = new Modal(this.modifyModal.nativeElement);
      }
      if(this.buscarMercanciaModal) {
        this.buscarModel = new Modal(this.buscarMercanciaModal.nativeElement);
      }
    }  
    
}
