import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from './chofer40101.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Chofer40101Query extends Query<Choferesnacionales40101State> {
  constructor(protected override store: Chofer40101Store) {
    super(store);
  }

  /**
   * Observable que selecciona la lista de choferes nacionales.
   */
  getChoferes$ = this.select((state) => state.choferes);

  /**
   * Observable que selecciona la lista de choferes extranjeros.
   */
  getchoferesextranjero$ = this.select((state) => state.choferesextranjero);

  /**
   * Observable que selecciona la lista de vehículos.
   */
  getvehiculos$ = this.select((state) => state.vehiculos);

  /**
   * Observable que selecciona la lista de unidades de arrastre.
   */
  getUnidadesdeArrastre$ = this.select((state) => state.unidadesdearrastre);

  /**
   * Observable que selecciona el estado completo de la sección.
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });

  /**
   * Obtiene la lista de choferes nacionales.
   * @returns La lista de choferes nacionales.
   */
  getChoferes(): string[] {
    return this.getValue().choferes;
  }

  /**
   * Obtiene la lista de choferes extranjeros.
   * @returns La lista de choferes extranjeros.
   */
  getchoferesextranjero(): string[] {
    return this.getValue().choferesextranjero;
  }

  /**
   * Obtiene la lista de vehículos.
   * @returns La lista de vehículos.
   */
  getvehiculos(): string[] {
    return this.getValue().vehiculos;
  }

  /**
   * Obtiene la lista de unidades de arrastre.
   * @returns La lista de unidades de arrastre.
   */
  getunidadesdearrastre(): string[] {
    return this.getValue().unidadesdearrastre;
  }
}