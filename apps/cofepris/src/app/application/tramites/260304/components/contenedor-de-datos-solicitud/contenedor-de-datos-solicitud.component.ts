import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DatosDeTablaSeleccionados,
  DatosSolicitudFormState,
  TablaMercanciasDatos,
  TablaOpcionConfig,
  TablaScianConfig,
  TablaSeleccion,
} from '../../../../shared/models/datos-solicitud.model';
import { ELEMENTOS_ANADIDOS, ELEMENTOS_REQUERIDOS, ID_PROCEDIMIENTO, PRODUCTO_TABLA_ESTUPEFACIENTES_EXPORTICON } from '../../constants/medicamentos-contengan.enum';
import {
  OPCION_TABLA,
  SCIAN_TABLA,
} from '../../../../shared/constantes/datos-solicitud.enum';
import {
  Tramite260304State,
  Tramite260304Store,
} from '../../estados/tramite260304Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Subject } from 'rxjs';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';

/**
 * @component ContenedorDeDatosSolicitudComponent
 * @description
 * Componente contenedor responsable de manejar y mostrar los datos de la solicitud del trámite 260304.
 * Permite la selección y actualización de las tablas de opciones, SCIAN y mercancías, así como la actualización
 * de los datos principales del formulario y la sincronización de los datos seleccionados en el store global.
 *
 * @selector app-contenedor-de-datos-solicitud
 * @standalone true
 * @imports CommonModule, DatosDeLaSolicitudComponent
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
   * Observable utilizado como notificador para liberar recursos y cancelar suscripciones al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite260304State} tramiteState
   * @description
   * Estado actual del trámite 260304.
   */
  public tramiteState!: Tramite260304State;

  /**
   * @property {object} opcionConfig
   * @description
   * Configuración de la tabla de opciones, incluyendo tipo de selección, columnas y datos.
   */
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  };

  /**
   * @property {object} scianConfig
   * @description
   * Configuración de la tabla SCIAN, incluyendo tipo de selección, columnas y datos.
   */
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  };

  /**
   * @property {object} tablaMercanciasConfig
   * @description
   * Configuración de la tabla de mercancías, incluyendo tipo de selección, columnas y datos.
   */
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA_ESTUPEFACIENTES_EXPORTICON,
    datos: [] as TablaMercanciasDatos[],
  };

  /**
   * @property {TablaScianConfig[]} scianConfigDatos
   * @description
   * Datos seleccionados de la tabla SCIAN.
   */
  public scianConfigDatos: TablaScianConfig[] = [];

  /**
   * @property {TablaMercanciasDatos[]} tablaMercanciasConfigDatos
   * @description
   * Datos seleccionados de la tabla de mercancías.
   */
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];

  /**
   * @property {TablaOpcionConfig[]} seleccionadoopcionDatos
   * @description
   * Opciones seleccionadas en la tabla de opciones.
   */
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];

  /**
   * @property {TablaScianConfig[]} seleccionadoScianDatos
   * @description
   * Datos seleccionados en la tabla SCIAN.
   */
  public seleccionadoScianDatos: TablaScianConfig[] = [];

  /**
   * @property {TablaMercanciasDatos[]} seleccionadoTablaMercanciasDatos
   * @description
   * Datos seleccionados en la tabla de mercancías.
   */
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];

  /**
   * @property {string} idProcedimiento
   * @description
   * Identificador único del procedimiento para el trámite.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @property {string[]} elementosRequeridos
   * @description
   * Lista de elementos requeridos para completar el formulario/trámite.
   */
  public readonly elementosRequeridos = ELEMENTOS_REQUERIDOS;

  /**
   * @property {string[]} elementosAnadidos
   * @description
   * Lista de elementos adicionales que pueden ser incluidos en el formulario/trámite.
   */
  public readonly elementosAnadidos = ELEMENTOS_ANADIDOS;

  /**
   * @constructor
   * @description
   * Constructor que inyecta las dependencias necesarias para consultar y actualizar el estado del trámite.
   *
   * @param {Tramite260304Query} tramite260304Query - Servicio de consulta para acceder al estado del trámite.
   * @param {Tramite260304Store} tramite260304Store - Servicio para actualizar el estado global del trámite.
   */
  constructor(
    private tramite260304Query: Tramite260304Query,
    private tramite260304Store: Tramite260304Store
  ) {
    // Constructor para la inyección de dependencias.
  }

  /**
   * @method ngOnInit
   * @description
   * Hook de inicialización del componente.
   * Suscribe al estado global del trámite y actualiza las configuraciones de las tablas con los datos correspondientes.
   */
  ngOnInit(): void {
    this.tramite260304Query.selectTramiteState$
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
   * Maneja el evento cuando se seleccionan opciones en la tabla de opciones.
   * Actualiza el store con las opciones seleccionadas.
   * @param {TablaOpcionConfig[]} event - Opciones seleccionadas de la tabla.
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.tramite260304Store.updateOpcionConfigDatos(event);
  }

  /**
   * @method scianSeleccionado
   * @description
   * Maneja el evento cuando se seleccionan elementos en la tabla SCIAN.
   * Actualiza el store con los datos seleccionados de SCIAN.
   * @param {TablaScianConfig[]} event - Elementos seleccionados de la tabla SCIAN.
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.tramite260304Store.updateScianConfigDatos(event);
  }

  /**
   * @method mercanciasSeleccionado
   * @description
   * Maneja el evento de selección de mercancías en la tabla.
   * Actualiza el store con los elementos seleccionados de la tabla de mercancías.
   * @param {TablaMercanciasDatos[]} event - Elementos seleccionados de la tabla de mercancías.
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tramite260304Store.updateTablaMercanciasConfigDatos(event);
  }

  /**
   * @method datasolicituActualizar
   * @description
   * Actualiza el estado del formulario principal de la solicitud en el store.
   * @param {DatosSolicitudFormState} event - Nuevo estado del formulario de la solicitud.
   */
  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.tramite260304Store.updateDatosSolicitudFormState(event);
  }

  /**
   * @method datosDeTablaSeleccionados
   * @description
   * Actualiza el estado del store con los datos seleccionados de todas las tablas (opciones, SCIAN, mercancías)
   * y el estado del colapsable de opciones.
   * @param {DatosDeTablaSeleccionados} event - Datos seleccionados de las tablas y estado colapsable.
   */
  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.tramite260304Store.update((state) => ({
      ...state,
      seleccionadoopcionDatos: event.opcionSeleccionados,
      seleccionadoScianDatos: event.scianSeleccionados,
      seleccionadoTablaMercanciasDatos: event.mercanciasSeleccionados,
      opcionesColapsableState: event.opcionesColapsableState,
    }));
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de destrucción de componente. Libera recursos y completa el observable para cancelar suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}