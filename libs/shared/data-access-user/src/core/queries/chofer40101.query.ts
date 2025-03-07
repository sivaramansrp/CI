import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from 'apps/aga/src/app/application/estados/tramites/chofer40101.store';

@Injectable({ providedIn: 'root' })
export class Chofer40101Query extends Query<Choferesnacionales40101State> {
  constructor(protected override store: Chofer40101Store) {
    super(store);
  }

  getChoferes$ = this.select((state) => state.choferes);
  getchoferesextranjero$ = this.select((state) => state.choferesextranjero);

  getChoferes(): any[] {
    return this.getValue().choferes;
  }
  getchoferesextranjero(): any[] {
    return this.getValue().choferes;
}
}
