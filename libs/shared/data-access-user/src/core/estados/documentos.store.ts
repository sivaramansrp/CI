import { Injectable } from "@angular/core";
import { Store } from "@datorama/akita";

/**
 * Estado para almacenar la información de cada documento
 */

export interface DocumentosState {
    catalogoDocumentos: DocumentoState[];
}
export interface DocumentoState {
    id: number;
    descripcion: string;
    clave?: string;
    tam?: string;
    dpi?: string;
    nuevo?: boolean;
    uniqueId?: string;
    adicionales?: DocumentoState[];
}

/**
 * Creación del estado inicial para el catálogo de documentos
 * @returns CatalogoDocumentos
 */
export function createInitialStateDocumentos(): DocumentosState {
    return {
        catalogoDocumentos: [],
    }
}

@Injectable({
    providedIn: 'root'
})
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