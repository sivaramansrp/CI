import { Store, StoreConfig } from '@datorama/akita';
import { CatalogoTipoDocumento } from '../models/shared/catalogos.model';
import { Injectable } from "@angular/core";

export interface SolicitudDocumentosState {
    /**
     * Parametro de la lista de documentos seleccionados
     */
    listaDocumentos: CatalogoTipoDocumento[];
}
/**
 * Creación del estado inicial para la interfaz de solicitud de documentos
 * @returns SolicitudDocumentosState
 */
export function createInitialSolicitudDocumentosStates(): SolicitudDocumentosState {
    return {
        listaDocumentos: []
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
     * @param listaDocumentos
     */
    setSolicitudDocumentos(listaDocumentos: CatalogoTipoDocumento[]): void {
        this.update(state => ({ ...state, listaDocumentos }));
    }
}
