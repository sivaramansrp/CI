import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado de la solicitud para el trámite 120301.
 */
export interface Solicitud120301State {
    /** Identificador de expedicion. */
    idExpedicion: number;
    /** Identificador regimen */
    identificadorRegimen: string;
    /** Id de la solicitud. */
    idSolicitud: number;
    /** Unidad de medida */
    unidadMedida: string;
    /** País de origen o destino */
    pais_origen_destino: string;
}
/**
 * Crea el estado inicial del trámite 120301.
 * @returns Estado inicial de tipo `Solicitud120301State`.
 */
export function createInitialState(): Solicitud120301State {
    return {
        idExpedicion: 0,
        identificadorRegimen: '',
        idSolicitud: 0,
        unidadMedida: '',
        pais_origen_destino: '',
    };
}

/**
 * Servicio de estado global para gestionar el trámite 120301 con Akita.
 * Proporciona métodos para actualizar cada campo del estado.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite120301', resettable: true })
export class Tramite120301Store extends Store<Solicitud120301State> {
    /**
     * Constructor que inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
      * Guarda el ID de la expedicion en el estado.
      *
      * @param idExpedicion - El ID de la expedicion que se va a guardar.
      */
    public setIdExpedicion(idExpedicion: number): void {
        this.update((state) => ({
            ...state,
            idExpedicion,
        }));
    }

    /**
     * Actualiza el Identificador regimen.
     * @param identificadorRegimen Nuevo Identificador regimen.
     */
    public setIdentificadorRegimen(identificadorRegimen: string): void {
        this.update((state) => ({
            ...state,
            identificadorRegimen,
        }));
    }

    /**
     * Actualiza el Id de la solicitud.
     * @param idSolicitud Nuevo Id de la solicitud. 
     * */
    public setIdSolicitud(idSolicitud: number): void {
        this.update((state) => ({
            ...state,
            idSolicitud,
        }));
    }

    /**
     * Actualiza el país de origen o destino.
     * @param pais_origen_destino Nuevo país de origen o destino.
     * */
    public setPaisOrigenDestino(pais_origen_destino: string): void {
        this.update((state) => ({
            ...state,
            pais_origen_destino,
        }));
    }

    /**
     * Actualiza la unidad de medida.
     * @param unidadMedida Nueva unidad de medida.
     * */
    public setUnidadMedida(unidadMedida: string): void {
        this.update((state) => ({
            ...state,
            unidadMedida,
        }));
    }
}