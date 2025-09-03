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
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Subject } from 'rxjs';
import { Tramite260210Query } from '../../estados/tramite260210Query.query';
import { ViewChild } from '@angular/core';

/**
 * @component ContenedorDeDatosSolicitudComponent
 * @description Container component that orchestrates user interactions
 * for entering and managing “datos de la solicitud” (request data).
 * Integrates the `DatosDeLaSolicitudComponent` and synchronizes data
 * with the global state managed by `Tramite260214Store`.
 **/
@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property elementosRequeridos
   * @description Arreglo de campos requeridos para el formulario de datos de la solicitud,
   * utilizado para propósitos de validación.
   * @type {string[]}
   */
  elementosRequeridos = [
    'denominacionRazon',
    'scian',
    'correoElectronico',
    'rfcSanitario',
    'manifesto'
  ];
  /**
   * @property destroyNotifier$
   * @description Subject used to gracefully unsubscribe from observables
   * when the component is destroyed.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property tramiteState
   * @description Holds the current state of the “Tramite 260210” process,
   * retrieved from the store via `Tramite260210Query`.
   * @type {Tramite260210State}
   */
  public tramiteState!: Tramite260210State;

  /**
   * @property opcionConfig
   * @description Configuration object for the "opcion" table,
   * including the selection type, table settings, and data array.
   */
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  };

  /**
   * @property scianConfig
   * @description Configuration object for the SCIAN table,
   * including selection type, table settings, and data array.
   */
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  };

  /**
   * @property tablaMercanciasConfig
   * @description Configuration object for the “mercancías” table,
   * including selection type, table settings, and data array.
   */
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  };

  /**
   * @property scianConfigDatos
   * @description Stores the list of SCIAN table configurations
   * currently in use within the component.
   * @type {TablaScianConfig[]}
   */
  public scianConfigDatos: TablaScianConfig[] = [];

  /**
   * @property tablaMercanciasConfigDatos
   * @description Stores the list of “mercancías” data objects
   * currently in use within the component.
   * @type {TablaMercanciasDatos[]}
   */
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];

  /**
   * @property seleccionadoopcionDatos
   * @description Stores the selected “opcion” data coming from the table.
   * @type {TablaOpcionConfig[]}
   */
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];

  /**
   * @property seleccionadoScianDatos
   * @description Stores the selected SCIAN data coming from the table.
   * @type {TablaScianConfig[]}
   */
  public seleccionadoScianDatos: TablaScianConfig[] = [];

  /**
   * @property seleccionadoTablaMercanciasDatos
   * @description Stores the selected “mercancías” data
   * coming from the respective table.
   * @type {TablaMercanciasDatos[]}
   */
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];

  /**
   * @property idProcedimiento
   * @description ID of the current procedure, defined as a read-only property.
   * @type {string | number}
   * @readonly
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

   /**
       * @property {DatosDeLaSolicitudComponent} datosDeLaSolicitudComponent
       * @description
       * Referencia al componente hijo `DatosDeLaSolicitudComponent` obtenida
       * mediante el decorador `@ViewChild`.
       *
       * Esta propiedad permite acceder a los métodos públicos y propiedades
       * del componente hijo, por ejemplo para validar formularios o recuperar datos.
       *
       * > Nota: Angular inicializa esta referencia después de que la vista
       * ha sido renderizada, normalmente en el ciclo de vida `ngAfterViewInit`.
       */
      @ViewChild(DatosDeLaSolicitudComponent)
      datosDeLaSolicitudComponent!: DatosDeLaSolicitudComponent;
   

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @description Initializes dependencies and services used within this component.
   *
   * @param {Tramite260210Query} Tramite260210Query - Query service to retrieve the current
   * state of the “Tramite 260210” from the store.
   * @param {Tramite260214Store} tramite260214Store - Store service to update the
   * “Tramite 260214” state with the selected data from the component.
   */
  constructor(
    private Tramite260210Query: Tramite260210Query,
    private tramite260214Store: Tramite260214Store,
    private consultaQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Angular lifecycle hook that runs once the component is initialized.
   * Subscribes to the “Tramite260210” state changes and updates the component’s local
   * configuration objects with data from the store.
   *
   * @returns {void}
   */
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
   * @description
   * Método que se encarga de validar el formulario contenido en
   * el componente `DatosDeLaSolicitudComponent`.
   *
   * Utiliza el método `formularioSolicitudValidacion()` del componente hijo
   * para comprobar si el formulario es válido.
   * En caso de que el hijo no esté inicializado o devuelva `null/undefined`,
   * se retorna `false` por defecto.
   *
   * @returns {boolean}
   * - `true`: si el formulario es válido.
   * - `false`: si el formulario no es válido o el componente hijo aún no está disponible.
   */
   validarContenedor(): boolean {
    return (
      this.datosDeLaSolicitudComponent?.formularioSolicitudValidacion() ?? false
    );
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
