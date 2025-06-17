import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ComplementarState, ComplementarStore } from '../tramites/complementar.store';


@Injectable({ providedIn: 'root' })
export class ComplementarQuery extends Query<ComplementarState> {
  /**
   * Selecciona el estado completo de la solicitud Store
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: ComplementarStore) {
    super(store);
  }
}