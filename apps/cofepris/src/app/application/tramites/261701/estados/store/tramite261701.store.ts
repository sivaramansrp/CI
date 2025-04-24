/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Representa el estado de CancelacionPeticion261701.
 * Es un objeto dinámico donde las claves son cadenas y los valores pueden ser de cualquier tipo.
 * 
 * @interface CancelacionPeticion261701State
 * @property {string} [key] - Las claves son cadenas que representan los nombres de los campos.
 * @property {any} [value] - Los valores pueden ser de cualquier tipo, dependiendo del campo.
 */
export interface CancelacionPeticion261701State {
    [key: string]: any;
}

/**
 * Crea el estado inicial para CancelacionPeticion261701.
 * @returns {CancelacionPeticion261701State} Un objeto vacío que representa el estado inicial del estado de CancelacionPeticion302.
 */
export function createInitialState(): CancelacionPeticion261701State {
    return {};
}

/**
 * Marca esta clase como un servicio inyectable en Angular.
 * 
 * @decorator Injectable
 * @property {string} providedIn - Define el alcance del servicio. 
 * En este caso, el servicio está disponible en toda la aplicación ('root').
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración del store para Tramite261701.
 * 
 * @decorator StoreConfig
 * @property {string} name - Nombre del store, utilizado para identificarlo.
 * @property {boolean} resettable - Indica si el estado del store puede ser reiniciado.
 */
@StoreConfig({ name: 'tramite261701', resettable: true })

export class Tramite261701Store extends Store<CancelacionPeticion261701State> {

    /**
     * Constructor de la clase Tramite261701Store.
     * 
     * Este constructor inicializa el estado del store utilizando la función `createInitialState`.
     * La función `createInitialState` devuelve un objeto vacío que representa el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

  /**
   * Método para establecer datos en el store.
   * 
   * Este método toma un campo y un valor, y actualiza el estado del store con el nuevo valor.
   * Utiliza la función `update` del store para modificar el estado.
   * 
   * @param {string} campo - El nombre del campo que se va a actualizar en el estado.
   * @param {any} value - El nuevo valor que se asignará al campo especificado.
   */
  public establecerDatos(campo: string, value: any): void {
    this.update((state) => ({
      ...state,
      [campo]: value,
    }));
  }
  }