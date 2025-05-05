
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { Mercancia } from '../../modelos/sanidad-acuicola-importacion.model';


/**
 * Interfaz que define el estado del trámite 220103.
 * Contiene las propiedades necesarias para gestionar el estado del trámite.
 */
export interface Tramite220103State {
    Tablamercancia?: Mercancia[];
    [key: string]: unknown;
}

/**
 * Función que crea el estado inicial del trámite 220103.
 * 
 * @returns Estado inicial del trámite 220103.
 */
export function createInitialState(): Tramite220103State {
    return {
       
    }
}

/**
 * Clase que representa el store del trámite 220103.
 * Extiende la clase `Store` de Akita para gestionar el estado del trámite.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite220103', resettable: true })
export class Tramite220103Store extends Store<Tramite220103State> {
    /**
     * Constructor del store.
     * Inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza el estado del trámite 220103 con los valores proporcionados.
     * 
     * @param valores - Valores parciales para actualizar el estado.
     */
    setTramite220103State(fieldName: string, valores: unknown): void {
        this.update((state => ({
            ...state,
            [fieldName]: valores,
        })));
    }

    agregarMercancia(mercancia: Mercancia): void {
        if (!mercancia.id) {
        const MERCANCIA_ID = crypto.randomUUID();
        mercancia.id = MERCANCIA_ID;
        this.update((state) => ({
            ...state,
            Tablamercancia: [...(state.Tablamercancia || []), mercancia]
        }));
    }
    else{
        this.update((state) => ({
            ...state,
            Tablamercancia: state.Tablamercancia?.map((item) => {
                if (item.id === mercancia.id) {
                    return { ...item, ...mercancia };
                }
                return item;
            })
        }));
    }

    }
   eliminarMercancia(id: string): void {
        this.update((state) => ({
            ...state,
            Tablamercancia: state.Tablamercancia?.filter((mercancia) => mercancia.id !== id)
        }));
    }

}


