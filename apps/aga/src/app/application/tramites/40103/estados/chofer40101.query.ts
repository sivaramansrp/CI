import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from './chofer40101.store';

@Injectable({ providedIn: 'root' })
export class Chofer40101Query extends Query<Choferesnacionales40101State> {
  constructor(protected override store: Chofer40101Store) {
    super(store);
  }
  getChoferes$ = this.select((state) => state.choferes);
  getchoferesextranjero$ = this.select((state) => state.choferesextranjero);
  getvehiculos$ = this.select((state) => state.vehiculos);
  getUnidadesdeArrastre$ = this.select((state) => state.unidadesdearrastre);
  selectSeccionState$ = this.select((state) => {
    return state;
  });

  getChoferes(): string[] {
    return this.getValue().choferes;
  }

  getchoferesextranjero(): string[] {
    return this.getValue().choferesextranjero;
  }

  getvehiculos(): string[] {
    return this.getValue().vehiculos;
  }

  getunidadesdearrastre(): string[] {
    return this.getValue().unidadesdearrastre;
  }
}
