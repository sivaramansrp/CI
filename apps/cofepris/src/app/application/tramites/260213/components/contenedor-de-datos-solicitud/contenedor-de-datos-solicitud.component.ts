/**
 * @fileoverview
 * El `ContenedorDeDatosSolicitudComponent` es un componente de Angular diseñado para gestionar y mostrar los datos de la solicitud
 * en el flujo del trámite 260213. Este componente permite la configuración y selección de datos en tablas como opciones, SCIAN y mercancías.
 * También interactúa con el store `Tramite260213Store` para actualizar el estado del trámite.
 *
 * @module ContenedorDeDatosSolicitudComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la solicitud, incluyendo las tablas de opciones,
 * SCIAN y mercancías, en el flujo del trámite 260213.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DatosDeTablaSeleccionados,
  DatosSolicitudFormState,
  TablaMercanciasDatos,
  TablaOpcionConfig,
  TablaScianConfig,
  TablaSeleccion,
} from '../../../../shared/models/datos-solicitud.model';
import {
  OPCION_TABLA,
  PRODUCTO_TABLA,
  SCIAN_TABLA,
} from '../../../../shared/constantes/datos-solicitud.enum';
import {
  Tramite260213State,
  Tramite260213Store,
} from '../../estados/tramite260213Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Subject } from 'rxjs';
import { Tramite260213Query } from '../../estados/tramite260213Query.query';

/**
 * @component
 * @name ContenedorDeDatosSolicitudComponent
 * @description
 * Componente que gestiona y muestra los datos de la solicitud en el flujo del trámite 260213.
 * Permite la configuración y selección de datos en tablas como opciones, SCIAN y mercancías.
 * También interactúa con el store `Tramite260213Store` para actualizar el estado del trámite.
 *
 * @selector app-contenedor-de-datos-solicitud
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./contenedor-de-datos-solicitud.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./contenedor-de-datos-solicitud.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - DatosDeLaSolicitudComponent: Componente compartido para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Subject que se utiliza para cancelar las suscripciones de forma segura cuando el componente se destruye,
   * evitando fugas de memoria.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {boolean} formularioDeshabilitado
   * @description
   * Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {Tramite260213State} tramiteState
   * @description
   * Estado actual del trámite 260213, obtenido a través del query `Tramite260213Query`.
   */
  public tramiteState!: Tramite260213State;

  /**
   * @property {object} opcionConfig
   * @description
   * Configuración para la tabla de opciones. Incluye el tipo de selección, la configuración de la tabla y los datos a mostrar.
   */
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  };

  /**
   * @property {object} scianConfig
   * @description
   * Configuración para la tabla de SCIAN, indicando el tipo de selección, la configuración de la tabla y los datos.
   */
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  };

  /**
   * @property {object} tablaMercanciasConfig
   * @description
   * Configuración para la tabla de mercancías, que especifica el tipo de selección, la configuración de la tabla y los datos.
   */
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  };

  /**
   * @constructor
   * @description
   * Inyección de dependencias necesarias para obtener y actualizar el estado del trámite 260213.
   *
   * @param {Tramite260213Query} Tramite260213Query - Servicio de consulta para obtener el estado del trámite 260213.
   * @param {Tramite260213Store} Tramite260213Store - Store que gestiona el estado del trámite 260213, permitiendo actualizar la información en el mismo.
   */
  constructor(
    private Tramite260213Query: Tramite260213Query,
    private Tramite260213Store: Tramite260213Store
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado del trámite 260213 y actualiza la configuración de opciones, SCIAN y mercancías con los datos provenientes del store.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.Tramite260213Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          this.opcionConfig.datos = this.tramiteState.opcionConfigDatos;
          this.scianConfig.datos = this.tramiteState.scianConfigDatos;
          this.tablaMercanciasConfig.datos =
            this.tramiteState.tablaMercanciasConfigDatos;
        })
      )
      .subscribe();
  }

  /**
   * @method opcionSeleccionado
   * @description
   * Maneja el evento cuando se selecciona una opción en la tabla.
   * Actualiza la configuración de datos en el store `Tramite260213Store` con las opciones seleccionadas.
   *
   * @param {TablaOpcionConfig[]} event - Arreglo con las opciones seleccionadas.
   * @returns {void}
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.Tramite260213Store.updateOpcionConfigDatos(event);
  }

  /**
   * @method scianSeleccionado
   * @description
   * Maneja el evento cuando se seleccionan elementos en la tabla SCIAN.
   * Actualiza los datos de configuración en el store `Tramite260213Store`.
   *
   * @param {TablaScianConfig[]} event - Arreglo de configuraciones seleccionadas de la tabla SCIAN.
   * @returns {void}
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.Tramite260213Store.updateScianConfigDatos(event);
  }

  /**
   * @method mercanciasSeleccionado
   * @description
   * Maneja el evento de selección de mercancías en la tabla.
   * Actualiza los datos de configuración de mercancías en el store `Tramite260213Store`.
   *
   * @param {TablaMercanciasDatos[]} event - Arreglo que contiene los datos de mercancías seleccionadas.
   * @returns {void}
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.Tramite260213Store.updateTablaMercanciasConfigDatos(event);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Emite un valor a través de `destroyNotifier$` para notificar a los suscriptores y completa el observable, liberando recursos.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}