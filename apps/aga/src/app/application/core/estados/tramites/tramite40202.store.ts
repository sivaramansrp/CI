import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { CAATRegistradoEmpresaForm } from '../../../tramites/40202/models/modificacion-transportacion-maritima.model';

export interface TransportacionMaritima40202State {
    /**
     * Tipo de empresa seleccionada.
     * @type {string}
     */
    tipoDeEmpresaOpcion?: string | number;

    /**
     * RFC de la tipo de empresa para buscar.
     * @type {string}
     */
    buscarPorRFCNa?: string;

    /**
     * Denominación de la tipo de empresa para buscar Nacional.
     * @type {string}
     */
    buscarPorDenominacionNa?: string;

    /**
     * Folio CAAT de la tipo de empresa para buscar Nacional.
     * @type {string}
     */
    folioCaatBusquedaNa?: string;

    /**
     * Denominación de la tipo de empresa para buscar Extranjera.
     * @type {string}
     */
    buscarPorDenominacionEx?: string;

    /**
     * Folio CAAT de la tipo de empresa para buscar Extranjera.
     * @type {string}
     */
    folioCaatBusquedaEx?: string;

    /**
     * Tabla de empresas CAAT registradas.
     * @type {CAATRegistradoEmpresaForm[]}
     */
    caatRegistradoEmpresaTabla?: CAATRegistradoEmpresaForm[];
}

/**
 * Crea el estado inicial del trámite 40202.
 * @returns Estado inicial de tipo `TransportacionMaritima40202State`.
 */
export function createInitialState(): TransportacionMaritima40202State {
    return {
        tipoDeEmpresaOpcion: '1',
        buscarPorRFCNa: '',
        buscarPorDenominacionNa: '',
        folioCaatBusquedaNa: '',
        buscarPorDenominacionEx: '',
        folioCaatBusquedaEx: '',

        caatRegistradoEmpresaTabla: []
    };
}

/**
 * Servicio de estado global para gestionar el trámite 40202 con Akita.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración de la tienda Akita para el trámite 40202 con opción de reinicio.
 */
@StoreConfig({ name: 'tramite40202', resettable: true })
export class Tramite40202Store extends Store<TransportacionMaritima40202State> {
    /**
     * Constructor que inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el tipo de empresa seleccionada en el estado.
     * @param tipoDeEmpresaOpcion - Tipo de empresa seleccionada.
     * @description Establece el tipo de empresa seleccionada en el estado.
     */
    public setTipoDeEmpresaOpcion(tipoDeEmpresaOpcion: string | number): void {
        this.update((state) => ({
            ...state,
            tipoDeEmpresaOpcion,
        }));
    }

    /**
     * Establece el RFC de la tipo de empresa para buscar en el estado.
     * @param buscarPorRFCNa - RFC de la tipo de empresa para buscar.
     * @description Establece el RFC de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorRFCNa(buscarPorRFCNa: string): void {
        this.update((state) => ({
            ...state,
            buscarPorRFCNa,
        }));
    }

    /**
     * Establece la denominación de la tipo de empresa para buscar en el estado.
     * @param buscarPorDenominacionNa - Denominación de la tipo de empresa para buscar.
     * @description Establece la denominación de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorDenominacionNa(buscarPorDenominacionNa: string): void {
        this.update((state) => ({
            ...state,
            buscarPorDenominacionNa,
        }));
    }

    /**
     * Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     * @param folioCaatBusquedaNa - Folio CAAT de la tipo de empresa para buscar.
     * @description Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     */
    public setFolioCaatBusquedaNa(folioCaatBusquedaNa: string): void {
        this.update((state) => ({
            ...state,
            folioCaatBusquedaNa,
        }));
    }

    /**
     * Establece la denominación de la tipo de empresa para buscar en el estado.
     * @param buscarPorDenominacionEx - Denominación de la tipo de empresa para buscar.
     * @description Establece la denominación de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorDenominacionEx(buscarPorDenominacionEx: string): void {
        this.update((state) => ({
            ...state,
            buscarPorDenominacionEx,
        }));
    }

    /**
     * Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     * @param folioCaatBusquedaEx - Folio CAAT de la tipo de empresa para buscar.
     * @description Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     */
    public setFolioCaatBusquedaEx(folioCaatBusquedaEx: string): void {
        this.update((state) => ({
            ...state,
            folioCaatBusquedaEx,
        }));
    }

    /**
     * Establece la tabla de CAAT registrado empresa en el estado.
     * @param caatRegistradoEmpresaTabla - Tabla de CAAT registrado empresa.
     * @description Establece la tabla de CAAT registrado empresa en el estado.
     */
    public setCaatRegistradoEmpresaTabla(caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[]): void {
        this.update((state) => ({
            ...state,
            caatRegistradoEmpresaTabla,
        }));
    }
}
