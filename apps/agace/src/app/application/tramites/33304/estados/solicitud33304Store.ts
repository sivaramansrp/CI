import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Representa el estado de la solicitud 33304.
 * Cada propiedad indica si un manifiesto específico está presente o no.
 *
 * @property {boolean} MANIFIESTO_1 - Indica si el manifiesto 1 está presente.
 * @property {boolean} BAJO_MANIFIESTO - Indica si el manifiesto 2 está presente.
 * @property {boolean} MANIFIESTO_3 - Indica si el manifiesto 3 está presente.
 * @property {boolean} MANIFIESTO_4 - Indica si el manifiesto 4 está presente.
 */
export interface Solicitud33304State {
  MANIFIESTO_1: boolean;
  BAJO_MANIFIESTO: boolean;
  MANIFIESTO_3: boolean;
  MANIFIESTO_4: boolean;
}


/**
 * Crea el estado inicial para la solicitud 33304.
 *
 * @returns {Solicitud33304State} El estado inicial con los valores predeterminados
 * para los manifiestos (MANIFIESTO_1, BAJO_MANIFIESTO, MANIFIESTO_3, MANIFIESTO_4) establecidos en `false`.
 */
export function createInitialState(): Solicitud33304State {
  return {
    MANIFIESTO_1: false,
    BAJO_MANIFIESTO: false,
    MANIFIESTO_3: false,
    MANIFIESTO_4: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite33304', resettable: true })
export class Solicitud33304Store extends Store<Solicitud33304State> {

  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud33304State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  } 
}
