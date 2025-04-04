/**
 * @file Servicio para manejar el estado de Aviso de Calidad.
 * Este archivo define el estado, el estado inicial y las funciones para actualizar el estado.
 */

import { Store, StoreConfig } from '@datorama/akita'; // Importa Store y StoreConfig de Akita para manejar el estado.
import { Injectable } from '@angular/core'; // Importa el decorador Injectable de Angular.

/**
 * @interface SolicitudState
 * Representa el estado de la solicitud en el sistema.
 */
export interface SolicitudState {
    /**
     * @property {string} claveReferencia
     * Referencia de la solicitud.
     */
    claveReferencia: string;

    /**
     * @property {string} cadenaDependencia
     * Cadena de dependencia asociada a la solicitud.
     */
    cadenaDependencia: string;

    /**
     * @property {string} banco
     * Información del banco relacionado.
     */
    banco: string;

    /**
     * @property {string} llavePago
     * Llave única de la solicitud.
     */
    llavePago: string;

    /**
     * @property {string} fechaPago
     * Fecha del pago relacionado con la solicitud.
     */
    fechaPago: string;

    /**
     * @property {string} importePago
     * Importe relacionado con la solicitud.
     */
    importePago: string;
}

/**
 * @function createInitialState
 * Crea el estado inicial de la solicitud.
 * @returns {SolicitudState} El estado inicial con valores vacíos.
 */
export function createInitialState(): SolicitudState {
    return {
        claveReferencia: '', // Inicializa claveReferencia como una cadena vacía.
        cadenaDependencia: '', // Inicializa cadenaDependencia como una cadena vacía.
        banco: '', // Inicializa banco como una cadena vacía.
        llavePago: '', // Inicializa llavePago como una cadena vacía.
        fechaPago: '', // Inicializa fechaPago como una cadena vacía.
        importePago: '', // Inicializa importePago como una cadena vacía.
    };
}

/**
 * @Injectable Marca esta clase como un servicio que puede ser inyectado en otros componentes o servicios.
 * @providedIn 'root' Indica que este servicio está disponible en toda la aplicación.
 */
@Injectable({
    providedIn: 'root',
})    

/**
 * @StoreConfig Configuración del store.
 * @name 'AvisocalidadStore' Nombre del store.
 * @resettable true Indica que el estado puede ser reiniciado.
 */
@StoreConfig({ name: 'AvisocalidadStore', resettable: true })

/**
 * @class AvisocalidadStore
 * Clase que extiende Store para manejar el estado de Aviso de Calidad.
 */
export class AvisocalidadStore extends Store<SolicitudState> {
    /**
     * @constructor
     * Inicializa el store con el estado inicial.
     */
    constructor() {
        super(createInitialState()); // Llama a la función para crear el estado inicial.
    }

    /**
     * @method setclaveReferencia
     * Actualiza el valor de claveReferencia en el estado.
     * @param {string} claveReferencia Nuevo valor para claveReferencia.
     */
    public setclaveReferencia(claveReferencia: string): void {
        this.update((state) => ({
            ...state, // Mantiene el resto del estado sin cambios.
            claveReferencia, // Actualiza claveReferencia.
        }));
    }

    /**
     * @method setcadenaDependencia
     * Actualiza el valor de cadenaDependencia en el estado.
     * @param {string} cadenaDependencia Nuevo valor para cadenaDependencia.
     */
    public setcadenaDependencia(cadenaDependencia: string): void {
        this.update((state) => ({
            ...state,
            cadenaDependencia,
        }));
    }

    /**
     * @method setbanco
     * Actualiza el valor de banco en el estado.
     * @param {string} banco Nuevo valor para banco.
     */
    public setbanco(banco: string): void {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }

    /**
     * @method setllavePago
     * Actualiza el valor de llavePago en el estado.
     * @param {string} llavePago Nuevo valor para llavePago.
     */
    public setllavePago(llavePago: string): void {
        this.update((state) => ({
            ...state,
            llavePago,
        }));
    }

    /**
     * @method setfechaPago
     * Actualiza el valor de fechaPago en el estado.
     * @param {string} fechaPago Nuevo valor para fechaPago.
     */
    public setfechaPago(fechaPago: string): void {
        this.update((state) => ({
            ...state,
            fechaPago,
        }));
    }

    /**
     * @method setimportePago
     * Actualiza el valor de importePago en el estado.
     * @param {string} importePago Nuevo valor para importePago.
     */
    public setimportePago(importePago: string): void {
        this.update((state) => ({
            ...state,
            importePago,
        }));
    }
}