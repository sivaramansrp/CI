import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite260904State } from './tramite260904.store';
import { Tramite260904Store } from './tramite260904.store';
 
@Injectable({ providedIn: 'root' })
export class Tramite260904Query extends Query<Tramite260904State> {
  

  /**
   * Selector para obtener todo el estado de Tramite260911.
   */
  selectTramite260904$ = this.select((state) => state);
 /**
   * Constructor del servicio de consulta.
   * @param tramiteStore Instancia del store de Tramite260911.
   */
  constructor(protected override store: Tramite260904Store) {
    super(store);
  }
}