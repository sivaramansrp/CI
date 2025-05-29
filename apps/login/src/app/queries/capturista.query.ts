import { CapturistaStore, CapturistaStoreService } from '../estados/capturista.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class BusquedaRFCCURPQuery extends Query<CapturistaStore> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: CapturistaStoreService) {
    super(store);
  }
}