import {
  ALERTA_DE_MANIFESTO_Y_DECLARACIONES,
  ALERTA_OPCIONS,
  MENSAJE_EMERGENTE_DE_CONFIRMACION,
  MENSAJE_SIN_FILA_SELECCIONADA,
  MODIFICADOR_MENSAJE_NO_FILA_SELECCIONADA,
  MOSTRAR_NOTIFICACION,
  NUMERO_TRAMITE,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_REGIMEN_Y_ADUNADEENTRADAS,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO,
  PROCEDIMIENTOS_NO_PARA_MANIFIESTOS_Y_DECLARACIONES,
  PROCEDIMIENTOS_PARA_CORREO_ELECTRONICO_EN_MISMA_FILA,
  PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO,
  PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO,
  PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA,
  PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL,
  REPRESENTANTE_LEGAL,
  TEXTO_MANIFESTO_Y_DECLARACIONES
} from '../../constantes/datos-solicitud.enum';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertComponent,
  CatalogoSelectComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_IMPORTE_PAGO,
  REGEX_RFC,
  REGEX_SOLO_DIGITOS,
  REGEX_SOLO_NUMEROS,
  TablaDinamicaComponent,
  TituloComponent
} from '@libs/shared/data-access-user/src';
import {
  Catalogo,
  DatosDeTablaSeleccionados,
  DatosSolicitudFormState,
  OpcionConfig,
  ScianConfig,
  TablaMercanciasConfig,
  TablaMercanciasDatos,
  TablaOpcionConfig,
  TablaScianConfig
} from '../../models/datos-solicitud.model';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { delay, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Subject } from 'rxjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import radio_si_no from '@libs/shared/theme/assets/json/260103/radio_si_no.json';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    NotificacionesComponent,
    TooltipModule,
    InputRadioComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para cancelar suscripciones activas al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ScianConfig<TablaScianConfig>} scianConfig
   * Configuración de la tabla SCIAN recibida como input.
   */
  @Input() public scianConfig!: ScianConfig<TablaScianConfig>;

  /**
   * @property {TablaMercanciasConfig<TablaMercanciasDatos>} tablaMercanciasConfig
   * Configuración de la tabla de mercancías recibida como input.
   */
  @Input()
  public tablaMercanciasConfig!: TablaMercanciasConfig<TablaMercanciasDatos>;

  /**
   * @property {OpcionConfig<TablaOpcionConfig>} opcionConfig
   * Configuración de la tabla de opciones.
   */
  @Input() public opcionConfig!: OpcionConfig<TablaOpcionConfig>;

  /**
   * @property {DatosSolicitudFormState} datosSolicitudFormState
   * Estado inicial del formulario de solicitud, recibido como input.
   */
  @Input() public datosSolicitudFormState!: DatosSolicitudFormState;

  /**
   * @property {boolean} opcionesColapsableState
   * Estado colapsable inicial para mostrar u ocultar ciertas secciones.
   */
  @Input() public opcionesColapsableState!: boolean;

  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @event opcionSeleccionado
   * Emite las opciones seleccionadas al componente padre.
   */
  @Output() opcionSeleccionado: EventEmitter<TablaOpcionConfig[]> =
    new EventEmitter<TablaOpcionConfig[]>();

  /**
   * @event scianSeleccionado
   * Emite los registros seleccionados de SCIAN.
   */
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig[]> =
    new EventEmitter<TablaScianConfig[]>();

  /**
   * @event mercanciasSeleccionado
   * Emite los registros de mercancías seleccionados.
   */
  @Output() mercanciasSeleccionado: EventEmitter<TablaMercanciasDatos[]> =
    new EventEmitter<TablaMercanciasDatos[]>();

  /**
   * @event datosDeTablaSeleccionados
   * Emite una estructura que agrupa las selecciones de SCIAN, opciones y mercancías.
   */
  @Output() datosDeTablaSeleccionados: EventEmitter<DatosDeTablaSeleccionados> =
    new EventEmitter<DatosDeTablaSeleccionados>();

  /**
   * @event datasolicituActualizar
   * Emite el estado actualizado del formulario cada vez que cambia su valor.
   */
  @Output() datasolicituActualizar: EventEmitter<DatosSolicitudFormState> =
    new EventEmitter<DatosSolicitudFormState>();

  /**
   * @property {FormGroup} datosSolicitudForm
   * Formulario reactivo principal del componente.
   */
  public datosSolicitudForm!: FormGroup;

  /**
   * @property {Catalogo[]} estadoDatos
   * Lista de estados para catálogos relacionados.
   */
  public estadoDatos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} regimenDatos
   * Lista de regímenes disponibles.
   */
  public regimenDatos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} adunasDeEntradasDatos
   * Lista de aduanas de entrada disponibles.
   */
  public adunasDeEntradasDatos: Catalogo[] = [];

  /**
   * @property {string} infoAlert
   * Clase CSS usada para mostrar alertas informativas.
   */
  public infoAlert = 'alert-info';

  /**
   * @property {string} alertaDeManifestoContenido
   * Mensaje de alerta relacionado con el manifiesto y declaraciones.
   */
  public alertaDeManifestoContenido = ALERTA_DE_MANIFESTO_Y_DECLARACIONES;

  /**
   * @property {string} textoManifestoContenido
   * Texto que se muestra en el manifiesto y declaraciones.
   */
  public textoManifestoContenido = TEXTO_MANIFESTO_Y_DECLARACIONES;

  /**
   * @property {string} alertaOpicion
   * Mensaje de alerta para la tabla de opciones.
   */
  public alertaOpicion = ALERTA_OPCIONS;

  /**
   * @property {TablaMercanciasDatos[]} tablaMercanciasLista
   * Lista de mercancías mostradas en la tabla.
   */
  public tablaMercanciasLista: TablaMercanciasDatos[] = [];

  /**
   * @property {TablaScianConfig[]} scianLista
   * Lista de registros SCIAN seleccionados.
   */
  public scianLista: TablaScianConfig[] = [];

  /**
   * @property {TablaOpcionConfig[]} opcionLista
   * Lista de opciones seleccionadas.
   */
  public opcionLista: TablaOpcionConfig[] = [];

  /**
   * @property {boolean} opcionesColapsable
   * Controla el estado de colapsado de la sección de opciones.
   */
  public opcionesColapsable = false;

  /**
   * @property {boolean} mostrarElementoColapsable
   * Controla si se debe mostrar un elemento colapsable en la interfaz de usuario.
   *
   * @description
   * Este valor se utiliza para determinar si un elemento colapsable debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarElementoColapsable = true;

  /**
   * @property {boolean} mostrarCorreoElectronico
   * Controla la visibilidad del campo de correo electrónico en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de correo electrónico debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarCorreoElectronico = true;

  /**
   * Indica si se debe mostrar el campo de correo electrónico en la interfaz.
   * @type {boolean}
   */
  public mostrarCorreoElectronicoenMismaFila = true;

  /**
   * Indica si se debe mostrar la sección del representante legal en la interfaz.
   * @type {boolean}
   */
  public mostrarRepresentanteLegal = true;

  /**
   * @property {boolean} mostrarRFCSanitario
   * Controla la visibilidad del campo de RFC sanitario en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de RFC sanitario debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarRFCSanitario = true;

  /**
   * @property {boolean} mostrarRFCCalle
   * Controla la visibilidad del campo de RFC de calle en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de RFC de calle debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarRFCCalle = true;

  /**
   * @property {Catalogo[]} regimenLaMercanciaDatos
   * Lista de regímenes relacionados con la mercancía.
   *
   * @description
   * Esta propiedad se utiliza para almacenar los regímenes asociados a la mercancía,
   * que son seleccionados por el usuario en el formulario.
   */
  public regimenLaMercanciaDatos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} aduanaDatos
   * Lista de aduanas relacionadas con la mercancía.
   *
   * @description
   * Esta propiedad se utiliza para almacenar las aduanas asociadas a la mercancía,
   * que son seleccionadas por el usuario en el formulario.
   */
  public aduanaDatos: Catalogo[] = [];

  /**
   * @property {boolean} mostrarRegimenYAdunasDeEntradasDatos
   * Controla la visibilidad de los campos de régimen y aduanas de entrada en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si los campos relacionados con el régimen y las aduanas de entrada
   * deben ser visibles o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarRegimenYAdunasDeEntradasDatos: boolean = true;

  /**
   * @property {string[]} elementosAnadidos
   * Lista de elementos adicionales que se deben mostrar en el formulario.
   */
  @Input() public elementosAnadidos!: string[];

  /**
   * @property {string[]} elementosRequeridos
   * Lista de elementos que son obligatorios en el formulario.
   */
  @Input() public elementosRequeridos!: string[];

  public etiquetaMunicipio: string = 'Municipio o alcaldía';

  /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;

  /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public confirmacionAlerta: boolean = false;

  /**
   * Mensaje de alerta que se muestra al usuario.
   * @property {string} mensajeDeAlerta
   */
  public mensajeDeAlerta: string = MENSAJE_SIN_FILA_SELECCIONADA;

  /**
   * Mensaje de alerta que se muestra cuando no se ha seleccionado
   * una fila o se han seleccionado más de una al intentar modificar.
   *
   * Se inicializa con la constante `MODIFICADOR_MENSAJE_NO_FILA_SELECCIONADA`.
   */
  public modificadorMensajeDeAlerta: string =
    MODIFICADOR_MENSAJE_NO_FILA_SELECCIONADA;

  /**
   * Mensaje emergente que solicita confirmación al usuario antes
   * de ejecutar una acción importante (por ejemplo, eliminar un registro).
   *
   * Se inicializa con la constante `MENSAJE_EMERGENTE_DE_CONFIRMACION`.
   */
  public mensajeEmergenteConfirmacion: string =
    MENSAJE_EMERGENTE_DE_CONFIRMACION;

  /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Objeto que representa una nueva notificación de eliminación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacionEliminar!: Notificacion;

  /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * @description
   * Indica si se debe mostrar la notificación.
   */
  mostrarNotificacion: boolean = false;

  /** Indica si se debe mostrar la alerta del RFC. */
  mostrarRfcAlerta: boolean = false;

  /** Nueva notificación relacionada con el RFC. */
  public nuevaRfcNotificacion!: Notificacion;

  /** Nueva notificación relacionada con el RFC. */
  public seleccionarFilaNotificacion!: Notificacion;
  /**
   * Representa el estado de un grupo de botones de radio, inicializado con el valor `radio_si_no`.
   * Esto se utiliza típicamente para manejar opciones binarias (por ejemplo, Sí/No).
   */
  public radioBtn = radio_si_no;
  /**
   * Representa el valor de selección predeterminado para un componente específico.
   * Esto puede ser una cadena o un número, inicializado como una cadena vacía.
   */
  public predeterminadoSeleccionar: string | number = '';

  /** Indica si el trámite es un manifiesto. */
  esManifesto: boolean = false;

  /**
   * Indica si el campo utiliza punto y coma como separador.
   */
  esPuntoYComa: boolean = false;

  /**
   * @constructor
   * Inyecta los servicios necesarios para el enrutamiento y construcción del formulario.
   *
   * @param fb - FormBuilder para crear el formulario reactivo.
   * @param router - Servicio de enrutamiento.
   * @param activatedRoute - Ruta actual activa.
   */
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public datosSolicitudService: DatosSolicitudService
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'regimenDatos',
      '/cofepris/regimenDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'adunasDeEntradasDatos',
      '/cofepris/adunasDeEntradasDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'estadoDatos',
      '/cofepris/estadoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'regimenLaMercanciaDatos',
      '/cofepris/regimenLaMercanciaDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'aduanaDatos',
      '/cofepris/aduanaDatos.json'
    );
    this.seleccionarFilaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: this.mensajeDeAlerta,
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Crea el formulario, activa la escucha de cambios y sincroniza el estado con el input.
   */
  ngOnInit(): void {
     this.crearDatosSolicitudForm();
    this.actualizarDatosFormularioSolicitud();
    this.esManifesto =
      PROCEDIMIENTOS_NO_PARA_MANIFIESTOS_Y_DECLARACIONES.includes(
        this.idProcedimiento
      );
    this.mostrarNotificacion = MOSTRAR_NOTIFICACION.includes(
      this.idProcedimiento
    )
      ? true
      : false;
   
    this.mostrarCorreoElectronico =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC.includes(
        this.idProcedimiento
      )
        ? false
        : true;

    this.datosSolicitudForm.valueChanges
      .pipe(takeUntil(this.destroyNotifier$), delay(10))
      .subscribe((value) => {
        if (value) {
          const VALORES_COMPLETOS = this.datosSolicitudForm.getRawValue();
          this.datasolicituActualizar.emit(VALORES_COMPLETOS);
        }
      });

    this.opcionesColapsable = this.opcionesColapsableState;
    this.mostrarElementoColapsable =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE.includes(this.idProcedimiento)
        ? false
        : true;
    this.mostrarRFCSanitario =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO.includes(
        this.idProcedimiento
      )
        ? false
        : true;
    this.mostrarRFCCalle = PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE.includes(
      this.idProcedimiento
    )
      ? false
      : true;

    this.mostrarCorreoElectronicoenMismaFila =
      PROCEDIMIENTOS_PARA_CORREO_ELECTRONICO_EN_MISMA_FILA.includes(
        this.idProcedimiento
      )
        ? true
        : false;

    this.mostrarRepresentanteLegal = REPRESENTANTE_LEGAL.includes(
      this.idProcedimiento
    )
      ? false
      : true;

    this.mostrarRegimenYAdunasDeEntradasDatos =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_REGIMEN_Y_ADUNADEENTRADAS.includes(
        this.idProcedimiento
      )
        ? false
        : true;

    this.etiquetaMunicipio =
      this.idProcedimiento === NUMERO_TRAMITE.TRAMITE_260103
        ? 'Municipio y alcaldía'
        : 'Municipio o alcaldía';

    if (this.formularioDeshabilitado) {
      this.datosSolicitudForm.disable();
    }
  }

  /**
   * @method crearDatosSolicitudForm
   * @description Crea y configura el formulario reactivo `datosSolicitudForm` con los campos necesarios
   *              para capturar la información de la solicitud. Cada campo incluye validaciones como
   *              longitud mínima, longitud máxima y obligatoriedad.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  crearDatosSolicitudForm(): void {
    this.datosSolicitudForm = this.fb.group({
      rfcSanitario: [
        this.datosSolicitudFormState.rfcSanitario,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern(REGEX_RFC),
        ],
      ],
      denominacionRazon: [
        this.datosSolicitudFormState.denominacionRazon,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
        ],
      ],
      correoElectronico: [
        this.datosSolicitudFormState.correoElectronico,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.email,
        ],
      ],
      codigoPostal: [
        this.datosSolicitudFormState.codigoPostal,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(12),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      estado: [
        this.datosSolicitudFormState.estado,
        [Validators.required, Validators.minLength(2)],
      ],
      municipioAlcaldia: [
        {
          value: this.datosSolicitudFormState.municipioAlcaldia,
          disabled:
            PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA.includes(
              this.idProcedimiento
            ),
        },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
        ],
      ],
      localidad: [
        this.datosSolicitudFormState.localidad,
        [Validators.pattern(REGEX_IMPORTE_PAGO)],
      ],
      colonia: [this.datosSolicitudFormState.colonia],
      calleYNumero: [
        this.datosSolicitudFormState.calleYNumero,
        [Validators.required],
      ],
      calle: [this.datosSolicitudFormState.calle, [Validators.required]],
      lada: [
        this.datosSolicitudFormState.lada,
        [Validators.maxLength(5), Validators.pattern(REGEX_SOLO_DIGITOS)],
      ],
      telefono: [
        this.datosSolicitudFormState.telefono,
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(REGEX_SOLO_DIGITOS),
        ],
      ],
      aviso: [this.datosSolicitudFormState.aviso],
      licenciaSanitaria: [
        this.datosSolicitudFormState.licenciaSanitaria,
        [Validators.required],
      ],
      regimen: [this.datosSolicitudFormState.regimen, [Validators.required]],
      adunasDeEntradas: [
        this.datosSolicitudFormState.adunasDeEntradas
          ? this.datosSolicitudFormState.adunasDeEntradas
          : '',
        [Validators.required],
      ],
      aeropuerto: [
        this.datosSolicitudFormState.aeropuerto,
        [Validators.required],
      ],
      publico: [this.datosSolicitudFormState.publico, [Validators.required]],
      representanteRfc: [
        this.datosSolicitudFormState.representanteRfc,
        [Validators.required],
      ],
      representanteNombre: [
        {
          value: this.datosSolicitudFormState.representanteNombre,
          disabled:
            PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL.includes(
              this.idProcedimiento
            ),
        },
        [Validators.required],
      ],
      apellidoPaterno: [
        {
          value: this.datosSolicitudFormState.apellidoPaterno,
          disabled: PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO.includes(
            this.idProcedimiento
          ),
        },
        [Validators.required],
      ],
      apellidoMaterno: [
        {
          value: this.datosSolicitudFormState.apellidoMaterno,
          disabled: PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO.includes(
            this.idProcedimiento
          ),
        },
      ],
      regimenLaMercancia: ['101', [Validators.required]],
      aduana: [this.datosSolicitudFormState.aduana, [Validators.required]],
      mercancias: [[], Validators.required],
      manifesto: [
        this.datosSolicitudFormState.manifesto,
        [Validators.required],
      ],
    });

    if (this.mostrarNotificacion) {
      const EMPTY = Object.entries(this.datosSolicitudFormState)
        .filter(([key]) => key !== 'publico')
        .every(([, value]) => !value);
      if (EMPTY) {
        this.alternarControlesDeFormulario(false);
      }
    }
  }

  /**
 * @method actualizarDatosFormularioSolicitud
 * @description Actualiza las validaciones de los campos del formulario `datosSolicitudForm`
 * en función de los procedimientos definidos en `CAMPOS_REQUERIDOS_FORMULARIO_MAP`.
 
 */
  actualizarDatosFormularioSolicitud(): void {
    this.elementosRequeridos?.forEach((campo) => {
      const CONTROL = this.datosSolicitudForm.get(campo);
      if (CONTROL) {
        const EXISTING = CONTROL.validator
          ? Array.isArray(CONTROL.validator)
            ? CONTROL.validator
            : [CONTROL.validator]
          : [];
        const MERGED = [...EXISTING, Validators.required];
        CONTROL.setValidators(MERGED);
        CONTROL.updateValueAndValidity();
      }
    });
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return (
        control.controls[campo]?.errors && control.controls[campo]?.touched
      );
    }
    return control?.errors && control?.touched;
  }

  /**
   * Busca el RFC del representante en el formulario y, si existe,
   * actualiza los campos relacionados con el nombre, apellido paterno
   * y apellido materno del representante con valores predeterminados.
   *
   * @remarks
   * Este método verifica si el campo 'representanteRfc' tiene un valor
   * en el formulario `datosSolicitudForm`. Si el valor está presente,
   * se actualizan los campos 'representanteNombre', 'apellidoPaterno'
   * y 'apellidoMaterno' con datos específicos.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.datosSolicitudForm.get('representanteRfc')?.value;
    if (RFC) {
      this.datosSolicitudForm.patchValue({
        representanteNombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL',
      });
    } else {
      this.abrirRfcModal();
    }
  }

  /**
   * Elimina elementos de la configuración SCIAN que coincidan con los elementos de la lista SCIAN.
   *
   * Este método filtra los datos de la configuración SCIAN (`scianConfig.datos`) eliminando
   * aquellos elementos cuya clave coincida con algún elemento de la lista SCIAN (`scianLista`).
   *
   * Si hay un elemento seleccionado (`scianSeleccionado`), emite los datos actualizados
   * de la configuración SCIAN.
   */
  eliminarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.filter(
      (idx: TablaScianConfig) => {
        return !this.scianLista.some(
          (idx2: TablaScianConfig) => idx2.clave === idx.clave
        );
      }
    );
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
  }

  /**
   * Cierra el modal de alerta.
   * @method cerrarModal
   * @returns {void}
   */
  aceptar(): void {
    this.mostrarAlerta = false;
  }

  /**
   * Elimina las mercancías seleccionadas de la lista de datos de la tabla.
   *
   * Este método filtra los datos de la tabla de mercancías (`tablaMercanciasConfig.datos`)
   * eliminando aquellos elementos cuya clasificación de producto coincide con
   * alguno de los elementos en la lista de mercancías (`tablaMercanciasLista`).
   *
   * Si hay mercancías seleccionadas (`mercanciasSeleccionado`), emite el evento
   * con los datos actualizados de la tabla de mercancías.
   */
  eliminarMercancias(): void {
    if (!this.tablaMercanciasLista.length) {
      this.confirmacionAlerta = true;
      return;
    }
    if (this.tablaMercanciasLista.length > 0) {
      this.seleccionarFilaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: this.mensajeEmergenteConfirmacion,
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.confirmacionAlerta = true;
    }
  }

  /**
   * Elimina un pedimento de la lista de mercancías tras la confirmación del usuario.
   *
   * @param borrar Indica si el usuario confirmó la eliminación (`true`) o la canceló (`false`).
   *
   * ### Descripción:
   * - Si `borrar` es `true`:
   *   - Filtra los datos de `tablaMercanciasConfig.datos` eliminando aquellos
   *     que coincidan en `clasificacionProducto` con los elementos de `tablaMercanciasLista`.
   *   - Si existe un emisor en `mercanciasSeleccionado`, emite la lista actualizada de datos.
   *   - Elimina el elemento de la lista `pedimentos` en la posición `elementoParaEliminar`.
   * - Independientemente de la acción, desactiva la alerta de confirmación (`confirmacionAlerta = false`).
   *
   * ### Ejemplo de uso:
   * ```ts
   * eliminarPedimentoConfirmacion(true); // Elimina el pedimento
   * eliminarPedimentoConfirmacion(false); // Cancela la eliminación
   * ```
   */
  eliminarPedimentoConfirmacion(borrar: boolean): void {
    if (borrar) {
      this.tablaMercanciasConfig.datos =
        this.tablaMercanciasConfig.datos.filter((idx: TablaMercanciasDatos) => {
          return !this.tablaMercanciasLista.some(
            (idx2: TablaMercanciasDatos) =>
              idx2.clasificacionProducto === idx.clasificacionProducto
          );
        });
      if (this.mercanciasSeleccionado) {
        this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
      }
    }
    this.confirmacionAlerta = false;
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Agrega los elementos seleccionados de la lista SCIAN a la configuración actual
   * y emite los datos actualizados si hay un elemento seleccionado.
   * Luego, navega a la ruta de acciones correspondiente.
   *
   * @remarks
   * - Combina los datos existentes con los nuevos elementos seleccionados de la lista SCIAN.
   * - Emite un evento con los datos actualizados si `scianSeleccionado` está definido.
   * - Redirige al usuario a la ruta '../scian-selecion'.
   */
  agregarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.concat(this.scianLista);
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
    this.irAAcciones('../scian-selecion');
  }

  /**
   * Agrega las mercancías seleccionadas a la configuración de la tabla y emite el evento correspondiente.
   *
   * Este método concatena los datos de la lista de mercancías seleccionadas con los datos existentes
   * en la configuración de la tabla. Si hay un elemento seleccionado, emite un evento con los datos
   * actualizados. Finalmente, navega a la ruta especificada para realizar acciones adicionales.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancias(): void {
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.concat(
      this.tablaMercanciasLista
    );
    if (this.mercanciasSeleccionado) {
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
    this.irAAcciones('../mercancia-datos');
  }

  /**
   * Emite un evento con los datos seleccionados de las listas asociadas.
   *
   * Este método recopila las listas seleccionadas de `scianLista`,
   * `tablaMercanciasLista` y `opcionLista`, y las emite a través del
   * evento `datosDeTablaSeleccionados`.
   *
   * @remarks
   * Este método es útil para comunicar los datos seleccionados a otros
   * componentes o servicios que estén escuchando el evento emitido.
   */
  modificarDatos(): void {
    if (!this.tablaMercanciasLista.length) {
      this.seleccionarFilaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: this.modificadorMensajeDeAlerta,
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.mostrarAlerta = true;
      return;
    }
    this.datosDeTablaSeleccionados.emit({
      scianSeleccionados: this.scianLista,
      mercanciasSeleccionados: this.tablaMercanciasLista,
      opcionSeleccionados: this.opcionLista,
      opcionesColapsableState: this.opcionesColapsable,
    });
    this.irAAcciones('../mercancia-datos');
  }

  /**
   * Muestra u oculta una sección colapsable basada en el orden proporcionado.
   *
   * @param orden - Un número que indica el orden de la sección colapsable.
   *                Si el valor es 1, alterna el estado de `opcionesColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.opcionesColapsable = !this.opcionesColapsable;
      this.datosDeTablaSeleccionados.emit({
        scianSeleccionados: this.scianLista,
        mercanciasSeleccionados: this.tablaMercanciasLista,
        opcionSeleccionados: this.opcionLista,
        opcionesColapsableState: this.opcionesColapsable,
      });
    }
  }
  /**
   * Método que se ejecuta cuando se cambia el estado de un elemento.
   * Actualmente no tiene implementación.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambioDeEstado(event: Catalogo): void {
    if (this.idProcedimiento === NUMERO_TRAMITE.TRAMITE_260301) {
      if (event) {
        this.datosSolicitudForm
          .get('municipioAlcaldia')
          ?.setValue('DISTITO FEDERAL', { emitEvent: true });
      }
    }
  }

  /**
   * Verifica si un campo es requerido según la configuración de campos requeridos.
   *
   * @param {string} campo - Nombre del campo a verificar.
   * @returns {boolean} Retorna `true` si el campo es requerido, `false` en caso contrario.
   */
  esCampoRequerido(campo: string): boolean {
    return this.elementosRequeridos?.includes(campo) ?? false;
  }

  /**
   * Verifica si un campo adicional debe mostrarse según la configuración de procedimientos.
   *
   * @param {string} campo - Nombre del campo a verificar.
   * @returns {boolean} Retorna `true` si el campo adicional debe mostrarse, `false` en caso contrario.
   */
  mostrarCamposDelProcedimiento(campo: string): boolean {
    return this.elementosAnadidos?.includes(campo) ?? false;
  }

  /**
   * @method cambioAviso
   * @description Método que habilita o deshabilita el campo `aviso` en el formulario reactivo `datosSolicitudForm`
   * dependiendo del estado del checkbox seleccionado.
   *
   * @param {Event} event - Evento que se dispara al cambiar el estado del checkbox.
   * @returns {void} Este método no retorna ningún valor.
   **/
  cambioAviso(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    const LICENCIA_SANITARIA_CONTROL =
      this.datosSolicitudForm.get('licenciaSanitaria');
    if (CHECKED && LICENCIA_SANITARIA_CONTROL) {
      LICENCIA_SANITARIA_CONTROL?.clearValidators();
      LICENCIA_SANITARIA_CONTROL?.updateValueAndValidity();
      LICENCIA_SANITARIA_CONTROL?.disable();
    } else {
      LICENCIA_SANITARIA_CONTROL?.enable();
      LICENCIA_SANITARIA_CONTROL?.setValidators([Validators.required]);
      LICENCIA_SANITARIA_CONTROL?.updateValueAndValidity();
    }
  }

  /**
   * Habilita o deshabilita el control de formulario 'aviso' según el valor del campo de entrada.
   *
   * @param {Event} event - Evento de entrada proveniente de un elemento HTML.
   */
  cambioLicenciaSanitaria(event: Event): void {
    const VAL = (event.target as HTMLInputElement).value;
    if (VAL) {
      this.datosSolicitudForm.get('aviso')?.disable();
    } else {
      this.datosSolicitudForm.get('aviso')?.enable();
    }
  }

  cambireCorreoElectronico(): void {
    if (
      this.idProcedimiento === NUMERO_TRAMITE.TRAMITE_260103 &&
      this.datosSolicitudForm.get('correoElectronico')?.value !== '' &&
      this.datosSolicitudForm.get('denominacionRazon')?.value !== ''
    ) {
      this.datosSolicitudForm.get('codigoPostal')?.setValue(95270);
      this.datosSolicitudForm.get('estado')?.setValue('101');
      this.datosSolicitudForm.get('municipioAlcaldia')?.setValue('ALVARADO');
      this.datosSolicitudForm.get('localidad')?.setValue('ALVARADO');
      this.datosSolicitudForm.get('colonia')?.setValue('CENTRO');
    }
  }

  /**
   * Método que se llama cuando se envía el formulario.
   * Se utiliza para establecer los valores en el store de DatosDomicilioLegal.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.alternarControlesDeFormulario(true);

    this.elementoParaEliminar = i;
  }

  /**
   * Método que maneja la lógica para mostrar un modal de confirmación
   * antes de eliminar registros marcados. Si no hay elementos en la lista
   * `scianLista`, muestra una alerta y detiene la ejecución.
   *
   * @remarks
   * Este método configura una notificación de tipo alerta con un mensaje
   * de confirmación para la eliminación de registros. La notificación incluye
   * opciones para aceptar o cancelar la acción.
   *
   * @returns {void} No retorna ningún valor.
   */
  eliminarModal(): void {
    if (!this.scianLista.length) {
      this.mostrarAlerta = true;
      return;
    }
    this.nuevaNotificacionEliminar = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
  }

  /**
   * Método que se llama cuando se elimina un registro de SCIAN.
   * @param {boolean} borrar - Indica si se debe eliminar el registro de SCIAN.
   * Si es verdadero, se llama al método `eliminarScian`.
   */
  getEliminarScianModal(borrar: boolean): void {
    if (borrar) {
      this.eliminarScian();
      this.nuevaNotificacion.cerrar = false;
    }
  }

  /**
   * Método que verifica si un campo debe ser habilitado o deshabilitado
   * según el procedimiento actual.
   *
   * @param {string} campo - Nombre del campo a verificar.
   * @returns {boolean} Retorna `true` si el campo debe ser habilitado, `false` en caso contrario.
   */
  public controlYaDeshabilitado(campo: string): boolean {
    if (
      (campo === 'apellidoPaterno' ||
        campo === 'apellidoMaterno' ||
        campo === 'representanteNombre') &&
      (PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO.includes(
        this.idProcedimiento
      ) ||
        PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL.includes(
          this.idProcedimiento
        ) ||
        PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO.includes(
          this.idProcedimiento
        ))
    ) {
      return false;
    }
    return true;
  }

  /**
   * Método que se llama cuando se envía el formulario.
   */
  alternarControlesDeFormulario(enable: boolean): void {
    Object.keys(this.datosSolicitudForm.controls).forEach((controlName) => {
      const CONTROL = this.datosSolicitudForm.get(controlName);
      if (enable && this.controlYaDeshabilitado(controlName)) {
        CONTROL?.enable();
      } else {
        CONTROL?.disable();
      }
    });
  }

  /**
   * Abre el modal de RFC y muestra una notificación de alerta.
   */
  abrirRfcModal(): void {
    this.mostrarRfcAlerta = true;
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Debe ingresar el RFC.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Método que se llama cuando se elimina un pedimento.
   * @param {boolean} borrar - Indica si se debe eliminar el pedimento.
   * Si es verdadero, se elimina el pedimento en la posición `elementoParaEliminar` del arreglo `pedimentos`.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Actualiza el valor de `predeterminadoSeleccionar` basado en el valor proporcionado.
   *
   * @param value - El nuevo valor a establecer para `predeterminadoSeleccionar`.
   *                Puede ser una cadena o un número.
   */
  public cambioDeValorIndique(value: string | number): void {
    this.predeterminadoSeleccionar = value;
  }

  /**
   * Emite un evento con los datos seleccionados de la tabla.
   *
   * Este método recopila las listas seleccionadas de SCIAN, mercancías y opciones,
   * y las emite a través del evento `datosDeTablaSeleccionados` para que puedan ser
   * procesadas por otros componentes o servicios.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
