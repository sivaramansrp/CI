import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RegistroMuestras } from '../../models/registro-muestras-mercancias.model';
import { RegistroRenovacionesMuestrasMercanciasStore } from './registro-renovaciones-muestras-mercancias.store';

/**
 * Consulta (`Query`) para acceder a los datos del registro de muestras de mercancías.
 * Proporciona un flujo reactivo de datos desde la tienda (`Store`).
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroRenovacionesMuestrasMercanciasQuery extends Query<RegistroMuestras> {
  /**
   * Inicializa la consulta con la tienda de registros de muestras de mercancías.
   * 
   * @param renovacionesMuestrasMercanciasStore - Instancia del `Store` que contiene los datos del registro.
   */
  constructor(public renovacionesMuestrasMercanciasStore: RegistroRenovacionesMuestrasMercanciasStore) {
    super(renovacionesMuestrasMercanciasStore);
  }

  /**
   * Observable que emite el estado actual del registro de muestras de mercancías.
   */
  obtenerRegistro$ = this.select();
}
