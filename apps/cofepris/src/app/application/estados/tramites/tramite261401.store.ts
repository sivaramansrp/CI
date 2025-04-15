import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la Solicitud261401.
 */
export interface Solicitud261401State {
    observaciones: string;
}

/**
 * Función para crear el estado inicial de la Solicitud261401.
 * @returns {Solicitud261401State} El estado inicial.
 */
export function createInitialState(): Solicitud261401State {
  return {
    observaciones: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite261401', resettable: true })
export class Tramite261401Store extends Store<Solicitud261401State> {
  /**
   * Crea una instancia de Tramite261401Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }
  public establecerDatos(values: Partial<Solicitud261401State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
  
}