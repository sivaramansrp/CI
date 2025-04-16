import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PermisosVigentes } from '../../models/suspension-permiso.model';

/**
 * Creacion del estado inicial para la interfaz de tramite 140216
 * @interface BusquedaPermisos140216State
 * @returns {BusquedaPermisos140216State} Estado inicial de maniobras y mercancías
 */
export interface BusquedaPermisos140216State {
    /**
     * Folio del tramite a buscar
     * @type {string}
     */
    folioTramiteBusqueda?: string;

    /**
     * Motivo de la suspensión
     * @type {string}
     */
    motivoSuspension?: string;

    /**
     * Número de autorización
     * @type {string}
     */
    numAutorizacion?: string;

    /**
     * Fecha de la suspensión
     * @type {string}
     */
    fechaSuspension?: string;

    /**
     * Tabla de permisos vigentes
     * @type {PermisosVigentes[]}
     */
    permisosVigentesTabla?: PermisosVigentes[];
}

/**
 * Crea el estado inicial para la interfaz de tramite 140216
 * @returns {BusquedaPermisos140216State} Estado inicial de maniobras y mercancías
 */
export function createInitialState(): BusquedaPermisos140216State {
    return {
        folioTramiteBusqueda: '',
        motivoSuspension: '',
        numAutorizacion: '',
        fechaSuspension: '',

        permisosVigentesTabla: [],
    };
}

/**
 * Clase que representa el almacén de estado para el trámite 140216.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Clase que representa el almacén de estado para el trámite 140216.
 * @StoreConfig { name: 'tramite140216', resettable: true }
 * @class Tramite140216Store
 * @extends Store<BusquedaPermisos140216State>
 * @description Almacén de estado para el trámite 140216.
 */
@StoreConfig({ name: 'tramite140216', resettable: true })
export class Tramite140216Store extends Store<BusquedaPermisos140216State> {
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza el estado de la propiedad 'folioTramiteBusqueda'.
     * @param folioTramiteBusqueda - Nuevo valor para 'folioTramiteBusqueda'.
     * @returns {void}
     */
    public setFolioTramiteBusqueda(folioTramiteBusqueda: string): void {
        this.update((state) => ({
            ...state,
            folioTramiteBusqueda,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'motivoSuspension'.
     * @param motivoSuspension - Nuevo valor para 'motivoSuspension'.
     * @returns {void}
     */
    public setMotivoSuspension(motivoSuspension: string): void {
        this.update((state) => ({
            ...state,
            motivoSuspension,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'numAutorizacion'.
     * @param numAutorizacion - Nuevo valor para 'numAutorizacion'.
     * @returns {void}
     */
    public setNumAutorizacion(numAutorizacion: string): void {
        this.update((state) => ({
            ...state,
            numAutorizacion,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'fechaSuspension'.
     * @param fechaSuspension - Nuevo valor para 'fechaSuspension'.
     * @returns {void}
     */
    public setFechaSuspension(fechaSuspension: string): void {
        this.update((state) => ({
            ...state,
            fechaSuspension,
        }));
    }

    /**
     * Actualiza el estado de la propiedad 'permisosVigentesTabla'.
     * @param permisosVigentesTabla - Nuevo valor para 'permisosVigentesTabla'.
     * @returns {void}
     */
    public setPermisosVigentesTabla(permisosVigentesTabla: PermisosVigentes[]): void {
        this.update((state) => ({
            ...state,
            permisosVigentesTabla,
        }));
    }
}