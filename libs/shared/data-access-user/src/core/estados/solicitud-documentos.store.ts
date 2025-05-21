import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";

export interface SolicitudDocumentosState {
    /**
     * Parametro de la lista de documentos seleccionados
     */
    documentosSeleccionados: string[];
}
/**
 * Creación del estado inicial para la interfaz de solicitud de documentos
 * @returns SolicitudDocumentosState
 */
export function createInitialSolicitudDocumentosStates(): SolicitudDocumentosState {
    return {
        documentosSeleccionados: []
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'DocumentosStates', resettable: true })
export class SolicitudDocumentosStore extends Store<SolicitudDocumentosState> {
    constructor() {
        super(createInitialSolicitudDocumentosStates());
    }
    /**
     * Resetear valores
     */
    resetStore(): void {
        this.reset();
    }
    /**
     * Guarda la lista de documentos requeridos
     * @param documentosSeleccionados 
     */
    setSolicitudDocumentos(documentosSeleccionados: string[]): void {
        this.update(state => ({ ...state, documentosSeleccionados }));
    }
}
