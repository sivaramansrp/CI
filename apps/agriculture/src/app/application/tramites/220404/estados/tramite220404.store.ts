import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface DesistimientoState
 * @description
 * Representa el estado de la modalidad de cambio.
 */
export interface DesistimientoState {
    folio: string;
    tipoDeSolicitud: string;
    descripcion: string;
}

/**
 * @function DesistimientoState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {DesistimientoState} Estado inicial.
 */
export function createInitialState(): DesistimientoState {
    return {
        folio: '',
        tipoDeSolicitud: '',
        descripcion: ''
    };
}

/**
 * @class DesistimientoStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'desistimiento', resettable: true })
export class DesistimientoStore extends Store<DesistimientoState> {
    /**
    * Constructor de la clase.
    * Llama al constructor de la clase base y establece el estado inicial.
    * 
    * El estado inicial se crea utilizando la función `createInitialState`,
    * que define la configuración predeterminada para esta clase.
    */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setDescripcion
     * @description
     * Actualiza el estado de `descripcion` con la nueva descripción ingresada.
     * @param {string} descripcion - Texto de la descripción.
     */
    public setDescripcion(state:DesistimientoState, descripcion: string): void {
        const UPDATED_STATE = { ...state, descripcion };
        this.update((state) => ({
            ...state,
            ...UPDATED_STATE,
        }));
    }
      /**
     * Restablece el estado a su estado inicial.
     */
      public limpiarFormulario(): void {
        this.reset();
    }
}