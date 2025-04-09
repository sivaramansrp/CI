import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface Solicitud260906State
 * @description Representa el estado de la solicitud 260906.
 */
export interface Solicitud260906State {
  /**
   * @property {string} referencia - Referencia de la solicitud.
   */
  referencia: string;

  /**
   * @property {string} cadenaDependencia - Cadena de dependencia asociada.
   */
  cadenaDependencia: string;

  /**
   * @property {string} banco - Banco asociado a la solicitud.
   */
  banco: string;

  /**
   * @property {string} Llave - Llave única de la solicitud.
   */
  Llave: string;

  /**
   * @property {string} tipoFetch - Tipo de operación de obtención de datos.
   */
  tipoFetch: string;

  /**
   * @property {string} importe - Importe asociado a la solicitud.
   */
  importe: string;
}

/**
 * @function createInitialState
 * @description Crea el estado inicial de la solicitud 260906.
 * @returns {Solicitud260906State} Estado inicial.
 */
export function createInitialState(): Solicitud260906State {
  return {
    referencia: '',
    cadenaDependencia: '',
    banco: '',
    Llave: '',
    tipoFetch: '',
    importe: '',
  };
}

/**
 * @class Sanitario260906Store
 * @extends {Store<Solicitud260906State>}
 * @description Almacén para gestionar el estado de la solicitud 260906.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'sanitario260906Store', resettable: true })
export class Sanitario260906Store extends Store<Solicitud260906State> {
  /**
   * @constructor
   * @description Inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setreferencia
   * @description Actualiza el valor de la referencia en el estado.
   * @param {string} referencia - Nueva referencia.
   */
  public setreferencia(referencia: string): void {
    this.update((state) => ({
      ...state,
      referencia,
    }));
  }

  /**
   * @method setcadenaDependencia
   * @description Actualiza el valor de la cadena de dependencia en el estado.
   * @param {string} cadenaDependencia - Nueva cadena de dependencia.
   */
  public setcadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * @method setbanco
   * @description Actualiza el valor del banco en el estado.
   * @param {string} banco - Nuevo banco.
   */
  public setbanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * @method setLlave
   * @description Actualiza el valor de la llave en el estado.
   * @param {string} Llave - Nueva llave.
   */
  public setLlave(Llave: string): void {
    this.update((state) => ({
      ...state,
      Llave,
    }));
  }

  /**
   * @method settipoFetch
   * @description Actualiza el valor del tipo de operación de obtención de datos en el estado.
   * @param {string} tipoFetch - Nuevo tipo de operación.
   */
  public settipoFetch(tipoFetch: string): void {
    this.update((state) => ({
      ...state,
      tipoFetch,
    }));
  }

  /**
   * @method setimporte
   * @description Actualiza el valor del importe en el estado.
   * @param {string} importe - Nuevo importe.
   */
  public setimporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe,
    }));
  }
}