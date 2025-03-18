
import { Solicitud130106State } from '../tramites/tramite130106.store';
import { Injectable } from '@angular/core';
import { Tramite130106Store } from '../tramites/tramite130106.store';
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite130106Query extends Query<Solicitud130106State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite130106Store) {
    super(store);
  }
}
