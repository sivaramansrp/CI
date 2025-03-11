import { Tramite110204Store, TramiteState } from './tramite110204.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<TramiteState>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite110204Query extends Query<TramiteState> {
  selectEstado$ = this.select((state) => {
    return state.estado;
  });

  FormaValida$ = this.select((state) => {
   return Object.values(state.formaValida).every(value => value === true);
  })

  selectBuscarDomicilios$ = this.select((state) => {
    return state.buscarDomicilios;
  });

  selectAltaPlanta$ = this.select((state) => {
    return state.altaPlanta;
  });
  selectPaisBloque$ = this.select((state) => {
    return state.paisBloques;
  })

  constructor(protected override store: Tramite110204Store) {
    super(store);
  }
}
