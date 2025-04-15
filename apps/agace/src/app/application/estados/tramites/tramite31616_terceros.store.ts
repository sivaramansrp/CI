import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud31616.
 */
export interface Solicitud31616TercerosState {
    /**
     * El valor de resigtro.
     */
    resigtro: string;
    
    /**
     * El valor de telefono.
     */
    telefono: string;
    
    /**
     * El valor de correo.
     */
    correo: string;
    
   
}
/**
 * Función para crear el estado inicial de Solicitud31616Terceros.
 * @returns {Solicitud31616TercerosState} El estado inicial de Solicitud31616Terceros.
 */
export function createInitialState(): Solicitud31616TercerosState {
    return {
        /**
         * El valor de resigtro.
         */
        resigtro: '',
        
        /**
         * El valor de telefono.
         */
        telefono: '',
        
        /**
         * El valor de correo.
         */
        correo: '',
        
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
@StoreConfig({ name: 'tramite31616Terceros', resettable: true })

export class Tramite31616TercerosStore extends Store<Solicitud31616TercerosState>{
    /**
     * Crea una instancia de Tramite31616Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de resigtro.
     * @param resigtro - El valor de resigtro.
     */
    public setResigtro(resigtro: string) {
        this.update((state) => ({
            ...state,
            resigtro,
        }));
    }

    /**
     * Establece el estado de telefono.
     * @param telefono - El valor de telefono.
     */
    public setTelefono(telefono: string) {
        this.update((state) => ({
            ...state,
            telefono,
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


} 
  