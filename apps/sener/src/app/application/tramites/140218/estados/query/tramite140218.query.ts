import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { DatosSolicitudState, Tramite140218Store } from '../store/tramite140218.store';

@Injectable({ providedIn: 'root' })
export class Tramite140218Query extends Query<DatosSolicitudState> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });
 

  constructor(protected override store: Tramite140218Store) {
    super(store);
  }
}