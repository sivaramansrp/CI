import { Transporte220402State, Transporte220402Store } from '../../estados/tramites/transporte220402.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Transporte220402Query extends Query<Transporte220402State> {

  /**
   * Selecciona el estado completo de la Transporte
   */
  selectTransporte$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Transporte220402Store) {
    super(store);
  }
}
