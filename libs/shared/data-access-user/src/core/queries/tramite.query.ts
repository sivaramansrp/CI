import { TramiteState, TramiteStore } from '../estados/tramite.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})

export class TramiteQuery extends Query<TramiteState> {

  /**
   * Sleeciona el tramite almacenado en el state
   */
  selectTramite$ = this.select((state) => {
    return state;
  });

  constructor(protected override store: TramiteStore) {
    super(store);
  }

  /**
   * @description Función para obtener el número de trámite
   * @returns Un string que contiene el número de trámite.
   */
  getTramite(): string {
    return this.getValue()?.idTramite ?? '';
  }

  /**
   * Observable que emite el estado actual de la solicitud desde el store.
   * 
   * @remarks
   * Este selector retorna todo el estado tal cual. Se puede suscribir para recibir actualizaciones
   * en tiempo real cada vez que el estado cambie.
   *
   * @readonly
   * @type Observable<StateType>
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  }); 
}
