import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

export interface Tramite5601State {
    // formularioCertificacion
    tieneCertificacion: boolean;
    certificacionEmpresa: string;
    otraCertificacion: string;

    // formulario
    aduana: string;
    seccionAduanera: string;
    tipoOperacion: string;
    fechaOperacion: string;
    motivoDespachoDomicilio: string;
    observaciones: string;

    // formularioMercancia
    especificacionesMercancia: string;
    descripcionMercancia: string;
    tipoMoneda: string;
    valorMercancia: string;

    // formularioLogistica
    esquemasControlSeguridad: string;
    distanciaRutaTiempos: string;

    // formularioUbicacionMercancia
    direccion: string;
    telefono: string;
    distanciaAduana: string;
    referencias: string;

    // Index signature for dynamic keys
    [key: string]: unknown;
}

export function createInitialState(): Tramite5601State {
    return {
        tieneCertificacion: false,
        certificacionEmpresa: '',
        otraCertificacion: '',

        aduana: '',
        seccionAduanera: '',
        tipoOperacion: '',
        fechaOperacion: '',
        motivoDespachoDomicilio: '',
        observaciones: '',

        especificacionesMercancia: '',
        descripcionMercancia: '',
        tipoMoneda: '',
        valorMercancia: '',

        esquemasControlSeguridad: '',
        distanciaRutaTiempos: '',

        direccion: '',
        telefono: '',
        distanciaAduana: '',
        referencias: ''
    };
}


/**
 * Marca esta clase como un servicio inyectable en Angular.
 * 
 * @decorator Injectable
 * @property {string} providedIn - Define el alcance del servicio. 
 * En este caso, el servicio está disponible en toda la aplicación ('root').
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración del store para Tramite270101.
 * 
 * @decorator StoreConfig
 * @property {string} name - Nombre del store, utilizado para identificarlo.
 * @property {boolean} resettable - Indica si el estado del store puede ser reiniciado.
 */
@StoreConfig({ name: 'tramite5601', resettable: true })

export class Tramite5601Store extends Store<Tramite5601State> {

    /**
     * Constructor de la clase Tramite5601Store.
     * 
     * Este constructor inicializa el estado del store utilizando la función `createInitialState`.
     * La función `createInitialState` devuelve un objeto vacío que representa el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    public setDynamicFieldValue<TKey extends keyof Tramite5601State>(
        fieldName: TKey,
        value: Tramite5601State[TKey]
    ): void {
        this.update((state) => ({
            ...state,
            [fieldName]: value,
        }));
    }

}