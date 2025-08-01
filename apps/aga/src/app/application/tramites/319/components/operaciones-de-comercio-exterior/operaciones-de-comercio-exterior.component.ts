import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, Notificacion, NotificacionesComponent, REGEX_FECHA_MES_ANO, SeccionLibStore, SharedModule, TablaDinamicaComponent, TablaSeleccion, TituloComponent, } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_PERSONAS_COLUMNAS, CONFIGURACION_SOLICITAR_COLUMNAS, INFO_ALERT, TEXTOS } from '../../constantes/operaciones-de-comercio-exterior.enum';
import { Personas, Solicitar } from '../../models/personas.module';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OperacionService } from '../../services/operacion.service';
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
    NotificacionesComponent
  ]
})
export class OperacionesDeComercioExterioComponent implements OnInit, OnDestroy, AfterViewInit {
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
  public periodoList: Catalogo[] = [];

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
  public configuracionPersonasColumnas: ConfiguracionColumna<Personas>[] = CONFIGURACION_PERSONAS_COLUMNAS;

  /**
   * Tipo de selección para la tabla de solicitudes.
   * @property {TablaSeleccion} tipoSolicitarSeleccion
   */
  public tipoSolicitarSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de solicitudes.
   * @property {ConfiguracionColumna<Solicitar>[]} configuracionSolicitarColumnas
   */
  public configuracionSolicitarColumnas: ConfiguracionColumna<Solicitar>[] = CONFIGURACION_SOLICITAR_COLUMNAS;

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
    public readonly consultaioQuery: ConsultaioQuery
  ) {
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
    this.cuerpoSolicitarTablaFila = this.tramite319Query.datos.length > 0 ? this.tramite319Query.datos : [];
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
   * @method getOperacionList
   */
  public getOperacionList(): void {
    this.operacionService.obtenerSelectorList('optionsPais.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.optionsPaisList = data;
    });
  }

  /**
   * Obtiene la lista de periodos desde el servicio.
   * @method getperiodoList
   */
  public getperiodoList(): void {
    this.operacionService.obtenerSelectorList('periodo.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.periodoList = data;
    });
  }

  /**
   * Obtiene los datos de la tabla de personas desde el servicio.
   * @method getPersonasTablaData
   */
  public getPersonasTablaData(): void {
    this.operacionService.obtenerTablerList('personas.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.cuerpoPersonasTablaFila = data;
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
        periodo: ['', Validators.required],
        periodoInicial: ['', [Validators.required, validadorDeMesyAno()]],
        periodoFinal: ['', [Validators.required, validadorDeMesyAno()]],
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
   * @method actualizarOperacionDesdeSeleccion
   */
  public actualizarOperacionDesdeSeleccion(): void {
    this.tramite319Store.actualizarOperacion(this.miformulario?.value?.operacion || '');
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
   * @method ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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