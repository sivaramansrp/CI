import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * @interface
 * @name Solicitud260514State
 * @description
 * Representa el estado de la solicitud en el sistema. Contiene todos los campos necesarios para gestionar los datos relacionados con la solicitud.
 */
export interface Solicitud260514State {
    /**
     * @property {string} claveReferencia
     * @description Referencia de la solicitud.
     */
    claveReferencia: string;
  
    /**
     * @property {string} cadenaDependencia
     * @description Cadena de dependencia asociada a la solicitud.
     */
    cadenaDependencia: string;
  
    /**
     * @property {string} banco
     * @description Información del banco relacionado.
     */
    banco: string;
  
    /**
     * @property {string} Llave
     * @description Llave única de la solicitud.
     */
    llavePago: string;
  
    /**
     * @property {string} fechaPago
     * @description Información de fetch.
     */
    fechaPago: string;
  
    /**
     * @property {string} importe
     * @description Importe relacionado con la solicitud.
     */
    importePago: string;
  
    
  }

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial de la solicitud. Esta función devuelve un objeto con todos los campos inicializados como cadenas vacías.
 * 
 * @returns {Solicitud260211State} El estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud260514State {
    return {
        /**
         * @property {string} referencia
         * @description Referencia de la solicitud.
         */
        claveReferencia: '',

        /**
         * @property {string} cadenaDependencia
         * @description Cadena de dependencia asociada a la solicitud.
         */
        cadenaDependencia: '',

        /**
         * @property {string} banco
         * @description Información del banco relacionado.
         */
        banco: '',

        /**
         * @property {string} Llave
         * @description Llave única de la solicitud.
         */
        llavePago: '',

        /**
         * @property {string} tipoFetch
         * @description Información de fetch.
         */
        fechaPago: '',

        /**
         * @property {string} importePago
         * @description Importe relacionado con la solicitud.
         */
        importePago: '',

       
    };
}

@Injectable({
    providedIn: 'root',
})    

@StoreConfig({ name: 'Avisocalidad260514Store', resettable: true })

export class Avisocalidad260514Store extends Store<Solicitud260514State>{
     constructor() {
            super(createInitialState());
        }

        public setclaveReferencia(claveReferencia: string) {
            this.update((state) => ({
                ...state,
                claveReferencia,
            }));
        }
        public setcadenaDependencia(cadenaDependencia: string) {
            this.update((state) => ({
                ...state,
                cadenaDependencia,
            }));
        }
        public setbanco(banco: string) {
            this.update((state) => ({
                ...state,
                banco,
            }));
        }
        public setllavePago(llavePago: string) {
            this.update((state) => ({
                ...state,
                llavePago,
            }));
        }
        public setfechaPago(fechaPago: string) {
            this.update((state) => ({
                ...state,
                fechaPago,
            }));
        }
       
        public setimportePago(importePago: string) {
            this.update((state) => ({
                ...state,
                importePago,
            }));
        }

}