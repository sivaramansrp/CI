/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa el estado de CancelacionState.
 * Es un objeto dinámico donde las claves son cadenas y los valores pueden ser de cualquier tipo.
 * 
 * @interface CancelacionState
 * @property {string} [key] - Las claves son cadenas que representan los nombres de los campos.
 * @property {any} [value] - Los valores pueden ser de cualquier tipo, dependiendo del campo.
 */

export interface CancelacionState {
    [key: string]: any;
}

/**
 * Crea el estado inicial para CancelacionState.
 * @returns {CancelacionState} Un objeto vacío que representa el estado inicial del estado de SolicitudDeRegistroTpl120101.
 */
export function createInitialState(): CancelacionState {
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
 * Configuración del store para Tramite130103.
 * 
 * @decorator StoreConfig
 * @property {string} name - Nombre del store, utilizado para identificarlo.
 * @property {boolean} resettable - Indica si el estado del store puede ser reiniciado.
 */
@StoreConfig({ name: 'Cancelacion', resettable: true })

export class CancelacionStore extends Store<CancelacionState> {

    /**
     * Constructor de la clase CancelacionStore.
     * 
     * Este constructor inicializa el estado del store utilizando la función `createInitialState`.
     * La función `createInitialState` devuelve un objeto vacío que representa el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece un valor dinámicamente en el store por el nombre del campo.
     * @param fieldName El nombre del campo a actualizar.
     * @param value El valor a establecer.
     */
  public setDynamicFieldValue(fieldName: string, value: any): void {
    this.update((state) => ({
      ...state,
      [fieldName]: value,
    }));
  }
  }