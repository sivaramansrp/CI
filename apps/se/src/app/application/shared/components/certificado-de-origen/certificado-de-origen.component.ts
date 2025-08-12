import { AlertComponent, Catalogo, CatalogoSelectComponent, InputCheckComponent, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CARGA_MERCANCIA_SELECCIONADAS, CONFIGURACION_MERCANCIA, CONFIGURACION_MERCANCIA_TABLA, MERCANCIA_SELECCIONADAS, TEXTOS_REQUISITOS } from '../../constantes/modificacion.enum';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfiguracionColumna, MenusDesplegables } from '../../models/modificacion.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioSi } from '../../models/certificado-origen.model';
import { Mercancia } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';


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
    AlertComponent
  ],  
  templateUrl: './certificado-de-origen.component.html',
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
   * Estado de la selección de la tabla.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;

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
  async createForm(): Promise<void> {
    this.formCertificado = await this.fb.group({
      si: [false],
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
  bloque: ['', [Validators.required, Validators.min(0)]],
  fraccionArancelariaForm: ['', [Validators.maxLength(8)]],
  registroProductoForm: ['', [Validators.maxLength(12)]],
  nombreComercialForm: ['', [Validators.maxLength(200)]],
  fechaInicioInput: [''],
  fechaFinalInput: [''],
  nombres: ['', [Validators.maxLength(20)]],
  primerApellido: [''],
  segundoApellido: ['', [Validators.maxLength(20)]],
  numeroDeRegistroFiscal: ['', [Validators.maxLength(30)]],
  razonSocial: [''],
  calle: ['', [Validators.maxLength(90)]],
  numeroLetra: ['', [Validators.maxLength(30)]],
    });
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
   * @inheritdoc
   * 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
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
    this.setbuscarMercanciaEvent.emit(true);
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

 
}
