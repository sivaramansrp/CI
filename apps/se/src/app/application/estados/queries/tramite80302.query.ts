import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud80302State, Tramite80302Store } from '../tramites/tramite80302.store';

@Injectable({ providedIn: 'root' })
export class Tramite80302Query extends Query<Solicitud80302State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite80302Store) {
    super(store);
  }
}
