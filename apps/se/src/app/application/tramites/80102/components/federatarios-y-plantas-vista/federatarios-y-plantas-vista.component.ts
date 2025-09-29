import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notificacion, NotificacionesComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import {
  CatalogoDatosIdx,
  FEDERATARIOS,
  FederatariosEncabezado,
  PLANTAS_DIPONIBLES,
  PLANTAS_IMMEX,
  PlantasDisponibles,
  PlantasImmex,
} from '../../../../shared/models/federatarios-y-plantas.model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-plantas/federatarios-y-plantas.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

import { CapacidadInstaladaComponent } from '../../../../shared/components/capacidad-instalada/capacidad-instalada.component';
import { CargaPorArchivoComponent } from '../../../../shared/components/carga-por-archivo/carga-por-archivo.component';
import { ComplementarPlantaComponent } from '../../../../shared/components/complementar-planta/complementar-planta.component';
import { EmpleadosComponent } from '../../../../shared/components/empleados/empleados.component';
import { MontosDeInversionComponent } from '../../../../shared/components/montos-de-inversion/montos-de-inversion.component';

/**
 * Componente para la vista de federatarios y plantas
 * @export FederatariosYPlantasVistaComponent
 * */

@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent, NotificacionesComponent ,ComplementarPlantaComponent,
    MontosDeInversionComponent, EmpleadosComponent, CapacidadInstaladaComponent, CargaPorArchivoComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.scss',
})
/**
 * Componente encargado de gestionar la vista de federatarios y plantas en el trámite 80102.
 * Este componente permite visualizar y manejar los datos de los federatarios y plantas, así como sus encabezados.
 *
 * @usageNotes
 * Este componente utiliza servicios de consulta (`Tramite80102Query`) y estado (`Tramite80102Store`)
 * para manejar y observar los datos relacionados con los federatarios y plantas. Además, implementa el ciclo de vida
 * de Angular para limpiar las suscripciones al destruirse.
 */
export class FederatariosYPlantasVistaComponent implements OnDestroy, OnInit {
  /**
   * Configuración de la tabla de federatarios
   * @property {Object} federatariosTablaConfiguracion
   */
  public federatariosTablaConfiguracion = {
    TablaSeleccion: TablaSeleccion.CHECKBOX,
    TablaEncabezado: FEDERATARIOS,
  };

  /**
   * Configuración de la tabla de plantas disponibles
   * @property {Object} plantasDisponiblesTablaConfiguracion
   */
  public plantasDisponiblesTablaConfiguracion = {
    TablaSeleccion: TablaSeleccion.CHECKBOX,
    TablaEncabezado: PLANTAS_DIPONIBLES,
  };

  /**
   * Configuración de la tabla de plantas IMMEX
   * @property {Object} plantasImmexTablaConfiguracion
   */
  public plantasImmexTablaConfiguracion = {
    TablaSeleccion: TablaSeleccion.CHECKBOX,
    TablaEncabezado: PLANTAS_IMMEX,
  };

  /**
   * Lista de federatarios para mostrar en la tabla
   * @property {FederatariosEncabezado[]} federatariosTablaLista
   */
  public federatariosTablaLista$!: Observable<FederatariosEncabezado[]>;

  /**
   * Lista de plantas disponibles para mostrar en la tabla
   * @property {PlantasDisponibles[]} plantasDisponiblesTablaLista
   */
  public plantasDisponiblesTablaLista$!: Observable<PlantasDisponibles[]>;

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexTablaLista
   */
  public plantasImmexTablaLista$!: Observable<PlantasImmex[]>;

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
   */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos de federatarios que se mostrarán en la tabla
   * @property {FederatariosEncabezado} datosFederatarios
   */
  public datosFederatarios!: FederatariosEncabezado;

  /**
     * Configuración del catálogo de estados para el formulario.
     * @property {CatalogoDatosIdx} estadoOptionsConfig
     */
    public estadoOptionsConfig!: CatalogoDatosIdx;
  
      /**
       * Instancia de la notificación que representa un nuevo evento o mensaje.
       * Se utiliza para manejar y mostrar notificaciones dentro del componente.
       */
      public nuevaUnoNotificacion!: Notificacion;
  /**
   * Constructor de la clase FederatariosYPlantasVistaComponent.
   * @param {Tramite80102Store} store - Servicio para manejar el estado del trámite.
   * @param {Tramite80102Query} query - Servicio para consultar el estado del trámite.
   */
  constructor(
    private store: Tramite80102Store,
    private query: Tramite80102Query, private consultaQuery: ConsultaioQuery,
    private autorizacionProgrmaNuevoService: AutorizacionProgrmaNuevoService,
    
      ) {
        this.consultaQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.esFormularioSoloLectura = seccionState.readonly;
            })
          )
          .subscribe();
    this.federatariosTablaLista$ = this.query.selectDatosFederatarios$;
    this.plantasDisponiblesTablaLista$ = this.query.selectPlantasDisponiblesTablaLista$;
    this.plantasImmexTablaLista$ = this.query.selectplantasImmexTablaLista$;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en los datos de federatarios del almacén y actualiza la propiedad `datosFederatarios`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.query.selectDatosFederatariosFormulario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosFederatarios = datos;
      });

    this.autorizacionProgrmaNuevoService.tieneDatosDeTabla$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((val: boolean) => {
      this.tieneDatosDeTabla = val;
    });

    this.autorizacionProgrmaNuevoService
      .getFederataiosyPlantaCatalogosData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.estadoOptionsConfig = resp
      });
  }

  /**
   * Establece los datos del formulario de federatarios.
   * @param {FederatariosEncabezado} datos - Datos del encabezado de federatarios.
   * @returns {void}
   */
  setFormaDatos(datos: FederatariosEncabezado): void {
    this.store.setFederatarios(datos);
  }

  /**
   * Establece los datos de las plantas disponibles en el store.
   * @param {PlantasDisponibles[]} datos - Lista de plantas disponibles.
   * @returns {void}
   */
  setPlantasDisponiblesDatos(datos: PlantasDisponibles[]): void {
    this.store.setPlantasDisponiblesTablaLista(datos);
  }

  /**
   * Establece los datos de las plantas IMMEX en el store.
   * @param {PlantasImmex[]} datos - Lista de plantas IMMEX.
   * @returns {void}
   */
  setPlantasImmexDatos(datos: PlantasImmex[]): void {
    this.store.setPlantasImmexTablaLista(datos);
  }
/**
 * 
 * @param ruta - Ruta que indica la acción a realizar.
 * Maneja la acción correspondiente según la ruta proporcionada.
 * Si la ruta coincide con una de las opciones predefinidas, se muestra el popup correspondiente.
 */
/**
   * Controla la visibilidad del popup "Complementar Planta".
   * @property {boolean} mostrarComplementarPlantaPopup
   */
  public mostrarComplementarPlantaPopup:boolean = false;

  /**
   * Controla la visibilidad del popup "Montos de Inversión".
   * @property {boolean} mostrarMontosDeInversionPopup
   */
  public mostrarMontosDeInversionPopup:boolean = false;

  /**
   * Controla la visibilidad del popup "Empleados".
   * @property {boolean} mostrarEmpleadosPopup
   */
  public mostrarEmpleadosPopup:boolean = false;

  /**
   * Controla la visibilidad del popup "Capacidad Instalada".
   * @property {boolean} mostrarCapacidadInstaladaPopup
   */
  public mostrarCapacidadInstaladaPopup:boolean = false;

  /**
   * Controla la visibilidad del popup "Proveedor por Archivo".
   * @property {boolean} mostrarProveedorPorArchivoPopup
   */
  public mostrarProveedorPorArchivoPopup:boolean = false;

    /**
   * Indica si la tabla contiene datos actualmente.
   * Se emplea para controlar comportamientos o visualizaciones basadas en la presencia de datos.
   */
  tieneDatosDeTabla: boolean = false;

  onAccionSeccion(ruta: string):void { 
  if (ruta === '../complementar-plantas-acciones') {
    this.mostrarComplementarPlantaPopup = true;
  } else if (ruta === '../montos-inversion-acciones') {
    this.mostrarMontosDeInversionPopup = true;
  } else if (ruta === '../empleados-acciones') {
    this.mostrarEmpleadosPopup = true;
  } else if (ruta === '../capacidad-instalada-acciones') {
    this.mostrarCapacidadInstaladaPopup = true;
  } else if (ruta === '../proveedor-por-archivo'){
    if(this.tieneDatosDeTabla){
      this.mostrarProveedorPorArchivoPopup = true;
    } else {
      this.nuevaUnoNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Debe ingresar las fracciones del producto para agregar la capacidad instalada.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
  }
}

  /**
   * Cierra el popup de complementar planta.
   * 
   * Cambia la bandera `mostrarComplementarPlantaPopup` a `false`
   * para ocultar el popup correspondiente.
   */
  cerrarComplementarPlanta(): void {
    this.mostrarComplementarPlantaPopup = false;
  }

  /**
   * Cierra el popup de montos de inversión.
   * 
   * Establece la variable `mostrarMontosDeInversionPopup` en `false`
   * para ocultar el popup correspondiente en la interfaz.
   */
  cerrarMontosDeInversion(): void {
    this.mostrarMontosDeInversionPopup = false;
  }

  /**
   * Cierra el popup de empleados.
   * 
   * Cambia la variable `mostrarEmpleadosPopup` a `false` para ocultar
   * el popup relacionado con la información de empleados.
   */
  cerrarEmpleados(): void {
    this.mostrarEmpleadosPopup = false;
  }

  /**
   * Cierra el popup de capacidad instalada.
   * 
   * Establece la variable `mostrarCapacidadInstaladaPopup` en `false`
   * para ocultar el popup correspondiente en la interfaz.
   */
  cerrarCapacidadInstalada(): void {
    this.mostrarCapacidadInstaladaPopup = false;
  }

  /**
   * Cierra el popup de proveedor por archivo.
   * 
   * Cambia la variable `mostrarProveedorPorArchivoPopup` a `false`
   * para ocultar el popup correspondiente en la interfaz.
   */
  cerrarProveedorPorArchivo(): void {
    this.mostrarProveedorPorArchivoPopup = false;
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Emite una notificación a través del observable `destroyNotifier$` para limpiar suscripciones
   * y otros recursos, y luego completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
