import {
  Solicitud90201State,
  Tramite90201Store,
} from '../tramites/tramite90201.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite90201Query extends Query<Solicitud90201State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite90201Store) {
    super(store);
  }
}
