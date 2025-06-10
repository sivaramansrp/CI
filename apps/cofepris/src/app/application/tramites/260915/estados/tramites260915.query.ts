import { Solicitud260915State, Solicitud260915Store } from './tramites260915.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio de consulta (Query) para el estado de la solicitud 260915.
 * Permite seleccionar y observar los cambios en el estado de la solicitud.
 */
@Injectable({ providedIn: 'root' })
export class Solicitud260915Query extends Query<Solicitud260915State> {

  /**
   * Observable que emite el estado completo de la solicitud 260915.
   * Se puede suscribir para obtener actualizaciones en tiempo real del estado.
   */
  selectSolicitud260915$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del Query.
   * @param store Instancia del store que contiene el estado de la solicitud 260915.
   */
  constructor(
    protected override store: Solicitud260915Store) {
    super(store);
  }
}