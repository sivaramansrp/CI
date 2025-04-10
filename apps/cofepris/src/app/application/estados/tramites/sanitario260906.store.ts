import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface Solicitud260906State
 * @description Representa el estado de la solicitud 260906, incluyendo información como referencia, banco, llave única, tipo de operación de obtención de datos y el importe asociado.
 */
export interface Solicitud260906State {
  /**
   * @property {string} referencia - Referencia única de la solicitud.
   */
  referencia: string;

  /**
   * @property {string} cadenaDependencia - Cadena de dependencia asociada a la solicitud.
   */
  cadenaDependencia: string;

  /**
   * @property {string} banco - Banco asociado a la solicitud.
   */
  banco: string;

  /**
   * @property {string} Llave - Llave única que identifica la solicitud.
   */
  Llave: string;

  /**
   * @property {string} tipoFetch - Tipo de operación de obtención de datos (fetch) asociada a la solicitud.
   */
  tipoFetch: string;

  /**
   * @property {string} importe - Importe monetario asociado a la solicitud.
   */
  importe: string;
}

/**
 * @function createInitialState
 * @description Crea y devuelve el estado inicial de la solicitud 260906 con valores predeterminados.
 * @returns {Solicitud260906State} El estado inicial de la solicitud.
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
 * @description Clase que representa el almacén (store) para gestionar el estado de la solicitud 260906. Proporciona métodos para actualizar las propiedades del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'sanitario260906Store', resettable: true })
export class Sanitario260906Store extends Store<Solicitud260906State> {
  /**
   * @constructor
   * @description Constructor que inicializa el almacén con el estado inicial definido en `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setreferencia
   * @description Actualiza el valor de la propiedad `referencia` en el estado.
   * @param {string} referencia - Nuevo valor para la referencia de la solicitud.
   */
  public setreferencia(referencia: string): void {
    this.update((state) => ({
      ...state,
      referencia,
    }));
  }

  /**
   * @method setcadenaDependencia
   * @description Actualiza el valor de la propiedad `cadenaDependencia` en el estado.
   * @param {string} cadenaDependencia - Nuevo valor para la cadena de dependencia.
   */
  public setcadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * @method setbanco
   * @description Actualiza el valor de la propiedad `banco` en el estado.
   * @param {string} banco - Nuevo valor para el banco asociado a la solicitud.
   */
  public setbanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * @method setLlave
   * @description Actualiza el valor de la propiedad `Llave` en el estado.
   * @param {string} Llave - Nuevo valor para la llave única de la solicitud.
   */
  public setLlave(Llave: string): void {
    this.update((state) => ({
      ...state,
      Llave,
    }));
  }

  /**
   * @method settipoFetch
   * @description Actualiza el valor de la propiedad `tipoFetch` en el estado.
   * @param {string} tipoFetch - Nuevo tipo de operación de obtención de datos.
   */
  public settipoFetch(tipoFetch: string): void {
    this.update((state) => ({
      ...state,
      tipoFetch,
    }));
  }

  /**
   * @method setimporte
   * @description Actualiza el valor de la propiedad `importe` en el estado.
   * @param {string} importe - Nuevo valor para el importe asociado a la solicitud.
   */
  public setimporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe,
    }));
  }
}