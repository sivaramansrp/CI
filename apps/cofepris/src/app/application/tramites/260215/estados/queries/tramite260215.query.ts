import {
  Solicitud260215State,
  Tramite260215Store,
} from '../tramites/tramite260215.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260215Query extends Query<Solicitud260215State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260215Store) {
    super(store);
  }
}
