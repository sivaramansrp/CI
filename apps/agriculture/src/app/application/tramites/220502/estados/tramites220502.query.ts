import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud220502State } from './tramites220502.store';
import { Solicitud220502Store } from './tramites220502.store';

@Injectable({
    providedIn:'root'
})
export class Solicitud220502Query extends Query<Solicitud220502State> {  

  /**
   * Constructor de la clase Solicitud220502Query.
   * Extiende Query de Akita para proporcionar un acceso reactivo al estado de Solicitud220502Store.
   * 
   * @param solicitud220502Store - Instancia del store que maneja el estado de la solicitud.
   */
  constructor(protected solicitud220502Store: Solicitud220502Store) {
    super(solicitud220502Store);
  }

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Proporciona una suscripción reactiva a los cambios en el estado de la store.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

}
