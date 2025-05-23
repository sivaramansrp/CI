
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';


/**
 * Interfaz que define el estado del trámite 630303.
 * Contiene las propiedades necesarias para gestionar el estado del trámite.
 */
export interface Tramite630303State {
  [key: string]: unknown; // Permite propiedades adicionales
}

/**
 * Función que crea el estado inicial del trámite 630303.
 * 
 * @returns Estado inicial del trámite 630303.
 */
export function createInitialState(): Tramite630303State {
  return {
  };
}

/**
 * Clase que representa el store del trámite 630303.
 * Extiende la clase `Store` de Akita para gestionar el estado del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630303', resettable: true })
export class Tramite630303Store extends Store<Tramite630303State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
  setTramite630303State(fieldName: string, valores:unknown): void {
    this.update((state => ({
      ...state,
      [fieldName]: valores,
    })));
  }
}