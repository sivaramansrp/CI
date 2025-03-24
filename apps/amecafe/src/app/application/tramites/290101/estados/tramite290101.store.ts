/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
/**
 * @module TramiteStore
 * @description
 * Este servicio administra el estado de `TramiteState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { DatosSolicitudFormaInt, BeneficiosFormaInt, BodegasFormaInt, CafExportFormaInt } from '../modelos/datos-de-interfaz.model';
import { RegionFormaInt } from '../modelos/datos-de-interfaz.model'
import { Injectable } from '@angular/core';

/**
 * @interface TramiteState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface TramiteState {
    SolicitudState: DatosSolicitudFormaInt;
    RegionFormatState: RegionFormaInt;
    BeneficiosFormaState: BeneficiosFormaInt;
    BodegasFormaState: BodegasFormaInt;
    CafeExportFormState: CafExportFormaInt;
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {TramiteState} Estado inicial.
 */
export function createInitialState(): TramiteState {
    return {
        SolicitudState: {
            claveDelPadron: '',
            observaciones: '',
            requiereInspeccionInmediata: '',
            informacionConfidencial: 0
        },
        RegionFormatState: {
            estado: '',
            productoCafe: '',
            descRegionCompra: '',
            descripTipoCafe: '',
            volumen: 0
        },
        BeneficiosFormaState: {
            razonSocial: '',
            propAlquil: '',
            calle: '',
            numeroExterior: 0,
            numeroInterior: 0,
            colonia: '',
            estado: 0,
            codigoPostal: 0,
            capacidadAlmacenaje: 0,
            volumenAlmacenaje: 0
        },
        BodegasFormaState: {
            razonSocial: '',
            propAlquil: '',
            calle: '',
            numeroExterior: 0,
            numeroInterior: 0,
            colonia: '',
            estado: 0,
            codigoPostal: 0,
            capacidadAlmacenaje: 0
        },
        CafeExportFormState: {
            descripcionMercancia: '',
            clasificacion: '',
            porcentajeConcentracion: 0
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
     * @param {DatosSolicitudFormaInt} SolicitudState - Datos del formulario de cambio de modalidad.
     */
    public setSolicitudTramite(SolicitudState: DatosSolicitudFormaInt): void {
        this.update((state) => ({
            ...state,
            SolicitudState,
        }));
    }

    /**
 * @method RegionFormatState
 * @description
 * Actualiza el estado de `RegionFormaInt` con nuevos valores.
 * @param {RegionFormaInt} RegionFormatState - Datos del formulario de cambio de modalidad.
 */
    public setRegionTramite(RegionFormatState: RegionFormaInt): void {
        this.update((state) => ({
            ...state,
            RegionFormatState,
        }));
    }

    /**
    * @method BeneficiosFormaState
    * @description
    * Actualiza el estado de `BeneficiosFormaInt` con nuevos valores.
    * @param {BeneficiosFormaInt} BeneficiosFormaState - Datos del formulario de cambio de modalidad.
    */
    public setBeneficiosTramite(BeneficiosFormaState: BeneficiosFormaInt): void {
        this.update((state) => ({
            ...state,
            BeneficiosFormaState,
        }));
    }

    /**
     * @method setBodegasTramite
     * @description
     * Actualiza el estado de `BodegaFormaInt` con nuevos valores.
     * @param {BodegaFormaInt} BodegasFormaState - Datos del formulario de cambio de modalidad.
     */
    public setBodegasTramite(BodegasFormaState: BodegasFormaInt): void {
        this.update((state) => ({
            ...state,
            BodegasFormaState,
        }));
    }


    /**
     * @method setCafExportTramite
     * @description
     * Actualiza el estado de `CafExportFormaInt` con nuevos valores.
     * @param {CafExportFormaInt} CafeExportFormState - Datos del formulario de cambio de modalidad.
     */
    public setCafExportTramite(CafeExportFormState: CafExportFormaInt): void {
        this.update((state) => ({
            ...state,
            CafeExportFormState,
        }));
    }
}