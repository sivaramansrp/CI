import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import {
  FEDERATARIOS,
  FederatariosEncabezado,
  PLANTAS_DIPONIBLES,
  PLANTAS_IMMEX,
  PlantasDisponibles,
  PlantasImmex,
} from '../../../../shared/models/federatarios-y-plantas.model';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-plantas/federatarios-y-plantas.component';
import { Observable } from 'rxjs';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

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
/**
 * Componente encargado de gestionar la vista de federatarios y plantas en el trámite 80102.
 * Este componente permite visualizar y manejar los datos de los federatarios y plantas, así como sus encabezados.
 *
 * @usageNotes
 * Este componente utiliza servicios de consulta (`Tramite80102Query`) y estado (`Tramite80102Store`)
 * para manejar y observar los datos relacionados con los federatarios y plantas. Además, implementa el ciclo de vida
 * de Angular para limpiar las suscripciones al destruirse.
 */
export class FederatariosYPlantasVistaComponent {
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
  public plantasDisponiblesTablaLista: PlantasDisponibles[] = [];

  /**
   * Lista de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexTablaLista
   */
  public plantasImmexTablaLista: PlantasImmex[] = [];

  /**
   * Constructor de la clase FederatariosYPlantasVistaComponent.
   * @param {Tramite80102Store} store - Servicio para manejar el estado del trámite.
   * @param {Tramite80102Query} query - Servicio para consultar el estado del trámite.
   */
  constructor(
    private store: Tramite80102Store,
    private query: Tramite80102Query
  ) {
    this.federatariosTablaLista$ = this.query.selectDatosFederatarios$;
  }

  /**
   * Establece los datos del formulario de federatarios.
   * @param {FederatariosEncabezado} datos - Datos del encabezado de federatarios.
   * @returns {void}
   */
  setFormaDatos(datos: FederatariosEncabezado): void {
    this.store.setFederatarios(datos);
  }
}
