import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  Chofer40102Store,
  Choferesnacionales40102State,
} from './tramite40102.store';

@Injectable({ providedIn: 'root' })
export class Chofer40102Query extends Query<Choferesnacionales40102State> {
  constructor(protected override store: Chofer40102Store) {
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
