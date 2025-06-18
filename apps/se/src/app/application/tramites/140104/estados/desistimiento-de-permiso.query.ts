import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite140104State } from './tramite140104.store';
import { Tramite140104Store } from './tramite140104.store';
import { CuposDisponiblesDatos } from '../models/cancelacion-de-certificados.model';

@Injectable({ providedIn: 'root' })
export class Tramite140104Query extends Query<Tramite140104State> {
  constructor(protected override store: Tramite140104Store) {
    super(store);
  }

  // Example selector: select the entire state
  selectTramite$ = this.select(state => state);
}