import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface representing the state of Tramites140112.
 */
export interface Tramites140112State {
  /**
   * Object containing the desistimiento property.
   */
  permisoCancelar: {
    /**
     * The desistimiento property.
     * @type {string}
     */
    desistimiento: string;
  };
}

/**
 * Function to create the initial state for Tramites140112.
 * @returns {Tramites140112State} The initial state.
 */
export function createInitialState(): Tramites140112State {
  return {
    permisoCancelar: {
      desistimiento: '',
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites140112', resettable: true })
/**
 * Store class for managing the state of Tramites140112.
 */
export class Tramite140112Store extends Store<Tramites140112State> {
  /**
   * Constructor for Tramite140112Store.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Updates the desistimiento property in the state.
   * @param {string} desistimiento - The new value for desistimiento.
   */
  public setDesistimiento(desistimiento: string) {
    this.update((state) => ({
      ...state,
      permisoCancelar: {
        ...state.permisoCancelar,
        desistimiento,
      }
    }));
  }
}