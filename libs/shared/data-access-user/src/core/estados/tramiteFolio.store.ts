import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado para el número de trámite
 */
export interface TramiteFolioState {
  idTramite: string | null;
  firma: string | null;
}

/**
 * Creación del estado inicial para el trámite
 * @returns TramiteFolioState
 */
export function createInitialFolioTramiteState(): TramiteFolioState {
  return {
    idTramite: null,
    firma: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite', resettable: true })
export class TramiteFolioStore extends Store<TramiteFolioState> {
  constructor() {
    super(createInitialFolioTramiteState());
  }

  /**
   * Guarda el número de trámite en el state
   *
   * @param idTramite
   */
  public establecerTramite(idTramite: string, firma: string): void {
    this.update((state) => ({
      ...state,
      idTramite,
      firma,
    }));
  }

  /**
   * Limpia el estado del trámite
   */

  public limpiarTramite(): void {
    this.reset();
  }
}
