import { Solicitud11102State, Tramite11102Store } from './tramite11102.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite11102Query extends Query<Solicitud11102State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite11102Store) {
    super(store);
  }
}
