import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110216State } from '../tramites/tramite110216.store';
import { Tramite110216Store } from '../tramites/tramite110216.store';


@Injectable({ providedIn: 'root' })
export class Tramite110216Query extends Query<Tramite110216State> {


  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite110216Store) {
    super(store);
  }
}
