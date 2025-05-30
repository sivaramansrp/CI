import {
  ADUANA_TEXTO,
  CROSLISTA_ADUANAS_DISPONIBLES,
  DATOS_DEL_TRAMITE_MAP,
  DESACTIVADO_PERMISO_GENERAL,
  FETCHA_PAGO,
  FETCHA_SALIDA,
  MANIFIESTOS_DECLARACIONES,
  OCULTAR_BOTONES,
  OCULTAR_PERMISO_GENERAL,
  PAISE_DENTINO_EITIQUETA,
  PERIODO_DOS_SEMESTRE,
  PERIODO_SEMESTRE_HABILITADO,
  PERIODO_UNO_SEMESTRE,
  PERMISO_ADUNA_TITULO,
  PERMISO_DEFINITIVO_TITULO,
  PERMISO_JUSTIFICACION,
} from '../../constants/datos-del-tramilte.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputCheckComponent,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import {
  DatosDelTramiteFormState,
  FECHA_DE_PAGO,
  FECHA_DE_SALIDA,
  JustificacionTramiteFormState,
  MANIFIESTOS_DECLARACION,
  MERCANCIA_ENCABEZADO_DE_TABLA,
  MercanciaDetalle,
} from '../../models/datos-del-tramite.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
/**
 * @title Datos del Trámite
 * @description Componente que gestiona el formulario de datos del trámite como permisos, uso final y selección de aduanas.
 * @summary Componente utilizado para capturar y emitir los datos del trámite.
 */

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent,
    InputFechaComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;

    /**
  * Indica si el elemento está ocultarBotones o visible.
  *
  * @type {boolean}
  * - `true`: El elemento está ocultarBotones.
  * - `false`: El elemento está visible.
  */
   public ocultarBotones = false;

  /**
   * Indica si el elemento está oculto o visible.
   *
   * @type {boolean}
   * - `true`: El elemento está oculto.
   * - `false`: El elemento está visible.
   */
  public estaOculto = false;

  /**
   * Etiqueta que representa el país asociado al trámite.
   * Esta propiedad utiliza la constante `PAISE_DENTINO_EITIQUETA`
   * para asignar el valor correspondiente.
   */
  public paisEtiqueta = PAISE_DENTINO_EITIQUETA;
  /**
   * Indica si el periodo habilitado está activo o no.
   * Esta propiedad se utiliza para determinar si el periodo de semestre está habilitado.
   * @type {boolean}
   */
  public periodoHabilitado = false;

  /**
   * Indica si el trámite está relacionado con aduanas.
   *
   * @type {boolean}
   * @default false
   */
  public esAduna = false;

  /**
   * @property {boolean} esAdunaTexto
   * @description Indica si el trámite está relacionado con el texto de aduanas específicas.
   * - `true`: El trámite está relacionado con el texto de aduanas.
   * - `false`: El trámite no está relacionado con el texto de aduanas.
   * @default false
  */
  public esAdunaTexto = false;
  /**
   * Indica si el trámite está relacionado con manifiestos y declaraciones.
   *
   * @type {boolean}
   * @default false
   */
  public manifiestosDeclaraciones = false;
  /**
   * Indica si la fecha de pago está habilitada.
   *
   * @type {boolean}
   * @default false
   */
  public fetchaPago = false;
  /**
   * Indica si la fecha de salida está habilitada.
   *
   * @type {boolean}
   * @default false
   */
  public fetchaSalida = false;
  
  /**
   * Opciones para el campo de periodo de un semestre.
   *
   * @type {string[]}
   * @default ['Uno Semestre', 'Dos Semestre']
   */
  public periodoUnoSemestreOpciones = PERIODO_UNO_SEMESTRE;

  /**
   * Opciones para el campo de periodo de dos semestre.
   *
   * @type {string[]}
   * @default ['Uno Semestre', 'Dos Semestre']
   */
  public periodoUnoSemestreRadioOpciones = PERIODO_DOS_SEMESTRE;

  /**
   * Indica si el componente está en modo de justificación.
   *
   * @type {boolean}
   * @default false
   */
  public esJustificacion = false;

  /**
   * Indica si el permiso general está oculto.
   *
   * @type {boolean}
   * @default false
   */

  public ocultarPermisoGeneral = false;

  /**
   * Indica si el permiso general está desactivado.
   *
   * @type {boolean}
   * - `true`: El permiso general está desactivado.
   * - `false`: El permiso general está activo.
   */
  public esDessactivadoPermisoGeneral = false;

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();
  /**
   * Lista de aduanas disponibles para mostrar en el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponibles
   */
  public seleccionarAduanasDisponibles = CROSLISTA_ADUANAS_DISPONIBLES;

  /**
   * Aduanas seleccionadas por el usuario desde el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponiblesDatos
   */
  public seleccionarAduanasDisponiblesDatos: string[] = [];

  /**
   * Etiquetas que se utilizan en el componente Crosslist para mostrar los títulos de los listados.
   * @property {CrossListLable} aduanasDisponiblesLabel
   */
  public aduanasDisponiblesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };

  /**
   * Grupo de formularios principal para capturar los datos del trámite.
   * @property {FormGroup} form
   */
  form!: FormGroup;
  /**
   * Formulario reactivo utilizado para justificar una acción o actividad.
   *  @property {FormGroup} formDeJustificacion
   */
  formDeJustificacion!: FormGroup;
  /**
   * Texto de los manifiestos.
   */
  manifiestosTexto: string = '';
  /**
   * @property {InputFecha} fechaInicioInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  /**
   * @property {InputFecha} fechaInicioInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaSalidaInput: InputFecha = FECHA_DE_SALIDA;  
  /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  onReset(): void {
    this.form.reset();
    this.formDeJustificacion.reset();
  }

  /**
   * @method onFechaCambiada
   * @description Actualiza la Fecha única de pago en el formulario.
   *
   * @param {string} fecha - Fecha seleccionada en el componente `InputFecha`.
   */
  onFechaCambiada(fecha: string): void {
    this.form.patchValue({ fechaPago: fecha });
  }
  /**
   * @method onFechaSalidaCambiada
   * @description Actualiza la Fecha única de salida de la marcancia en el formulario.
   *
   * @param {string} fecha - Fecha seleccionada en el componente `InputFecha`.
   */
  onFechaSalidaCambiada(fecha: string): void {
    this.form.patchValue({ fechaSalida: fecha });
  }
  /**
   * Estado inicial del formulario del trámite, recibido desde el componente padre.
   * @property {DatosDelTramiteFormState} datosDelTramiteFormState
   */
  @Input() datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Estado del formulario de justificación del trámite recibido desde el componente padre.
   * @property {JustificacionTramiteFormState} justificacionTramiteFormState
   */
  @Input() justificacionTramiteFormState!: JustificacionTramiteFormState;

  /**
   * Lista de datos de mercancías que se utilizan en la tabla dinámica.
   * @property {MercanciaDetalle[]} datosMercanciaTabla
   */
  @Input() datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
 * @property
 * @name configuracionTabla
 * @type {ConfiguracionColumna<MercanciaDetalle>[]}
 * @description Configuración de las columnas utilizadas en la tabla dinámica de mercancías.
 * Este valor es recibido como un input desde el componente padre.
 * Permite personalizar las columnas que se mostrarán en la tabla.
 */
  @Input() configuracionTabla: ConfiguracionColumna<MercanciaDetalle>[] = [];
      /**
     * Lista de mercancias seleccionados en la tabla.
     * Contiene objetos del tipo `MercanciaDetalle`.
     *
     * @type {MercanciaDetalle[]}
     */
    mercanciaTablaSeleccionada: MercanciaDetalle[] = [];
    /**
     * Emite un evento cuando se modifican los datos del mercancia.
     * El evento contiene un objeto de tipo `MercanciaDetalle`.
     *
     * @type {EventEmitter<MercanciaDetalle>}
     */
    @Output() modificarMercanciasDatos: EventEmitter<MercanciaDetalle> = new EventEmitter<MercanciaDetalle>(true);
    /**
     * @output eliminarMercanciaFinalEvent - Evento que emite cuando se elimina un destinatario final.
     * Este EventEmitter emite una instancia de `MercanciaDetalle`.
     */
    @Output() eliminarMercanciaFinalEvent: EventEmitter<MercanciaDetalle> = new EventEmitter<MercanciaDetalle>(true);

  /**
   * Configuración utilizada para construir la tabla dinámica de mercancías.
   * @property {any} mercanciaTablaConfiguracion
   */
  public mercanciaTablaConfiguracion: {
    tipoSeleccionTabla: TablaSeleccion;
    configuracionTabla: ConfiguracionColumna<MercanciaDetalle>[];
    datos: MercanciaDetalle[];
  } = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: MERCANCIA_ENCABEZADO_DE_TABLA,
    datos: [],
  };

  /**
   * Evento que emite los datos actualizados del formulario hacia el componente padre.
   * @event updateDatosDelTramiteFormulario
   */
  @Output() updateDatosDelTramiteFormulario =
    new EventEmitter<DatosDelTramiteFormState>();

  /**
   * Evento emitido cuando se actualiza el formulario de justificación del trámite.
   * @event updateJustificacionFormulario
   */
  @Output() updateJustificacionFormulario =
    new EventEmitter<JustificacionTramiteFormState>();

  /**
   * @property {unknown[] | null} aduanasBotones
   * Lista de botones relacionados con aduanas que se recibe desde el componente padre.
   * Este input permite configurar dinámicamente los botones asociados a las aduanas.
   * @decorador @Input
   */
  @Input() aduanasBotones: unknown[] | null = null;

  /**
   * Constructor del componente.
   * @method constructor
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   * @param {ActivatedRoute} activatedRoute - Ruta activa utilizada para navegación relativa.
   * @param {Router} router - Servicio de enrutamiento.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    // Constructor vacío, se puede agregar lógica adicional si es necesario.
  }
  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.form = this.fb.group({
      permisoGeneral: ['', [Validators.required, Validators.maxLength(22), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      paisDestino: [
        { value: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', disabled: true },
      ],
      usoFinal: ['', Validators.required],
      fechaPago: [
        this.datosDelTramiteFormState?.fechaPago || '',
        Validators.required,
      ],
      fechaSalida: [
        this.datosDelTramiteFormState?.fechaSalida || '',
        Validators.required,
      ],
      unoSemestre: [this.datosDelTramiteFormState.unoSemestre ?? null, Validators.required],
      dosSemestre: [this.datosDelTramiteFormState.dosSemestre ?? null, Validators.required],
      anoEnCurso: [this.datosDelTramiteFormState.anoEnCurso ?? false ],
      informacionConfidencial: [
        this.datosDelTramiteFormState.informacionConfidencial ?? false,
      ],
    });
  }

  /**
   * @method crearFormularioJustificacion
   * @description Crea el formulario reactivo para capturar la justificación del trámite.
   * Inicializa el campo `justificacion` con el valor recibido desde el estado del formulario,
   * o un valor vacío si no existe, y aplica la validación requerida.
   * @returns {void}
   */
  crearFormularioJustificacion(): void {
    this.formDeJustificacion = this.fb.group({
      justificacion: [
        this.justificacionTramiteFormState?.justificacion ?? '',
        Validators.required,
      ],
    });
  }

  /**
   * Maneja el evento de cambio en la selección de aduanas.
   * @method aduanasDisponiblesSeleccionadasChange
   * @param {string[]} events - Lista de aduanas seleccionadas.
   * @returns {void}
   */
  aduanasDisponiblesSeleccionadasChange(events: string[]): void {
    this.seleccionarAduanasDisponiblesDatos = events;
  }

  /**
   * Navega hacia el path de acciones relativo especificado.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa hacia la sección de acciones.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
 * @method onPermisoGeneralInput
 * @description
 * Maneja el evento de entrada del campo "permisoGeneral" para asegurar que solo se permitan caracteres numéricos
 * y que la longitud máxima sea de 22 dígitos. Si el usuario ingresa un carácter no numérico, este será eliminado.
 * Además, si la longitud supera los 22 caracteres, el valor se recorta automáticamente.
 * El valor limpio se actualiza en el control reactivo sin emitir un nuevo evento de cambio.
 *
 * @param {Event} event - El evento de entrada generado por el campo de texto.
 * 
 * @returns {void} No retorna ningún valor.
 */
  onPermisoGeneralInput(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    INPUT.value = INPUT.value.replace(/[^0-9]/g, '').slice(0, 22);
    this.form.get('permisoGeneral')?.setValue(INPUT.value, { emitEvent: false });
  }


    /**
     * @method
     * @description
     * Modifica el destinatario seleccionado en la tabla de mercancías. 
     * Si hay una sola fila seleccionada, emite el evento para modificar los datos de la mercancía,
     * actualiza la configuración de edición en el store y navega a la pantalla de agregar datos de mercancía.
     * Si no hay filas seleccionadas o hay más de una, muestra un error en la consola.
     *
     * @returns {void}
     *
     * @memberof DatosDelTramiteComponent
     */
    modificarDestinatario(): void {
       if (this.mercanciaTablaSeleccionada.length > 0) {
        this.modificarMercanciasDatos.emit(this.mercanciaTablaSeleccionada[0]);
      } else {
        console.error('No row selected for modification.');
      }
    }
    
    /**
     * Elimina el destinatario final seleccionado y emite un evento con el destinatario eliminado.
     * 
     * @command Eliminar destinatario final seleccionado.
     */
    eliminarDestinatarioFinal():void{
      
      if (this.mercanciaTablaSeleccionada.length > 0) {
        this.eliminarMercanciaFinalEvent.emit(this.mercanciaTablaSeleccionada[0]);
      } else {
        console.error('No se ha seleccionado ninguna fila para eliminar.');
      }
    }
  /**
   * Inicializa el formulario con los valores actuales del estado del trámite
   * y escucha los cambios para emitir actualizaciones.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    if (this.configuracionTabla.length > 0) {
      this.mercanciaTablaConfiguracion.configuracionTabla = this.configuracionTabla;
    } else {
      this.mercanciaTablaConfiguracion.configuracionTabla = MERCANCIA_ENCABEZADO_DE_TABLA;      
    }
    this.esJustificacion = PERMISO_JUSTIFICACION.includes(this.idProcedimiento);
    this.ocultarBotones = OCULTAR_BOTONES.includes(this.idProcedimiento);
    this.ocultarPermisoGeneral = OCULTAR_PERMISO_GENERAL.includes(
      this.idProcedimiento
    );
    this.esDessactivadoPermisoGeneral = DESACTIVADO_PERMISO_GENERAL.includes(
      this.idProcedimiento
    );
    this.crearFormaulario();
    this.manifiestosTexto = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.form.patchValue({
      permisoGeneral: this.datosDelTramiteFormState.permisoGeneral,
      usoFinal: this.datosDelTramiteFormState.usoFinal,
    });

    if (this.esJustificacion) {
      this.crearFormularioJustificacion();
    }

    if (this.idProcedimiento) {
      this.actualizarFormControlsById();
    }

    if (this.esJustificacion) {
      this.formDeJustificacion.patchValue({
        justificacion: this.justificacionTramiteFormState.justificacion,
      });
    }

    if (this.esDessactivadoPermisoGeneral) {
      this.form.get('permisoGeneral')?.setValue('5432');
      this.form.get('permisoGeneral')?.disable();
    }

    this.seleccionarAduanasDisponiblesDatos =
      this.datosDelTramiteFormState.aduanasSeleccionadas;

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        const DATOS_DEL_TRAMITE: DatosDelTramiteFormState = {
          permisoGeneral: formValue.permisoGeneral,
          paisDestino: formValue.paisDestino,
          usoFinal: formValue.usoFinal,
          aduanasSeleccionadas: this.seleccionarAduanasDisponiblesDatos,
          anoEnCurso: formValue.anoEnCurso,
          fechaPago: formValue.fechaPago,
          fechaSalida: formValue.fechaSalida,
          informacionConfidencial: formValue.informacionConfidencial,
          dosSemestre: formValue.dosSemestre,
          unoSemestre: formValue.unoSemestre,
        };
        this.updateDatosDelTramiteFormulario.emit(DATOS_DEL_TRAMITE);
      });
    if (this.esJustificacion) {
      this.formDeJustificacion.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((formValue) => {
          const DATOS_JUSTIFICACION: JustificacionTramiteFormState = {
            justificacion: formValue.justificacion,
          };
          this.updateJustificacionFormulario.emit(DATOS_JUSTIFICACION);
        });
    }
    this.estaOculto = PERMISO_DEFINITIVO_TITULO.includes(this.idProcedimiento);
    this.esAduna = PERMISO_ADUNA_TITULO.includes(this.idProcedimiento);
    this.esAdunaTexto = ADUANA_TEXTO.includes(this.idProcedimiento);
    this.periodoHabilitado = PERIODO_SEMESTRE_HABILITADO.includes(
      this.idProcedimiento
    );
    this.manifiestosDeclaraciones = MANIFIESTOS_DECLARACIONES.includes(
      this.idProcedimiento
    );
    this.fetchaPago = FETCHA_PAGO.includes(this.idProcedimiento);
    this.fetchaSalida = FETCHA_SALIDA.includes(this.idProcedimiento);

  }

  /**
   * @method actualizarFormControlsById
   * @description Actualiza los controles del formulario basándose en el identificador del procedimiento.
   * Agrega controles adicionales al formulario si no existen y están asociados al identificador actual.
   * @returns {void}
   */
  actualizarFormControlsById(): void {
    Object.entries(DATOS_DEL_TRAMITE_MAP).forEach(
      ([control, idsDeProcedimiento]) => {
        if (idsDeProcedimiento.includes(this.idProcedimiento)) {
          if (!this.form.contains(control)) {
            const KEY = control as keyof DatosDelTramiteFormState;
            this.form.addControl(
              control,
              new FormControl(this.datosDelTramiteFormState[KEY])
            );
          }
        }
      }
    );
  }

  /**
   * @method actualizarUnoSemestre
   * @description Actualiza el valor del campo `unoSemestre` en el formulario reactivo.
   * @param {string | number} event - Valor seleccionado para el campo `unoSemestre`.
   * @returns {void}
   */
  actualizarUnoSemestre(event: string | number): void {
    this.form.patchValue({
      unoSemestre: event,
    });
  }

  /**
   * @method actualizarDosSemestre
   * @description Actualiza el valor del campo `dosSemestre` en el formulario reactivo.
   * @param {string | number} event - Valor seleccionado para el campo `dosSemestre`.
   * @returns {void}
   */
  actualizarDosSemestre(event: string | number): void {
    this.form.patchValue({
      dosSemestre: event,
    });
  }
  
  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
