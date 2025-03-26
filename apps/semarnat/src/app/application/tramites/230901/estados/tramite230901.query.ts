import { Solitud230901State, Tramite230901Store } from './tramite230901.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite230901Query extends Query<Solitud230901State> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite230901Store) {
    super(store);
  }
}