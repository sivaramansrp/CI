import {
  Solicitud260502State,
  Tramite260502Store,
} from '../../estados/stores/tramite260502.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260502Query extends Query<Solicitud260502State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260502Store) {
    super(store);
  }
}
