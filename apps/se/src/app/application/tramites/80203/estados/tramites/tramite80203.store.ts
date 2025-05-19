/* eslint-disable sort-imports */
/**
 * @module ImmexRegistroStore
 * @description
 * Este servicio administra el estado de `ImmexRegistroState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { immexRegistroform } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { Injectable } from '@angular/core';

/**
 * @interface ImmexRegistroState
 * @description
 * Representa el estado del registro IMMEX. Contiene los datos relacionados con el formulario de cambio de modalidad.
 *
 * @property {immexRegistroform} immexRegistro - Datos del formulario de registro IMMEX.
 */
export interface ImmexRegistroState {
    immexRegistro: immexRegistroform;
 
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados para el registro IMMEX.
 *
 * @returns {ImmexRegistroState} Estado inicial del registro IMMEX.
 */
export function createInitialState(): ImmexRegistroState {
    return {
        immexRegistro: {
            permisoImmexDatos: 0,
            fraccionArancelariaExportacion: '',
            productoDescExportacion: '',
            productoArancelariaExportacion: 0,
            Nico: '',
            fraccionDatos: 0,
            commodityCandiadAnual: 0,
            commodityCapacidadInstalda: '',
            commodityCandidadPor: '',
            commodityFraccionImportacion: 0,
            commodityImportacion: 0,
            commodityDescImportacion: '',
            nicoDescImportacion: '',
            exportacionDescExportacion: '',
            FraccionDescExportacion: '',
            fraccionArancelariaDesc: '',
            candidadPorPeriodo: '',
            capacidadPeriodo: '',
            candiadAnual: '',
            commodityNicoDescImportacion: '',
            nicoDatos: ''
        },
     
    };
}

/**
 * @class ImmexRegistroStore
 * @description
 * Administra el estado del registro IMMEX utilizando Akita. Proporciona métodos para actualizar y gestionar el estado.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class ImmexRegistroStore extends Store<ImmexRegistroState> {
    /**
     * @constructor
     * @description
     * Constructor que inicializa el estado del registro IMMEX con valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setImmexRegistro
     * @description
     * Actualiza el estado de `immexRegistro` con nuevos valores proporcionados.
     *
     * @param {immexRegistroform} immexRegistro - Datos del formulario de cambio de modalidad.
     */
    public setImmexRegistro(immexRegistro: immexRegistroform): void {
        this.update((state) => ({
            ...state,
            immexRegistro,
        }));
    }
}