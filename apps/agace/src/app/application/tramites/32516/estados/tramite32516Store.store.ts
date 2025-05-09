/**
 * @module TramiteStore
 * @description
 * Este servicio administra el estado de `TramiteState` utilizando Akita.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../modelos/acta-de-hechos.model';
import { SolicitudForm } from '../modelos/acta-de-hechos.model';

/**
 * @interface TramiteState
 * @description
 * Representa el estado del trámite, incluyendo los datos de la solicitud y las mercancías.
 * 
 * @property {SolicitudForm} SolicitudState - Estado del formulario de solicitud.
 * @property {MercanciaForm} MercanciaState - Estado del formulario de mercancías.
 */
export interface TramiteState {
    SolicitudState: SolicitudForm;
    MercanciaState: MercanciaForm;
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados para `SolicitudState` y `MercanciaState`.
 * 
 * @returns {TramiteState} Estado inicial del trámite.
 */
export function createInitialState(): TramiteState {
    return {
        SolicitudState: {
          descripcionGenerica1: '',
          descripcionGenerica2: '',
          descripcionGenerica3: '',
          capacidadAlmacenamiento: '',
          cantidadBienes: ''
        },
        MercanciaState: {
          consecutivo: null,
          descripcion: '',
          cantidad: null,
          unidadMedida: '',
          peso: null
        },
    };
}

/**
 * @class TramiteStore
 * @description
 * Administra el estado del trámite utilizando Akita. Proporciona métodos para actualizar
 * el estado de la solicitud y las mercancías.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'acta-de-hechos' })
export class TramiteStore extends Store<TramiteState> {
      /**
     * @constructor
     * @description
     * Inicializa el estado del store con los valores predeterminados definidos en `createInitialState`.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setSolicitudTramite
     * @description
     * Actualiza el estado de `SolicitudState` con nuevos valores proporcionados.
     * 
     * @param {SolicitudForm} SolicitudState - Datos actualizados del formulario de solicitud.
     */
    public setSolicitudTramite(SolicitudState: SolicitudForm): void {
        this.update((state) => ({
            ...state,
            SolicitudState,
        }));
    }

    /**
     * @method setMercanciaTramite
     * @description
     * Actualiza el estado de `MercanciaState` con nuevos valores proporcionados.
     * 
     * @param {MercanciaForm} MercanciaState - Datos actualizados del formulario de mercancías.
     */
    public setMercanciaTramite(MercanciaState: MercanciaForm): void {
        this.update((state) => ({
            ...state,
            MercanciaState,
        }));
    }
}