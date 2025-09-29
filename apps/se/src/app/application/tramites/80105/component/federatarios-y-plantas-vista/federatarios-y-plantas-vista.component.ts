import { Catalogo, TablaSeleccion } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FEDERATARIOS,
  FederatariosEncabezado,
  PLANTAS_DIPONIBLES,
  PLANTAS_IMMEX,
  PlantasDisponibles,
  PlantasImmex,
} from '../../../../shared/models/federatarios-y-plantas.model';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-planta/federatarios-y-plantas.component';
import { Observable } from 'rxjs';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { CapacidadInstalada } from '../../../../shared/constantes/capacidad-instalada.enum';

/**
 * Componente para la vista de federatarios y plantas
 * @export FederatariosYPlantasVistaComponent
 * */

@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.css',
})
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
   * Catálogo de estados disponibles.
   * 
   * Esta propiedad contiene un arreglo de objetos de tipo `Catalogo` que representan los estados disponibles
   * para selección en la interfaz. Cada objeto incluye un identificador único (`id`) y una descripción del estado.
   * 
   * @type {Catalogo[]}
   */
  public estadosCatalogos: Catalogo[] = [{ "id": 1, "descripcion": "JALISCO" }];

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
