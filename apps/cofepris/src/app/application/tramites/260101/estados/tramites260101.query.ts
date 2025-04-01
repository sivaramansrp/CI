import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud260101State } from './tramites260101.store';
import { Solicitud260101Store } from './tramites260101.store';

/**
 * Servicio que gestiona las consultas (queries) relacionadas con el estado de `Solicitud260101`.
 * Utiliza Akita para la gestión del estado en la aplicación.
 */
@Injectable({ providedIn: 'root' })
export class Solicitud260101Query extends Query<Solicitud260101State> {
  
  /**
   * Constructor del servicio `Solicitud260101Query`.
   * Inicializa la instancia de la consulta con la tienda (`store`) correspondiente.
   * @param solicitud260101Store - Almacén (`store`) que contiene el estado de la solicitud 260101.
   */
  constructor(protected solicitud260101Store: Solicitud260101Store) {
    super(solicitud260101Store);
  }

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Permite escuchar cambios en el estado y reaccionar a ellos.
   */
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });
}
