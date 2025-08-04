import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil} from 'rxjs';

import { CAPTURA_MERCANCIAS, CATALOGOS_DATOS, CONFIGURACION_MERCANCIA, CONFIGURATION_TABLA_MERCANCIAS, FECHA_FINALS, MERCANCIAS_DATOS } from '../../constantes/modificacion.enum';
import { ConfiguracionColumna, Mercancias } from '../../models/configuracion-columna.model';

import { CertificadoDeOrigenComponent } from "../../../../shared/components/certificado-de-origen/certificado-de-origen.component";
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { CommonModule } from '@angular/common';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Mercancia } from '../../models/configuracion-columna.model';
import { MercanciasModalComponent } from '../mercancias-modal/mercancias-modal.component';
import { Modal } from 'bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';

import { Mercancias110202State, Mercancias110202Store } from '../../estados/mercancias.store';
import { Mercancias110202Query } from '../../estados/mercancias.query';

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CertificadoDeOrigenComponent,FormsModule,
    MercanciasModalComponent,TituloComponent,AlertComponent,TablaDinamicaComponent,CatalogoSelectComponent,InputFechaComponent
  ],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss'
})

export class CertificadoOrigenComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
 * Configuración del campo de fecha final en el formulario.
 * Define etiqueta, validación y habilitación del input de fecha.
 * Se utiliza para parametrizar el componente <input-fecha>.
 */
   public fechaFinalInput: InputFecha = FECHA_FINALS;
   /**
   * Configuración de las columnas de la tabla de exportadores.
   * Define el encabezado, clave y el orden de las columnas para la tabla de exportadores.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
    /**
   * Lista de exportadores obtenida desde un archivo JSON.
   * Cada exportador contiene información como nombre, teléfono, correo electrónico y domicilio.
   */
  exportador: Mercancias[] =MERCANCIAS_DATOS;
   /**
   * Configuración de las columnas para la tabla de datos del exportador.
   * Se basa en el arreglo `CONFIGURATION_TABLA_DATOS`, que define los encabezados,
   * las claves de acceso a los datos del objeto `Exportador`, y el orden en que se deben mostrar.
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] =CONFIGURACION_MERCANCIA;
  /**
   * Constante que almacena el valor de la mercancía capturada.
   */
  MERCANCIA: string = CAPTURA_MERCANCIAS;

    mercanciaDatosForm!: FormGroup;
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
 * Referencia al elemento del modal en el DOM.
 * Se utiliza para abrir o cerrar el modal programáticamente.
 * Asocia el template variable #modalAgregarRef con esta propiedad.
 */
  @ViewChild('modalAgregarRef', { static: false }) modalAgregarRef!: ElementRef;

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
 * Catálogo de unidades de medida para masa bruta.
 * Se utiliza para poblar el selector correspondiente en el formulario.
 * Los datos provienen del archivo CATALOGOS_DATOS.
 */
masaBrutas: Catalogo[] = CATALOGOS_DATOS;

/**
 * Catálogo de tipos de factura disponibles.
 * Usado en el formulario para seleccionar el tipo de factura.
 * Cargado desde la constante CATALOGOS_DATOS.
 */
facturas: Catalogo[] = CATALOGOS_DATOS;

/**
 * Catálogo de unidades de medida comercial.
 * Proporciona opciones en el formulario para el campo umc.
 * Datos obtenidos de CATALOGOS_DATOS.
 */
umc: Catalogo[] = CATALOGOS_DATOS;


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
  configuracionTablas: ConfiguracionColumna<Mercancias>[] = CONFIGURATION_TABLA_MERCANCIAS;

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
   * Instancia del modal de modificación.
   * @type {Modal}
   */
  modalInstances!: Modal;
  /**
   * Propiedad que almacena un arreglo de objetos de tipo `Mercancia` seleccionados para ser guardados.
   * @type {Mercancia[]}
   */
  public seleccionadaguardarClicado: Mercancias[] = [];

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
   * Estado de la solicitud.
   */
  public solicitudState!: Mercancias110202State;
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
    public consultaQuery: ConsultaioQuery,
    private mercancias110202Store: Mercancias110202Store,
    private mercancias110202Query: Mercancias110202Query,
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
 * Método que asigna un objeto de tipo `Mercancia` al arreglo de mercancías seleccionadas para guardar.
 * @param {Mercancia} evento - Objeto de tipo `Mercancia` que ha sido seleccionado.
 */
  obtenerSeleccionadoMercancia(evento: Mercancias): void {
    this.seleccionadaguardarClicado = [evento];
  }
  /**
  * Método que elimina los objetos seleccionados del arreglo de mercancías guardadas.
  * @remarks
  * Este método verifica si hay elementos seleccionados antes de vaciar el arreglo `guardarClicado`.
  */
  eliminarSeleccionados(): void {
    if (this.seleccionadaguardarClicado.length > 0) {
      this.exportador = [];
    }
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
    this.inicializarForms();
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
   * Método para abrir el modal de modificación.
   * @param {Mercancia} datos1 Los datos de la mercancia seleccionada.
   */
  abrirModal(): void {
     if (!this.modalAgregarRef) {
    console.error('Modal reference not yet available');
    return;
  }
 
this.modalInstances = new Modal(this.modalAgregarRef.nativeElement);
this.modalInstances.show();
    }
    /**
 * Inicializa el formulario reactivo con datos del estado de la solicitud.
 * Suscribe al observable del store para obtener los valores iniciales.
 * Configura los controles del formulario con valores y validaciones.
 */
   inicializarForms(): void {
      this.mercancias110202Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.mercanciaDatosForm = this.fb.group({
        fraccionArancelaria: [{ value: this.solicitudState.fraccionArancelaria, }],
        nombreComercialMercancia: [{ value:this.solicitudState.nombreComercialMercancia, disabled: true }],
        nombreTecnico: [{ value: this.solicitudState.nombreTecnico, disabled: true }],
        nombreIngles: [{ value: this.solicitudState.nombreIngles, disabled: true }],
        criterioClasificacion: [{ value: this.solicitudState.criterioClasificacion, disabled: true }],
        marca: [this.solicitudState.marca],
        cantidad: [this.solicitudState.cantidad],
        umc: [this.solicitudState.umc, Validators.required],
        valorMercancia: [this.solicitudState.valorMercancia, [Validators.required, Validators.min(0)]],
        complementoClasificacion: ['', Validators.required],
        masaBrutas: [this.solicitudState.masaBrutas, [Validators.required, Validators.min(0)]],
        masaBruta: [this.solicitudState.masaBruta, [Validators.required, Validators.min(0)]],
        unidadMedidaMasaBruta: [this.solicitudState.unidadMedidaMasaBruta, Validators.required],
        numeroFactura: [this.solicitudState.numeroFactura],
        tipoFactura: [this.solicitudState.tipoFactura],
        fechaFinal: [this.solicitudState.fechaFinal, Validators.required],
        facturas: [this.solicitudState.facturas, Validators.required]
      });
      this.mercanciaDatosForm.get('fraccionArancelaria')?.setValue('15800202');
          }
          /**
 * Establece el valor de un campo en el store usando su método correspondiente.
 * Obtiene el valor del formulario y lo envía al método del store.
 * Se usa para mantener sincronizado el formulario con el estado global.
 */
  setValoresStores(form: FormGroup, campo: string, metodoNombre: keyof Mercancias110202Store): void {
    const VALOR = form.get(campo)?.value;
    (this.mercancias110202Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
 * Actualiza la fecha seleccionada en el formulario y el store.
 * Parcha el valor de 'fechaFinal' en el formulario reactivo.
 * Luego propaga ese valor al store mediante setValoresStores().
 */
 onFechaCambiada(fecha:string): void {
    this.mercanciaDatosForm.patchValue({ fechaFinal: fecha });
    this.setValoresStores(
      this.mercanciaDatosForm,
      'fechaFinal',
      'setFechaFinal'
    );
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
 * Guarda los datos del formulario como una nueva mercancía.
 * Crea un objeto de tipo Mercancias con los valores ingresados.
 * Puede ser usado para actualizar o agregar en la tabla de datos.
 */
onGuardarMercancia(): void {
 
  const FORMDATA = this.mercanciaDatosForm.value;
  const NUEVAMERCANCIA: Mercancias = {
    unidadDeMedida: FORMDATA.umc,
    cantidad: FORMDATA.cantidad,
    fraccionArancelaria: FORMDATA.fraccionArancelaria,
    valorMercancia: FORMDATA.valorMercancia,
    tipoDeFactura: FORMDATA.tipoFactura
  };
this.exportador[0] = NUEVAMERCANCIA;
this.exportador = [...this.exportador];
   this.cerrarModals();
}
/**
 * Cierra el modal si la instancia del mismo está disponible.
 * Verifica que exista la referencia antes de ejecutar el cierre.
 * Se utiliza después de guardar o cancelar una operación.
 */
cerrarModals(): void {
  if (this.modalInstances) {
    this.modalInstances.hide();
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
