import { Solicitud120403State, Tramite120403Store } from './Tramite120403.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Clase que proporciona consultas reactivas para el estado del trámite 120403.
 * Permite seleccionar partes específicas del estado almacenado en la tienda.
 */
@Injectable({ providedIn: 'root' })
export class Tramite120403Query extends Query<Solicitud120403State> {
  /**
   * Constructor de la clase.
   * @param store Instancia de la tienda `Tramite120403Store` que contiene el estado del trámite.
   */
  constructor(protected override store: Tramite120403Store) {
    super(store);
  }

  /**
   * Selecciona todo el estado de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  
}