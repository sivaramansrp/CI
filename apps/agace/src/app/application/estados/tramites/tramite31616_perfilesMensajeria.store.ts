import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud31616.
 */
export interface Solicitud31616PerfilesMensajeriaState {
    /**
     * El valor de describaProcedimiento.
     */
    describaProcedimiento: string;
    /**
     * El valor de indiqueLosCriterios.
     */
    indiqueLosCriterios: string;
    /**
     * El valor de indiqueLosMetodos.
     */
    indiqueLosMetodos: string;
    /**
     * El valor de describaLosIndicadores.
     */
    describaLosIndicadores: string;
    /**
     * El valor de comercioExterior.
     */
    comercioExterior: string;
 
}
/**
 * Función para crear el estado inicial de Solicitud31616PerfilesMensajeria.
 * @returns {Solicitud31616PerfilesMensajeriaState} El estado inicial de Solicitud31616PerfilesMensajeria.
 */
export function createInitialState(): Solicitud31616PerfilesMensajeriaState {
    return {
        /**
         * El valor de describaProcedimiento.
         */
        describaProcedimiento: '',
        /**
         * El valor de indiqueLosCriterios.
         */
        indiqueLosCriterios: '',
        /**
         * El valor de indiqueLosMetodos.
         */
        indiqueLosMetodos: '',
        /**
         * El valor de describaLosIndicadores.
         */
        describaLosIndicadores: '',
        /**
         * El valor de comercioExterior.
         */
        comercioExterior: '',
               
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
@StoreConfig({ name: 'tramite31616PerfilesMensajeria', resettable: true })

export class Tramite31616PerfilesMensajeriaStore extends Store<Solicitud31616PerfilesMensajeriaState>{
    /**
     * Crea una instancia de Tramite31616Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de describaProcedimiento.
     * @param describaProcedimiento - El valor de describaProcedimiento.
     */
    public setDescribaProcedimiento(describaProcedimiento: string) {
        this.update((state) => ({
            ...state,
            describaProcedimiento,
        }));
    }
    /**
     * Establece el estado de indiqueLosCriterios.
     * @param indiqueLosCriterios - El valor de indiqueLosCriterios.
     */
    public setIndiqueLosCriterios(indiqueLosCriterios: string) {
        this.update((state) => ({
            ...state,
            indiqueLosCriterios,
        }));
    }
    /**
     * Establece el estado de indiqueLosMetodos.
     * @param indiqueLosMetodos - El valor de indiqueLosMetodos.
     */
    public setIndiqueLosMetodos(indiqueLosMetodos: string) {
        this.update((state) => ({
            ...state,
            indiqueLosMetodos,
        }));
    }
    /**
     * Establece el estado de describaLosIndicadores.
     * @param describaLosIndicadores - El valor de describaLosIndicadores.
     */
    public setDescribaLosIndicadores(describaLosIndicadores: string) {
        this.update((state) => ({
            ...state,
            describaLosIndicadores,
        }));
    }
    /**
     * Establece el estado de comercioExterior.
     * @param comercioExterior - El valor de comercioExterior.
     */
    public setComercioExterior(comercioExterior: string) {
        this.update((state) => ({
            ...state,
            comercioExterior,
        }));
    }

} 
  