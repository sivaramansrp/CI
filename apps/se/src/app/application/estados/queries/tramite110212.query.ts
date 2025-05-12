import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110212State } from '../tramites/tramite110212.store';
import { Tramite110212Store } from '../tramites/tramite110212.store';

/**
 * Servicio de consulta para el estado del trámite 110212.
 * 
 * Este servicio permite realizar consultas al estado del trámite 110212 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110212Query extends Query<Tramite110212State> {

  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 110212.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite110212Query.
   * 
   * @param {Tramite110212Store} store - El store que contiene el estado del trámite 110212.
   */
  constructor(
    protected override store: Tramite110212Store) {
    super(store);
  }
}