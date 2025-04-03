/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
/**
 * @module TramiteStore
 * @description
 * Administra el estado del proceso de aplicación de exportadores de café utilizando Akita.
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
    /**
     * Estado de la solicitud.
     * @type {DatosSolicitudFormaInt}
     */
    SolicitudState: DatosSolicitudFormaInt;

    /**
     * Estado del formulario de regiones.
     * @type {RegionFormaInt}
     */
    RegionFormatState: RegionFormaInt;

    /**
     * Estado del formulario de beneficios.
     * @type {BeneficiosFormaInt}
     */
    BeneficiosFormaState: BeneficiosFormaInt;

    /**
     * Estado del formulario de bodegas.
     * @type {BodegasFormaInt}
     */
    BodegasFormaState: BodegasFormaInt;

    /**
     * Estado del formulario de café de exportadores.
     * @type {CafExportFormaInt}
     */
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
 * Administra el estado del proceso de aplicación de exportadores de café utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cafe-exportadores' })
export class TramiteStore extends Store<TramiteState> {
    /**
     * Constructor de la clase TramiteStore.
     * Inicializa el estado con valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setSolicitudTramite
     * @description
     * Actualiza el estado de `SolicitudState` con nuevos valores.
     * @param {DatosSolicitudFormaInt} SolicitudState - Datos del formulario de solicitud.
     */
    public setSolicitudTramite(SolicitudState: DatosSolicitudFormaInt): void {
        this.update((state) => ({
            ...state,
            SolicitudState,
        }));
    }

    /**
     * @method setRegionTramite
     * @description
     * Actualiza el estado de `RegionFormatState` con nuevos valores.
     * @param {RegionFormaInt} RegionFormatState - Datos del formulario de regiones.
     */
    public setRegionTramite(RegionFormatState: RegionFormaInt): void {
        this.update((state) => ({
            ...state,
            RegionFormatState,
        }));
    }

    /**
     * @method setBeneficiosTramite
     * @description
     * Actualiza el estado de `BeneficiosFormaState` con nuevos valores.
     * @param {BeneficiosFormaInt} BeneficiosFormaState - Datos del formulario de beneficios.
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
     * Actualiza el estado de `BodegasFormaState` con nuevos valores.
     * @param {BodegasFormaInt} BodegasFormaState - Datos del formulario de bodegas.
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
     * Actualiza el estado de `CafeExportFormState` con nuevos valores.
     * @param {CafExportFormaInt} CafeExportFormState - Datos del formulario de café de exportadores.
     */
    public setCafExportTramite(CafeExportFormState: CafExportFormaInt): void {
        this.update((state) => ({
            ...state,
            CafeExportFormState,
        }));
    }
}