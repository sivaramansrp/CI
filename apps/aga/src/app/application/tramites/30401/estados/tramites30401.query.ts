import { Tramite30401Store, Tramites30401State } from './tramites30401.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite30401Query extends Query<Tramites30401State> {
  
  selectTramite30401$= this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite30401Store) {
    super(store);
  }
}