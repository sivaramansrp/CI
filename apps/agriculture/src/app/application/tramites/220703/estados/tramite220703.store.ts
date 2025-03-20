/* eslint-disable sort-imports */
/**
 * @module TramiteStore
 * @description
 * Este servicio administra el estado de `TramiteState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { DatosDeLaSolicitudInt, InternaDatosGeneralesInt } from '../modelos/acuicola.model';

/**
 * @interface TramiteState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface TramiteState {
    solicitudState: DatosDeLaSolicitudInt;
    InternaDatosGeneralesState: InternaDatosGeneralesInt;
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {TramiteState} Estado inicial.
 */
export function createInitialState(): TramiteState {
    return {
        solicitudState: {
            justificacion: '',
            certificadosAutorizados: '',
            fechaInicioInput: '',
            horaDeInspeccion: '',
            aduanaDeIngreso: '',
            sanidadAgropecuaria: '',
            puntoDeInspeccion: '',
            nombreInsp: '',
            primerApellido: '',
            segundoApellido: '',
            cantidadContenedores: '',
            tipoContenedor: '',
            medioDeTransporte: '',
            identificacionTransporte: '',
            esSolicitudFerros: '',
            banco: ''

        },
        InternaDatosGeneralesState: {
            foliodel: 0,
            aduanaIngreso: '',
            oficinaInspeccion: '',
            puntoInspeccion: '',
            claveUCON: '',
            establecimientoTIFs: '',
            nombreVeterinario: '',
            numeroGuia: '',
            regimen: '',
            capturaMercancia: '',
            animalesVivos: '',
            coordenadas: '',
            movilizacionNacional: '',
            identTransporte: '',
            puntoVerificacion: '',
            empresaTransportista: '',
            datosParaMovilizacion: '',
            puntoDeVerificacion: '',
            regimenAlQueDestina: ''
        }
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
     * @method setSolicitudTramite
     * @description
     * Actualiza el estado de `SolicitudState` con nuevos valores.
     * @param {DatosDeLaSolicitudInt} solicitudState - Datos del formulario de cambio de modalidad.
     */
    public setSolicitudTramite(solicitudState: DatosDeLaSolicitudInt): void {
        this.update((state) => ({
            ...state,
            solicitudState,
        }));
    }

    /**
 * @method setSolicitudTramite
 * @description
 * Actualiza el estado de `immexRegistro` con nuevos valores.
 * @param {InternaDatosGeneralesInt} InternaDatosGeneralesState - Datos del formulario de cambio de modalidad.
 */
    public setInternaDatosGeneralesTramite(InternaDatosGeneralesState: InternaDatosGeneralesInt): void {
        this.update((state) => ({
            ...state,
            InternaDatosGeneralesState,
        }));
    }
}