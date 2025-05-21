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
}
