import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tramite90305State, Tramite90305Store } from './tramite90305.store';



@Injectable({ providedIn: 'root' })
export class Tramite90305Query extends Query<Tramite90305State> {
  selectedEstado$ = this.select((state) => state.selectedEstado);

  constructor(private tramiteStore: Tramite90305Store) {
    super(tramiteStore);
  }
}
