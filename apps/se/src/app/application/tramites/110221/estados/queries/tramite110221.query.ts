import { Solicitud110221State, Tramite110221Store } from '../../estados/tramites/tramite110221.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite110221Query extends Query<Solicitud110221State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite110221Store) {
    super(store);
  }
}
