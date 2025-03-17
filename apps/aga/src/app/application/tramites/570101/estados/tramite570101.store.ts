import { Store, StoreConfig } from '@datorama/akita';
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
    horaInicio: string;
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
        folioSVEX: "SVEX470000012025",
        folioVUCEM: "01057001000120252470000002",
        tipoDeCancelacion: "",
        horaInicio: "06:00",
        horaFin: "23:00",
        descripcion: "",
        fechasSeleccionadas: {
            selectedFechas: [] 
        }
    };
}

/**
 * @class CancelarSolicitudStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cancelar-solicitud', resettable: true })
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
      /**
     * Restablece el estado a su estado inicial.
     */
      public limpiarFormulario(): void {
        this.reset();
    }

}