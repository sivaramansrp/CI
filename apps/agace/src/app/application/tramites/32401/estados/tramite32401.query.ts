import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud32401State } from './tramite32401.store';
import { Tramite32401Store } from './tramite32401.store';

@Injectable({ providedIn: 'root' })
export class Tramite32401Query extends Query<Solicitud32401State> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite32401Store) {
    super(store);
  }
}