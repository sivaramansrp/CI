import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * @interface
 * @name UnicoState
 * @description
 * Representa el estado de la solicitud en el sistema. Contiene todos los campos necesarios para gestionar los datos relacionados con la solicitud.
 */
export interface UnicoState {

    modalidad:string;

    protestaVerdad: string;

    envioAviso: string;

    numeroAviso: string;
    /**
     * @property {string} referencia
     * @description Referencia de la solicitud.
     */
    claveReferencia: string;

    numeroOperacion: string;
  
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
     * @property {string} llavePago
     * @description llavePago única de la solicitud.
     */
    llavePago: string;
  
    /**
     * @property {string} tipoFetch
     * @description Información de fetch.
     */
    fechaPago: string;
  
    /**
     * @property {string} importePago
     * @description importePago relacionado con la solicitud.
     */
    importePago: string;
  
    
  }

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial de la solicitud. Esta función devuelve un objeto con todos los campos inicializados como cadenas vacías.
 * 
 * @returns {UnicoState} El estado inicial de la solicitud.
 */
export function createInitialState(): UnicoState {
    return {

        modalidad:'',

        protestaVerdad: '',

        envioAviso: '',

        numeroAviso: '',
        /**
         * @property {string} claveReferencia
         * @description claveReferencia de la solicitud.
         */
        claveReferencia: '',

        numeroOperacion: '',

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
         * @property {string} fechaPago
         * @description Información de fetch.
         */
        fechaPago: '',

        /**
         * @property {string} importe
         * @description Importe relacionado con la solicitud.
         */
        importePago: '',

       
    };
}

@Injectable({
    providedIn: 'root',
})    

@StoreConfig({ name: 'unicoStore', resettable: true })

export class UnicoStore extends Store<UnicoState>{
     constructor() {
            super(createInitialState());
        }

        public setmodalidad(modalidad: string) {
            this.update((state) => ({
                ...state,
                modalidad,
            }));
        }

        public setprotestaVerdad(protestaVerdad: string) {
            this.update((state) => ({
                ...state,
                protestaVerdad,
            }));
        }

        
        public setenvioAviso(envioAviso: string) {
            this.update((state) => ({
                ...state,
                envioAviso,
            }));
        }

        public setnumeroAviso(numeroAviso: string) {
            this.update((state) => ({
                ...state,
                numeroAviso,
            }));
        }

        public setclaveReferencia(claveReferencia: string) {
            this.update((state) => ({
                ...state,
                claveReferencia,
            }));
        }

        public setnumeroOperacion(numeroOperacion: string) {
            this.update((state) => ({
                ...state,
                numeroOperacion,
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