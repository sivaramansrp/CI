
import { Tramite32610TercerosState, Tramite32610TercerosStore } from '../tramites/tramite32610-terceros.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


/**
 * Servicio para consultar el estado de la solicitud 32610 relacionada con terceros.
 */
@Injectable({ providedIn: 'root' })
export class Tramite32610TercerosQuery extends Query<Tramite32610TercerosState> {
  
  /**
   * Observable que selecciona el estado completo de la solicitud relacionada con terceros.
   * @returns {Observable<Tramite32610TercerosState>} El estado completo de la solicitud de terceros.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio Tramite32610TercerosQuery.
   * @param {Tramite32610TercerosStore} store - El store que contiene el estado de la solicitud 32610 de terceros.
   */
  constructor(protected override store: Tramite32610TercerosStore) {
    super(store);
  }
}
