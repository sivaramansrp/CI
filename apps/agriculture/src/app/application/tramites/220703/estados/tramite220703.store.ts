/**
 * @module TramiteStore
 * @description
 * Este servicio administra el estado de `TramiteState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * @interface TramiteState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface TramiteState {
    fechaInicioInput: string;
    aduanaDeIngreso: number;
    tipoContenedor: number;
    identificacionTransporte: string;
    justificacion: string;
    esSolicitudFerros: string;
    oficinaDeInspeccion: number,
    puntoDeInspeccion: number,
    regimenAlQueDestina: number,
    datosParaMovilizacion: number,
    puntoDeVerificacion: number,
    banco: number

}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {TramiteState} Estado inicial.
 */
export function createInitialState(): TramiteState {
    return {
        fechaInicioInput: '',
        aduanaDeIngreso: 0,
        tipoContenedor: 0,
        identificacionTransporte: '',
        justificacion: '',
        esSolicitudFerros: '',
        oficinaDeInspeccion: 0,
        puntoDeInspeccion: 0,
        regimenAlQueDestina: 0,
        datosParaMovilizacion: 0,
        puntoDeVerificacion: 0,
        banco: 0

    };
}

/**
 * @class TramiteStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class TramiteStore extends Store<TramiteState> {
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza la fecha de inicio en el estado del trámite.
     * @param {string} fechaInicioInput - La fecha de inicio en formato de texto.
     * @returns {void}
     */
    public setFechaInicio(fechaInicioInput: string): void {
        this.update((state) => ({
            ...state,
            fechaInicioInput,
        }));
    }

    /**
     * Actualiza la aduana de ingreso en el estado del trámite.
     * @param {number} aduanaDeIngreso - El ID de la aduana de ingreso.
     * @returns {void}
     */
    public setAduanaDeIngreso(aduanaDeIngreso: number): void {
        this.update((state) => ({
            ...state,
            aduanaDeIngreso,
        }));
    }

    /**
     * Actualiza el tipo de contenedor en el estado del trámite.
     * @param {number} tipoContenedor - El ID del tipo de contenedor.
     * @returns {void}
     */
    public setTipoContenedor(tipoContenedor: number): void {
        this.update((state) => ({
            ...state,
            tipoContenedor,
        }));
    }

    /**
     * Actualiza la identificación del transporte en el estado del trámite.
     * @param {string} identificacionTransporte - La identificación del transporte.
     * @returns {void}
     */
    public setIdentificacionTransporte(identificacionTransporte: string): void {
        this.update((state) => ({
            ...state,
            identificacionTransporte,
        }));
    }

    /**
     * Actualiza la justificación en el estado del trámite.
     * @param {string} justificacion - La justificación proporcionada.
     * @returns {void}
     */
    public setJustificacion(justificacion: string): void {
        this.update((state) => ({
            ...state,
            justificacion,
        }));
    }

    /**
     * Actualiza si es una solicitud Ferros en el estado del trámite.
     * @param {string} esSolicitudFerros - Indica si es una solicitud Ferros.
     * @returns {void}
     */
    public setEsSolicitudFerros(esSolicitudFerros: string): void {
        this.update((state) => ({
            ...state,
            esSolicitudFerros,
        }));
    }

    /**
     * Actualiza la oficina de inspección en el estado del trámite.
     * @param {number} oficinaDeInspeccion - El ID de la oficina de inspección.
     * @returns {void}
     */
    public setOficinaDeInspeccion(oficinaDeInspeccion: number): void {
        this.update((state) => ({
            ...state,
            oficinaDeInspeccion,
        }));
    }

    /**
     * Actualiza el punto de inspección en el estado del trámite.
     * @param {number} puntoDeInspeccion - El ID del punto de inspección.
     * @returns {void}
     */
    public setPuntoDeInspeccion(puntoDeInspeccion: number): void {
        this.update((state) => ({
            ...state,
            puntoDeInspeccion,
        }));
    }

    /**
     * Actualiza el régimen al que se destina en el estado del trámite.
     * @param {number} regimenAlQueDestina - El ID del régimen al que se destina.
     * @returns {void}
     */
    public setRegimenAlQueDestina(regimenAlQueDestina: number): void {
        this.update((state) => ({
            ...state,
            regimenAlQueDestina,
        }));
    }

    /**
     * Actualiza los datos para la movilización en el estado del trámite.
     * @param {number} datosParaMovilizacion - El ID de los datos para la movilización.
     * @returns {void}
     */
    public setDatosParaMovilizacion(datosParaMovilizacion: number): void {
        this.update((state) => ({
            ...state,
            datosParaMovilizacion,
        }));
    }

    /**
     * Actualiza el punto de verificación en el estado del trámite.
     * @param {number} puntoDeVerificacion - El ID del punto de verificación.
     * @returns {void}
     */
    public setPuntoDeVerificacion(puntoDeVerificacion: number): void {
        this.update((state) => ({
            ...state,
            puntoDeVerificacion,
        }));
    }

    /**
     * Actualiza el banco en el estado del trámite.
     * @param {number} banco - El ID del banco.
     * @returns {void}
     */
    public setBanco(banco: number): void {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }

}