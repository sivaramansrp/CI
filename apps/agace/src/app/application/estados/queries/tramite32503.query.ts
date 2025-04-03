import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite32503State } from '../tramites/tramite32503.store';
import { Tramite32503Store } from '../tramites/tramite32503.store';


/**
 * Servicio de consulta para el estado del trámite 32503.
 * 
 * Este servicio permite realizar consultas al estado del trámite 32503 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite32503Query extends Query<Tramite32503State> {

  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 32503.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite32503Query.
   * 
   * @param {Tramite32503Store} store - El store que contiene el estado del trámite 32503.
   */
  constructor(
    protected override store: Tramite32503Store) {
    super(store);
  }
}