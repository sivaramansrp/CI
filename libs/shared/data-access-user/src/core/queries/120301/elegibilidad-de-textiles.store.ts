import { Injectable } from '@angular/core';
import { ElegibilidadDeTextilesState } from '../../models/120301/elegibilidad-de-textiles.model';
import { Query } from '@datorama/akita';
//import { ElegibilidadDeTextilesStore } from "../../../../../../../apps/se/src/app/application/store/120301/elegibilidad-de-textiles.store";

@Injectable({ providedIn: 'root' })
export class ElegibilidadDeTextilesQuery extends Query<ElegibilidadDeTextilesState> {
  /**
   * @summary Constructor del servicio.
   *
   * @param store Instancia del `FitosanitarioStore` utilizada para
   * inicializar la consulta.
   */
  //   constructor(protected override store: ElegibilidadDeTextilesStore) {
  //     super(store);
  //   }
}
