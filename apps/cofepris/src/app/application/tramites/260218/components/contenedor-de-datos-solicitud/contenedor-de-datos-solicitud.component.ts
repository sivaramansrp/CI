import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeTablaSeleccionados, DatosSolicitudFormState, TablaMercanciasDatos, TablaOpcionConfig, TablaScianConfig, TablaSeleccion } from '../../../../shared/models/datos-solicitud.model';
import { OPCION_TABLA, PRODUCTO_TABLA, SCIAN_TABLA } from '../../../../shared/constantes/datos-solicitud.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260218State, Tramite260218Store } from '../../estados/tramite260218Store.store';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ID_PROCEDIMIENTO } from '../../constants/pasos.enum';
import { Tramite260218Query } from '../../estados/tramite260218Query.query';
@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  // Notificador para destruir el componente y limpiar observables.
  private destroyNotifier$: Subject<void> = new Subject();

  // Estado de la solicitud del trámite 260218
  public tramiteState!: Tramite260218State;

  // Configuración de la tabla de opciones (opciones seleccionables por el usuario)
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[], // Datos de las opciones de la tabla
  }

  // Configuración de la tabla SCIAN (código de actividades económicas)
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX, // Tipo de selección: checkbox
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[], // Datos de la configuración de la tabla SCIAN
  }

  // Configuración de la tabla de mercancías (productos)
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX, // Tipo de selección: checkbox
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[], // Datos de la configuración de la tabla de mercancías
  }

  // Datos de la tabla SCIAN seleccionados
  public scianConfigDatos: TablaScianConfig[] = [];

  // Datos de la tabla de mercancías seleccionados
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];

  // Opciones seleccionadas de la tabla de opciones
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];

  // Datos seleccionados de la tabla SCIAN
  public seleccionadoScianDatos: TablaScianConfig[] = [];

  // Datos seleccionados de la tabla de mercancías
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];
  idProcedimiento: number = ID_PROCEDIMIENTO // Indica si la sección está oculta o visible
  constructor(
    private tramite260218Query: Tramite260218Query,
    private tramite260218Store: Tramite260218Store
  ) { 
        // no realizar ninguna acción
  }

  /**
   * Método del ciclo de vida de Angular, se ejecuta al iniciar el componente.
   * Obtiene el estado del trámite 260218 desde el `tramite260218Query` y 
   * actualiza las configuraciones de las tablas (opciones, SCIAN, mercancías).
   */
  ngOnInit(): void {
    this.tramite260218Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$), // Se desuscribe cuando se destruye el componente
        map((seccionState) => {
          this.tramiteState = seccionState;
          // Actualiza las configuraciones de las tablas con los datos del estado
          this.opcionConfig.datos = this.tramiteState.opcionConfigDatos;
          this.scianConfig.datos = this.tramiteState.scianConfigDatos;
          this.tablaMercanciasConfig.datos = this.tramiteState.tablaMercanciasConfigDatos;
        })
      ).subscribe();
  }

  /**
   * Maneja el evento cuando se selecciona una opción en la tabla.
   * Actualiza la configuración de datos en el store `tramite260218Store` con las opciones seleccionadas.
   * 
   * @param event - Arreglo de configuraciones de opciones de la tabla seleccionadas.
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.tramite260218Store.updateOpcionConfigDatos(event); // Actualiza las opciones seleccionadas en el store
  }

  /**
   * Maneja el evento cuando se selecciona un elemento en la tabla SCIAN.
   * Actualiza los datos de configuración SCIAN en el estado del trámite 260218.
   * 
   * @param event - Arreglo de configuraciones seleccionadas de la tabla SCIAN.
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.tramite260218Store.updateScianConfigDatos(event); // Actualiza los datos seleccionados en el store
  }

  /**
   * Maneja el evento cuando se seleccionan mercancías en la tabla de mercancías.
   * Actualiza los datos de mercancías seleccionadas en el estado del trámite.
   * 
   * @param event - Arreglo de objetos de tipo `TablaMercanciasDatos` con las mercancías seleccionadas.
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tramite260218Store.updateTablaMercanciasConfigDatos(event); // Actualiza las mercancías seleccionadas en el store
  }

  /**
   * Actualiza el estado del formulario de datos de la solicitud en el store.
   * 
   * @param event - El nuevo estado del formulario de datos de la solicitud de tipo `DatosSolicitudFormState`.
   */
  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.tramite260218Store.updateDatosSolicitudFormState(event); // Actualiza el estado del formulario de solicitud
  }

  /**
   * Actualiza el estado del store con los datos seleccionados de las tablas.
   * 
   * @param event - Objeto con los datos seleccionados de la tabla (opciones, SCIAN, mercancías).
   */
  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.tramite260218Store.update((state) => ({
      ...state,
      seleccionadoopcionDatos: event.opcionSeleccionados,
      seleccionadoScianDatos: event.scianSeleccionados,
      seleccionadoTablaMercanciasDatos: event.mercanciasSeleccionados,
      opcionesColapsableState: event.opcionesColapsableState
    })); // Actualiza el estado del store con los datos seleccionados
  }

  /**
   * Método del ciclo de vida de Angular, se llama justo antes de que el componente sea destruido.
   * Emite un valor a través de `destroyNotifier$` para notificar a los suscriptores que el componente se va a destruir.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Emite una notificación de destrucción
    this.destroyNotifier$.complete(); // Completa el observable para liberar recursos
  }
}
