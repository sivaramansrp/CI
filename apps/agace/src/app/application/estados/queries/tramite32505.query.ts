
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud32502State, tramite32505Store } from '../tramites/trimite32505.store';

@Injectable({ providedIn: 'root' })
export class Tramite32505Query extends Query<Solicitud32502State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: tramite32505Store) {
    super(store);
  }
}
