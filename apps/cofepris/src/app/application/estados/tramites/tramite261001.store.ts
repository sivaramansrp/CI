import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud216001.
 */
export interface Solicitud216001State {
    /**
     * El valor de rfcDel.
     */
    rfcDel: string;
    /**
     * El valor de denominacion.
     */
    denominacion: string;
    /**
     * El valor de correo.
     */
    correo:string;
    /**
     * El valor de codigoPostal.
     */
    codigoPostal:string;
    /**
     * El valor de estado.
     */
    estado:string;
    
    
}
/**
 * Función para crear el estado inicial de Solicitud216001State.
 * @returns {Solicitud216001State} El estado inicial de Solicitud216001State.
 */
export function createInitialState(): Solicitud216001State {
    return {
        /**
         * El valor de rfcDel.
         */
        rfcDel: '',
        /**
         * El valor de denominacion.
         */
        denominacion: '',
        /**
        * El valor de correo.
        */
        correo:'',
        /**
         * El valor de codigoPostal.
         */
        codigoPostal:'',
        /**
         * El valor de estado.
         */
        estado:'',
        
        
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
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite216001', resettable: true })

export class Tramite216001Store extends Store<Solicitud216001State>{
    /**
     * Crea una instancia de Tramite31601Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de rfcDel.
     * @param rfcDel - El valor de rfcDel.
     */
    public setRfcDel(rfcDel: string) {
        this.update((state) => ({
            ...state,
            rfcDel,
        }));
    }
    /**
     * Establece el estado de denominacion.
     * @param denominacion - El valor de denominacion.
     */
    public setDenominacion(denominacion: string) {
        this.update((state) => ({
            ...state,
            denominacion,
        }));
    }
    /**
     * Establece el estado de correo.
     * @param correo - El valor de correo.
     */
    public setCorreo(correo: string) {
        this.update((state) => ({
            ...state,
            correo,
        }));
    }
    /**
     * Establece el estado de codigoPostal.
     * @param codigoPostal - El valor de codigoPostal.
     */
    public setCodigoPostal(codigoPostal: string) {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }
    /**
     * Establece el estado de estado.
     * @param estado - El valor de estado.
     */
    public setEstado(estado: string) {
        this.update((state) => ({
            ...state,
            estado,
        }));
    }

    
} 
  