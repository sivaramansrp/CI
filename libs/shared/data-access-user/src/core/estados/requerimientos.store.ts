import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";

export interface SolicitudRequerimientosState {
    /**
     * Parametro del tipo de requerimieto
     */
    idTipoRequerimiento: number;
    /**
     * Parametro justificación de evaluación
     */
    justificacionRequerimiento: string;
}
export function createInitialRequerimientosStates(): SolicitudRequerimientosState {
    return {
        idTipoRequerimiento: 0,
        justificacionRequerimiento: ''
    };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'RequerimientosStates', resettable: true })
export class RequerimientosStates extends Store<SolicitudRequerimientosState> {
    constructor() {
        super(createInitialRequerimientosStates());
    }
    /**
     * Método para resetear valores
     */
    resetStore(): void {
        this.reset();
    }
    /**
     * Guarda el tipo de requerimiento seleccionado 
     * @param idTipoRequerimiento parametro del tipo de requerimieto
     */
    settipoRequerimientoValue(idTipoRequerimiento: number): void {
        this.update(state => ({ ...state, idTipoRequerimiento }));
    }
    /**
     * Guardar la justificación de a evaluación 
     * @param justificacionRequerimiento parametro 
     */
    setjustificacionRequerimientoValue(justificacionRequerimiento: string): void {
        this.update(state => ({ ...state, justificacionRequerimiento }));
    }
}
