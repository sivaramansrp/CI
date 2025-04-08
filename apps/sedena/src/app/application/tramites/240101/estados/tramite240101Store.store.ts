import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Tramite240101State {
  tabSeleccionado?: number;
}

/**
 * Crea el estado inicial para el trámite 240101.
 *
 * @returns {Tramite240101State} El estado inicial del store.
 */
export function createInitialState(): Tramite240101State {
  return {
    tabSeleccionado: 1,
  };
}

/**
 * Store que maneja el estado del trámite 240101.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240101', resettable: true })
export class Tramite240101Store extends Store<Tramite240101State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @param tabSeleccionado - Índice de la nueva pestaña seleccionada.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }
}
