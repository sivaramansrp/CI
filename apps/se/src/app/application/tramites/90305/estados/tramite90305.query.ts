import { Tramite90305State, Tramite90305Store } from './tramite90305.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
@Injectable({ providedIn: 'root' })
export class Tramite90305Query extends Query<Tramite90305State> {
  selectedEstado$ = this.select((state) => {
    return state.selectedEstado;
  });

  constructor(private tramiteStore: Tramite90305Store) {
    super(tramiteStore);
  }
}
