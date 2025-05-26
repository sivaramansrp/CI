import { Solicitud30505AgregarAgenteState, Tramite30505AgregarAgenteStore } from '../estados/tramites/tramite30505-agregar-agente.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio para consultar el estado de la solicitud 30505AgregarAgente.
 */
@Injectable({ providedIn: 'root' })
export class Tramite30505AgregarAgenteQuery extends Query<Solicitud30505AgregarAgenteState> {

  /**
   * Observable que selecciona el estado completo de la solicitud.
   * @returns {Observable<Solicitud30505AgregarAgenteState>} El estado completo de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio Tramite30505AgregarAgenteQuery.
   * @param {Tramite30505AgregarAgenteStore} store - El store que contiene el estado de la solicitud 30505AgregarAgente.
   */
  constructor(
    protected override store: Tramite30505AgregarAgenteStore) {
    super(store);
  }
}
