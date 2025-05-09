import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110214State } from '../tramites/tramite110214.store';
import { Tramite110214Store } from '../tramites/tramite110214.store';


/**
 * Servicio de consulta para el estado del trámite 110214.
 * 
 * Este servicio permite realizar consultas al estado del trámite 110214 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110214Query extends Query<Tramite110214State> {

  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 110214.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite110214Query.
   * 
   * @param {Tramite110214Store} store - El store que contiene el estado del trámite 110214.
   */
  constructor(
    protected override store: Tramite110214Store) {
    super(store);
  }
}