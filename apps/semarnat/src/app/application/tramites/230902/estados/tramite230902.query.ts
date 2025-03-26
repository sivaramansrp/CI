
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solitud230902State, Tramite230902Store } from './tramite230902.store';

@Injectable({ providedIn: 'root' })
export class Tramite230902Query extends Query<Solitud230902State> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite230902Store) {
    super(store);
  }
}