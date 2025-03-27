import { Solicitud260603State, Tramite260603Store } from './tramites260603.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio que extiende la clase `Query` de Akita para realizar consultas sobre el estado de la solicitud 260603.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260603Query extends Query<Solicitud260603State> {

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Permite suscribirse a los cambios en el estado de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio `Tramite260603Query`.
   * @param store El store que contiene el estado de la solicitud 260603.
   */
  constructor(
    protected override store: Tramite260603Store) {
    super(store);
  }
}