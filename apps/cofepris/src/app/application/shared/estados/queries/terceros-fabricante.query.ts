import {
  TercerosFabricanteState,
  TercerosFabricanteStore,
} from '../stores/terceros-fabricante.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class TercerosFabricanteQuery extends Query<TercerosFabricanteState> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: TercerosFabricanteStore) {
    super(store);
  }
}
