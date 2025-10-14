import { Solicitud11201State, Tramite11201Store } from '../tramites/tramite11201.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio de consulta para el trámite 11201.
 * 
 * @extends Query<Solicitud11201State>
 * 
 * @description
 * Este servicio proporciona métodos para seleccionar y gestionar el estado del trámite 11201.
 *
 * @property {Observable<Solicitud11201State>} selectSeccionState$ - Selecciona el estado completo de la solicitud.
 * 
 * @constructor
 * @param {Tramite11201Store} store - El almacén que contiene el estado del trámite 11201.
 */
@Injectable({ providedIn: 'root' })
export class Tramite11201Query extends Query<Solicitud11201State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite11201Store) {
    super(store);
  }
}