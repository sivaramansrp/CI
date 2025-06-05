import { Solicitud260915State, Solicitud260915Store, } from './tramites260915.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Solicitud260915Query extends Query<Solicitud260915State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud260915$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Solicitud260915Store) {
    super(store);
  }
}
