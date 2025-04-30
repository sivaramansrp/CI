import { Tramite420102State, Tramite420102Store } from './tramite420102.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

  
  @Injectable({ providedIn: 'root' })
  export class Tramite4201023Query extends Query<Tramite420102State> {
    constructor(protected override store: Tramite420102Store) {
      super(store);
    }

    selectSeccionState$ = this.select((state) => {
      return state;
    });
  }
  