/**
 * @module CambioModalidadStore
 * @description
 * Este servicio administra el estado de `CambioModalidadState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { CambioDeModalidadForm } from '../modelos/cambio-de-modalidad.model';
import { Injectable } from '@angular/core';

/**
 * @interface CambioModalidadState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface CambioModalidadState {
    cambioDeModalidad: CambioDeModalidadForm;
    cambioModalidad: string;
    serviciosImmx: string;
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {CambioModalidadState} Estado inicial.
 */
export function createInitialState(): CambioModalidadState {
    return {
        cambioDeModalidad: {
            seleccionaLaModalidad: '',
            folio: 0,
            ano: 0,
            seleccionaModalidad: '',
            cambioModalidad: '',
        },
        cambioModalidad: '',
        serviciosImmx: ''
    };
}

/**
 * @class CambioModalidadStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class CambioModalidadStore extends Store<CambioModalidadState> {
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setCambioDeModalidad
     * @description
     * Actualiza el estado de `cambioDeModalidad` con nuevos valores.
     * @param {CambioDeModalidadForm} cambioDeModalidad - Datos del formulario de cambio de modalidad.
     */
    public setCambioDeModalidad(cambioDeModalidad: CambioDeModalidadForm): void {
        this.update((state) => ({
            ...state,
            cambioDeModalidad,
        }));
    }

    /**
     * @method setCambioModalidad
     * @description
     * Actualiza el estado de `cambioModalidad`.
     * @param {string} cambioModalidad - Nueva modalidad de cambio.
     */
    public setCambioModalidad(cambioModalidad: string): void {
        this.update((state) => ({
            ...state,
            cambioModalidad,
        }));
    }

    /**
     * @method setServiciosImmx
     * @description
     * Actualiza el estado de `serviciosImmx`.
     * @param {string} serviciosImmx - Nuevos servicios IMMEX.
     */
    public setServiciosImmx(serviciosImmx: string): void {
        this.update((state) => ({
            ...state,
            serviciosImmx,
        }));
    }
}