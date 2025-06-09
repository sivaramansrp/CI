import { Component, OnDestroy, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, Notificacion, NotificacionesComponent, REGEX_FECHA_MES_ANO, SeccionLibStore, SharedModule, TablaDinamicaComponent, TablaSeleccion, TituloComponent, } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';

import { OperacionService } from '../../services/operacion.service';

import { Personas, Solicitar } from '../../models/personas.module';

import {CONFIGURACION_PERSONAS_COLUMNAS, CONFIGURACION_SOLICITAR_COLUMNAS, INFO_ALERT, TEXTOS } from '../../constantes/operaciones-de-comercio-exterior.enum';
import { CommonModule } from '@angular/common';
import { Tramite319Query } from '../../estados/tramite319Query.query';
import { Tramite319Store } from '../../estados/tramite319Store.store';

/**
 * @description
 * Validador personalizado para verificar si un valor cumple con el formato de mes y año (MM/YYYY).
 * Este validador se puede usar en formularios para asegurarse de que el valor ingresado sea válido.
 * Si el valor está vacío, se delega la validación a `Validators.required`.
 * Si el valor no coincide con el formato esperado, devuelve un error con la clave `invalidMonthYear`.
 *
 * @returns {ValidatorFn} Una función de validación que verifica el formato de mes y año.
 *
 * @example
 * ```typescript
 * const control = new FormControl('12/2023', monthYearValidator());
 * console.log(control.errors); // null (válido)
 *
 * const invalidControl = new FormControl('13/2023', monthYearValidator());
 * console.log(invalidControl.errors); // { invalidMonthYear: true } (inválido)
 * ```
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
/**
 * @componente
 * @nombre OperacionesDeComercioExteriorComponent
 * @descripcion Componente encargado de gestionar las operaciones de comercio exterior.
 * Proporciona un formulario para seleccionar una operación y obtiene una lista de opciones
 * de países desde un servicio.
 * 
 * @implementa OnInit, OnDestroy
 * 
 * @ejemplo
 * <app-operaciones-de-comercio-exterior></app-operaciones-de-comercio-exterior>
 */
@Component({
  selector: 'app-operaciones-de-comercio-exterior',
  templateUrl: './operaciones-de-comercio-exterior.component.html',
  styleUrl: './operaciones-de-comercio-exterior.component.scss',
  standalone:true,
  imports:[CommonModule, SharedModule,TablaDinamicaComponent,CatalogoSelectComponent,AlertComponent,TituloComponent,ReactiveFormsModule,NotificacionesComponent]
})
export class OperacionesDeComercioExteriorComponent implements OnInit, OnDestroy {
  /**
   * @propiedad {FormGroup} miformulario - Formulario reactivo utilizado para gestionar las operaciones.
   */
  miformulario!: FormGroup;

  /**
   * @propiedad {FormGroup} periodoForm - Formulario reactivo utilizado para gestionar los periodos.
   */
  periodoForm!: FormGroup;

  /**
   * @propiedad {Catalogo[]} optionsPaisList - Lista de opciones de países obtenida desde el servicio.
   */
  optionsPaisList: Catalogo[] = [];

  /**
   * @propiedad {Catalogo[]} periodoList - Lista de periodos obtenida desde el servicio.
   */
  periodoList: Catalogo[] = [];

  /**
   * @propiedad {Subject<void>} destroyNotifier$ - Sujeto utilizado para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @propiedad {TablaSeleccion} tipoPersonasSeleccion - Tipo de selección para la tabla de personas.
   */
  tipoPersonasSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @propiedad {ConfiguracionColumna<Personas>[]} configuracionPersonasColumnas - Configuración de columnas para la tabla de personas.
   */
  configuracionPersonasColumnas: ConfiguracionColumna<Personas>[] = CONFIGURACION_PERSONAS_COLUMNAS;

  /**
   * @propiedad {TablaSeleccion} tipoSolicitarSeleccion - Tipo de selección para la tabla de solicitudes.
   */
  tipoSolicitarSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @propiedad {ConfiguracionColumna<Solicitar>[]} configuracionSolicitarColumnas - Configuración de columnas para la tabla de solicitudes.
   */
  configuracionSolicitarColumnas: ConfiguracionColumna<Solicitar>[] =CONFIGURACION_SOLICITAR_COLUMNAS;

  /**
   * @propiedad {string[]} acciones - Lista de acciones disponibles.
   */
  acciones: string[] = [];

  /**
   * @propiedad {Personas[]} cuerpoPersonasTablaFila - Datos de la tabla de personas.
   */
  cuerpoPersonasTablaFila: Personas[] = [];

  /**
   * @propiedad {Solicitar[]} cuerpoSolicitarTablaFila - Datos de la tabla de solicitudes.
   */
  cuerpoSolicitarTablaFila: Solicitar[] = [];

  /**
   * @propiedad {boolean} periodoView - Indica si se muestra el formulario de periodo.
   */
  periodoView: boolean = false;

  /**
   * @propiedad {Solicitar[]} listaDeTablasSeleccionadas - Lista de tablas seleccionadas.
   */
  listaDeTablasSeleccionadas: Solicitar[] = [];

  /**
   * @propiedad {string} textos - Texto utilizado para mostrar mensajes en la alerta.
   */
  textos: string = '';

  /**
   * @propiedad {string} infoAlerta - Información utilizada para mostrar en la alerta.
   */
  infoAlerta: string = INFO_ALERT;

  /**
   * @propiedad {boolean} vistaAlerta - Indica si se muestra la alerta.
   */
  vistaAlerta: boolean = false;


  /**
   * @description Indica si el modal emergente está visible o no.
   * @type {boolean}
   * @default false
   * @memberof OperacionesDeComercioExteriorComponent
   */
  modalEmergente:boolean=false;

  /**
   * @property {Notificacion} nuevaAlertaNotificacion
   * @description Propiedad que representa una nueva alerta de notificación.
   * @remarks Esta propiedad se utiliza para manejar las notificaciones en el componente.
   * @access Public
   */
  public nuevaAlertaNotificacion!: Notificacion;  
  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {OperacionService} operacionService - Servicio para obtener datos relacionados con operaciones.
   * @descripcion Inicializa el componente y obtiene la lista de operaciones al crearlo.
   */
  constructor(private readonly fb: FormBuilder, private readonly operacionService: OperacionService,private readonly tramite319Query: Tramite319Query,private tramite319Store: Tramite319Store,
     private seccionStore: SeccionLibStore
  ) {
    this.getOperacionList();
    this.getPersonasTablaData();
    this.getperiodoList();
  }

  /**
   * @metodo ngOnInit
   * @descripcion Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.miformulario = this.fb.group({
      operacion: [ this.tramite319Query.operacion||'', Validators.required],
    });
    this.cuerpoSolicitarTablaFila = this.tramite319Query.datos.length > 0 ? this.tramite319Query.datos : [];
  }

  /**
   * @metodo getOperacionList
   * @descripcion Obtiene la lista de opciones de países desde el servicio `OperacionService`.
   * Suscribe a los datos y los asigna a la propiedad `optionsPaisList`.
   */
  getOperacionList(): void {
    this.operacionService.obtenerSelectorList('optionsPais.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.optionsPaisList = data;
    });
  }

  /**
   * @metodo getperiodoList
   * @descripcion Obtiene la lista de periodos desde el servicio `OperacionService`.
   */
  getperiodoList(): void {
    this.operacionService.obtenerSelectorList('periodo.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.periodoList = data;
    });
  }

  /**
   * @metodo getPersonasTablaData
   * @descripcion Obtiene los datos de la tabla de personas desde el servicio `OperacionService`.
   */
  getPersonasTablaData(): void {
    this.operacionService.obtenerTablerList('personas.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.cuerpoPersonasTablaFila = data;
    });
  }

  /**
   * @metodo abrirModuloPersonasNotificaciones
   * @descripcion Abre el módulo de notificaciones para gestionar periodos.
   * @param {boolean} status - Estado para mostrar u ocultar el formulario de periodo.
   */
  abrirModuloPersonasNotificaciones(status: boolean): void {
    this.periodoView = status;
    this.modalEmergente=!status;
    if (status) {
      this.periodoForm = this.fb.group({
        periodo: ['', Validators.required],
        periodoInicial: ['', [Validators.required, validadorDeMesyAno()]],
        periodoFinal: ['', [Validators.required, validadorDeMesyAno()]],
      });
    }
  }

  /**
   * @metodo agregarPersona
   * @descripcion Agrega una nueva persona a la tabla de solicitudes.
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
    this.modalEmergente=true;
    this.abrirAlertaSeleccionModal();
    this.seccionStore.establecerFormaValida([true]);
    this.seccionStore.establecerSeccion([true]);

  }
else{
  this.vistaAlerta=true;
  this.textos=TEXTOS + this.periodoForm.value.periodoInicial + ' al ' + this.periodoForm.value.periodoFinal;
}
  }


    /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
    eliminarPedimento(borrar: boolean): void {
      if(borrar){
        this.periodoForm.reset();
        this.tramite319Store.actualizarDatosForma(this.cuerpoSolicitarTablaFila);
     this.periodoView = false;
    this.vistaAlerta = false;
   
      }
    }

  /**
   * @metodo onListaDeFilaSeleccionada
   * @descripcion Método que recibe las filas seleccionadas de la tabla y las almacena en la propiedad `listaDeTablasSeleccionadas`.
   * @param {Solicitar[]} filasSeleccionadas - Lista de las filas seleccionadas en la tabla.
   */
  onListaDeFilaSeleccionada(filasSeleccionadas: Solicitar[]): void {
    this.listaDeTablasSeleccionadas = filasSeleccionadas as Solicitar[];
  }

  /**
   * @metodo eliminarPeriodoPorId
   * @descripcion Elimina los periodos seleccionados de la tabla de solicitudes.
   */
  eliminarPeriodoPorId(): void {
    this.cuerpoSolicitarTablaFila = this.cuerpoSolicitarTablaFila?.filter(item => 
      this.listaDeTablasSeleccionadas?.some(seleccionado => seleccionado?.id === item?.id) === false
    ) ?? [];
  if(this.cuerpoSolicitarTablaFila?.length === 0){
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true]);
  }
  else{
    this.seccionStore.establecerFormaValida([true]);
    this.seccionStore.establecerSeccion([true]);
  }
    this.periodoView = false;
  }
  /**
   * @method actualizarOperacionDesdeSeleccion
   * @description Actualiza la operación seleccionada desde el formulario actual y la envía al store de trámite 319.
   * 
   * @compodoc
   * Este método toma el valor de la operación desde el formulario asociado y lo utiliza para actualizar 
   * el estado en el store correspondiente. Si no se encuentra un valor válido, se utiliza una cadena vacía por defecto.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  actualizarOperacionDesdeSeleccion() :void{
      this.tramite319Store.actualizarOperacion(this.miformulario?.value?.operacion|| '')
  }

  /**
   * @description Abre una alerta modal de selección con un mensaje predefinido.
   * La alerta es de tipo "peligro" y requiere que el usuario seleccione un elemento.
   * 
   * @componente OperacionesDeComercioExteriorComponent
   * @uso Este método se utiliza para mostrar una notificación de alerta
   * cuando no se ha seleccionado un elemento en una operación.
   * 
   * @returns {void} No retorna ningún valor.
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
   * @metodo ngOnDestroy
   * @descripcion Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el `Subject` para evitar fugas de memoria en las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
