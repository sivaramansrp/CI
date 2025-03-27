import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { solicitud260604State } from '../../estados/stores/tramites260604.store';

import { Tramites260604Store } from '../../estados/stores/tramites260604.store'

@Injectable({ providedIn: 'root' })
export class Tramites260604Query extends Query<solicitud260604State> {
//   selectedEstado$ = this.select((state) => state.selectedEstado);
  /**
   * Selecciona el estado completo de la solicitud
   */
  
  /**Guarda el estado completo del formulario de la solicitud */

  selectSolicitud$ = this.select((state) => {
    return state;
  });
  constructor(
    private tramites260604:Tramites260604Store ) {
    super(tramites260604);
  }
}