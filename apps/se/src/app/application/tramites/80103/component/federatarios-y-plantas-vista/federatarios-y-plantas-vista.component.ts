
/* 
 * Importa interfaces compartidas de catálogos y tablas de selección
 * desde la librería de acceso a datos del usuario.
 */
import { Component, OnInit } from '@angular/core';
import { FEDERATARIOS, FederatariosEncabezado, PLANTAS_DIPONIBLES, PLANTAS_IMMEX, PlantasDisponibles, PlantasImmex } from '../../../../shared/models/federatarios-y-plantas.model';
import { CapacidadInstalada } from '../../../../shared/constantes/capacidad-instalada.enum';
import { CommonModule } from '@angular/common';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-planta/federatarios-y-plantas.component';
import { Observable } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
/**
 * Componente para la vista de federatarios y plantas
 * @export FederatariosYPlantasVistaComponent
 * */
@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.scss',
})
/** Componente que muestra la vista combinada de federatarios y plantas.  
 * Maneja la visualización y gestión de datos relacionados desde el store. */
export class FederatariosYPlantasVistaComponent implements OnInit {
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
  public federatariosTablaLista: FederatariosEncabezado[] = [];

  /**
   * Lista de plantas disponibles para mostrar en la tabla
   * @property {PlantasDisponibles[]} plantasDisponiblesTablaLista
   */
  public plantasDisponiblesTablaLista: PlantasDisponibles[] = [];

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexTablaLista
   */
  public plantasImmexTablaLista: PlantasImmex[] = [];
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
  /** Inyecta el store y query del trámite 80101 para gestionar el estado.  
   * Inicializa el observable para la lista de federatarios desde el query. */
  constructor(private store: Tramite80101Store, private query: Tramite80101Query) {

  }

  /** 
   * Suscripción al ciclo de vida de Angular para inicializar datos al cargar el componente. 
   */
  ngOnInit(): void {
    this.federatariosTablaLista$ = this.query.selectDatosFederatarios$;
    this.plantasDisponiblesTablaLista$ = this.query.selectDatosPlantasDisponibles$;
    this.plantasImmexTablaLista$ = this.query.selectDatosPlantasImmex$;
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
       * Actualiza la lista de capacidad instalada en la tabla utilizando el evento recibido.
       *
       * @param event - Arreglo de objetos de tipo `CapacidadInstalada` que representa la nueva lista de capacidad instalada.
       */
  obtenerCapacidadInstaladaTablaList(event: CapacidadInstalada[]): void {
    this.store.setCapacidadInstaladaTableLista(event);
  }
}
