import { Injectable } from '@angular/core';
import { ElegibilidadDeTextilesState } from '../models/elegibilidad-de-textiles.model';
import { Query } from '@datorama/akita';
import { ElegibilidadDeTextilesStore, TextilesState } from '../estados/elegibilidad-de-textiles.store';

/**
 * Query to manage the state of Prosec authorization.
 */
@Injectable({ providedIn: 'root' })
export class ElegibilidadDeTextilesQuery extends Query<TextilesState> {

  selectTextile$ = this.select((state) => {
    return state;
  });

  /**
   * @summary Constructor del servicio.
   *
   * @param store Instancia del `FitosanitarioStore` utilizada para
   * inicializar la consulta.
   */
    constructor(protected override store: ElegibilidadDeTextilesStore) {
      super(store);
    }
}
