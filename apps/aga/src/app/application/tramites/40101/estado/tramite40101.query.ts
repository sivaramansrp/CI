import { Tramite40101State, Tramite40101Store} from './tramite40101.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite40101Query extends Query<Tramite40101State> {
  constructor(protected override store: Tramite40101Store) {
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
