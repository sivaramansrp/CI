import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud31616.
 */
export interface Solicitud31616State {
    /**
     * El valor de sectorProductivo.
     */
    sectorProductivo: string;
    /**
     * El valor de servicio.
     */
    servicio: string;
    /**
     * El valor de solicitudDeInspeccion.
     */
    solicitudDeInspeccion: string;
    /**
     * El valor de indiqueAutorizo.
     */
    indiqueAutorizo: string;
   
}
/**
 * Función para crear el estado inicial de Solicitud31616.
 * @returns {Solicitud31616State} El estado inicial de Solicitud31616.
 */
export function createInitialState(): Solicitud31616State {
    return {
        /**
         * El valor de sectorProductivo.
         */
        sectorProductivo: '',
        /**
         * El valor de servicio.
         */
        servicio: '',
        /**
         * El valor de solicitudDeInspeccion.
         */
        solicitudDeInspeccion: '',
        /**
         * El valor de indiqueAutorizo.
         */
        indiqueAutorizo: '',
       
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
@StoreConfig({ name: 'tramite31616', resettable: true })

export class Tramite31616Store extends Store<Solicitud31616State>{
    /**
     * Crea una instancia de Tramite31616Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de sectorProductivo.
     * @param sectorProductivo - El valor de sectorProductivo.
     */
    public setSectorProductivo(sectorProductivo: string) {
        this.update((state) => ({
            ...state,
            sectorProductivo,
        }));
    }
    
    /**
     * Establece el estado de servicio.
     * @param servicio - El valor de servicio.
     */
    public setServicio(servicio: string) {
        this.update((state) => ({
            ...state,
            servicio,
        }));
    }

    /**
     * Establece el estado de solicitudDeInspeccion.
     * @param solicitudDeInspeccion - El valor de solicitudDeInspeccion.
     */
    public setSolicitudDeInspeccion(solicitudDeInspeccion: string) {
        this.update((state) => ({
            ...state,
            solicitudDeInspeccion,
        }));
    }

    /**
     * Establece el estado de indiqueAutorizo.
     * @param indiqueAutorizo - El valor de indiqueAutorizo.
     */
    public setIndiqueAutorizo(indiqueAutorizo: string) {
        this.update((state) => ({
            ...state,
            indiqueAutorizo,
        }));
    }

} 
  