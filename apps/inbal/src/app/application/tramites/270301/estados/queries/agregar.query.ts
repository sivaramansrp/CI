import { Injectable } from '@angular/core';
import { solicitud270301State } from '../tramites/agregar270301.store';

import { Agregar270301Store } from '../tramites/agregar270301.store'; // Corrected import path
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AgregarQuery extends Query<solicitud270301State> {
  

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(private agrergarstore: Agregar270301Store) {
    super(agrergarstore);
  }
}





