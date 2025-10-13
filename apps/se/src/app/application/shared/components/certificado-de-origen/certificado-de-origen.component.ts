import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  InputCheckComponent,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  Notificacion,
  SoloLetrasNumerosDirective,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {
  BOTON_DE_OPCION_VER,
  CARGA_MERCANCIA_EXPORT,
  CARGA_MERCANCIA_SELECCIONADAS,
  CONFIGURACION_MERCANCIA,
  CONFIGURACION_MERCANCIA_TABLA,
  FECHA_ID,
  MERCANCIA_SELECCIONADAS,
  REQUIREDA,
  TEXTOS_REQUISITOS,
} from '../../constantes/modificacion.enum';
import { Catalogo, CatalogoSelectComponent, EIGHT_DIGIT_NUMBER_REGEX } from '@ng-mf/data-access-user';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ConfiguracionColumna,
  MenusDesplegables,
} from '../../models/modificacion.enum';
import { CommonModule } from '@angular/common';
import { FormularioSi } from '../../models/certificado-origen.model';
import { Mercancia } from '../../models/modificacion.enum';
import { Modal } from 'bootstrap';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { RADIO_OPTIONS } from '../../../tramites/110214/constants/validar-inicialmente-certificado.enum';

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
  labelNombre: 'Fecha fin:',
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
    AlertComponent,
    NotificacionesComponent,
    forwardRef(() => SoloLetrasNumerosDirective),
    InputRadioComponent,
    InputRadioComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  providers: [ToastrService],
  styleUrl: './certificado-de-origen.component.scss',
})
export class CertificadoDeOrigenComponent
  implements OnDestroy, OnInit, OnChanges
{
  /**
   * Título mostrado en el componente.
   * Puede ser personalizado desde el componente padre mediante [title].
   * Si no se proporciona, se mostrará el valor por defecto: "Validación inicial del certificado de circulación de mercancías".
   */
  @Input() title: string =
    'Validación inicial del certificado de circulación de mercancías';

  /**
   * @property {boolean} domTercerOperador
   * @description
   * Propiedad de entrada que controla la visualización del domicilio del tercer operador.
   * Cuando es true, muestra los campos relacionados con el domicilio del tercer operador.
   */
  @Input() domTercerOperador: boolean = false;

  /**
   * @description
   * Indica si el radio button correspondiente al tercer operador está seleccionado.
   * Este valor se recibe como una entrada desde el componente padre.
   */
  @Input() domTercerOperadorRadio: boolean = false;

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
   * Indica si el componente está en modo de solo lectura.
   */
  radioOptions = RADIO_OPTIONS;

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
  @Input() mercanciasDisponibles!: boolean;
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
  mensajeDeAlerta: string =
    'Los datos marcados con asterisco son obligatorios. Favor de capturarlos.';

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
   * Propiedad de entrada que recibe los datos de los tratados/acuerdos para el certificado.
   * @type {Catalogo[]}
   */
  tratadoAcuerdoCertificado?: Catalogo[];

  /*
   * Propiedad de entrada que recibe los datos de los países bloqueados.
   * @type {Catalogo[]}
   */
  paisBloqueCertificado?: Catalogo[];
  /**
   * Propiedad de entrada que recibe el arreglo de países disponibles para seleccionar en el formulario.
   * @type {Catalogo[]}
   */
  circulacion?: Catalogo[];

  /**
   * Propiedad de entrada que recibe el tratado seleccionado.
   * @type {any}
   */
  @Output() tratadoSeleccionado = new EventEmitter<any>();
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
   * property {Catalogo[]} derechosList - Lista de derechos obtenida del servicio.
   */
  public derechosList!: Catalogo[];

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
  @Output() formCertificadoEvent: EventEmitter<{
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }> = new EventEmitter<{
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }>();

  /**
   * Propiedad de salida que emite el estado seleccionado.
   * @type {EventEmitter<Catalogo>}
   */
  @Output() tipoEstadoSeleccionEvent: EventEmitter<Catalogo> =
    new EventEmitter<Catalogo>();

  /**
   * Propiedad de salida que emite el país bloqueado seleccionado.
   * @type {EventEmitter<Catalogo>}
   */
  @Output() paisBloquEvent: EventEmitter<Catalogo> =
    new EventEmitter<Catalogo>();

  /**
   * Propiedad de salida que emite un valor booleano para buscar la mercancia.
   * @type {EventEmitter<boolean>}
   */
  @Output() setbuscarMercanciaEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  /**
   * @property {EventEmitter<boolean>} setModelCargaPorArchivo
   * @description
   * Evento de salida que emite un valor booleano para indicar que se debe abrir el modal de carga por archivo.
   * Permite notificar al componente padre para mostrar el modal correspondiente.
   */
  @Output() setModelCargaPorArchivo: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Propiedad de salida que emite la fila seleccionada de mercancia.
   * @type {EventEmitter<Mercancia>}
   */
  @Output() filaClics = new EventEmitter<Mercancia>();

  /**
   * Propiedad de salida que emite la fila seleccionada de mercancia.
   * @type {EventEmitter<Mercancia>}
   */
  @Output() filaClicsMercanciaSelecction = new EventEmitter<Mercancia>();

  /**
   * Propiedad de salida que emite la fila seleccionada de mercancia.
   * @type {EventEmitter<Mercancia>}
   */
  @Output() filaClicsMercanciaDisponibles = new EventEmitter<Mercancia>();

  /**
   * Este evento emite un arreglo de objetos de tipo `Mercancia` que han sido seleccionados o procesados.
   * @type {EventEmitter<Mercancia[]>}
   */
  @Output() guardarClicadoEvent: EventEmitter<Mercancia[]> = new EventEmitter<
    Mercancia[]
  >();

  /**
   * Propiedad que almacena un arreglo de objetos de tipo `Mercancia` seleccionados para ser guardados.
   * @type {Mercancia[]}
   */
  public seleccionadaguardarClicado: Mercancia[] = [];
  /**
   * @descripcion
   * Representa la mercancía seleccionada actualmente para ser guardada.
   * Inicialmente se define como un objeto vacío tipado como `Mercancia`.
   *
   * @type {Mercancia}
   */
  public seletedccionadaguardarClicado: Mercancia = {} as Mercancia;

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
   * @property {boolean} fechaFin
   * @description
   * Indica si el campo de fecha fin debe mostrarse en el formulario, dependiendo del procedimiento.
   */
  fechaBoton: boolean = false;
  /**
   * Indicates whether the domicile information should be displayed.
   * Set to `true` to show domicile details; otherwise, set to `false`.
   */
  @Input() public domicilio: boolean = true;

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
  configuracionTabla: ConfiguracionColumna<Mercancia>[] =
    CONFIGURACION_MERCANCIA;

  /**
   * Configuración de las columnas de la tabla de mercancia seleccionada.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTablaMercancia: ConfiguracionColumna<Mercancia>[] =
    MERCANCIA_SELECCIONADAS;

  /**
   * Configuración de las columnas de la tabla de mercancía disponible.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTablaMercanciaDisponible: ConfiguracionColumna<Mercancia>[] =
    CONFIGURACION_MERCANCIA_TABLA;

  /**
   * Configuración de las columnas de la tabla de mercancia seleccionada.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  @Input() cargaMercanciaConfiguracionTabla: ConfiguracionColumna<Mercancia>[] =
    CARGA_MERCANCIA_SELECCIONADAS;

  /**
   * @description
   * Configuración de las columnas disponibles para mostrar la tabla de mercancías.
   * Utiliza la constante `CARGA_MERCANCIA_EXPORT` como valor inicial para definir las columnas y su formato.
   */
  cargaMercanciaConfiguracionTablaDisponible: ConfiguracionColumna<Mercancia>[] =
    CARGA_MERCANCIA_EXPORT;
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
   * @descripcion
   * Evento que se emite cuando se hace clic en **guardar** en la tabla de mercancías.
   * Envía un arreglo de objetos `Mercancia` hacia el componente padre.
   */
  /**
   * @descripcion
   * Evento de salida que se emite cuando el usuario hace clic en **guardar**.
   *
   * @detalle
   * Envía al componente padre un arreglo de objetos `Mercancia` con la información
   * que debe procesarse o almacenarse.
   *
   * @ejemplo
   * ```html
   * <app-datos-certificado
   *   (guardarClicadoChange)="onGuardar($event)">
   * </app-datos-certificado>
   * ```
   *
   * @event guardarClicadoChange
   * @type {EventEmitter<Mercancia[]>}
   */
  @Output() guardarClicadoChange = new EventEmitter<Mercancia[]>();

  /**
   * @descripcion
   * Evento que se emite cuando una mercancía es **seleccionada** en la tabla.
   * Envía el objeto `Mercancia` seleccionado al componente padre.
   */
  @Output() seleccionado = new EventEmitter<Mercancia>();

  /**
   * @descripcion
   * Bandera para indicar si hay un error de validación en la tabla.
   * Se utiliza para mostrar mensajes de error al usuario.
   */
  tableErrorMensajeError: boolean = false;

  /**
   * @property {boolean} requerida
   * @description
   * Indica si determinados campos del formulario son obligatorios según el tipo de procedimiento.
   * Se establece como true cuando el ID del procedimiento está incluido en el arreglo REQUIREDA,
   * lo que activa validaciones adicionales en ciertos campos del formulario.
   */
  requerida: boolean = false;

  /**
   * Constructor del componente. Inicializa el formulario reactivo con los controles necesarios y sus validaciones.
   * @param fb FormBuilder para la creación del formulario reactivo.
   */
  constructor(
    private fb: FormBuilder,
    private service: CertificadoValidacionService,
    private validacionesService: ValidacionesFormularioService
  ) {
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
    this.formCertificado = this.fb.group(
      {
        si: [false],
        rangoDeFecha: [],
        entidadFederativa: ['', [Validators.required, Validators.min(0)]],
        bloque: ['', [Validators.required, Validators.min(0)]],
        fraccionArancelariaForm: [
          '',
          [
            Validators.maxLength(8),
            Validators.pattern(EIGHT_DIGIT_NUMBER_REGEX),
          ],
        ],
        registroProductoForm: ['', [Validators.maxLength(12)]],
        nombreComercialForm: ['', [Validators.maxLength(200)]],
        fechaInicioInput: [''],
        fechaFinalInput: [''],
        nombres: ['', [Validators.required, Validators.maxLength(20)]],
        primerApellido: ['', [Validators.required, Validators.maxLength(20)]],
        segundoApellido: ['', [Validators.maxLength(20)]],
        numeroDeRegistroFiscal: [
          '',
          [Validators.required, Validators.maxLength(30)],
        ],
        razonSocial: ['', Validators.required],
        calle: ['', [Validators.required, Validators.maxLength(90)]],
        numeroLetra: ['', [Validators.required, Validators.maxLength(30)]],
        numeroLetras: ['', [Validators.required, Validators.maxLength(30)]],
        pais: [''],
        ciudad: ['', Validators.required],
        lada: ['', Validators.required],
        telefono: ['', Validators.required],
        fax: [''],
        correo: ['', Validators.required],
        correoElectronico: [''],
        domTercerOperador: [''],
        // Nuevos controles de formulario para el procedimiento 110222
        calle1: ['', Validators.required],
        numeroLetra1: ['', Validators.required],
        ciudad1: ['', Validators.required],
        pais1: [''],
        correo1: ['', Validators.required],
        telefono1: [''],
        fax1: [''],
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

    if (!PRIMER_APELLIDO || !CALLE || !NUMERO_LETRA) {
      return;
    }

    if (this.idProcedimiento === 110205) {
      PRIMER_APELLIDO.setValidators([Validators.maxLength(20)]);
      CALLE.setValidators([Validators.maxLength(90)]);
      NUMERO_LETRA.setValidators([Validators.maxLength(30)]);
    } else {
      PRIMER_APELLIDO.setValidators([
        Validators.required,
        Validators.maxLength(20),
      ]);
      CALLE.setValidators([Validators.required, Validators.maxLength(90)]);
      NUMERO_LETRA.setValidators([
        Validators.required,
        Validators.maxLength(30),
      ]);
    }

    PRIMER_APELLIDO.updateValueAndValidity();
    CALLE.updateValueAndValidity();
    NUMERO_LETRA.updateValueAndValidity();
  }
  /**
   * Valida un campo del formulario.
   *
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  /**
   * method loadComboUnidadMedida
   * description Carga la lista de derechos desde el servicio.
   */
  loadComboUnidadMedida(): void {
    this.service
      .getDatos('110222') // Llama al servicio para obtener los datos.
      .pipe(takeUntil(this.destroyNotifier$)) // Finaliza la suscripción al destruir el componente.
      .subscribe((data): void => {
        // Maneja los datos recibidos.
        this.derechosList = data as Catalogo[]; // Asigna los datos a la lista de derechos.
      });
  }

  /**
   * Aplica validaciones específicas para los campos del domicilio del tercer operador en el procedimiento 110222.
   *
   * @remarks
   * Este método establece validaciones obligatorias para los campos específicos del procedimiento 110222.
   */
  applyTercerOperadorValidation(): void {
    if (this.idProcedimiento === 110222) {
      const CALLE1 = this.formCertificado.get('calle1');
      const NUMERO_LETRA1 = this.formCertificado.get('numeroLetra1');
      const CIUDAD1 = this.formCertificado.get('ciudad1');
      const PAIS1 = this.formCertificado.get('pais1');
      const CORREO1 = this.formCertificado.get('correo1');

      if (CALLE1) {
        CALLE1.setValidators([Validators.required, Validators.maxLength(90)]);
        CALLE1.updateValueAndValidity();
      }

      if (NUMERO_LETRA1) {
        NUMERO_LETRA1.setValidators([
          Validators.required,
          Validators.maxLength(30),
        ]);
        NUMERO_LETRA1.updateValueAndValidity();
      }

      if (CIUDAD1) {
        CIUDAD1.setValidators([Validators.required, Validators.maxLength(100)]);
        CIUDAD1.updateValueAndValidity();
      }

      if (PAIS1) {
        PAIS1.setValidators([Validators.required]);
        PAIS1.updateValueAndValidity();
      }

      if (CORREO1) {
        CORREO1.setValidators([
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
        ]);
        CORREO1.updateValueAndValidity();
      }
    }
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosForm']?.currentValue) {
      if (!this.formCertificado) {
        this.createForm();
      }
      this.formCertificado.patchValue(this.datosForm);
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
    if (
      this.formCertificado.get('fraccionArancelariaForm')?.errors?.['pattern']
    ) {
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
    } else {
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
    this.fechaBoton = BOTON_DE_OPCION_VER.includes(this.idProcedimiento);
    this.inicializarEstadoFormulario();
    this.applyTercerOperadorValidation(); // Add validation for procedure 110222
    this.nuevaNotificacion = {} as Notificacion;
    this.inicializarFormularioArchivo();
    this.loadComboUnidadMedida();
    this.getPaisBloque();
    this.getPais();
    this.getTratado();
    if (REQUIREDA.includes(this.idProcedimiento)) {
      this.requerida = true;
    }
  }

  /**
   * @description
   * Valida los campos principales del formulario de certificado.
   * Verifica que los campos `entidadFederativa` y `bloque` tengan valores válidos
   * (no vacíos ni nulos). Si ambos son válidos, retorna `true`.
   * En caso contrario, marca todos los controles del formulario como "touched"
   * y retorna `false`.
   *
   * @returns {boolean} `true` si el formulario es válido; `false` en caso contrario.
   */
  validarFormularios(): boolean {
    if (
      this.formCertificado.get('entidadFederativa')?.value !== '' &&
      this.formCertificado.get('entidadFederativa')?.value !== null &&
      this.formCertificado.get('bloque')?.value !== '' &&
      this.formCertificado.get('bloque')?.value !== null
    ) {
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
  setValoresStore(
    formGroupName: string,
    campo: string,
    storeStateName: string
  ): void {
    const VALOR = this.formCertificado.get(campo)?.value;
    this.formaValida.emit(this.formCertificado.valid);
    this.formCertificadoEvent.emit({
      formGroupName,
      campo,
      valor: VALOR,
      storeStateName,
    });
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
    if (
      this.formCertificado.get('entidadFederativa')?.value !== '' &&
      this.formCertificado.get('entidadFederativa')?.value !== null &&
      this.formCertificado.get('bloque')?.value !== '' &&
      this.formCertificado.get('bloque')?.value !== null
    ) {
      this.setbuscarMercanciaEvent.emit(true);
    } else {
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
    };
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor El nuevo valor de la fecha de inicio.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicioInput')?.setValue(nuevo_valor);
    this.setValoresStore('formCertificado', 'fechaInicioInput', nuevo_valor);
    this.formCertificado.get('fechaInicioInput')?.markAsUntouched();
  }

  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor El nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {
    this.formCertificado.get('fechaFinalInput')?.setValue(nuevo_valor);
    this.setValoresStore('formCertificado', 'fechaFinalInput', nuevo_valor);
    this.formCertificado.get('fechaFinalInput')?.markAsUntouched();
  }

  /**
   * Método que emite el evento para abrir el modal de modificación con los datos de la mercancia seleccionada.
   * @param datos1 Los datos de la mercancia seleccionada.
   */
  abrirModificarModal(datos1: Mercancia): void {
    this.filaClics.emit(datos1);
    this.filaClicsMercanciaDisponibles.emit(datos1);
  }

  /**
   * Opens a modal and emits an event indicating that a row has been clicked.
   *
   * @remarks
   * This method triggers the `filaClics` event emitter.
   *
   * @returns {void}
   */
  abrirModal(): void {
    if (this.seleccionadaguardarClicado.length > 0) {
      this.filaClics.emit(this.seletedccionadaguardarClicado);
      this.filaClicsMercanciaSelecction.emit(
        this.seletedccionadaguardarClicado
      );
    } else {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Debes seleccionar una mercancía',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
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
    this.seletedccionadaguardarClicado = evento;
    this.seleccionadaguardarClicado = [evento];
    this.seleccionado.emit(evento);
  }

  /**
   * Método que elimina los objetos seleccionados del arreglo de mercancías guardadas.
   * @remarks
   * Este método verifica si hay elementos seleccionados antes de vaciar el arreglo `guardarClicado`.
   */
  eliminarSeleccionados(): void {
    if (
      this.seleccionadaguardarClicado.length > 0 &&
      this.guardarClicado?.length > 0
    ) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'info',
        titulo: 'Confirmación requerida',
        mensaje: '¿Desea eliminar este dato?',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Sí',
        txtBtnCancelar: 'No',
      };
    } else {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'No hay elementos seleccionados para eliminar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
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
  static dateRangeValidator(
    component: CertificadoDeOrigenComponent
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const START_DATE = formGroup.get('fechaInicioInput')?.value;
      const END_DATE = formGroup.get('fechaFinalInput')?.value;

      if (START_DATE && END_DATE) {
        const [START_DAY, START_MONTH, START_YEAR] =
          START_DATE.split('/').map(Number);
        const [END_DAY, END_MONTH, END_YEAR] = END_DATE.split('/').map(Number);

        const PARSED_START_DATE = new Date(
          START_YEAR,
          START_MONTH - 1,
          START_DAY
        );
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
  /**
   * @descripcion
   * Verifica la validez del formulario `formCertificado` aplicando validadores dinámicos
   * según la selección del usuario y validando también la tabla de mercancías asociada.
   *
   * @detalle
   * - Si el control `si` está marcado, agrega validadores obligatorios y de longitud máxima
   *   a los campos `nombres`, `primerApellido`, `numeroDeRegistroFiscal` y `razonSocial`.
   * - Si no está marcado, limpia los validadores de esos controles.
   * - Actualiza la validez de cada control después de aplicar o limpiar validadores.
   * - Marca todos los campos como "tocados" (`markAllAsTouched`) si el formulario es inválido.
   * - Valida que exista al menos un registro en la colección `guardarClicado`.
   * - Muestra un mensaje de error en la tabla si no hay registros.
   *
   * @returns {boolean}
   * `true` si el formulario y la tabla son válidos, `false` en caso contrario.
   *
   * @ejemplo
   * ```ts
   * if (this.validatorCheck()) {
   *   // Proceder con el guardado
   * } else {
   *   // Mostrar errores en pantalla
   * }
   * ```
   */
  validatorCheck(): boolean {
    if (!this.formCertificado) {
      return false;
    }

    const CONTROL_NOMBRES = this.formCertificado.get('nombres');
    const CONTROL_PRIMER_APELLIDO = this.formCertificado.get('primerApellido');
    const CONTROL_NUMERO_REGISTRO = this.formCertificado.get(
      'numeroDeRegistroFiscal'
    );
    const CONTROL_RAZON_SOCIAL = this.formCertificado.get('razonSocial');

    if (this.formCertificado.get('si')?.value) {
      CONTROL_NOMBRES?.setValidators([
        Validators.required,
        Validators.maxLength(20),
      ]);
      CONTROL_PRIMER_APELLIDO?.setValidators([
        Validators.required,
        Validators.maxLength(20),
      ]);
      CONTROL_NUMERO_REGISTRO?.setValidators([
        Validators.required,
        Validators.maxLength(30),
      ]);
      CONTROL_RAZON_SOCIAL?.setValidators([
        Validators.required,
        Validators.maxLength(200),
      ]);
    } else {
      CONTROL_NOMBRES?.clearValidators();
      CONTROL_PRIMER_APELLIDO?.clearValidators();
      CONTROL_NUMERO_REGISTRO?.clearValidators();
      CONTROL_RAZON_SOCIAL?.clearValidators();
    }

    // 🔹 Update all
    CONTROL_NOMBRES?.updateValueAndValidity();
    CONTROL_PRIMER_APELLIDO?.updateValueAndValidity();
    CONTROL_NUMERO_REGISTRO?.updateValueAndValidity();
    CONTROL_RAZON_SOCIAL?.updateValueAndValidity();

    const IS_REGISTRO_FORM_VALID = this.formCertificado.valid;

    if (!IS_REGISTRO_FORM_VALID) {
      this.formCertificado.markAllAsTouched();
    }

    if (this.guardarClicado.length === 0) {
      this.tableErrorMensajeError = true;
      return false;
    }

    return IS_REGISTRO_FORM_VALID;
  }
  /**
   * @descripcion
   * Elimina de la lista `guardarClicado` los elementos previamente seleccionados
   * cuando se recibe un evento de confirmación, y notifica el cambio al componente padre.
   *
   * @detalle
   * - Obtiene los IDs de los elementos seleccionados en `seleccionadaguardarClicado`.
   * - Filtra `guardarClicado` eliminando los que coincidan con esos IDs.
   * - Emite el evento `guardarClicadoChange` con la nueva lista de mercancías.
   * - Reinicia la notificación (`nuevaNotificacion`) a un objeto vacío.
   *
   * @param {boolean} event
   * Indica si se debe proceder con la eliminación (`true`) o no (`false`).
   *
   * @returns {void}
   * No retorna ningún valor.
   *
   * @ejemplo
   * ```ts
   * this.eliminarErrorMessage(true); // Elimina los elementos seleccionados
   * this.eliminarErrorMessage(false); // No realiza ninguna acción
   * ```
   */
  eliminarErrorMessage(event: boolean): void {
    if (event) {
      const IDS_A_ELIMINAR = this.seleccionadaguardarClicado.map((m) => m.id);
      this.guardarClicado = this.guardarClicado.filter(
        (m) => !IDS_A_ELIMINAR.includes(m.id)
      );
      this.guardarClicadoChange.emit(this.guardarClicado);
    }
    this.nuevaNotificacion = {} as Notificacion;
  }

  /**
   * @method onNombreInput
   * @description
   * Maneja los cambios en el campo de nombre del formulario.
   * Cuando se ingresa un valor en el campo de nombre, limpia y deshabilita el campo de razón social,
   * ya que estos campos son mutuamente excluyentes (persona física vs. persona moral).
   * Cuando se borra el valor del nombre, habilita nuevamente el campo de razón social.
   *
   * @param {Event} event - Evento del input que contiene el valor del campo de nombre.
   * @returns {void}
   */
  onNombreInput(event: Event): void {
    const NOMBRE = (event.target as HTMLInputElement).value.trim();

    if (NOMBRE) {
      this.formCertificado.patchValue(
        { razonSocial: '' },
        { emitEvent: false }
      );
      this.formCertificado.get('razonSocial')?.disable({ emitEvent: false });
    } else {
      this.formCertificado.get('razonSocial')?.enable({ emitEvent: false });
    }
  }
  /**
   * @method onRazonSocialInput
   * @description
   * Maneja los cambios en el campo de razón social del formulario.
   * Cuando se ingresa un valor en la razón social, limpia y deshabilita los campos relacionados con persona física
   * (nombres, primerApellido, segundoApellido), ya que estos campos son mutuamente excluyentes.
   * Cuando se borra el valor de la razón social, habilita nuevamente los campos de persona física.
   *
   * @param {Event} event - Evento del input que contiene el valor del campo de razón social.
   * @returns {void}
   */
  onRazonSocialInput(event: Event): void {
    const RAZONSOCIAL = (event.target as HTMLInputElement).value.trim();
    if (RAZONSOCIAL) {
      this.formCertificado.patchValue(
        {
          nombres: '',
          primerApellido: '',
          segundoApellido: '',
        },
        { emitEvent: false }
      );
      this.formCertificado.get('nombres')?.disable({ emitEvent: false });
      this.formCertificado.get('primerApellido')?.disable({ emitEvent: false });
      this.formCertificado
        .get('segundoApellido')
        ?.disable({ emitEvent: false });
    } else {
      this.formCertificado.get('nombres')?.enable({ emitEvent: false });
      this.formCertificado.get('primerApellido')?.enable({ emitEvent: false });
      this.formCertificado.get('segundoApellido')?.enable({ emitEvent: false });
    }
  }

  /**
   * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
   *
   * @returns {void}
   */
  getTratado(): void {
    this.service
      .getTratadoCertificado(this.idProcedimiento.toString(), 'TITRAC.TA')
      .subscribe((data) => {
        this.tratadoAcuerdoCertificado = data as Catalogo[];
      });
  }

  /**
   * Obtiene el catálogo de países o bloques desde el servicio y lo asigna a la propiedad `paisBloqueCertificado`.
   *
   * @returns {void}
   */
  getPaisBloque(): void {
    this.service
      .getPaises(this.idProcedimiento.toString())
      .subscribe((data) => {
        this.paisBloqueCertificado = data as Catalogo[];
      });
  }

   /**
   * Obtiene el catálogo de países o bloques desde el servicio y lo asigna a la propiedad `paisBloqueCertificado`.
   * 
   * @returns {void}
   */
  getPais():void{
    this.service.getDatos(this.idProcedimiento.toString()).subscribe((data) => {
      this.circulacion = data as Catalogo[];
    });
  }

  /**
   * Getter para obtener el catálogo de tratados o acuerdos.
   * Si `tratadoAcuerdoCertificado` tiene datos, retorna ese arreglo; de lo contrario, retorna `tratadoAcuerdo`.
   *
   * @returns {Catalogo[]} El catálogo de tratados o acuerdos.
   */
  get catalogoTratado(): Catalogo[] {
    return this.tratadoAcuerdoCertificado?.length
      ? this.tratadoAcuerdoCertificado
      : this.tratadoAcuerdo;
  }

  /**
   * Getter para obtener el catálogo de países o bloques.
   * Si `paisBloqueCertificado` tiene datos, retorna ese arreglo; de lo contrario, retorna `paisBloqu`.
   *
   * @returns {Catalogo[]} El catálogo de países o bloques.
   */
  get paisBloqueCertificadoGet(): Catalogo[] {
    return this.paisBloqueCertificado?.length
      ? this.paisBloqueCertificado
      : this.paisBloqu;
  }

  /**
   * Getter para obtener el catálogo de países o bloques.
   * Si `paisBloqueCertificado` tiene datos, retorna ese arreglo; de lo contrario, retorna `paisBloqu`.
   * 
   * @returns {Catalogo[]} El catálogo de países o bloques.
   */
  get paisGet(): Catalogo[]{
    return this.circulacion?.length
      ? this.circulacion
      : this.paises;
  }

  /**
   * Getter method to access form control values from parent components
   * @param controlName - Name of the form control to get value from
   * @returns The value of the specified form control
   */
  public getFormControlValue(controlName: string): unknown {
    return this.formCertificado?.get(controlName)?.value;
  }

  /**
   * Getter method specifically for entidadFederativa control
   * @returns The value of entidadFederativa form control
   */
  public get entidadFederativaValue(): string | null {
    return this.formCertificado?.get('entidadFederativa')?.value || null;
  }

  /**
   * Getter method specifically for entidadFederativa control
   * @returns The value of entidadFederativa form control
   */
  public get bloqueValue(): string | null {
    return this.formCertificado?.get('bloque')?.value || null;
  }
  
  /**
   * @description
   * Actualiza el valor del campo `domTercerOperador` dentro del formulario de certificado
   * cuando el usuario selecciona una opción en el radio button o lista correspondiente.
   *
   * @param {string | number} evento Valor seleccionado que se asignará al campo `domTercerOperador`.
   * @returns {void}
   */
  domTercerOperadorSelecction(evento: string | number): void {
    this.formCertificado.patchValue({
      domTercerOperador: evento,
    });
  }
}
