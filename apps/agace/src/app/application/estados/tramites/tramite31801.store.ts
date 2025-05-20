import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 31801
 * @interface Renovacion31801State
 * @returns {Renovacion31801State} Estado inicial de renovacion
 */
export interface Renovacion31801State {
    /**
     * Número de oficio.
     * @type {string}
     */
    numeroOficio?: string;

    /**
     * Fecha inicial.
     * @type {string}
     */
    fechaInicialInput?: string;

    /**
     * Fecha final.
     * @type {string}
     */
    fechaFinalInput?: string;

    /**
     * Fecha de pago.
     * @type {string}
     */
    fechaPago?: string;

    /**
     * Monto en moneda nacional.
     * @type {number}
     */
    monedaNacional?: number | null;

    /**
     * Número de operación.
     * @type {string}
     */
    numeroOperacion?: string;

    /**
     * Llave de pago.
     * @type {string}
     */
    llavePago?: string;

    /**
     * Selección de manifiesto.
     * @type {boolean[]}
     */
    seleccionadaManifiesto: boolean[];
}

/**
 * Crea el estado inicial para la interfaz de tramite 31801
 * @returns {Renovacion31801State} Estado inicial de renovacion
 */
export function createInitialState(): Renovacion31801State {
    return {
        numeroOficio: '',
        fechaInicialInput: '',
        fechaFinalInput: '',
        fechaPago: '',
        monedaNacional: null,
        numeroOperacion: '',
        llavePago: '',
        seleccionadaManifiesto: [false, false],
    };
}

/**
 * Clase que representa el almacén de estado para el trámite 31801.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Clase que representa el almacén de estado para el trámite 31801.
 * @StoreConfig { name: 'tramite31801', resettable: true }
 * @class Tramite31801Store
 * @extends Store<Renovacion31801State>
 * @description Almacén de estado para el trámite 31801.
 */
@StoreConfig({ name: 'tramite31801', resettable: true })
export class Tramite31801Store extends Store<Renovacion31801State> {
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza el estado de la propiedad 'numeroOficio'.
     * @param numeroOficio - Nuevo valor para 'numeroOficio'.
     * @returns {void}
     */
    public setNumeroOficio(numeroOficio: string): void {
        this.update((state) => ({
            ...state,
            numeroOficio,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'fechaInicialInput'.
     * @param fechaInicialInput - Nuevo valor para 'fechaInicialInput'.
     * @returns {void}
     */
    public setFechaInicialInput(fechaInicialInput: string): void {
        this.update((state) => ({
            ...state,
            fechaInicialInput,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'fechaFinalInput'.
     * @param fechaFinalInput - Nuevo valor para 'fechaFinalInput'.
     * @returns {void}
     */
    public setFechaFinalInput(fechaFinalInput: string): void {
        this.update((state) => ({
            ...state,
            fechaFinalInput,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'fechaPago'.
     * @param fechaPago - Nuevo valor para 'fechaPago'.
     * @returns {void}
     */
    public setFechaPago(fechaPago: string): void {
        this.update((state) => ({
            ...state,
            fechaPago,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'monedaNacional'.
     * @param monedaNacional - Nuevo valor para 'monedaNacional'.
     * @returns {void}
     */
    public setMonedaNacional(monedaNacional: number | null): void {
        this.update((state) => ({
            ...state,
            monedaNacional,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'numeroOperacion'.
     * @param numeroOperacion - Nuevo valor para 'numeroOperacion'.
     * @returns {void}
     */
    public setNumeroOperacion(numeroOperacion: string): void {
        this.update((state) => ({
            ...state,
            numeroOperacion,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'llavePago'.
     * @param llavePago - Nuevo valor para 'llavePago'.
     * @returns {void}
     */
    public setLlavePago(llavePago: string): void {
        this.update((state) => ({
            ...state,
            llavePago,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'seleccionadaManifiesto'.
     * @param seleccionadaManifiesto - Nuevo valor para 'seleccionadaManifiesto'.
     * @returns {void}
     */
    public setSeleccionadaManifiesto(seleccionadaManifiesto: boolean[]): void {
        this.update((state) => ({
            ...state,
            seleccionadaManifiesto,
        }));
    }
}