import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de Solicitud32201.
 * Contiene los valores de los regímenes y el manifiesto.
 */
export interface Solicitud32201State {
  /**
   * El valor de regimen_0.
   * Indica si el régimen 0 está seleccionado.
   */
  regimen_0: boolean;

  /**
   * El valor de regimen_1.
   * Indica si el régimen 1 está seleccionado.
   */
  regimen_1: boolean;

  /**
   * El valor de regimen_2.
   * Indica si el régimen 2 está seleccionado.
   */
  regimen_2: boolean;

  /**
   * El valor de regimen_3.
   * Indica si el régimen 3 está seleccionado.
   */
  regimen_3: boolean;

  /**
   * El valor de manifiesto.
   * Indica si el manifiesto está activo.
   */
  manifiesto: boolean;
}

/**
 * Función para crear el estado inicial de Solicitud32201.
 * Inicializa todos los valores de los regímenes y el manifiesto como `false`.
 * 
 * @returns {Solicitud32201State} El estado inicial de Solicitud32201.
 */
export function createInitialState(): Solicitud32201State {
  return {
    /**
     * El valor inicial de regimen_0.
     */
    regimen_0: false,

    /**
     * El valor inicial de regimen_1.
     */
    regimen_1: false,

    /**
     * El valor inicial de regimen_2.
     */
    regimen_2: false,

    /**
     * El valor inicial de regimen_3.
     */
    regimen_3: false,

    /**
     * El valor inicial de manifiesto.
     */
    manifiesto: false,
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
 * 
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite32201', resettable: true })
export class Tramite32201Store extends Store<Solicitud32201State> {
  /**
   * Crea una instancia de Tramite32201Store.
   * Inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el estado de regimen_0.
   * 
   * @param {boolean} regimen_0 - El valor de regimen_0.
   */
  public setRegimen_0(regimen_0: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_0,
    }));
  }

  /**
   * Establece el estado de regimen_1.
   * 
   * @param {boolean} regimen_1 - El valor de regimen_1.
   */
  public setRegimen_1(regimen_1: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_1,
    }));
  }

  /**
   * Establece el estado de regimen_2.
   * 
   * @param {boolean} regimen_2 - El valor de regimen_2.
   */
  public setRegimen_2(regimen_2: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_2,
    }));
  }

  /**
   * Establece el estado de regimen_3.
   * 
   * @param {boolean} regimen_3 - El valor de regimen_3.
   */
  public setRegimen_3(regimen_3: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_3,
    }));
  }

  /**
   * Establece el estado de manifiesto.
   * 
   * @param {boolean} manifiesto - El valor de manifiesto.
   */
  public setManifiesto(manifiesto: boolean): void {
    this.update((state) => ({
      ...state,
      manifiesto,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   * Restablece el estado al valor inicial.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
