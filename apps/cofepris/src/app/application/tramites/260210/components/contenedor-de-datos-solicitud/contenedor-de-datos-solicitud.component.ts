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
  Tramite260210State,
  Tramite260214Store,
} from '../../estados/tramite260210Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Subject } from 'rxjs';
import { Tramite260210Query } from '../../estados/tramite260210Query.query';

@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  private destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite260210State;

  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  };
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  };
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  };
  public scianConfigDatos: TablaScianConfig[] = [];
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];
  public seleccionadoScianDatos: TablaScianConfig[] = [];
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];

  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  constructor(
    private Tramite260210Query: Tramite260210Query,
    private tramite260214Store: Tramite260214Store
  ) {}

  ngOnInit(): void {
    this.Tramite260210Query.selectTramiteState$
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
   * Actualiza la configuración de datos en el store `tramite260214Store`
   * con las opciones seleccionadas.
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.tramite260214Store.updateOpcionConfigDatos(event);
  }

  /**
   * Maneja el evento cuando se selecciona un elemento en la tabla SCIAN.
   *
   * @param event - Arreglo de configuraciones seleccionadas de la tabla SCIAN.
   *
   * Este método actualiza los datos de configuración SCIAN en el estado del trámite 260214
   * utilizando el evento proporcionado.
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.tramite260214Store.updateScianConfigDatos(event);
  }

  /**
   * Maneja el evento de selección de mercancías en la tabla.
   *
   * @param event - Arreglo de objetos de tipo `TablaMercanciasDatos` que contiene
   *                los datos seleccionados en la tabla de mercancías.
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tramite260214Store.updateTablaMercanciasConfigDatos(event);
  }

  /**
   * Actualiza el estado del formulario de datos de la solicitud en el store.
   *
   * @param event - El nuevo estado del formulario de datos de la solicitud de tipo `DatosSolicitudFormState`.
   */
  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.tramite260214Store.updateDatosSolicitudFormState(event);
  }

  /**
   * Actualiza el estado de la tienda `tramite260214Store` con los datos seleccionados
   * provenientes del evento de la tabla.
   *
   * @param event - Objeto que contiene las opciones seleccionadas, los datos SCIAN seleccionados
   * y las mercancías seleccionadas de la tabla.
   */
  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.tramite260214Store.update((state) => ({
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
