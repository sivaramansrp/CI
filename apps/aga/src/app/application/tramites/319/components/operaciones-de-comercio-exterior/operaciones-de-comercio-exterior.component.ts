import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  LoginQuery,
  Notificacion,
  NotificacionesComponent,
  REGEX_FECHA_MES_ANO,
  SeccionLibStore,
  SharedModule,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  CONFIGURACION_PERSONAS_COLUMNAS,
  CONFIGURACION_SOLICITAR_COLUMNAS,
  INFO_ALERT,
  MENOR_TEXTO,
  PERIODO_ERROR,
  PERIODO_TEXTO,
  REGISTRO_TEXTO,
  TEXTOS,
} from '../../constantes/operaciones-de-comercio-exterior.enum';
import { Personas, Solicitar } from '../../models/personas';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OperacionService } from '../../services/operacion.service';
import { PeriodoCatalogo } from '../../models/tramite319-state.model';
import { Tramite319Query } from '../../estados/tramite319Query.query';
import { Tramite319Store } from '../../estados/tramite319Store.store';

/**
 * @fileoverview
 * Componente para la gestión de operaciones de comercio exterior en el trámite 319.
 * Este componente maneja la lógica y la presentación del formulario de operaciones,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module OperacionesDeComercioExteriorComponent
 */

/**
 * Componente para el formulario de operaciones de comercio exterior.
 * @class OperacionesDeComercioExterioComponent
 * @implements {OnInit, OnDestroy, AfterViewInit}
 */
@Component({
  selector: 'app-operaciones-de-comercio-exterior',
  templateUrl: './operaciones-de-comercio-exterior.component.html',
  styleUrl: './operaciones-de-comercio-exterior.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TituloComponent,
    ReactiveFormsModule,
    NotificacionesComponent,
  ],
})
export class OperacionesDeComercioExterioComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /**
   * Formulario principal para operaciones.
   * @property {FormGroup} miformulario
   */
  public miformulario!: FormGroup;

  /**
   * Formulario para la gestión de periodos.
   * @property {FormGroup} periodoForm
   */
  public periodoForm!: FormGroup;

  /**
   * Lista de países para el select.
   * @property {Catalogo[]} optionsPaisList
   */
  public optionsPaisList: Catalogo[] = [];

  /**
   * Lista de periodos para el select.
   * @property {Catalogo[]} periodoList
   */
  public periodoList: PeriodoCatalogo[] = [];

  /**
   * Sujeto para destruir suscripciones.
   * @property {Subject<void>} destroyNotifier$
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Tipo de selección para la tabla de personas.
   * @property {TablaSeleccion} tipoPersonasSeleccion
   */
  public tipoPersonasSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de columnas para la tabla de personas.
   * @property {ConfiguracionColumna<Personas>[]} configuracionPersonasColumnas
   */
  public configuracionPersonasColumnas: ConfiguracionColumna<Personas>[] =
    CONFIGURACION_PERSONAS_COLUMNAS;

  /**
   * Tipo de selección para la tabla de solicitudes.
   * @property {TablaSeleccion} tipoSolicitarSeleccion
   */
  public tipoSolicitarSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de solicitudes.
   * @property {ConfiguracionColumna<Solicitar>[]} configuracionSolicitarColumnas
   */
  public configuracionSolicitarColumnas: ConfiguracionColumna<Solicitar>[] =
    CONFIGURACION_SOLICITAR_COLUMNAS;

  /**
   * Lista de acciones disponibles.
   * @property {string[]} acciones
   */
  public acciones: string[] = [];

  /**
   * Datos de la tabla de personas.
   * @property {Personas[]} cuerpoPersonasTablaFila
   */
  public cuerpoPersonasTablaFila: Personas[] = [];

  /**
   * Datos de la tabla de solicitudes.
   * @property {Solicitar[]} cuerpoSolicitarTablaFila
   */
  public cuerpoSolicitarTablaFila: Solicitar[] = [];

  /**
   * Indica si se muestra el formulario de periodo.
   * @property {boolean} periodoView
   */
  public periodoView: boolean = false;

  /**
   * Lista de solicitudes seleccionadas.
   * @property {Solicitar[]} listaDeTablasSeleccionadas
   */
  public listaDeTablasSeleccionadas: Solicitar[] = [];

  /**
   * Texto para mostrar en la alerta.
   * @property {string} textos
   */
  public textos: string = '';

  /**
   * Información de alerta.
   * @property {string} infoAlerta
   */
  public infoAlerta: string = INFO_ALERT;

  /**
   * Indica si se muestra la alerta.
   * @property {boolean} vistaAlerta
   */
  public vistaAlerta: boolean = false;

  /**
   * Indica si el modal emergente está visible.
   * @property {boolean} modalEmergente
   */
  public modalEmergente: boolean = false;

  /**
   * Nueva notificación para mostrar en el componente.
   * @property {Notificacion} nuevaAlertaNotificacion
   */
  public nuevaAlertaNotificacion!: Notificacion;

  /**
   * Indica si el formulario es de solo lectura.
   * @property {boolean} esFormularioSoloLectura
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Notificación para mostrar alertas generales.
   * @property {Notificacion} nuevaNotificacion
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Notificación para mostrar información específica.
   * @property {Notificacion} nuevaNotificacionInfo
   */
  public nuevaNotificacionInfo!: Notificacion;

  /**
   * Indica si se debe mostrar la alerta general.
   * @property {boolean} mostrarAlerta
   */
  mostrarAlerta: boolean = false;

  /**
   * Indica si se debe mostrar la información específica.
   * @property {boolean} mostrarInfo
   */
  mostrarInfo: boolean = false;

  /**
   * RFC del usuario logueado.
   * @property {string} RFCLogueado
   */
  RFCLogueado: string = '';

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {OperacionService} operacionService - Servicio para operaciones.
   * @param {Tramite319Query} tramite319Query - Query para el estado del trámite.
   * @param {Tramite319Store} tramite319Store - Store para el trámite.
   * @param {SeccionLibStore} seccionStore - Store para la sección.
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de solo lectura.
   */
  constructor(
    public readonly fb: FormBuilder,
    public readonly operacionService: OperacionService,
    public readonly tramite319Query: Tramite319Query,
    public tramite319Store: Tramite319Store,
    public seccionStore: SeccionLibStore,
    public readonly consultaioQuery: ConsultaioQuery,
    private loginQuery: LoginQuery
  ) {
    this.obtenerRfcLogueado();
    this.getOperacionList();
    this.getPersonasTablaData();
    this.getperiodoList();
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  public ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
    this.miformulario = this.fb.group({
      operacion: [this.tramite319Query.operacion || '', Validators.required],
    });
    this.cuerpoSolicitarTablaFila =
      this.tramite319Query.datos.length > 0 ? this.tramite319Query.datos : [];
    this.obtenerPeriodoHistoricoActual();
  }

  /**
   * Obtiene el RFC del usuario logueado.
   * @return void
   */
  obtenerRfcLogueado(): void {
    this.loginQuery.selectLoginState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((loginState) => {
        this.RFCLogueado = loginState.rfc;
      });
  }

  /**
   * Habilita o deshabilita el formulario según el estado de solo lectura.
   * @method ngAfterViewInit
   */
  public ngAfterViewInit(): void {
    if (this.esFormularioSoloLectura) {
      this.miformulario.disable();
    } else {
      this.miformulario.enable();
    }
  }

  /**
   * Obtiene la lista de países desde el servicio.
   * use usa RFC estatico para pruebas.
   * @method getOperacionList
   */
  public getOperacionList(): void {
    this.operacionService
      .obtenerTipoOperacion<Catalogo[]>(this.RFCLogueado)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.optionsPaisList = data.datos || [];
      });
  }

  /**
   * Obtiene la lista de periodos desde el servicio.
   * @method getperiodoList
   */
  public getperiodoList(): void {
    this.operacionService
      .obtenerPeriodoList<PeriodoCatalogo[]>()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.periodoList = data.datos || [];
      });
  }

  /**
   * Obtiene los datos de la tabla de personas desde el servicio.
   * use usa RFC estatico para pruebas.
   * @method getPersonasTablaData
   */
  public getPersonasTablaData(): void {
    this.operacionService
      .obtenerPersonas<Personas[]>(this.RFCLogueado)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.cuerpoPersonasTablaFila = data.datos || [];
      });
  }

  /**
   * Abre el módulo de notificaciones para gestionar periodos.
   * @method abrirModuloPersonasNotificaciones
   * @param {boolean} status - Estado para mostrar u ocultar el formulario de periodo.
   */
  public abrirModuloPersonasNotificaciones(status: boolean): void {
    this.periodoView = status;
    this.modalEmergente = !status;
    if (status) {
      this.periodoForm = this.fb.group({
        periodo: ['', [Validators.required]],
        periodoInicial: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/),
            Validators.maxLength(7),
          ],
        ],
        periodoFinal: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/),
            Validators.maxLength(7),
          ],
        ],
      });
    }
  }

  /**
   * Agrega una nueva persona a la tabla de solicitudes si el formulario de periodo es válido.
   * Si no es válido, muestra una alerta con el mensaje correspondiente.
   * @method agregarPersona
   */
  public agregarPersona(): void {
    if (this.periodoForm.valid) {
      this.PeriodoError();
    } else {
      this.periodoForm.markAllAsTouched();
    }
  }

  /**
   * Valida errores relacionados con el periodo seleccionado.
   * Verifica si existe un periodo diferente en la tabla o si las fechas ya están registradas.
   * Si no hay errores, procede con la validación de valores.
   * @method PeriodoError
   */
  public PeriodoError(): void {
    const SELECTEDPERIODODESC =
      this.periodoList.find(
        (item) => item.clave === this.periodoForm.value.periodo
      )?.descripcion || '';
    if (
      this.cuerpoSolicitarTablaFila.some(
        (item) => item.periodo !== SELECTEDPERIODODESC
      )
    ) {
      this.vistaAlerta = true;
      this.textos = PERIODO_ERROR;
    }
    // Check if the fechas_sobre_el_periodo already exists in cuerpoSolicitarTablaFila
    else if (
      this.cuerpoSolicitarTablaFila.some(
        (item) =>
          item.fechas_periodo ===
          this.periodoForm.value.periodoInicial +
            ' al ' +
            this.periodoForm.value.periodoFinal
      )
    ) {
      this.vistaAlerta = true;
      this.textos = REGISTRO_TEXTO;
    } else {
      this.valorValido();
    }
  }

  /**
   * Valida que los valores del periodo sean correctos según las reglas de negocio.
   * Verifica si el periodo está fuera de rango, si las fechas son futuras o si la fecha final es anterior a la inicial.
   * Si todas las validaciones pasan, agrega el periodo a la tabla de solicitudes.
   * @method valorValido
   */
  public valorValido(): void {
    const [INITIALMONTH, INITIALYEAR] = (
      this.periodoForm.value.periodoInicial || ''
    )
      .split('/')
      .map(Number);
    const [FINALMONTH, FINALYEAR] = (this.periodoForm.value.periodoFinal || '')
      .split('/')
      .map(Number);
    const NOW = new Date();
    const CURRENTMONTH = NOW.getMonth() + 1;
    const CURRENTYEAR = NOW.getFullYear();
    const PERIODOSELECCIONADO = this.periodoList.find(
      (item) => item.clave === this.periodoForm.value.periodo
    );
    const INITIALSELECTED = this.obtieneAnioDelPeriodo(
      PERIODOSELECCIONADO?.descripcion || '',
      true
    );
    const FINALSELECTED = this.obtieneAnioDelPeriodo(
      PERIODOSELECCIONADO?.descripcion || '',
      false
    );

    if (
      OperacionesDeComercioExterioComponent.isPeriodoOutOfRange(
        INITIALSELECTED,
        FINALSELECTED,
        PERIODOSELECCIONADO,
        INITIALYEAR,
        FINALYEAR
      )
    ) {
      this.vistaAlerta = true;
      this.textos = PERIODO_TEXTO;
    } else if (
      OperacionesDeComercioExterioComponent.isFinalDateInFutureOrPresent(
        FINALYEAR,
        FINALMONTH,
        CURRENTYEAR,
        CURRENTMONTH
      )
    ) {
      this.vistaAlerta = true;
      this.textos = `<p style="text-align: center;">${TEXTOS} ${this.periodoForm.value.periodoFinal}</p>`;
    } else if (
      OperacionesDeComercioExterioComponent.isFinalDateBeforeInitial(
        FINALYEAR,
        INITIALYEAR,
        FINALMONTH,
        INITIALMONTH
      )
    ) {
      this.vistaAlerta = true;
      this.textos = MENOR_TEXTO;
    } else {
      this.cuerpoSolicitarTablaFila.push({
        id_periodo_solicitud: null,
        id_solicitud: null,
        periodo_desc:
          this.periodoList.find(
            (item) => item.clave === this.periodoForm.value.periodo
          )?.descripcion || '',
        fechas_periodo:
          this.periodoForm.value.periodoInicial +
          ' al ' +
          this.periodoForm.value.periodoFinal,
        periodo_inicio: this.periodoForm.value.periodoInicial,
        periodo_fin: this.periodoForm.value.periodoFinal,
        periodo: this.periodoForm.value.periodo,
      });
      this.modalEmergente = true;
      this.abrirAlertaSeleccionModal();
      this.seccionStore.establecerFormaValida([true]);
      this.seccionStore.establecerSeccion([true]);
    }
  }

  /**
   * Verifica si el periodo seleccionado está fuera del rango permitido.
   * Compara los años inicial y final con los límites del periodo seleccionado.
   * @method isPeriodoOutOfRange
   * @param {number} INITIALSELECTED - Año inicial del periodo seleccionado
   * @param {number} FINALSELECTED - Año final del periodo seleccionado
   * @param {PeriodoCatalogo | undefined} PERIODOSELECCIONADO - El periodo seleccionado del catálogo
   * @param {number} INITIALYEAR - Año inicial del periodo a validar
   * @param {number} FINALYEAR - Año final del periodo a validar
   * @returns {boolean} True si el periodo está fuera de rango, false en caso contrario
   */
  public static isPeriodoOutOfRange(
    INITIALSELECTED: number,
    FINALSELECTED: number,
    PERIODOSELECCIONADO: PeriodoCatalogo | undefined,
    INITIALYEAR: number,
    FINALYEAR: number
  ): boolean {
    return Boolean(
      PERIODOSELECCIONADO &&
        typeof INITIALSELECTED === 'number' &&
        typeof FINALSELECTED === 'number' &&
        (INITIALYEAR < INITIALSELECTED ||
          INITIALYEAR > FINALSELECTED ||
          FINALYEAR > FINALSELECTED ||
          FINALYEAR < INITIALSELECTED)
    );
  }

  /**
   * Verifica si la fecha final está en el futuro o es la fecha presente.
   * Compara el año y mes final con la fecha actual.
   * @method isFinalDateInFutureOrPresent
   * @param {number} FINALYEAR - Año final del periodo
   * @param {number} FINALMONTH - Mes final del periodo
   * @param {number} CURRENTYEAR - Año actual
   * @param {number} CURRENTMONTH - Mes actual
   * @returns {boolean} True si la fecha final es futura o presente, false en caso contrario
   */
  static isFinalDateInFutureOrPresent(
    FINALYEAR: number,
    FINALMONTH: number,
    CURRENTYEAR: number,
    CURRENTMONTH: number
  ): boolean {
    return (
      FINALYEAR > CURRENTYEAR ||
      (FINALYEAR === CURRENTYEAR && FINALMONTH > CURRENTMONTH) ||
      (FINALYEAR === CURRENTYEAR && FINALMONTH === CURRENTMONTH)
    );
  }

  /**
   * Verifica si la fecha final es anterior a la fecha inicial.
   * Compara los años y meses para determinar si el rango de fechas es válido.
   * @method isFinalDateBeforeInitial
   * @param {number} FINALYEAR - Año final del periodo
   * @param {number} INITIALYEAR - Año inicial del periodo
   * @param {number} FINALMONTH - Mes final del periodo
   * @param {number} INITIALMONTH - Mes inicial del periodo
   * @returns {boolean} True si la fecha final es anterior a la inicial, false en caso contrario
   */
  static isFinalDateBeforeInitial(
    FINALYEAR: number,
    INITIALYEAR: number,
    FINALMONTH: number,
    INITIALMONTH: number
  ): boolean {
    return (
      FINALYEAR < INITIALYEAR ||
      (FINALYEAR === INITIALYEAR && FINALMONTH < INITIALMONTH)
    );
  }

  /**
   * Elimina un elemento de la tabla de pedimento si se confirma la acción.
   * @method eliminarPedimento
   * @param {boolean} borrar - Indica si se debe proceder con la eliminación.
   */
  public eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.periodoForm.reset();
      this.tramite319Store.actualizarDatosForma(this.cuerpoSolicitarTablaFila);
      this.periodoView = false;
      this.vistaAlerta = false;
    }
  }

  /**
   * Recibe las filas seleccionadas de la tabla y las almacena en la propiedad `listaDeTablasSeleccionadas`.
   * @method onListaDeFilaSeleccionada
   * @param {Solicitar[]} filasSeleccionadas - Lista de las filas seleccionadas en la tabla.
   */
  public onListaDeFilaSeleccionada(filasSeleccionadas: Solicitar[]): void {
    this.listaDeTablasSeleccionadas = filasSeleccionadas as Solicitar[];
  }

  /**
   * Elimina los periodos seleccionados de la tabla de solicitudes.
   * @method eliminarPeriodoPorId
   */
  public eliminarPeriodoPorId(): void {
    if (this.cuerpoSolicitarTablaFila.length === 0) {
      this.mostrarAlerta = true;
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: '',
        mensaje: 'Sin informacion.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else if (
      this.cuerpoSolicitarTablaFila.length > 0 &&
      this.listaDeTablasSeleccionadas.length === 0
    ) {
      this.mostrarAlerta = true;
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: '',
        mensaje: 'Selecciona un registro.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else {
      this.mostrarAlerta = false;
      this.mostrarInfo = true;
      this.nuevaNotificacionInfo = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: '¿Desea eliminar el periodo seleccionada?.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
    }
  }

  /**
   * Cierra la alerta modal.
   * @method aceptar
   */
  aceptar(): void {
    this.mostrarAlerta = false;
  }

  /**
   * Maneja la acción de aceptar en la información mostrada.
   * @param event Evento que indica si se aceptó la acción.
   */
  aceptarInfo(event: boolean): void {
    if (event) {
      this.mostrarInfo = false;
      this.cuerpoSolicitarTablaFila =
        this.cuerpoSolicitarTablaFila?.filter(
          (item) =>
            this.listaDeTablasSeleccionadas?.some(
              (seleccionado) => seleccionado?.periodo === item?.periodo
            ) === false
        ) ?? [];
      if (this.cuerpoSolicitarTablaFila?.length === 0) {
        this.seccionStore.establecerFormaValida([false]);
        this.seccionStore.establecerSeccion([true]);
      } else {
        this.seccionStore.establecerFormaValida([true]);
        this.seccionStore.establecerSeccion([true]);
      }
      this.periodoView = false;
    } else {
      this.mostrarInfo = false;
    }
  }

  /**
   * Actualiza la operación seleccionada desde el formulario actual y la envía al store de trámite 319.
   * @method actualizarOperacionDesdeSeleccion
   */
  public actualizarOperacionDesdeSeleccion(): void {
    this.tramite319Store.actualizarOperacion(
      this.miformulario?.value?.operacion || ''
    );
  }

  /**
   * Abre una alerta modal de selección con un mensaje predefinido.
   * @method abrirAlertaSeleccionModal
   */
  public abrirAlertaSeleccionModal(): void {
    this.nuevaAlertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Alerta',
      mensaje: 'El periodo se agrego correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * @method formatPeriodoInicial
   * @description
   * Formatea automáticamente el campo de periodo inicial agregando una barra diagonal (/)
   * después de ingresar 2 dígitos para seguir el formato MM/YYYY.
   *
   * @param {Event} event - Evento del input que contiene el valor del campo.
   * @returns {void}
   */
  formatPeriodoInicial(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    let value = INPUT.value.replace(/\D/g, ''); // Remove non-digits

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 6);
    }

    // Update the form control value
    this.periodoForm.patchValue({
      periodoInicial: value,
    });
  }

  /**
   * @method formatPeriodoFinal
   * @description
   * Formatea automáticamente el campo de periodo inicial agregando una barra diagonal (/)
   * después de ingresar 2 dígitos para seguir el formato MM/YYYY.
   *
   * @param {Event} event - Evento del input que contiene el valor del campo.
   * @returns {void}
   */
  formatPeriodoFinal(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    let value = INPUT.value.replace(/\D/g, ''); // Remove non-digits

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 6);
    }

    // Update the form control value
    this.periodoForm.patchValue({
      periodoFinal: value,
    });
  }

  obtenerPeriodoHistoricoActual(): void {
    this.operacionService
      .obtenerPeriodoHistoricoActual<Catalogo[]>()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.tramite319Store.actualizarCampo(
          'clave_per_historico_actual',
          data.datos?.[0]?.clave || ''
        );
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el `Subject` para evitar fugas de memoria en las suscripciones.
   * @method ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Obtiene el año inicial o final del periodo dado.
   * @method obtieneAnioDelPeriodo
   * @param {string} periodo - Descripción del periodo.
   * @param {boolean} esInicial - Indica si se desea obtener el año inicial (true) o final (false).
   * @returns {number} El año inicial o final del periodo.
   * @throws {Error} Si el formato del periodo no es reconocido o si no se encuentra el año inicial.
   */
  public obtieneAnioDelPeriodo(periodo: string, esInicial: boolean): number {
    const CURRENT_YEAR = new Date().getFullYear();
    const NORMALIZED = periodo.toLowerCase();

    if (NORMALIZED.includes('a la fecha')) {
      const MATCH = periodo.match(/\d{4}/);
      if (!MATCH) {
        throw new Error('No se encontró año inicial');
      }

      const START_YEAR = parseInt(MATCH[0], 10);
      return esInicial ? START_YEAR : CURRENT_YEAR;
    }

    const MATCH = periodo.match(/(\d{4}).*?(\d{4})/);
    if (MATCH) {
      const START_YEAR = parseInt(MATCH[1], 10);
      const END_YEAR = parseInt(MATCH[2], 10);
      return esInicial ? START_YEAR : END_YEAR;
    }

    throw new Error('Formato no reconocido');
  }
}

/**
 * Validador personalizado para verificar si un valor cumple con el formato de mes y año (MM/YYYY).
 * Este validador se puede usar en formularios para asegurarse de que el valor ingresado sea válido.
 * Si el valor está vacío, se delega la validación a `Validators.required`.
 * Si el valor no coincide con el formato esperado, devuelve un error con la clave `invalidMonthYear`.
 *
 * @returns {ValidatorFn} Una función de validación que verifica el formato de mes y año.
 *
 * @example
 * const control = new FormControl('12/2023', validadorDeMesyAno());
 * console.log(control.errors); // null (válido)
 *
 * const invalidControl = new FormControl('13/2023', validadorDeMesyAno());
 * console.log(invalidControl.errors); // { invalidMonthYear: true } (inválido)
 */
export function validadorDeMesyAno(): ValidatorFn {
  return (control: AbstractControl) => {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const REGEX = REGEX_FECHA_MES_ANO;
    return REGEX.test(VALUE) ? null : { invalidMonthYear: true };
  };
}
