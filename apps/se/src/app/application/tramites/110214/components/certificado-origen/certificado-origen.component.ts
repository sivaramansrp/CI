import { AlertComponent, ConsultaioQuery, ConsultaioState, Notificacion, Pedimento, REGEX_PATRON_DECIMAL_2 } from "@ng-mf/data-access-user";
import { DISPONIBLES_ENCABEZADOS, FECHAFACTURA, MERCANCIAS_ENCABEZADOS } from '../../constants/validar-inicialmente-certificado.enum';

import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Catalogo } from "../../models/validar-inicialmente-certificado.model";
import { CatalogoLista, } from "../../models/validar-inicialmente-certificado.model";
import { CatalogoSelectComponent } from "@libs/shared/data-access-user/src";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { DisponiblesTabla } from "../../models/validar-inicialmente-certificado.model";
import { ElementRef } from "@angular/core";
import { FECHAFINAL } from '../../constants/validar-inicialmente-certificado.enum';
import { FECHAINICIAL } from '../../constants/validar-inicialmente-certificado.enum';
import { FormGroup } from "@angular/forms";
import { InputFecha } from "@libs/shared/data-access-user/src";
import { InputFechaComponent } from "@libs/shared/data-access-user/src";
import { Modal } from 'bootstrap';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SeleccionadasTabla } from "../../models/validar-inicialmente-certificado.model.js";
import { Subject } from "rxjs";
import { TERCEROS_TEXTO_DE_ALERTA } from '../../constants/validar-inicialmente-certificado.enum';
import { TablaDinamicaComponent } from "@libs/shared/data-access-user/src";
import { TablaSeleccion } from "@libs/shared/data-access-user/src";
import { TituloComponent } from "@libs/shared/data-access-user/src";
import { ToastrService } from "ngx-toastr";
import { Tramite110214Query } from "../../../../estados/queries/tramite110214.query";
import { Tramite110214State } from "../../../../estados/tramites/tramite110214.store";
import { Tramite110214Store } from "../../../../estados/tramites/tramite110214.store";
import { ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { ValidarInicialmenteCertificadoService } from "../../services/validar-inicialmente-certificado.service";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";
/**
 * Componente para gestionar el certificado de origen.
 * 
 * Este componente permite al usuario gestionar la información relacionada con el certificado de origen,
 * incluyendo la selección de mercancías, la carga de archivos, la configuración de formularios y la interacción
 * con servicios para obtener datos como tratados, países y mercancías disponibles.
 */
@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos del certificado.
   */
  formularioCertificado!: FormGroup;

  /**
   * Estado actual del trámite.
   */
  public solicitudState!: Tramite110214State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario para gestionar los datos de registro.
   */
  registroFormulario!: FormGroup;

  /**
   * Indica si el formulario está deshabilitado.
   */
  estaDeshabilitado: boolean = false;

  /**
   * Configuración de los encabezados de la tabla de mercancías disponibles.
   */
  public disponiblesEncabezados: ConfiguracionColumna<DisponiblesTabla>[] = DISPONIBLES_ENCABEZADOS;

  /**
   * Lista de mercancías disponibles en la tabla.
   */
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionadasFila!: DisponiblesTabla | null;

  /**
   * Configuración de los encabezados de la tabla de mercancías seleccionadas.
   */
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] = MERCANCIAS_ENCABEZADOS;

  /**
   * Lista de mercancías seleccionadas en la tabla.
   */
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías seleccionadas.
   */
  mercanciaSeleccionadasFila!: SeleccionadasTabla | null;

  /**
   * Configuración de la tabla de selección.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Texto de alerta para notificaciones.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Referencia al modal para cargar archivos.
   */
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;

  /**
   * Referencia al modal para buscar mercancías.
   */
  @ViewChild('modalBuscar') modalBuscar!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Formulario para gestionar la carga de archivos.
   */
  formularioArchivo!: FormGroup;

  /**
   * Nombre del archivo cargado.
   */
  nombreArchivo: string = '';

  /**
   * Opciones de tratados disponibles.
   */
  optionsTratado!: Catalogo[];

  /**
   * Opciones de países disponibles.
   */
  optionsPais!: Catalogo[];

  /**
   * Fecha inicial para el formulario.
   */
  fechaInicialInput: InputFecha = FECHAINICIAL;

  /**
   * Fecha final para el formulario.
   */
  fechaFinalInput: InputFecha = FECHAFINAL;

  /**
   * Formulario para gestionar los datos de mercancías.
   */
  formularioMercancia!: FormGroup;

  /**
   * Fecha de la factura en el formulario.
   */
  fechaFacturaInput: InputFecha = FECHAFACTURA;

  /**
   * Opciones de tipos de factura disponibles.
   */
  optionsTipoFactura!: Catalogo[];
/**
 * @property {boolean} mostrarCamposTercerOperador
 * @description Indica si se deben mostrar los campos relacionados con el tercer operador.
 * @default false
 */
mostrarCamposTercerOperador: boolean = false;

/**
 * @property {number} elementoParaEliminar
 * @description Almacena el índice del elemento que se desea eliminar.
 */
elementoParaEliminar!: number;

/**
 * @property {Array<Pedimento>} pedimentos
 * @description Lista de pedimentos asociados al trámite.
 */
pedimentos: Array<Pedimento> = [];


  /**
   * Configuración de una nueva notificación.
   */
  public nuevaNotificacion: Notificacion | null = null;
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
/**
 * Validador de rango de fechas.
 * 
 * Este método valida que la fecha de inicio sea menor o igual a la fecha de fin.
 * Si la fecha de inicio es mayor a la fecha de fin, se genera una notificación de error.
 * 
 * @param {CertificadoOrigenComponent} component - Instancia del componente para acceder a sus propiedades.
 * @returns {ValidatorFn} Función de validación que retorna un error si las fechas no son válidas.
 */
  static dateRangeValidator(component: CertificadoOrigenComponent): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const START_DATE = formGroup.get('fechaInicial')?.value;
      const END_DATE = formGroup.get('fechaFinal')?.value;
  
      if (START_DATE && END_DATE) {
        const [START_DAY, START_MONTH, START_YEAR] = START_DATE.split('/').map(Number);
        const [END_DAY, END_MONTH, END_YEAR] = END_DATE.split('/').map(Number);
  
        const PARSED_START_DATE = new Date(START_YEAR, START_MONTH - 1, START_DAY);
        const PARSE_END_DATE = new Date(END_YEAR, END_MONTH - 1, END_DAY);
  
        if (PARSED_START_DATE > PARSE_END_DATE) {
          
          component.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: 'Error de Validación',
            mensaje: 'La fecha de inicio debe ser menor a la fecha fin.',
            cerrar: true,
            tiempoDeEspera: 5000,
            txtBtnAceptar: 'Aceptar',
            txtBtnCancelar: '',
          };
  
          return { dateRangeInvalid: true };
        }
      }
  
      return null;
    };
  }
  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {ValidarInicialmenteCertificadoService} validarInicialmenteCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param {Tramite110214Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110214Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
  ) { }
  /**
     * Método que se ejecuta al inicializar el componente.
     * 
     * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
     */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;   
         
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
      
     
      this.validarInicialmenteCertificadoService.obtenerMercanciasDisponibles()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((respuesta) => {
      this.mercanciaDisponsiblesTablaDatos = respuesta;
      this.inicializarFormularioMercancia(); 
    });

    this.mercanciaDisponsiblesTablaDatos = this.solicitudState.mercanciaDisponsiblesTablaDatos ?? [];
    this.mercanciaSeleccionadasTablaDatos = this.solicitudState.mercanciaSeleccionadasTablaDatos ?? [];
    this.inicializarFormularioCertificado();
    this.inicializarFormularioMercancia();
    this.inicializarFormularioArchivo();
    this.cargarTratado();
    this.cargarPais();
  }
  /**
   * Establece valores en el store a partir de un formulario.
   * 
   * Este método toma un formulario, un campo específico y el nombre de un método del store.
   * Obtiene el valor del campo en el formulario y lo pasa al método correspondiente del store.
   * 
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110214Store} metodoNombre - El nombre del método del store que será llamado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110214Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el grupo de controles del formulario relacionado con el grupo tratado.
   * 
   * @returns {FormGroup} El grupo de controles del formulario para el grupo tratado.
   */
  get grupoTratado(): FormGroup {
    return this.formularioCertificado.get('grupoTratado') as FormGroup;
  }

  /**
   * Inicializa el formulario principal del certificado.
   * 
   * Este método configura el formulario principal con los valores iniciales obtenidos
   * del estado del trámite. Incluye campos como el operador, el período y los datos del grupo tratado.
   */
  inicializarFormularioCertificado(): void {
    this.formularioCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      blnPeriodo: [this.solicitudState?.blnPeriodo, [Validators.required]],
      grupoOperador: this.fb.group({
      nombreTercerOperador:  [this.solicitudState?.grupoOperador?.nombreTercerOperador, [Validators.required]],
      primerApellidoTercerOperador:  [this.solicitudState?.grupoOperador?.primerApellidoTercerOperador, [Validators.required]],
      segundoApellidoTercerOperador:  [this.solicitudState?.grupoOperador?.segundoApellidoTercerOperador, [Validators.required]],
      registroFiscalTercerOperador:  [this.solicitudState?.grupoOperador?.registroFiscalTercerOperador, [Validators.required]],
      razonSocialTercerOperador:  [this.solicitudState?.grupoOperador?.razonSocialTercerOperador, [Validators.required]],
      }),
      grupoTratado: this.fb.group({
        tratado: [this.solicitudState?.grupoTratado?.tratado, [Validators.required]],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.grupoTratado?.fraccionArancelaria, []],
        numeroRegistro: [this.solicitudState?.grupoTratado?.numeroRegistro, [Validators.required,Validators.maxLength(12)]],
        nombreComercial: [this.solicitudState?.grupoTratado?.nombreComercial, []],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [this.solicitudState?.grupoTratado?.fechaInicialInput, []],
      },
      { validators: CertificadoOrigenComponent.dateRangeValidator(this) } 
    ),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el formulario para gestionar las mercancías.
   * 
   * Este método configura el formulario con los valores iniciales relacionados con las mercancías,
   * como fracción arancelaria, nombres, cantidad, país y otros detalles.
   */
  inicializarFormularioMercancia(): void {
    const MERCANCIA_DISPONIBLE = this.mercanciaDisponsiblesTablaDatos[0]; // Assuming the first item is used
  
    this.formularioMercancia = this.fb.group({
      fraccionMercanciaArancelaria: [
        { value: MERCANCIA_DISPONIBLE?.fraccionArancelaria || '', disabled: true },
        [Validators.required, Validators.maxLength(8)]
      ],
      nombreTecnico: [
        { value: MERCANCIA_DISPONIBLE?.nombreTecnico || '', disabled: true },
        []
      ],
      nombreEnIngles:['',Validators.required],
      nombreComercialDelaMercancia: [
        { value: MERCANCIA_DISPONIBLE?.nombreComercial || '', disabled: true },
        [Validators.required, Validators.maxLength(200)]
      ],
      criterioTratoPreferencial: [
        { value: 'E', disabled: true },
        []
      ],
      valorContenidoRegional: [''],
      otrasInstancias: ['', []],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{1,16}(\.\d{1,4})?$/), 
          Validators.maxLength(22)
        ]
      ],
      pais: ['', [Validators.required]],
      valorDelaMercancia: ['', [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      complementoDelaDescripcion: ['', [Validators.required]],
      numeroSerie: ['', Validators.maxLength(17)],
      fecha: [
        '',
        [
          Validators.required,
          CertificadoOrigenComponent.restrictFutureDates() 
        ]
      ],
      numeroFactura: ['', [Validators.required, Validators.maxLength(36)]],
      tipoFactura: ['', [Validators.required]],
    });
  
    this.inicializarEstadoFormulario();
  }
  static restrictFutureDates(): ValidatorFn {
    return (control: AbstractControl) => {
      const INPUT_DATE = new Date(control.value);
      const CURRENT_DATE = new Date();
  
      if (control.value && INPUT_DATE > CURRENT_DATE) {
        return { futureDate: true }; // Return error if the date is in the future
      }
      return null; // Valid date
    };
  }
  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado de los formularios según el modo de solo lectura.
   * 
   * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles de los formularios:
   * - `formularioCertificado`
   * - `formularioMercancia`
   * - `formularioArchivo`
   * 
   * En caso contrario, habilita todos los controles de los formularios mencionados.
   * 
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.formularioCertificado?.disable();
      this.formularioMercancia?.disable();
      this.formularioArchivo?.disable();
    } else {
      this.formularioCertificado?.enable();
      this.formularioMercancia?.enable();
      this.formularioArchivo?.enable();
    }
  }

  /**
   * Inicializa el formulario para la carga de archivos.
   * 
   * Este método configura el formulario con un campo obligatorio para la selección de archivos.
   */
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: ['', [Validators.required]],
    });
  }

  /**
   * Verifica si un campo específico de un formulario es válido.
   * 
   * Este método utiliza un servicio de validación para determinar si un campo en un formulario
   * cumple con las reglas de validación definidas.
   * 
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  /**
 * Maneja el evento de clic en un botón.
 * 
 * Este método deshabilita el formulario al establecer la propiedad `estaDeshabilitado` en `true`.
 */
  onClick(): void {
    this.estaDeshabilitado = true;
  }

  /**
   * Carga la lista de tratados disponibles desde el servicio.
   * 
   * Este método obtiene los datos de tratados disponibles y los asigna a la propiedad `optionsTratado`.
   */
  cargarTratado(): void {
    this.validarInicialmenteCertificadoService
      .obtenerTratado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsTratado = datos.datos;
        }
      );
  }

  /**
   * Carga la lista de países disponibles desde el servicio.
   * 
   * Este método obtiene los datos de países disponibles y los asigna a las propiedades `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.validarInicialmenteCertificadoService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsPais = datos.datos;
          this.optionsTipoFactura = datos.datos;
        }
      );
  }

  /**
   * Carga la lista de mercancías disponibles desde el servicio.
   * 
   * Este método obtiene los datos de mercancías disponibles y los asigna a la propiedad `mercanciaDisponsiblesTablaDatos`.
   */
  cargarMercanciasDisponibles(): void {
    const NUEVA_MERCANCIA: DisponiblesTabla = {
      fraccionArancelaria: this.formularioCertificado.get('grupoTratado.fraccionArancelaria')?.value || '',
      numeroRegistroProductos: this.formularioCertificado.get('grupoTratado.numeroRegistro')?.value || '',
      nombreComercial: this.formularioCertificado.get('grupoTratado.nombreComercial')?.value || '',
      nombreTecnico: '', 
      fechaExpedicion: this.formularioCertificado.get('grupoTratado.fechaInicial')?.value || '',
      fechaVencimiento: this.formularioCertificado.get('grupoTratado.fechaFinal')?.value || '', 
    };
  
    this.validarInicialmenteCertificadoService.obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
       
        this.mercanciaDisponsiblesTablaDatos = [...respuesta, NUEVA_MERCANCIA];
      });
  }

  /**
   * Carga la lista de mercancías seleccionadas desde el servicio.
   * 
   * Este método obtiene los datos de mercancías seleccionadas y los asigna a la propiedad `mercanciaSeleccionadasTablaDatos`.
   */
  cargarMercanciasSeleccionadas(): void {
    this.validarInicialmenteCertificadoService.obtenerMercanciasSeleccionadas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaSeleccionadasTablaDatos = respuesta;
      });
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías disponibles.
   * 
   * Este método actualiza la propiedad `disponiblesSeleccionadasFila` con la fila seleccionada
   * y abre el modal de búsqueda.
   * 
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    if (!this.soloLectura) {
      this.disponiblesSeleccionadasFila = evento;
        this.formularioMercancia.patchValue({
        fraccionMercanciaArancelaria: evento.fraccionArancelaria, 
        nombreTecnico: evento.nombreTecnico, 
        nombreComercialDelaMercancia: evento.nombreComercial, 
        criterioTratoPreferencial: 'E', 
        valorContenidoRegional: '',
        otrasInstancias: '',
        cantidad: '',
        pais: '',
        valorDelaMercancia: '',
        complementoDelaDescripcion: '',
        numeroSerie: '',
        fecha: '',
        numeroFactura: '',
        tipoFactura: '',
      });
  
      this.abiertoBuscar();
    }
  }
  /**
   * Abre el modal de búsqueda de mercancías.
   * 
   * Este método utiliza la referencia al modal de búsqueda para mostrarlo al usuario.
   */
  abiertoBuscar(): void {
    if (this.modalBuscar) {
      const MODAL_INSTANCE = new Modal(this.modalBuscar.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías seleccionadas.
   * 
   * Este método actualiza la propiedad `mercanciaSeleccionadasFila` con la fila seleccionada.
   * 
   * @param {SeleccionadasTabla} evento - La fila seleccionada en la tabla de mercancías seleccionadas.
   */
  seleccionDeFilas(evento: SeleccionadasTabla): void {
    this.mercanciaSeleccionadasFila = evento;
  }

  /**
   * Elimina una mercancía seleccionada de la tabla de mercancías seleccionadas.
   * 
   * Este método elimina la mercancía seleccionada de la propiedad `mercanciaSeleccionadasTablaDatos`
   * y restablece la propiedad `mercanciaSeleccionadasFila` a `null`.
   */
  eliminar(): void {
    if (this.mercanciaSeleccionadasFila) {
      this.mercanciaSeleccionadasTablaDatos = this.mercanciaSeleccionadasTablaDatos.filter(elementos => this.mercanciaSeleccionadasFila?.id !== elementos.id);
      this.mercanciaSeleccionadasFila = null;
    }
  }

  /**
   * Abre el modal para cargar archivos.
   * 
   * Este método utiliza la referencia al modal de carga de archivos para mostrarlo al usuario.
   */
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  /**
 * Maneja la selección de un archivo en el input de carga.
 * 
 * Este método obtiene el archivo seleccionado por el usuario y actualiza la propiedad `nombreArchivo`
 * con el nombre del archivo. Si no se selecciona ningún archivo, se establece un mensaje predeterminado.
 * 
 * @param {Event} event - Evento generado al seleccionar un archivo.
 */
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files ? INPUT.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
  }

  /**
   * Envía los datos del formulario.
   * 
   * Este método se utiliza para enviar los datos del formulario y cierra el modal correspondiente.
   */
  enviar(): void {
    this.cerrarModal();
  }

  /**
   * Cierra el modal activo.
   * 
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }
  /**
 * Elimina un pedimento de la lista.
 * 
 * Este método elimina un pedimento de la lista de pedimentos si se confirma la acción.
 * Además, restablece la notificación a `null` después de completar la acción.
 * 
 * @param {boolean} borrar - Indica si se debe proceder con la eliminación del pedimento.
 */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
    this.nuevaNotificacion = null;
  }

  /**
   * Maneja el cambio de la fecha inicial en el formulario.
   * 
   * Este método actualiza el valor de la fecha inicial en el formulario del certificado
   * y sincroniza el valor con el store.
   * 
   * @param {string} nuevo_fechaIncial - Nueva fecha inicial seleccionada.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.grupoTratado, 'fechaInicial', 'setGrupoTratadoFechaFinalInput');
  }

  /**
   * Maneja el cambio de la fecha final en el formulario.
   * 
   * Este método actualiza el valor de la fecha final en el formulario del certificado
   * y sincroniza el valor con el store.
   * 
   * @param {string} nuevo_fechaFinal - Nueva fecha final seleccionada.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(this.grupoTratado, 'fechaFinal', 'setGrupoTratadoFechaInicialInput');
  }
  
  /**
   * Maneja el cambio de la fecha de la factura en el formulario.
   * 
   * Este método actualiza el valor de la fecha de la factura en el formulario de mercancías
   * y sincroniza el valor con el store.
   * 
   * @param {string} nuevo_fechaFin - Nueva fecha de la factura seleccionada.
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    let inputDate: Date | null = null;
      if (nuevo_fechaFin.includes('-')) {
      inputDate = new Date(nuevo_fechaFin);
    } else if (nuevo_fechaFin.includes('/')) {
      const [DAY, MONTH, YEAR] = nuevo_fechaFin.split('/').map(Number);
      inputDate = new Date(YEAR, MONTH - 1, DAY);
    } else {
      inputDate = new Date(Date.parse(nuevo_fechaFin));
    }
  
    const CURRENT_DATE = new Date();
  
    if (!inputDate || isNaN(inputDate.getTime())) {
      this.formularioMercancia.get('fecha')?.setErrors({ invalidDate: true }); 
    } else if (inputDate > CURRENT_DATE) {
      this.formularioMercancia.get('fecha')?.setErrors({ futureDate: true }); 
    } else {
      this.formularioMercancia.patchValue({ fecha: nuevo_fechaFin }); 
      this.formularioMercancia.get('fecha')?.setErrors(null);
      this.setValoresStore(this.formularioMercancia, 'fecha', 'setFecha');
    }
  }
  /**
   * Abre un modal con una notificación de alerta.
   * 
   * Este método configura una notificación de tipo alerta con un mensaje informativo
   * relacionado con las mercancías mostradas. La notificación incluye opciones de acción.
   */
  public abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/ acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
/**
 * Maneja el cambio del checkbox para el tercer operador.
 * 
 * Este método actualiza la propiedad `mostrarCamposTercerOperador` según el estado del checkbox.
 * Si el checkbox está marcado, se mostrarán los campos relacionados con el tercer operador.
 * 
 * @param {Event} event - Evento generado al cambiar el estado del checkbox.
 */
  onTercerOperadorChange(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement;
    this.mostrarCamposTercerOperador = CHECKBOX.checked;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método libera los recursos y cancela las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
