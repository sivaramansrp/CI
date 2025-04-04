
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store';

/**
 * Service to query the state of Solicitud260211.
 */
@Injectable({ providedIn: 'root' })
export class AvisocalidadQuery extends Query<SolicitudState> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<SolicitudState>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  
  constructor(
    protected override store: AvisocalidadStore) {
    super(store);
  }
}