import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado de la solicitud para el trámite 220501.
 */
export interface Solicitud220501State {
    /**
   * Medio de transporte seleccionado.
   */
    medioDeTransporte: string;
}

/**
 * Función para crear el estado inicial de la solicitud para el trámite 220501.
 * 
 * @returns {Solicitud220501State} El estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud220501State {
    return {
        medioDeTransporte: null
    }
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite220501', resettable: true })
export class Tramite220501Store extends Store<Solicitud220501State> {
    /**
   * Constructor de la clase Tramite220501Store.
   * Inicializa el estado del store con el estado inicial.
   */
    constructor() {
        super(createInitialState());
    }

    /**
   * Método para establecer el medio de transporte en el estado.
   * 
   * @param {string} medioDeTransporte - El medio de transporte seleccionado.
   */
    public setMedioDeTransporte(medioDeTransporte: string) {
        this.update((state) => ({
            ...state,
            medioDeTransporte,
        }));
    }
}