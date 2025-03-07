import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite80207State } from '../modelos/submanufacturer-modelos';
import { Tramites80207Store } from './tamite80207.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<Tramites80207Queries>}
 */
@Injectable({
  providedIn: 'root',
})
export class Tramites80207Queries extends Query<Tramite80207State> {
  infoRegisterEstado$ = this.select((state) => {
    return state.infoRegistro
  });
  datosSubcontratistaEstado$ = this.select((state) => {
    return state.datosSubcontratista
  });
  plantasSubfabricantesAgregar$ = this.select((state) => {
    return state.plantasSubfabricantesAgregar
  });
  plantasBuscadas$ = this.select((state) => {
    return state.plantasBuscadas
  });

  formaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every(value => value === true);
   })

  constructor(protected override store: Tramites80207Store) {
    super(store);
  }
}
