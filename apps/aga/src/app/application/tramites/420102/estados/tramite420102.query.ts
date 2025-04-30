import { Tramite420102State, Tramite420102Store } from './tramite420102.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

  
  @Injectable({ providedIn: 'root' })
  export class Tramite420102Query extends Query<Tramite420102State> {
    constructor(protected override store: Tramite420102Store) {
      super(store);
    }

    selectSolicitud$ = this.select((state) => {
      return state;
    });
  }
  