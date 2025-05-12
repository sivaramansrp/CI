
import { Solicitud140103State, Tramite140103Store } from '../tramites/tramite140103.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite140103Query extends Query<Solicitud140103State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite140103Store) {
    super(store);
  }
}
