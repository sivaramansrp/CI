
import { Tramite32610State, Tramite32610Store } from '../tramites/tramite32610.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


/**
 * Servicio para consultar el estado de la solicitud 32610 relacionada con terceros.
 */
@Injectable({ providedIn: 'root' })
export class Tramite32610Query extends Query<Tramite32610State> {
  
  /**
   * Observable que selecciona el estado completo de la solicitud relacionada con terceros.
   * @returns {Observable<Tramite32610State>} El estado completo de la solicitud de terceros.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio Tramite32610Query.
   * @param {Tramite32610Store} store - El store que contiene el estado de la solicitud 32610 de terceros.
   */
  constructor(protected override store: Tramite32610Store) {
    super(store);
  }
}
