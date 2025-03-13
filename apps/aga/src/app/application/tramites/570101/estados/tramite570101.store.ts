import { Store, StoreConfig } from '@datorama/akita';
import { CancelarSolicitudForm } from '../modelos/cancelar-solicitud.modalidad.model';
import { Injectable } from '@angular/core';

/**
 * @interface CancelarSolicitudState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface CancelarSolicitudState {
    folioSVEX: string;
    folioVUCEM: string;
    tipoDeCancelacion: string;
    horaIncio: string;
    horaFin: string;
    descripcion: string;
    fechasSeleccionadas: { selectedFechas: string[] }
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {CancelarSolicitudState} Estado inicial.
 */
export function createInitialState(): CancelarSolicitudState {
    return {
        folioSVEX: '',
        folioVUCEM: '',
        horaFin: '',
        horaIncio: '',
        tipoDeCancelacion: '',
        descripcion: '',
        fechasSeleccionadas: { selectedFechas: [] }
    };
}

/**
 * @class CancelarSolicitudStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cancelar-solicitud' })
export class CancelarSolicitudStore extends Store<CancelarSolicitudState> {
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setTipoSolicitudSeleccion
     * @description
     * Actualiza el estado de `tipoSolicitudSeleccion` con nuevos valores.
     * @param {string} tipoSolicitudSeleccion - Datos seleccionados para el tipo de solicitud.
     */
    public setTipoSolicitudSeleccion(tipoSolicitudSeleccion: string): void {
        this.update((state) => ({
            ...state,
            tipoSolicitudSeleccion,
        }));
    }

    /**
     * @method setFechasSeleccionadas
     * @description
     * Actualiza el estado de `selectedFechas` con las fechas seleccionadas.
     * @param {string[]} selectedFechas - Lista de fechas seleccionadas.
     */
    public setFechasSeleccionadas(selectedFechas: string[]): void {
        this.update((state) => ({
            ...state,
            selectedFechas,
        }));
    }

    /**
     * @method setDescripcion
     * @description
     * Actualiza el estado de `descripcion` con la nueva descripción ingresada.
     * @param {string} descripcion - Texto de la descripción.
     */
    public setDescripcion(descripcion: string): void {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }

}