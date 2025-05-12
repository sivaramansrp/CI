import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud260910State } from './tramites260910.store';
import { Solicitud260910Store } from './tramites260910.store';

/**
 * Servicio que gestiona las consultas (queries) relacionadas con el estado de `Solicitud260910`.
 * Utiliza Akita para la gestión del estado en la aplicación.
 */
@Injectable({ providedIn: 'root' })
export class Solicitud260910Query extends Query<Solicitud260910State> {
  
  /**
   * Constructor del servicio `Solicitud260910Query`.
   * Inicializa la instancia de la consulta con la tienda (`store`) correspondiente.
   * @param solicitud260910Store - Almacén (`store`) que contiene el estado de la solicitud 260910.
   */
  constructor(protected solicitud260910Store: Solicitud260910Store) {
    super(solicitud260910Store);
  }

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Permite escuchar cambios en el estado y reaccionar a ellos.
   */
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });
}
