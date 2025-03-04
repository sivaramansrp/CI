import { Solicitud31601State, Tramite31601Store } from '../../estados/tramites/tramite31601.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite31601Query extends Query<Solicitud31601State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite31601Store) {
    super(store);
  }
}
