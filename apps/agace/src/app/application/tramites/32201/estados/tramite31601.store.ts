import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de Solicitud31601.
 */
export interface Solicitud31601State {
  /**
   * El valor de regimen_0.
   */
  regimen_0: boolean;

  /**
   * El valor de regimen_1.
   */
  regimen_1: boolean;

  /**
   * El valor de regimen_2.
   */
  regimen_2: boolean;

  /**
   * El valor de regimen_3.
   */
  regimen_3: boolean;
}
/**
 * Función para crear el estado inicial de Solicitud31601.
 * @returns {Solicitud31601State} El estado inicial de Solicitud31601.
 */
export function createInitialState(): Solicitud31601State {
  return {
    /**
     * El valor de regimen_0.
     */
    regimen_0: false,

    /**
     * El valor de regimen_1.
     */
    regimen_1: false,

    /**
     * El valor de regimen_2.
     */
    regimen_2: false,

    /**
     * El valor de regimen_3.
     */
    regimen_3: false,
  };
}

/**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Decorador StoreConfig para configurar la tienda con un nombre y una opción de restablecimiento.
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite31601', resettable: true })
export class Tramite31601Store extends Store<Solicitud31601State> {
  /**
   * Crea una instancia de Tramite31601Store.
   * Inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el estado de regimen_0.
   * @param regimen_0 - El valor de regimen_0.
   */
  public setRegimen_0(regimen_0: boolean) {
    this.update((state) => ({
      ...state,
      regimen_0,
    }));
  }

  /**
   * Establece el estado de regimen_1.
   * @param regimen_1 - El valor de regimen_1.
   */
  public setRegimen_1(regimen_1: boolean) {
    this.update((state) => ({
      ...state,
      regimen_1,
    }));
  }

  /**
   * Establece el estado de regimen_2.
   * @param regimen_2 - El valor de regimen_2.
   */
  public setRegimen_2(regimen_2: boolean) {
    this.update((state) => ({
      ...state,
      regimen_2,
    }));
  }

  /**
   * Establece el estado de regimen_3.
   * @param regimen_3 - El valor de regimen_3.
   */
  public setRegimen_3(regimen_3: boolean) {
    this.update((state) => ({
      ...state,
      regimen_3,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
