/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
/**
 * @module TramiteStore
 * @description
 * Administra el estado del proceso de aplicación de exportadores de café utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { DatosSolicitudFormaInt, BeneficiosFormaInt, BodegasFormaInt, CafExportFormaInt } from '../modelos/datos-de-interfaz.model';
import {RegionesInfo, BeneficiosInfo, BodegasInfo, CafeExporacionInfo} from '../modelos/cafe-exportadores.model';
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
     * Estado de la tabla de regiones.
     * @type {RegionesInfo[]}
     */

    regionesTabla: RegionesInfo[];
    /**
     * Estado de la tabla de beneficios.
     * @type {BeneficiosInfo[]}
     */

    
    beneficiosTabla: BeneficiosInfo[];
    /**
     * Estado de la tabla de bodegas.
     * @type {BodegasInfo[]}
     */
    bodegasTabla: BodegasInfo[];
    /**
     * Estado de la tabla de café de exportadores.
     * @type {CafeExporacionInfo[]}
     */
    cafeExportacionTabla: CafeExporacionInfo[];


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
        },
        regionesTabla: [],
        beneficiosTabla: [],
        bodegasTabla: [],
        cafeExportacionTabla: []
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
    /**
     * @method setRegionesTabla
     * @description
     * Actualiza el estado de `regionesTabla` con nuevos valores.
     * @param {RegionesInfo[]} regionesTabla - Datos de la tabla de regiones.
     */
    public setRegionesTabla(regionesTabla: RegionesInfo[]): void {
        this.update((state) => ({
            ...state,
            regionesTabla: [...state.regionesTabla, ...regionesTabla],
        }));
    }
    
    /**
     * @method setBeneficiosTabla
     * @description
     * Actualiza el estado de `beneficiosTabla` con nuevos valores.
     * @param {BeneficiosInfo[]} beneficiosTabla - Datos de la tabla de beneficios.
     */
   
    public setBeneficiosTabla(beneficiosTabla: BeneficiosInfo[]): void {
        this.update((state) => ({
            ...state,
            beneficiosTabla: [...state.beneficiosTabla, ...beneficiosTabla],
        }));
    }
    /**
     * @method setBodegasTabla
     * @description
     * Actualiza el estado de `bodegasTabla` con nuevos valores.
     * @param {BodegasInfo[]} bodegasTabla - Datos de la tabla de bodegas.
     */
    public setBodegasTabla(bodegasTabla: BodegasInfo[]): void {
        this.update((state) => ({
            ...state,
            bodegasTabla: [...state.bodegasTabla, ...bodegasTabla],
        }));}

    /**
     * @method setCafeExportacionTabla
     * @description
     * Actualiza el estado de `cafeExportacionTabla` con nuevos valores.
     * @param {CafeExporacionInfo[]} cafeExportacionTabla - Datos de la tabla de café de exportadores.
     * */
    public setCafeExportacionTabla(cafeExportacionTabla: CafeExporacionInfo[]): void {
        this.update((state) => ({
            ...state,
            cafeExportacionTabla: [...state.cafeExportacionTabla, ...cafeExportacionTabla],
        }));
    }
    public updateRegionesTabla(regionesTabla: RegionesInfo[]): void {
        this.update((state) => ({
            ...state,
            regionesTabla,
        }));
    }
    public updateBeneficiosTabla(beneficiosTabla: BeneficiosInfo[]): void {
        this.update((state) => ({
            ...state,
            beneficiosTabla,
        }));
    }
    public updateBodegasTabla(bodegasTabla: BodegasInfo[]): void {
        this.update((state) => ({
            ...state,
            bodegasTabla,
        }));
    }
    public updateCafeExportacionTabla(cafeExportacionTabla: CafeExporacionInfo[]): void {
        this.update((state) => ({
            ...state,
            cafeExportacionTabla,
        }));
    }
}