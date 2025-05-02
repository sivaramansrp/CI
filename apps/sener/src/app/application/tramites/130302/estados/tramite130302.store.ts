/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Representa el estado de ExportarIlustraciones130302.
 * Es un objeto dinámico donde las claves son cadenas y los valores pueden ser de cualquier tipo.
 * 
 * @interface ExportarIlustraciones130302State
 * @property {string} [key] - Las claves son cadenas que representan los nombres de los campos.
 * @property {any} [value] - Los valores pueden ser de cualquier tipo, dependiendo del campo.
 */
export interface ExportarIlustraciones130302State {
    [key: string]: any;
    saldoDisponible:string;
    prorrogaDel:string;
    prorrogaAl:string;
    motivoJustificacion:string;
    otrasDeclaraciones:string;
}

/**
 * Crea el estado inicial para ExportarIlustraciones130302.
 * @returns {ExportarIlustraciones261702State} Un objeto vacío que representa el estado inicial del estado de ExportarIlustraciones130302.
 */
export function createInitialState(): ExportarIlustraciones130302State {
    return {
        saldoDisponible: '',
        prorrogaDel: '',
        prorrogaAl: '',
        motivoJustificacion: '',
        otrasDeclaraciones: '',
    };
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
 * Configuración del store para Tramite130302.
 * 
 * @decorator StoreConfig
 * @property {string} name - Nombre del store, utilizado para identificarlo.
 * @property {boolean} resettable - Indica si el estado del store puede ser reiniciado.
 */
@StoreConfig({ name: 'tramite130302', resettable: true })

export class Tramite130302Store extends Store<ExportarIlustraciones130302State> {

    /**
     * Constructor de la clase Tramite130302Store.
     * 
     * Este constructor inicializa el estado del store utilizando la función `createInitialState`.
     * La función `createInitialState` devuelve un objeto vacío que representa el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
   * Set a value dynamically in the store by field name.
   * @param fieldName The name of the field to update.
   * @param value The value to set.
   */
  public setDynamicFieldValue(fieldName: string, value: any): void {
    this.update((state) => ({
      ...state,
      [fieldName]: value,
    }));
  }

  public setsaldoDisponible(saldoDisponible: string): void {
    this.update((state) => ({
      ...state,
      saldoDisponible,
    }));
  }
  

  public setprorrogaDel(prorrogaDel: string): void {
    this.update((state) => ({
      ...state,
      prorrogaDel,
    }));
  }

  public setprorrogaAl(prorrogaAl: string): void {
    this.update((state) => ({
      ...state,
      prorrogaAl,
    }));
  }

    public setmotivoJustificacion(motivoJustificacion: string): void {
        this.update((state) => ({
        ...state,
        motivoJustificacion,
        }));
  }
 
public setotrasDeclaraciones(otrasDeclaraciones: string): void {
        this.update((state) => ({
        ...state,
        otrasDeclaraciones,
        }));
    }
}