import { Component, OnDestroy, OnInit } from '@angular/core';
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
  Tramite260205State,
  Tramite260205Store,
} from '../../estados/stores/tramite260205.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Subject } from 'rxjs';
import { Tramite260205Query } from '../../estados/queries/tramite260205.query';

@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado del trámite para el proceso 260205.
   */
  public tramiteState!: Tramite260205State;

  /**
   * Configuración de la tabla de opciones.
   */
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  };

  /**
   * Configuración de la tabla SCIAN.
   */
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  };

  /**
   * Configuración de la tabla de mercancías.
   */
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  };

  /**
   * Datos de configuración de SCIAN.
   */
  public scianConfigDatos: TablaScianConfig[] = [];

  /**
   * Datos de configuración de la tabla de mercancías.
   */
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];

  /**
   * Datos seleccionados de la tabla de opciones.
   */
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];

  /**
   * Datos seleccionados de la tabla SCIAN.
   */
  public seleccionadoScianDatos: TablaScianConfig[] = [];

  /**
   * Datos seleccionados de la tabla de mercancías.
   */
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];

  constructor(
    private Tramite260205Query: Tramite260205Query,
    private Tramite260205Store: Tramite260205Store
  ) {}

  ngOnInit(): void {
    this.Tramite260205Query.selectTramiteState$
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
   * Maneja el evento cuando se selecciona una opción en la tabla.
   *
   * @param event - Un arreglo de configuraciones de opciones de la tabla (`TablaOpcionConfig[]`)
   *                que representa las opciones seleccionadas.
   *
   * Actualiza la configuración de datos en el store `Tramite260205Store`
   * con las opciones seleccionadas.
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.Tramite260205Store.updateOpcionConfigDatos(event);
  }

  /**
   * Maneja el evento cuando se selecciona un elemento en la tabla SCIAN.
   *
   * @param event - Arreglo de configuraciones seleccionadas de la tabla SCIAN.
   *
   * Este método actualiza los datos de configuración SCIAN en el estado del trámite 260204
   * utilizando el evento proporcionado.
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.Tramite260205Store.updateScianConfigDatos(event);
  }

  /**
   * Maneja el evento de selección de mercancías en la tabla.
   *
   * @param event - Arreglo de objetos de tipo `TablaMercanciasDatos` que contiene
   *                los datos seleccionados en la tabla de mercancías.
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.Tramite260205Store.updateTablaMercanciasConfigDatos(event);
  }

  /**
   * Actualiza el estado del formulario de datos de la solicitud en el store.
   *
   * @param event - El nuevo estado del formulario de datos de la solicitud de tipo `DatosSolicitudFormState`.
   */
  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.Tramite260205Store.updateDatosSolicitudFormState(event);
  }

  /**
   * Actualiza el estado de la tienda `Tramite260205Store` con los datos seleccionados
   * provenientes del evento de la tabla.
   *
   * @param event - Objeto que contiene las opciones seleccionadas, los datos SCIAN seleccionados
   * y las mercancías seleccionadas de la tabla.
   */
  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.Tramite260205Store.update((state) => ({
      ...state,
      seleccionadoopcionDatos: event.opcionSeleccionados,
      seleccionadoScianDatos: event.scianSeleccionados,
      seleccionadoTablaMercanciasDatos: event.mercanciasSeleccionados,
      opcionesColapsableState: event.opcionesColapsableState,
    }));
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
