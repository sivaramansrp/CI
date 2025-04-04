import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * @interface
 * @name SolicitudState
 * @description
 * Representa el estado de la solicitud en el sistema. Contiene todos los campos necesarios para gestionar los datos relacionados con la solicitud.
 */
export interface SolicitudState {
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
 * @returns {SolicitudState} El estado inicial de la solicitud.
 */
export function createInitialState(): SolicitudState {
    return {
        /**
         * @property {string} claveReferencia
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
         * @property {string} llavePago
         * @description Llave única de la solicitud.
         */
        llavePago: '',

        /**
         * @property {string} fechaPago
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

@StoreConfig({ name: 'AvisocalidadStore', resettable: true })

export class AvisocalidadStore extends Store<SolicitudState>{
     constructor() {
            super(createInitialState());
        }

        public setclaveReferencia(claveReferencia: string): void {
            this.update((state) => ({
                ...state,
                claveReferencia,
            }));
        }
        public setcadenaDependencia(cadenaDependencia: string):void {
            this.update((state) => ({
                ...state,
                cadenaDependencia,
            }));
        }
        public setbanco(banco: string): void {
            this.update((state) => ({
                ...state,
                banco,
            }));
        }
        public setllavePago(llavePago: string): void {
            this.update((state) => ({
                ...state,
                llavePago,
            }));
        }
        public setfechaPago(fechaPago: string): void {
            this.update((state) => ({
                ...state,
                fechaPago,
            }));
        }
       
        public setimportePago(importePago: string): void {
            this.update((state) => ({
                ...state,
                importePago,
            }));
        }

}