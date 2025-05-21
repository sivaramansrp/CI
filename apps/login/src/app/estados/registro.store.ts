import { Store, StoreConfig } from "@datorama/akita";
import { ConsultaRegistro } from "../application/core/models/consuta-registro.model";
import { Injectable } from "@angular/core";

/**
 * Interfaz que define el estado del store de registro.
 * Contiene el RFC y la lista de personas para notificaciones.
 */
export interface RegistroStore {
    /** RFC de la persona registrada */
    rfc: string;
    /** Lista de personas que recibirán notificaciones */
    personasNotificaciones: ConsultaRegistro[];
}

/**
 * Función que retorna el estado inicial del store de registro.
 * @returns Estado inicial con RFC vacío y lista vacía de notificaciones.
 */
export function createInitialState(): RegistroStore {
    return {
        rfc: '',
        personasNotificaciones: []
    };
}

/**
 * Store de estado global para el registro de personas y notificaciones.
 * Utiliza Akita para la gestión reactiva del estado.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'RegistroStates', resettable: true })
export class RegistroStates extends Store<RegistroStore> {
    /**
     * Constructor. Inicializa el store con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Resetea el store a su estado inicial.
     */
    resetStore() {
        this.reset();
    }

    /**
     * Actualiza el RFC en el estado global.
     * @param rfc RFC a establecer.
     */
    public setValorRFC(rfc: string): void {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }

    /**
     * Actualiza la lista de personas notificadoras en el estado global.
     * @param personasNotificaciones Lista de personas a establecer.
     */
    public setListaNotificadores(personasNotificaciones: ConsultaRegistro[]): void {
        this.update((state) => ({
            ...state,
            personasNotificaciones,
        }));
    }
}