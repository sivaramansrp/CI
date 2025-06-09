import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, InputFecha, InputFechaComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CONFIGURACION_MERCANCIA } from '../../constantes/modificacion.enum';
import { CatalogoSelectComponent} from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { Mercancia } from '../../models/plantas-consulta.model';
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
    MercanciasModalComponent
],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy,AfterViewInit {

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
  formCertificado!: FormGroup;

  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;
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
  datos1$: Observable<Mercancia[]>;

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

    datosSeleccionados!: Mercancia;
    /**
   * Instancia del modal de modificación.
   */
    modalInstance!: Modal;

    /**
   * Referencia al modal de modificación en la plantilla HTML.
   */
      @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

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

  constructor(
    private fb: FormBuilder,
    private store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    /**
     * Inicializa el formulario con los campos requeridos y sus validaciones.
     */
    this.formCertificado = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
      bloque: ['', [Validators.required, Validators.min(0)]],
      tercerOperador: ['', [Validators.requiredTrue]],
      fracciónArancelariaForm: [''],
      registroProductoForm: [''],
      nombreComercialForm: [''],
      fechaFinal: ['',[Validators.required]],
      fechaInicio: ['',[Validators.required]],
    });

    /**
     * Suscripción para cargar los valores del formulario desde el store.
     */
    this.tramiteQuery.formCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (!this.actualizandoFormulario && estado) {
        this.actualizandoFormulario = true;        
        this.formCertificado.patchValue(estado);
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
    this.datos1$ = this.tramiteQuery.selectBuscarMercancia$;
  }


  /**
   * Verifica si el formulario es válido.
   * @returns {boolean} Retorna true si el formulario es válido, de lo contrario false.
   */
  esFormValido(): boolean {
    // Recorre todos los controles del formulario para verificar si alguno es inválido.
    for (const NOMBRE_DEL_CONTROL in this.formCertificado.controls) {
      if (Object.prototype.hasOwnProperty.call(this.formCertificado.controls,
        NOMBRE_DEL_CONTROL)) {
        const CONTROL = this.formCertificado.get(NOMBRE_DEL_CONTROL);
        if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Método del ciclo de vida ngOnInit. Se utiliza para cargar los datos iniciales
   * y suscribirse a los cambios en el formulario.
   */
  ngOnInit(): void {
    this.cargarEstados();
    this.cargarBloque();
    this.formCertificado.valueChanges.subscribe(value => {      
      if (!this.actualizandoFormulario) {
      this.store.setFormCertificado(value);
      this.validarFormulario();
      }
    });
    if(this.formularioDeshabilitado){
      this.esFormularioSoloLectura = true;
      this.inicializarEstadoFormulario();
    }

  }

  /**
   * Inicializa el estado del formulario según si está en modo solo lectura o editable.
   * Si el formulario está en modo solo lectura, deshabilita todos los controles.
   * Si no, habilita los controles para permitir la edición.
   *
   * @method
   * @memberof CertificadoOrigenComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formCertificado.disable();
    }
    else {
      this.formCertificado.enable();
    } 
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
   * Valida el formulario y actualiza el estado de la sección en el store.
   */
  validarFormulario(): void {
    this.formCertificado.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 1;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_FORM = this.esFormValido();

          if (this.formCertificado.valid || (ES_VALIDO_EL_FORM)) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
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
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formCertificado.get('') as FormControl;
  }

  /**
   * Busca la mercancia y actualiza los datos en el store.
   */
  buscarrMercancia(): void {
    const ENTIDAD = this.formCertificado?.value;

    if (ENTIDAD && ENTIDAD !== '-1') {
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
    } else {
      // Muestra un error si no se ha seleccionado una entidad federativa válida.
      this.toastr.error('Seleccione una entidad federativa válida.');
    }
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
  }

  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
  }

    /**
   * Método para abrir el modal de modificación.
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
     * 
     * @remarks
     * Este método verifica si hay una instancia de modal activa y, 
     * en caso afirmativo, la oculta.
     */
    cerrarModificarModal():void {
      if (this.modalInstance) {
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
    ngAfterViewInit():void {
      // Inicializa el modal de modificación
      if (this.modifyModal) {
        this.modalInstance = new Modal(this.modifyModal.nativeElement);
      }
    }  
    
}
