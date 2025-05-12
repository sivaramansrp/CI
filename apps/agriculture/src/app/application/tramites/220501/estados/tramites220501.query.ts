import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud220501State } from './tramites220501.store';
import { Solicitud220501Store } from './tramites220501.store';

@Injectable({
    providedIn:'root'
})
export class Solicitud220501Query extends Query<Solicitud220501State> {  

  /**
   * Constructor de la clase Solicitud220501Query.
   * Extiende Query de Akita para proporcionar un acceso reactivo al estado de Solicitud220502Store.
   * 
   * @param solicitud220501Store - Instancia del store que maneja el estado de la solicitud.
   */
  constructor(protected solicitud220501Store: Solicitud220501Store) {
    super(solicitud220501Store);
  }

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Proporciona una suscripción reactiva a los cambios en el estado de la store.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

}
