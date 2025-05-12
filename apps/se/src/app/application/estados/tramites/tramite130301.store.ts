import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud260211.
 */
export interface Solicitud130301State {
    /**
     * El valor de paisEmisorCertificado.
     */
    paisEmisorCertificado: string;
    /**
     * El valor de mixed.
     */
    mixed: string;
    /**
     * El valor de paisDeOrigen.
     */
    paisDeOrigen: string;
    /**
     * El valor de motivoJustificacion.
     */
    motivoJustificacion: string;
    /**
     * El valor de otrasDeclaraciones.
     */
    otrasDeclaraciones: string;
    
}
/**
 * Función para crear el estado inicial de Solicitud130301State.
 * @returns {Solicitud130301State} El estado inicial de Solicitud130301State.
 */
export function createInitialState(): Solicitud130301State {
    return {
        /**
         * El valor de paisEmisorCertificado.
         */
        paisEmisorCertificado: '',
        /**
         * El valor de mixed.
         */
        mixed: '',
        /**
         * El valor de paisDeOrigen.
         */
        paisDeOrigen: '',
        /**
         * El valor de motivoJustificacion.
         */
        motivoJustificacion: '',
        /**
         * El valor de otrasDeclaraciones.
         */
        otrasDeclaraciones: '',
         
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
@StoreConfig({ name: 'tramite130301', resettable: true })

export class Tramite130301Store extends Store<Solicitud130301State>{
    /**
     * Crea una instancia de Tramite31601Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de paisEmisorCertificado.
     * @param paisEmisorCertificado - El valor de paisEmisorCertificado.
     */
    public setPaisEmisorCertificado(paisEmisorCertificado: string) {
        this.update((state) => ({
            ...state,
            paisEmisorCertificado,
        }));
    }
    /**
     * Establece el estado de mixed.
     * @param mixed - El valor de mixed.
     */
    public setMixed(mixed: string) {
        this.update((state) => ({
            ...state,
            mixed,
        }));
    }
    /**
     * Establece el estado de paisDeOrigen.
     * @param paisDeOrigen - El valor de paisDeOrigen.
     */
    public setPaisDeOrigen(paisDeOrigen: string) {
        this.update((state) => ({
            ...state,
            paisDeOrigen,
        }));
    }
    /**
     * Establece el estado de motivoJustificacion.
     * @param motivoJustificacion - El valor de motivoJustificacion.
     */
    public setMotivoJustificacion(motivoJustificacion: string) {
        this.update((state) => ({
            ...state,
            motivoJustificacion,
        }));
    }
    /**
     * Establece el estado de otrasDeclaraciones.
     * @param otrasDeclaraciones - El valor de otrasDeclaraciones.
     */
    public setOtrasDeclaraciones(otrasDeclaraciones: string) {
        this.update((state) => ({
            ...state,
            otrasDeclaraciones,
        }));
    }

} 
  