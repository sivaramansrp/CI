import { Solicitud31616PerfilesState, Tramite31616PerfilesStore } from '../../estados/tramites/tramite31616_perfiles.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * @class Tramite31616PerfilesQuery
 * @description
 * Clase encargada de realizar consultas al estado de la solicitud para perfiles del formulario 31616.
 * Proporciona métodos para seleccionar y observar cambios en el estado de la solicitud.
 */
@Injectable({ providedIn: 'root' })
export class Tramite31616PerfilesQuery extends Query<Solicitud31616PerfilesState> {
  /**
   * @property {Observable<Solicitud31616PerfilesState>} selectSolicitud$
   * @description
   * Observable que permite suscribirse a los cambios en el estado completo de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * @constructor
   * @description
   * Constructor que inicializa la consulta con el store correspondiente.
   * @param {Tramite31616PerfilesStore} store - Store que contiene el estado de la solicitud.
   */
  constructor(protected override store: Tramite31616PerfilesStore) {
    super(store);
  }
}