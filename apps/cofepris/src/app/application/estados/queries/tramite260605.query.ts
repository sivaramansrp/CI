import {
  Solicitud260605State,
  Tramite260605Store,
} from '../tramites/tramite260605.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260605Query extends Query<Solicitud260605State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260605Store) {
    super(store);
  }
}
