import { Solicitud32505State, Tramite32505Store } from './Tramite32505.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Clase que proporciona consultas reactivas para el estado del trámite 32505.
 * Permite seleccionar partes específicas del estado almacenado en la tienda.
 */
@Injectable({ providedIn: 'root' })
export class Tramite32505Query extends Query<Solicitud32505State> {
  /**
   * Constructor de la clase.
   * @param store Instancia de la tienda `Tramite32505Store` que contiene el estado del trámite.
   */
  constructor(protected override store: Tramite32505Store) {
    super(store);
  }

  /**
   * Selecciona todo el estado de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

}