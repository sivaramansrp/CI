import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil} from 'rxjs';
import { CONFIGURACION_MERCANCIA } from '../../constantes/modificacion.enum';
import { CertificadoDeOrigenComponent } from "../../../../shared/components/certificado-de-origen/certificado-de-origen.component";
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Mercancia } from '../../models/configuracion-columna.model';
import { MercanciasModalComponent } from '../mercancias-modal/mercancias-modal.component';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CertificadoDeOrigenComponent,
    MercanciasModalComponent
  ],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss'
})

export class CertificadoOrigenComponent implements AfterViewInit, OnDestroy, OnInit {

  /**
   * Formulario reactivo utilizado para la gestión de los datos del certificado.
   * @type {FormGroup}
   */
  formCertificado!: FormGroup;

  /**
   * Observable que emite la lista de estados disponibles.
   * @type {Observable<Catalogo[]>}
   */
  estados$!: Observable<Catalogo[]>;

  /**
   * Valores del formulario del certificado.
   * @type {Object}
   */
  formCertificadoValues!: { [key: string]: unknown };

  /**
   * Estado de selección de la tabla.
   * @type {boolean}
   */
  tablaSeleccionEvent: boolean = false;

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
   * Configuración de las columnas de la tabla de bitácora.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] = CONFIGURACION_MERCANCIA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */
  datos: Mercancia[] = [];

  /**
   * Observable que emite los datos de la mercancia obtenida.
   * @type {Observable<Mercancia[]>}
   */
  datos1$: Observable<Mercancia[]> | undefined;

  /**
   * Observable que emite los datos de la mercancia en formato tabla.
   * @type {Observable<Mercancia[]>}
   */
  datosTabla$: Observable<Mercancia[]> | undefined;

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
   * Datos seleccionados de la bitácora.
   * @type {Mercancia}
   */
  datosSeleccionados!: Mercancia;

  /**
   * Instancia del modal de modificación.
   * @type {Modal}
   */
  modalInstance!: Modal;

  /**
   * Referencia al modal de modificación en la plantilla HTML.
   * @type {ElementRef}
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;
    /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;

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
   * @param consultaQuery Consulta para obtener el estado de la consulta.
   */
  constructor(
    private fb: FormBuilder,
    public store: Tramite110202Store,
    public tramiteQuery: Tramite110202Query,
    public certificadoService: CertificadoValidacionService,
    private toastr: ToastrService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    public consultaQuery: ConsultaioQuery
  ) {
    // Suscripción para cargar los valores del formulario desde el store
    this.tramiteQuery.formCertificado$.pipe(
      takeUntil(this.destroyNotifier$),
      delay(100)
    ).subscribe(estado => {
      this.formCertificadoValues = estado;
    });

    // Suscripción al estado de la sección para obtener y actualizar el estado
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    // Asignación de los observables que contienen los catálogos de estados y países
    this.estados$ = this.tramiteQuery.selectAltaPlanta$;
    this.pais$ = this.tramiteQuery.selectPaisBloque$;
    this.datos1$ = this.tramiteQuery.selectBuscarMercancia$;
    this.datosTabla$ = this.tramiteQuery.selectmercanciaTabla$;
  }

  /**
   * @method obtenerDatosFormulario
   * @description Este método recibe un evento y establece los datos del formulario de certificado en el store.
   * @param {unknown} e - El evento que contiene los datos del formulario.
   * @returns {void}
   */
  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }


  /**
   * Método del ciclo de vida ngOnInit. Se utiliza para cargar los datos iniciales
   * y suscribirse a los cambios en el formulario.
   */
  ngOnInit(): void {
    this.cargarTratadoAcuerdo();
    this.cargarBloque();
     this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {          
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Carga la lista de TratadoAcuerdo desde el servicio y actualiza el store con los datos.
   */
  cargarTratadoAcuerdo(): void {
    this.certificadoService
      .obtenerListaTratadoAcuerdo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setaltaPlanta(data);
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
    this.store.setBloqueSeleccion(estado);
  }

  /**
   * Establece valores en el estado de la tienda para un formulario genérico de certificado.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el estado.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en esta implementación).
   * @param event.campo - Nombre del campo que se actualizará en el estado.
   * @param event.valor - Valor que se asignará al campo especificado.
   * @param event.storeStateName - Nombre del estado de la tienda (no utilizado en esta implementación).
   * 
   * @returns void
   * 
   * @command Este método actualiza el estado de la tienda con los valores proporcionados.
   */
  setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormCertificadoGenric({ [CAMPO]: VALOR });
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
        (data: Mercancia[]) => {
          this.store.setbuscarMercancia(data);
        },
        () => {
          this.toastr.error('Error al buscar Mercancia');
        }
      );
  }

  /**
   * Método para abrir el modal de modificación.
   * @param {Mercancia} datos1 Los datos de la mercancia seleccionada.
   */
  abrirModificarModal(datos1: Mercancia): void {
    this.datosSeleccionados = datos1;
    this.store.setFormMercancia({ ...datos1 });
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Cierra el modal de modificación si está abierto.
   */
  cerrarModificarModal(): void {
    if (this.modalInstance) {
      this.tablaSeleccionEvent = true;
      this.modalInstance.hide();
    }
  }

  /**
   * @inheritdoc
   * @method
   * @description
   * Este método se ejecuta después de que la vista del componente ha sido inicializada.
   * Inicializa el modal de modificación si está disponible.
   */
  ngAfterViewInit(): void {
    // Inicializa el modal de modificación
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
  }

  /**
   * Establece el estado de validez del formulario en el store.
   * @param valida Indica si el formulario es válido o no.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ certificado: valida });
  }
}
