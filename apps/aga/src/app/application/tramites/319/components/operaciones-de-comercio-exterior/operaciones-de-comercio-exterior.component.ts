import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, Notificacion, NotificacionesComponent, REGEX_FECHA_MES_ANO, SeccionLibStore, SharedModule, TablaDinamicaComponent, TablaSeleccion, TituloComponent, } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_PERSONAS_COLUMNAS, CONFIGURACION_SOLICITAR_COLUMNAS, INFO_ALERT, TEXTOS } from '../../constantes/operaciones-de-comercio-exterior.enum';
import { Personas, Solicitar } from '../../models/personas.module';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OperacionService } from '../../services/operacion.service';
import { Tramite319Query } from '../../estados/tramite319Query.query';
import { Tramite319Store } from '../../estados/tramite319Store.store';



/**
 * Componente encargado de gestionar las operaciones de comercio exterior.
 * Proporciona un formulario para seleccionar una operación y obtiene una lista de opciones
 * de países desde un servicio.
 * @component OperacionesDeComercioExteriorComponent
 * @selector app-operaciones-de-comercio-exterior
 * @templateUrl ./operaciones-de-comercio-exterior.component.html
 * @styleUrl ./operaciones-de-comercio-exterior.component.scss
 * @implements OnInit, OnDestroy, AfterViewInit
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
    NotificacionesComponent
  ]
})
export class OperacionesDeComercioExterioComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Formulario reactivo utilizado para gestionar las operaciones.
   * @type {FormGroup}
   */
  miformulario!: FormGroup;

  /**
   * Formulario reactivo utilizado para gestionar los periodos.
   * @type {FormGroup}
   */
  periodoForm!: FormGroup;

  /**
   * Lista de opciones de países obtenida desde el servicio.
   * @type {Catalogo[]}
   */
  optionsPaisList: Catalogo[] = [];

  /**
   * Lista de periodos obtenida desde el servicio.
   * @type {Catalogo[]}
   */
  periodoList: Catalogo[] = [];

  /**
   * Sujeto utilizado para manejar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Tipo de selección para la tabla de personas.
   * @type {TablaSeleccion}
   */
  tipoPersonasSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de columnas para la tabla de personas.
   * @type {ConfiguracionColumna<Personas>[]}
   */
  configuracionPersonasColumnas: ConfiguracionColumna<Personas>[] = CONFIGURACION_PERSONAS_COLUMNAS;

  /**
   * Tipo de selección para la tabla de solicitudes.
   * @type {TablaSeleccion}
   */
  tipoSolicitarSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de solicitudes.
   * @type {ConfiguracionColumna<Solicitar>[]}
   */
  configuracionSolicitarColumnas: ConfiguracionColumna<Solicitar>[] = CONFIGURACION_SOLICITAR_COLUMNAS;

  /**
   * Lista de acciones disponibles.
   * @type {string[]}
   */
  acciones: string[] = [];

  /**
   * Datos de la tabla de personas.
   * @type {Personas[]}
   */
  cuerpoPersonasTablaFila: Personas[] = [];

  /**
   * Datos de la tabla de solicitudes.
   * @type {Solicitar[]}
   */
  cuerpoSolicitarTablaFila: Solicitar[] = [];

  /**
   * Indica si se muestra el formulario de periodo.
   * @type {boolean}
   */
  periodoView: boolean = false;

  /**
   * Lista de tablas seleccionadas.
   * @type {Solicitar[]}
   */
  listaDeTablasSeleccionadas: Solicitar[] = [];

  /**
   * Texto utilizado para mostrar mensajes en la alerta.
   * @type {string}
   */
  textos: string = '';

  /**
   * Información utilizada para mostrar en la alerta.
   * @type {string}
   */
  infoAlerta: string = INFO_ALERT;

  /**
   * Indica si se muestra la alerta.
   * @type {boolean}
   */
  vistaAlerta: boolean = false;

  /**
   * Indica si el modal emergente está visible o no.
   * @type {boolean}
   * @default false
   */
  modalEmergente: boolean = false;

  /**
   * Propiedad que representa una nueva alerta de notificación.
   * @type {Notificacion}
   */
  public nuevaAlertaNotificacion!: Notificacion;

  /**
   * Indica si el formulario es de solo lectura.
   * @type {boolean}
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa el componente y obtiene la lista de operaciones al crearlo.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {OperacionService} operacionService - Servicio para obtener datos relacionados con operaciones.
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
    public readonly consultaioQuery: ConsultaioQuery
  ) {
    this.getOperacionList();
    this.getPersonasTablaData();
    this.getperiodoList();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario principal y carga los datos iniciales de operaciones y solicitudes.
   * También suscribe al estado de solo lectura para habilitar o deshabilitar el formulario.
   * @method
   * @returns {void}
   */
  ngOnInit(): void {
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
    this.cuerpoSolicitarTablaFila = this.tramite319Query.datos.length > 0 ? this.tramite319Query.datos : [];
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada completamente.
   * Habilita o deshabilita el formulario dependiendo del estado de solo lectura.
   * @method
   * @returns {void}
   */
  ngAfterViewInit(): void {
    if (this.esFormularioSoloLectura) {
      this.miformulario.disable();
    } else {
      this.miformulario.enable();
    }
  }

  /**
   * Obtiene la lista de opciones de países desde el servicio `OperacionService`.
   * Suscribe a los datos y los asigna a la propiedad `optionsPaisList`.
   * @method
   * @returns {void}
   */
  getOperacionList(): void {
    this.operacionService.obtenerSelectorList('optionsPais.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.optionsPaisList = data;
    });
  }

  /**
   * Obtiene la lista de periodos desde el servicio `OperacionService`.
   * Suscribe a los datos y los asigna a la propiedad `periodoList`.
   * @method
   * @returns {void}
   */
  getperiodoList(): void {
    this.operacionService.obtenerSelectorList('periodo.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.periodoList = data;
    });
  }

  /**
   * Obtiene los datos de la tabla de personas desde el servicio `OperacionService`.
   * Suscribe a los datos y los asigna a la propiedad `cuerpoPersonasTablaFila`.
   * @method
   * @returns {void}
   */
  getPersonasTablaData(): void {
    this.operacionService.obtenerTablerList('personas.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.cuerpoPersonasTablaFila = data;
    });
  }

  /**
   * Abre el módulo de notificaciones para gestionar periodos.
   * Inicializa el formulario de periodo si el estado es verdadero.
   * @method
   * @param {boolean} status - Estado para mostrar u ocultar el formulario de periodo.
   * @returns {void}
   */
  abrirModuloPersonasNotificaciones(status: boolean): void {
    this.periodoView = status;
    this.modalEmergente = !status;
    if (status) {
      this.periodoForm = this.fb.group({
        periodo: ['', Validators.required],
        periodoInicial: ['', [Validators.required, validadorDeMesyAno()]],
        periodoFinal: ['', [Validators.required, validadorDeMesyAno()]],
      });
    }
  }

  /**
   * Agrega una nueva persona a la tabla de solicitudes si el formulario de periodo es válido.
   * Si no es válido, muestra una alerta con el mensaje correspondiente.
   * @method
   * @returns {void}
   */
  agregarPersona(): void {
    if (this.periodoForm.valid) {
      this.cuerpoSolicitarTablaFila.push({
        id: this.cuerpoSolicitarTablaFila.length > 0
          ? (this.cuerpoSolicitarTablaFila[this.cuerpoSolicitarTablaFila.length - 1]?.id ?? 0) + 1
          : 1,
        periodo: this.periodoForm.value.periodo,
        fechas_sobre_el_periodo: this.periodoForm.value.periodoInicial + ' al ' + this.periodoForm.value.periodoFinal,
      });
      this.modalEmergente = true;
      this.abrirAlertaSeleccionModal();
      this.seccionStore.establecerFormaValida([true]);
      this.seccionStore.establecerSeccion([true]);
    } else {
      this.vistaAlerta = true;
      this.textos = TEXTOS + this.periodoForm.value.periodoInicial + ' al ' + this.periodoForm.value.periodoFinal;
    }
  }

  /**
   * Elimina un elemento de la tabla de pedimento si se confirma la acción.
   * Resetea el formulario de periodo y actualiza el store.
   * @method
   * @param {boolean} borrar - Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.periodoForm.reset();
      this.tramite319Store.actualizarDatosForma(this.cuerpoSolicitarTablaFila);
      this.periodoView = false;
      this.vistaAlerta = false;
    }
  }

  /**
   * Recibe las filas seleccionadas de la tabla y las almacena en la propiedad `listaDeTablasSeleccionadas`.
   * @method
   * @param {Solicitar[]} filasSeleccionadas - Lista de las filas seleccionadas en la tabla.
   * @returns {void}
   */
  onListaDeFilaSeleccionada(filasSeleccionadas: Solicitar[]): void {
    this.listaDeTablasSeleccionadas = filasSeleccionadas as Solicitar[];
  }

  /**
   * Elimina los periodos seleccionados de la tabla de solicitudes.
   * Actualiza el estado de validez del formulario y la sección según el resultado.
   * @method
   * @returns {void}
   */
  eliminarPeriodoPorId(): void {
    this.cuerpoSolicitarTablaFila = this.cuerpoSolicitarTablaFila?.filter(item =>
      this.listaDeTablasSeleccionadas?.some(seleccionado => seleccionado?.id === item?.id) === false
    ) ?? [];
    if (this.cuerpoSolicitarTablaFila?.length === 0) {
      this.seccionStore.establecerFormaValida([false]);
      this.seccionStore.establecerSeccion([true]);
    } else {
      this.seccionStore.establecerFormaValida([true]);
      this.seccionStore.establecerSeccion([true]);
    }
    this.periodoView = false;
  }

  /**
   * Actualiza la operación seleccionada desde el formulario actual y la envía al store de trámite 319.
   * @method
   * @returns {void}
   */
  actualizarOperacionDesdeSeleccion(): void {
    this.tramite319Store.actualizarOperacion(this.miformulario?.value?.operacion || '');
  }

  /**
   * Abre una alerta modal de selección con un mensaje predefinido.
   * La alerta es de tipo "peligro" y requiere que el usuario seleccione un elemento.
   * @method
   * @returns {void}
   */
  abrirAlertaSeleccionModal(): void {
    this.nuevaAlertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Alerta',
      mensaje: 'Selecciona un elemento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el `Subject` para evitar fugas de memoria en las suscripciones.
   * @method
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
/**
 * @fileoverview
 * Componente Angular para gestionar las operaciones de comercio exterior en el trámite 319.
 * Permite seleccionar operaciones, gestionar periodos, mostrar tablas de personas y solicitudes, y manejar notificaciones.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module OperacionesDeComercioExteriorComponent
 */

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