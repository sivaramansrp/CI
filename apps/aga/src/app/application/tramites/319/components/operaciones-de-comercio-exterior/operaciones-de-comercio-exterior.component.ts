import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { OperacionService } from '../../services/operacion.service';

import { Personas, Solicitar } from '../../models/personas.module';

import {CONFIGURACION_PERSONAS_COLUMNAS, CONFIGURACION_SOLICITAR_COLUMNAS } from '../../constantes/operaciones-de-comercio-exterior.enum';
import { Tramite319Query } from '../../estados/tramite319Query.query';
import { Tramite319Store } from '../../estados/tramite319Store.store';

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
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {OperacionService} operacionService - Servicio para obtener datos relacionados con operaciones.
   * @descripcion Inicializa el componente y obtiene la lista de operaciones al crearlo.
   */
  constructor(private readonly fb: FormBuilder, private readonly operacionService: OperacionService,private readonly tramite319Query: Tramite319Query,private tramite319Store: Tramite319Store) {
    this.getOperacionList();
    this.getPersonasTableeData();
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
   * @metodo getPersonasTableeData
   * @descripcion Obtiene los datos de la tabla de personas desde el servicio `OperacionService`.
   */
  getPersonasTableeData(): void {
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
    if (status) {
      this.periodoForm = this.fb.group({
        periodo: ['', Validators.required],
        periodoInicial: ['', Validators.required],
        periodoFinal: ['', Validators.required],
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
    this.tramite319Store.actualizarDatosForma(this.cuerpoSolicitarTablaFila);
    this.periodoView = false;
  }
else{
  this.periodoForm.markAllAsTouched();
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
    this.cuerpoSolicitarTablaFila = this.cuerpoSolicitarTablaFila.filter(
      item => !this.listaDeTablasSeleccionadas.some(seleccionado => seleccionado?.id === item?.id)
    );
    this.periodoView = false;
  }
  actualizarOperacionDesdeSeleccion() :void{
      this.tramite319Store.actualizarOperacion(this.miformulario?.value?.operacion|| '')
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
