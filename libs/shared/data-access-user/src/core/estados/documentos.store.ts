import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

/**
 * Estado para almacenar la información de cada documento
 */

export interface DocumentosState {
    catalogoDocumentosRequeridos: DocumentoState[];
    catalogoDocumentosOpcionales: DocumentoState[];
}

/**
 * Model para el estado de cada documento
 */
export interface DocumentoState {
    id: number;
    descripcion: string;
    clave?: string;
    tam?: string;
    dpi?: string;
    nuevo?: boolean;
    uniqueId?: string;
    adicionales?: DocumentoState[];
    cargado?: boolean;
}

/**
 * Creación del estado inicial para el catálogo de documentos
 * @returns CatalogoDocumentos
 */
export function createInitialStateDocumentos(): DocumentosState {
    return {
        catalogoDocumentosRequeridos: [],
        catalogoDocumentosOpcionales: [],
    }
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'documentos', resettable: true })
export class DocumentosStore extends Store<DocumentosState> {
    constructor() {
        super(createInitialStateDocumentos());
    }

    /**
     * Guarda el catálogo de documentos en el state
     *
     * @param catalogoDocumentos
     */
    public establecerCatalogoDocumentos(catalogoDocumentos: DocumentoState[]): void {
        this.update((state) => ({
            ...state,
            catalogoDocumentos,
        }));
    }
}