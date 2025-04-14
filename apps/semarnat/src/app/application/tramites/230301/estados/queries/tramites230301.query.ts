import { Solicitud230301State, Solicitud230301Store } from '../tramites/tramites230301.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ConsultaSolicitud230301Query extends Query<Solicitud230301State> {

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * @type {Observable<Solicitud230301State>}
   */
  estadoSolicitud$ = this.select((estado) => {
    return estado;
  });

  /**
   * Constructor de la clase `ConsultaSolicitud230301Query`.
   * Inicializa la consulta con el store proporcionado.
   * @param {Solicitud230301Store} store - Store que contiene el estado de la solicitud.
   */
  constructor(
    protected override store: Solicitud230301Store
  ) {
    super(store);
  }
}