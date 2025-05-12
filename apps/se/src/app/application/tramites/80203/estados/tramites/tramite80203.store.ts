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
 * Representa el estado de la modalidad de cambio.
 */
export interface ImmexRegistroState {
    immexRegistro: immexRegistroform;
 
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {ImmexRegistroState} Estado inicial.
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
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class ImmexRegistroStore extends Store<ImmexRegistroState> {
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setImmexRegistro
     * @description
     * Actualiza el estado de `immexRegistro` con nuevos valores.
     * @param {immexRegistroform} immexRegistro - Datos del formulario de cambio de modalidad.
     */
    public setImmexRegistro(immexRegistro: immexRegistroform): void {
        this.update((state) => ({
            ...state,
            immexRegistro,
        }));
    }
}