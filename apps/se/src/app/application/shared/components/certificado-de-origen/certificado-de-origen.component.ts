import { AbstractControl,FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors,ValidatorFn, Validators} from '@angular/forms';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputCheckComponent, InputFecha, InputFechaComponent,Notificacion, SoloLetrasNumerosDirective, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CARGA_MERCANCIA_SELECCIONADAS, CONFIGURACION_MERCANCIA, CONFIGURACION_MERCANCIA_TABLA, FECHA_ID, MERCANCIA_SELECCIONADAS, TEXTOS_REQUISITOS } from '../../constantes/modificacion.enum';
import { Component,ElementRef,EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { ConfiguracionColumna, MenusDesplegables } from '../../models/modificacion.enum';
import { CommonModule } from '@angular/common';
import {EIGHT_DIGIT_NUMBER_REGEX} from '@ng-mf/data-access-user'
import { FormularioSi } from '../../models/certificado-origen.model';
import { Mercancia } from '../../models/modificacion.enum';
import { Modal } from 'bootstrap';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";


/**
 * Constante que representa la configuración de la fecha de inicio en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha de inicio.
 * @property {boolean} required - Indica si el campo de fecha de inicio es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha de inicio está habilitado.
 */
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio:',
  required: false,
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
  labelNombre: 'Fecha final:',
  required: false,
  habilitado: true,
};

/**
 * Constante que representa la configuración de la fecha fin en el componente de certificado de origen.
 *
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha fin.
 * @property {boolean} required - Indica si el campo de fecha fin es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha fin está habilitado.
 */
export const FECHA_FIN = {
  labelNombre: 'Fecha fin:',
  required: false,
  habilitado: true,
}

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    InputCheckComponent,
    AlertComponent,
    NotificacionesComponent,
    forwardRef(() => SoloLetrasNumerosDirective),
  ],  
  templateUrl: './certificado-de-origen.component.html',
  providers:[ToastrService],
  styleUrl: './certificado-de-origen.component.scss'
})

export class CertificadoDeOrigenComponent implements OnDestroy, OnInit,OnChanges {
  /**
 * Título mostrado en el componente.  
 * Puede ser personalizado desde el componente padre mediante [title].  
 * Si no se proporciona, se mostrará el valor por defecto: "Validación inicial del certificado de circulación de mercancías".
 */
    @Input() title: string = 'Validación inicial del certificado de circulación de mercancías';
    
  /**
   * Propiedad de entrada que recibe un arreglo de menús desplegables.
   * @type {MenusDesplegables[]}
   */
  @Input() data!: MenusDesplegables[];

  /**
   * Propiedad de entrada que indica si el operador está habilitado o no.
   * @type {boolean}
   */
  @Input() operador!: boolean;

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * Propiedad de entrada que indica si la tabla de selección está activada o no.
   * @type {boolean}
   */
  @Input() tablaSeleccionEvent!: boolean;

  /**
   * Indica si el componente está configurado para el manejo de carga de mercancías.
   * @type {boolean}
   */
  @Input() cargoDeMercancias!: boolean;

  /**
   * Indica si hay mercancías disponibles para su procesamiento o visualización.
   * @type {boolean}
   */
  @Input() mercanciasDisponibles!:boolean;
     /**
     * @public
     * @property {Notificacion} nuevaNotificacion
     * @description Representa una nueva notificación que se utilizará en el componente.
     * @command Este campo debe ser inicializado antes de su uso.
     */
     public nuevaNotificacion!: Notificacion;
      /**
     * @public
     * @property {Notificacion} nuevaNotificacion
     * @description Representa una nueva notificación que se utilizará en el componente.
     * @command Este campo debe ser inicializado antes de su uso.
     */
      public nuevaNotificacionUno!: Notificacion;

     /**
   * @descripcion
   * Mensaje de alerta que se muestra al usuario.
   */
  mensajeDeAlerta: string = 'Los datos marcados con asterisco son obligatorios. Favor de capturarlos.';


  /**
   * Propiedad de entrada que representa el estado del formulario histórico.
   * @type {FormularioSi}
   */
  @Input() tramiteState: FormularioSi = {};

  /**
   * Propiedad de entrada que recibe los datos de los tratados/acuerdos.
   * @type {Catalogo[]}
   */
  @Input() tratadoAcuerdo!: Catalogo[];

  /**
   * Propiedad de entrada que recibe los datos de los países bloqueados.
   * @type {Catalogo[]}
   */
  @Input() paisBloqu!: Catalogo[];

    /**
   * @property {Catalogo[]} paises
   * @description
   * Propiedad de entrada que recibe el arreglo de países disponibles para seleccionar en el formulario.
   * Se utiliza para mostrar opciones de país en los menús desplegables del componente.
   */
  @Input() paises!: Catalogo[];

  /**
   * @property {boolean} domicilioTercer
   * @description
   * Propiedad de entrada que indica si el domicilio de un tercero debe mostrarse o estar habilitado en el formulario.
   * Permite controlar la visualización de campos relacionados con el domicilio de terceros.
   */
  @Input() domicilioTercer!: boolean;
  /**
   * Propiedad de entrada que recibe los datos de la tabla de mercancia.
   * @type {Mercancia[]}
   */
  @Input() tableData!: Mercancia[];

  /**
   * Propiedad de entrada que recibe los datos de la mercancia guardada.
   * @type {Mercancia[]}
   */
  @Input() guardarClicado!: Mercancia[];

  /**
   * Indica si hay mercancías disponibles en la tabla para su procesamiento o visualización.
   * @type {boolean}
   */
  @Input() mercanciasDisponiblesTabla!: boolean;

  /**
   * @property {number} idProcedimiento
   * @description
   * Identificador del procedimiento actual. Se utiliza para configurar el formulario y la lógica del componente según el tipo de trámite.
   */
  @Input() idProcedimiento!: number;

  /**
   * Propiedad de salida que emite el valor del formulario cuando se actualiza.
   * @type {EventEmitter<undefined>}
   */
  @Output() formCertificadoEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();

  /**
   * Propiedad de salida que emite el estado seleccionado.
   * @type {EventEmitter<Catalogo>}
   */
  @Output() tipoEstadoSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Propiedad de salida que emite el país bloqueado seleccionado.
   * @type {EventEmitter<Catalogo>}
   */
  @Output() paisBloquEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Propiedad de salida que emite un valor booleano para buscar la mercancia.
   * @type {EventEmitter<boolean>}
   */
  @Output() setbuscarMercanciaEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * @property {EventEmitter<boolean>} setModelCargaPorArchivo
   * @description
   * Evento de salida que emite un valor booleano para indicar que se debe abrir el modal de carga por archivo.
   * Permite notificar al componente padre para mostrar el modal correspondiente.
   */
  @Output() setModelCargaPorArchivo: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Propiedad de salida que emite la fila seleccionada de mercancia.
   * @type {EventEmitter<Mercancia>}
   */
  @Output() filaClics = new EventEmitter<Mercancia>();

  /**
  * Este evento emite un arreglo de objetos de tipo `Mercancia` que han sido seleccionados o procesados.
  * @type {EventEmitter<Mercancia[]>}
  */
  @Output() guardarClicadoEvent: EventEmitter<Mercancia[]> = new EventEmitter<Mercancia[]>();

  /**
   * Propiedad que almacena un arreglo de objetos de tipo `Mercancia` seleccionados para ser guardados.
   * @type {Mercancia[]}
   */
  public seleccionadaguardarClicado: Mercancia[] = [];

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

  /**
   * Configuración de la fecha final en el formulario de certificado de origen.
   * @type {InputFecha}
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * @property {InputFecha} fechaFinInput
   * @description
   * Configuración de la fecha fin en el formulario de certificado de origen.
   */
  public fechaFinInput: InputFecha = FECHA_FIN;

  /**
   * @property {boolean} fechaFin
   * @description
   * Indica si el campo de fecha fin debe mostrarse en el formulario, dependiendo del procedimiento.
   */
  fechaFin: boolean = false;
  
  /**
   * Indicates whether the domicile information should be displayed.
   * Set to `true` to show domicile details; otherwise, set to `false`.
   */
  @Input() public domicilio: boolean = true

  /**
  * Texto que contiene los requisitos y mensajes informativos.
  * @type {string}
  */
  TEXTOS = TEXTOS_REQUISITOS;

  

  /**
   * Subject para gestionar el ciclo de vida del componente y cancelar las suscripciones.
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
     * Referencia al elemento del modal para gestionar archivos.
     * 
     * Se utiliza para abrir o cerrar el modal de archivos.
     */
    @ViewChild('modalArchivo') modalArchivo!: ElementRef;
    /**
   * Nombre del archivo seleccionado.
   * 
   * Contiene el nombre del archivo que el usuario ha seleccionado para adjuntar.
   */
    nombreArchivo: string = '';

      /**
   * Formulario para gestionar los archivos adjuntos.
   * 
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  formularioArchivo!: FormGroup;


  /**
   * Configuración de las columnas de la tabla de mercancia.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] = CONFIGURACION_MERCANCIA;

  /**
   * Configuración de las columnas de la tabla de mercancia seleccionada.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTablaMercancia: ConfiguracionColumna<Mercancia>[] = MERCANCIA_SELECCIONADAS;

  /**
   * Configuración de las columnas de la tabla de mercancía disponible.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTablaMercanciaDisponible: ConfiguracionColumna<Mercancia>[] = CONFIGURACION_MERCANCIA_TABLA;

  /**
   * Configuración de las columnas de la tabla de mercancia seleccionada.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  cargaMercanciaConfiguracionTabla: ConfiguracionColumna<Mercancia>[] = CARGA_MERCANCIA_SELECCIONADAS;


  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */
  datos: Mercancia[] = [];

   /**
     * Muestra el modal para cargar un archivo.
     * 
     * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
     */
    cargaArchivo(): void {
      if (this.modalArchivo) {
        const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
        MODAL_INSTANCE.show();
      }
    }

  /**
   * Estado de la selección de la tabla.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;
    /**
   * Referencia al botón para cerrar el modal.
   * 
   * Se utiliza para cerrar el modal de manera programada.
   */
    @ViewChild('closeModal') closeModal!: ElementRef;


  /**
   * Tipo de selección de la tabla (radio o checkbox).
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Datos del formulario, recibidos a través de la propiedad `@Input()`.
   * @type {Object}
   */
  @Input() datosForm!: { [key: string]: unknown };

  /**
   * @property {string[]} elementosRequeridos
   * Lista de elementos que son obligatorios en el formulario.
   */
  @Input() public elementosRequeridos!: string[];


  /**
   * Datos de la mercancia seleccionada de la bitácora.
   * @type {Mercancia}
   */
  datosSeleccionados!: Mercancia;

  /**
   * @property {boolean} mostrarError
   * @description
   * Indica si se debe mostrar un mensaje de error en el componente.
   * Se utiliza para controlar la visualización de alertas cuando el formulario no es válido.
   */
  mostrarError: boolean = true;

  /**
    * Emisor de eventos para indicar si el formulario es válido.
    * @type {EventEmitter<boolean>}
    */
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );


  /**
   * Constructor del componente. Inicializa el formulario reactivo con los controles necesarios y sus validaciones.
   * @param fb FormBuilder para la creación del formulario reactivo.
   */
  constructor(private fb: FormBuilder) {

    this.actualizarDatosFormularioSolicitud();
  }

  /**
   * Crea e inicializa el formulario reactivo `formCertificado` con los controles y validaciones requeridas
   * para el componente Certificado de Origen.
   *
   * @remarks
   * Este método configura los campos del formulario, incluyendo validaciones como `required` y `min`.
   *
   * @command
   * Utilice este método para inicializar el formulario antes de interactuar con los datos del certificado.
   */
 createForm(): void {
    this.formCertificado =this.fb.group({
      si: [false],
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
  bloque: ['', [Validators.required, Validators.min(0)]],
  fraccionArancelariaForm: ['', [Validators.maxLength(8),Validators.pattern(EIGHT_DIGIT_NUMBER_REGEX)]],
  registroProductoForm: ['', [Validators.maxLength(12)]],
  nombreComercialForm: ['', [Validators.maxLength(200)]],
  fechaInicioInput: [''],
  fechaFinalInput: [''],
  nombres: ['', [Validators.maxLength(20)]],
  primerApellido: ['', [Validators.maxLength(20)]],
  segundoApellido: ['', [Validators.maxLength(20)]],
  numeroDeRegistroFiscal: ['', [Validators.required,Validators.maxLength(30)]],
  razonSocial: [''],
  calle: ['', [Validators.maxLength(90)]],
  numeroLetra: ['', [Validators.maxLength(30)]],
  pais: [''],
  ciudad: [''],
  lada: [''],
  telefono: [''],
  fax:[''],
  correo:[''],
  correoElectronico:[''],

    },
    { validators: CertificadoDeOrigenComponent.dateRangeValidator(this) } 
  );
  }
  /* * Aplica las validaciones al campo 'primerApellido', 'calle' y 'numeroLetra' del formulario.
    * 
    * @remarks
    * Este método establece validaciones condicionales basadas en el valor de `idProcedimiento`.
    * Si `idProcedimiento` es 110205, los campos son opcionales; de lo contrario, son obligatorios.
    */
  applyPrimerApellidoValidation(): void {
    const PRIMER_APELLIDO = this.formCertificado.get('primerApellido');
    const CALLE = this.formCertificado.get('calle');
    const NUMERO_LETRA = this.formCertificado.get('numeroLetra');

    if (!PRIMER_APELLIDO || !CALLE || !NUMERO_LETRA) { return; }

    if (this.idProcedimiento === 110205) {
    
      PRIMER_APELLIDO.setValidators([Validators.maxLength(20)]);
      CALLE.setValidators([Validators.maxLength(90)]);
      NUMERO_LETRA.setValidators([Validators.maxLength(30)]);
    } else {
      PRIMER_APELLIDO.setValidators([Validators.required, Validators.maxLength(20)]);
      CALLE.setValidators([Validators.required, Validators.maxLength(90)]);
      NUMERO_LETRA.setValidators([Validators.required, Validators.maxLength(30)]);
    }
  
    PRIMER_APELLIDO.updateValueAndValidity();
    CALLE.updateValueAndValidity();
    NUMERO_LETRA.updateValueAndValidity();
  }
  
  
  /**
* Evalúa si se debe inicializar o cargar datos en el formulario.
*/
  inicializarEstadoFormulario(): void {
    if (!this.formCertificado) {
      this.createForm();   
    }
   
    if (this.esFormularioSoloLectura) {
      this.formCertificado.disable();
    }
  }
  /**
   * @method ngOnChanges
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando cambian las propiedades de entrada del componente.
   * Si la propiedad `datosForm` cambia y tiene un valor actual, actualiza el formulario `formCertificado` con los nuevos datos.
   * Si el formulario no existe, lo crea antes de aplicar los valores.
   * 
   * @param {SimpleChanges} changes - Objeto que contiene los cambios en las propiedades de entrada.
   * @returns {void}
   */
ngOnChanges(changes: SimpleChanges):void {
  if (changes['datosForm']?.currentValue) {
    if(this.formCertificado){
  this.formCertificado.patchValue(this.datosForm);
    }
    else{
      this.createForm();
    }
  
  }
}
  /**
 * Inicializa el formulario para gestionar archivos.
 * 
 * Este método configura los campos y validaciones del formulario relacionado con los archivos adjuntos.
 */
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: ['', [Validators.required]],
    });
  }
  /**
   * Actualiza los validadores requeridos en los campos del formulario especificados
   * en la lista `elementosRequeridos`.
   * 
   * @returns {void}
   */
  actualizarDatosFormularioSolicitud(): void {
    this.elementosRequeridos?.forEach((campo) => {
      const CONTROL = this.formCertificado.get(campo);
      if (CONTROL) {
        CONTROL.setValidators(Validators.required);
        CONTROL.updateValueAndValidity();
      }
    });
  }

  /**
   * Establece el estado seleccionado en el store.
   * @param {Catalogo} estado El estado seleccionado.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.tipoEstadoSeleccionEvent.emit(estado);
  }

  /**
   * Establece el bloque seleccionado en el store.
   * @param {Catalogo} estado El bloque seleccionado.
   */
  tipoSeleccion(estado: Catalogo): void {
    this.paisBloquEvent.emit(estado);
  }
/**
 * Validador personalizado para asegurar que la fecha de inicio no sea posterior a la fecha final.
 *  * @param componente La instancia del componente que contiene el formulario.
 * @returns Un objeto de errores de validación si la fecha de inicio es posterior a la fecha final, o null si no hay errores.
 * @remarks
 * Este validador se utiliza para validar un rango de fechas en un formulario reactivo de Angular.
 * Asegura que la fecha de inicio no sea posterior a la fecha final.
 * @command
 * Utilice este validador en la configuración del formulario para aplicar la validación de rango de fechas.
 * Por ejemplo, en el método `createForm()`, agregue `{ validators: CertificadoDeOrigenComponent.dateRangeValidator(this) }` al grupo del formulario.
 * */
  verificarRFCDos(): void {
   
    if ( this.formCertificado.get('fraccionArancelariaForm')?.errors?.['pattern']) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Datos incorrectos, favor de verificar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
    else {
     this.buscarMercancia();
    }
  }

   /**
   * Maneja la selección de un archivo en el input de carga de archivos.
   * 
   * Este método actualiza el nombre del archivo seleccionado en la propiedad `nombreArchivo`.
   * 
   * @param {Event} event - El evento generado al seleccionar un archivo.
   */
   alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files ? INPUT.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
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
   * Envía los datos y cierra el modal.
   * 
   * Este método realiza el envío de datos y cierra el modal de manera programada.
   */
   enviar(): void {
    this.cerrarModal();
    
  }

  
  /**
   * @inheritdoc
   * 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
   */
  ngOnInit(): void {
    this.fechaFin = FECHA_ID.includes(this.idProcedimiento);
    this.inicializarEstadoFormulario();
    this.nuevaNotificacion = {} as Notificacion
    this.inicializarFormularioArchivo();
  }
   validarFormularios(): boolean {
  if(this.formCertificado.valid){
    return true;
  }
  this.formCertificado.markAllAsTouched();
  return false;
  }

  /**
   * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  /**
    * Establece valores en el store y emite eventos relacionados con el formulario.
    *
    * @param formGroupName - El nombre del grupo de formulario al que pertenece el campo.
    * @param campo - El nombre del campo cuyo valor se desea obtener y procesar.
    * @param storeStateName - El nombre del estado en el store asociado al campo.
    * 
    * @remarks
    * Este método obtiene el valor de un campo específico del formulario `formDatosDelDestinatario`,
    * emite un evento para indicar si el formulario es válido y otro evento con los datos del campo
    * y su estado asociado en el store.
    */
  setValoresStore(formGroupName: string, campo: string, storeStateName: string): void {
    if(this.formCertificado.get('si')?.value){
     this.formCertificado.get('primerApellido')?.setValidators([Validators.required,Validators.maxLength(20)]);
    }
    const VALOR = this.formCertificado.get(campo)?.value;
    this.formaValida.emit(this.formCertificado.valid);
    this.formCertificadoEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formCertificado.get('') as FormControl;
  }

  /**
   * Método que emite un evento para buscar la mercancia.
   */
  buscarMercancia(): void {
    if((this.formCertificado.get('entidadFederativa')?.value !== '' && this.formCertificado.get('entidadFederativa')?.value !== null)&&(this.formCertificado.get('bloque')?.value!=='' && this.formCertificado.get('bloque')?.value !== null)){
      this.setbuscarMercanciaEvent.emit(true);
    }
    else{
      this.abrirModaldos();
    }
  }
   /**
   * Abre un modal con una notificación configurada.
   * 
   * @command abrirModal
   * @description Este método configura y muestra un modal con una notificación de alerta.
   */
   public abrirModaldos(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: this.mensajeDeAlerta,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor El nuevo valor de la fecha de inicio.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicioInput')?.setValue(nuevo_valor);
    this.setValoresStore('formCertificado', 'fechaInicioInput', nuevo_valor)
    this.formCertificado.get('fechaInicioInput')?.markAsUntouched();
  }

  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor El nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {
    this.formCertificado.get('fechaFinalInput')?.setValue(nuevo_valor);
    this.setValoresStore('formCertificado', 'fechaFinalInput', nuevo_valor)
    this.formCertificado.get('fechaFinalInput')?.markAsUntouched();
  }

  /**
   * Método que emite el evento para abrir el modal de modificación con los datos de la mercancia seleccionada.
   * @param datos1 Los datos de la mercancia seleccionada.
   */
  abrirModificarModal(datos1: Mercancia): void {
    this.filaClics.emit(datos1);
  }

  /**
   * Opens a modal and emits an event indicating that a row has been clicked.
   * 
   * @remarks
   * This method triggers the `filaClics` event emitter.
   * 
   * @returns {void}
   */
  abrirModal(tableData: Mercancia): void {
    this.filaClics.emit(tableData);
  }


  /**
   * @method abrirModalCargaPorArchivo
   * @description
   * Emite un evento para indicar que se debe abrir el modal de carga por archivo.
   * Utiliza el EventEmitter `setModelCargaPorArchivo` para notificar al componente padre.
   * 
   * @returns {void}
   */
  abrirModalCargaPorArchivo(): void {
    this.setModelCargaPorArchivo.emit(true);
  }

  /**
 * Método que asigna un objeto de tipo `Mercancia` al arreglo de mercancías seleccionadas para guardar.
 * @param {Mercancia} evento - Objeto de tipo `Mercancia` que ha sido seleccionado.
 */
  obtenerSeleccionadoMercancia(evento: Mercancia): void {
    this.seleccionadaguardarClicado = [evento];
  }

  /**
  * Método que elimina los objetos seleccionados del arreglo de mercancías guardadas.
  * @remarks
  * Este método verifica si hay elementos seleccionados antes de vaciar el arreglo `guardarClicado`.
  */
  eliminarSeleccionados(): void {
    if (this.seleccionadaguardarClicado.length > 0) {
      this.guardarClicado = [];
    }
  }
  /**
 * Validador de rango de fechas.
 * 
 * Este método valida que la fecha de inicio sea menor o igual a la fecha de fin.
 * Si la fecha de inicio es mayor a la fecha de fin, se genera una notificación de error.
 * 
 * @param {CertificadoOrigenComponent} component - Instancia del componente para acceder a sus propiedades.
 * @returns {ValidatorFn} Función de validación que retorna un error si las fechas no son válidas.
 */
  static dateRangeValidator(component: CertificadoDeOrigenComponent): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const START_DATE = formGroup.get('fechaInicioInput')?.value;
      const END_DATE = formGroup.get('fechaFinalInput')?.value;
  
      if (START_DATE && END_DATE) {
        const [START_DAY, START_MONTH, START_YEAR] = START_DATE.split('/').map(Number);
        const [END_DAY, END_MONTH, END_YEAR] = END_DATE.split('/').map(Number);
  
        const PARSED_START_DATE = new Date(START_YEAR, START_MONTH - 1, START_DAY);
        const PARSE_END_DATE = new Date(END_YEAR, END_MONTH - 1, END_DAY);
  
        if (PARSED_START_DATE > PARSE_END_DATE) {
          
          component.nuevaNotificacionUno = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: '',
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
   * @method aceptar
   * @description
   * Oculta el mensaje de error en el componente estableciendo la propiedad `mostrarError` en `false`.
   * Se utiliza generalmente como acción al aceptar una notificación o alerta mostrada al usuario.
   * 
   * @returns {void}
   */
  aceptar(): void {
    this.mostrarError = false;
  }

}
