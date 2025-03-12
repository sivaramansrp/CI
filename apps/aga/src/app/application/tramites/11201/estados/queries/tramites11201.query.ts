
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud11201State } from '../tramites/tramites11201.store';
import { Solicitud11201Store } from '../tramites/tramites11201.store';

@Injectable({ providedIn: 'root' })
export class Solicitud11201Query extends Query<Solicitud11201State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Solicitud11201Store) {
    super(store);
  }
}
