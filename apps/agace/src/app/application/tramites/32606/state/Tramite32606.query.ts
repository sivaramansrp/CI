import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud32606State, Tramite32606Store } from './Tramite32606.store';

/**
 * Clase que proporciona consultas reactivas para el estado del trámite 32606.
 * Permite seleccionar partes específicas del estado almacenado en la tienda.
 */
@Injectable({ providedIn: 'root' })
export class Tramite32606Query extends Query<Solicitud32606State> {
  /**
   * Constructor de la clase.
   * @param store Instancia de la tienda `Tramite32606Store` que contiene el estado del trámite.
   */
  constructor(protected override store: Tramite32606Store) {
    super(store);
  }

  /**
   * Selecciona todo el estado de la solicitud.
   * @returns Un observable que emite el estado completo de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });
}