import { DatosProrrogaMuestrasMercanciasStore } from './datos-prorroga-muestras-mercancias.store';
import { Injectable } from '@angular/core';
import { ListaDeFechas } from '../../models/registro-muestras-mercancias.model';
import { Query } from '@datorama/akita';

/**
 * Consulta (`Query`) para obtener las fechas de prórroga de muestras de mercancías.
 * Proporciona acceso a los datos almacenados en el `DatosProrrogaMuestrasMercanciasStore`.
 */
@Injectable({
  providedIn: 'root',
})
export class DatosProrrogaMuestrasMercanciasQuery extends Query<ListaDeFechas> {
  /**
   * Inicializa la consulta con la tienda de datos de prórroga de muestras de mercancías.
   * 
   * @param DatosProrrogaMuestrasMercanciasStore - Instancia del store que contiene los datos de fechas.
   */
  constructor(protected DatosProrrogaMuestrasMercanciasStore: DatosProrrogaMuestrasMercanciasStore) {
    super(DatosProrrogaMuestrasMercanciasStore);
  }

  /**
   * Observable que proporciona las fechas de inicio y fin de vigencia.
   */
  obtenerFechas$ = this.select((state) => state);
}
