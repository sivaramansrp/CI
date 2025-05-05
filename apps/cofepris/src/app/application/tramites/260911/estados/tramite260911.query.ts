import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite260911State } from './tramite260911.store';
import { Tramite260911Store } from './tramite260911.store';

/**
 * Servicio de consulta para el estado de Tramite260911.
 * Proporciona selectores para acceder a las propiedades del estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260911Query extends Query<Tramite260911State> {
  /**
   * Selector para obtener todo el estado de Tramite260911.
   */
  selectTramite260911$ = this.select((state) => state);

  /**
   * Constructor del servicio de consulta.
   * @param tramiteStore Instancia del store de Tramite260911.
   */
  constructor(protected override store: Tramite260911Store) {
    super(store);
  }
}