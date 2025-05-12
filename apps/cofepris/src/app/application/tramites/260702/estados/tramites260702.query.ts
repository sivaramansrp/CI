import { Solicitud260702State, Solicitud260702Store } from './tramites260702.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Solicitud260702Query extends Query<Solicitud260702State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Solicitud260702Store) {
    super(store);
  }
}
