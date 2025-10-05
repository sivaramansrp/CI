import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Notificacion, NotificacionesComponent, TablaSeleccion,doDeepCopy, esValidArray, esValidObject } from '@ng-mf/data-access-user';
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
import { ComplementarPlantaState, ComplementoDePlanta, MontoDeInversion } from '../../../../shared/constantes/complementar-planta.enum';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CapacidadInstalada } from '../../../../shared/constantes/capacidad-instalada.enum';
import { CapacidadInstaladaComponent } from '../../../../shared/components/capacidad-instalada/capacidad-instalada.component';
import { CargaPorArchivoComponent } from '../../../../shared/components/carga-por-archivo/carga-por-archivo.component';
import { ComplementarPlantaComponent } from '../../../../shared/components/complementar-planta/complementar-planta.component';
import { ComplimentosService } from '../../../../shared/services/complimentos.service';
import { Directos } from '../../../../shared/constantes/empleados.enum';
import { EmpleadosComponent } from '../../../../shared/components/empleados/empleados.component';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-plantas/federatarios-y-plantas.component';
import { MontosDeInversionComponent } from '../../../../shared/components/montos-de-inversion/montos-de-inversion.component';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
/**
 * Componente para la vista de federatarios y plantas
 * @export FederatariosYPlantasVistaComponent
 * */
@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent,ComplementarPlantaComponent,MontosDeInversionComponent,EmpleadosComponent,CapacidadInstaladaComponent,CargaPorArchivoComponent,NotificacionesComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.css',
})
export class FederatariosYPlantasVistaComponent implements OnDestroy, OnInit {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.Add commentMore actions
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @property {boolean} esFormularioUpdate - Indica si el formulario está en modo de actualización.
   */
  @Input() esFormularioUpdate: boolean = false;

  /**
   * Datos de federatarios que se mostrarán en la tabla
   * @property {FederatariosEncabezado} datosFederatarios
   */
  datosFederatarios!: FederatariosEncabezado;
  /**
   * Configuración de la tabla de federatarios
   * @property {Object} federatariosTablaConfiguracion
   */
  public federatariosTablaConfiguracion = {
    TablaSeleccion: TablaSeleccion.CHECKBOX,
    TablaEncabezado: FEDERATARIOS,
  };

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroy$
   */
  private destroy$ = new Subject<void>();

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
  public federatariosTablaLista: FederatariosEncabezado[] = [];

  /**
   * Lista de plantas disponibles para mostrar en la tabla
   * @property {PlantasDisponibles[]} plantasDisponiblesTablaLista
   */
  public plantasDisponiblesTablaLista: PlantasDisponibles[] = [];

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasDisponiblesTablaLista
   */
  public plantasDisponiblesTablaLista$!: Observable<PlantasDisponibles[]>;

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexTablaLista
   */
  public plantasImmexTablaLista: PlantasImmex[] = [];

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexTablaLista
   */
  public plantasImmexTablaLista$!: Observable<PlantasImmex[]>;
  /**
   * Lista de federatarios para mostrar en la tabla
   * @property {FederatariosEncabezado[]} federatariosTablaLista
   */
  public federatariosTablaLista$!: Observable<FederatariosEncabezado[]>;

  /**
   * Configuración del catálogo de estados para el formulario.
   * @property {CatalogoDatosIdx} estadoOptionsConfig
   */
  public estadoOptionsConfig!: CatalogoDatosIdx;

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

  /**
   * Instancia de la notificación que representa un nuevo evento o mensaje.
   * Se utiliza para manejar y mostrar notificaciones dentro del componente.
   */
  public nuevaUnoNotificacion!: Notificacion;

  /**
   * Constructor de la clase FederatariosYPlantasVistaComponent.
   *
   * @param store - Inyección de dependencia del servicio `Tramite80101Store` para gestionar el estado de la aplicación.
   * @param query - Inyección de dependencia del servicio `Tramite80101Query` para realizar consultas sobre el estado.
   *
   * Inicializa la propiedad `federatariosTablaLista$` con un observable que selecciona los datos de federatarios.
   */
  constructor(
    private store: Tramite80101Store,
    private query: Tramite80101Query,
    public nuevoProgramaIndustrialService: NuevoProgramaIndustrialService
  ) {
    this.federatariosTablaLista$ = this.query.selectDatosFederatarios$;
    this.plantasImmexTablaLista$ = this.query.selectDatosPlantasImmex$;
    this.plantasDisponiblesTablaLista$ = this.query.selectDatosPlantasDisponibles$;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en los datos de federatarios del almacén y actualiza la propiedad `datosFederatarios`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.query.selectDatosFederatariosFormulario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((datos) => {
        this.datosFederatarios = datos;
      });

  this.nuevoProgramaIndustrialService.tieneDatosDeTabla$
    .pipe(takeUntil(this.destroy$))
    .subscribe((val: boolean) => {
      this.tieneDatosDeTabla = val;
    });
    this.nuevoProgramaIndustrialService
      .getFederataiosyPlantaCatalogosData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.estadoOptionsConfig = resp
      });
  }
  /**
   * Establece los datos de los federatarios en el almacén.
   *
   * @param datos - Objeto de tipo `FederatariosEncabezado` que contiene la información
   *                de los federatarios a ser almacenada.
   */
  setFormaDatos(datos: FederatariosEncabezado): void {
    this.store.setFederatarios(datos);
  }

  /**
   * Establece los datos de los federatarios en el almacén.
   *
   * @param datos - Objeto de tipo `FederatariosEncabezado` que contiene la información
   *                de los federatarios a ser almacenada.
   */
  setDatosFederatarios(datos: FederatariosEncabezado): void {
    this.store.setFederatariosCatalogo(datos);
  }

  /**
   * Establece los datos de las plantas disponibles en el almacén.
   */
  setPlantasDisponiblesDatos(datos: PlantasDisponibles[]): void {
    this.store.setPlantasDisponiblesTablaLista(datos);
  }

  /** 
   * Establece los datos de las plantas IMMEX en el almacén.
   */
  setPlantasImmexDatos(datos: PlantasImmex[]): void {
    this.store.setPlantasImmexTablaLista(datos);
  }

  /**
   * Muestra el popup correspondiente según la ruta de acción recibida.
   * 
   * @param {string} ruta - Ruta de la acción que determina qué popup mostrar.
   * 
   * - '../complementar-plantas-acciones' → Muestra el popup de "Complementar Planta".
   * - '../montos-inversion-acciones' → Muestra el popup de "Montos de Inversión".
   * - '../empleados-acciones' → Muestra el popup de "Empleados".
   * - '../capacidad-instalada-acciones' → Muestra el popup de "Capacidad Instalada".
   * - '../proveedor-por-archivo' → Muestra el popup de "Proveedor por Archivo".
   */
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
   * Establece los datos de las plantas disponibles en el almacén.
   *
   * @param datos - Objeto de tipo `PlantasDisponibles` que contiene la información
   *                de las plantas a ser almacenada.
   */

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
