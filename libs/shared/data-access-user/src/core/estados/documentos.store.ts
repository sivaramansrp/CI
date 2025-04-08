import { Injectable } from "@angular/core";
import { Store } from "@datorama/akita";

export interface CatalogoDocumentos {
    id: number;
    descripcion: string;
    clave?: string;
    tam?: string;
    dpi?: string;
    nuevo?: boolean;
    uniqueId?: string;
    adicionales?: CatalogoDocumentos[];
}

/**
 * Creación del estado inicial para el catálogo de documentos
 * @returns CatalogoDocumentos
 */
export function createInitialStateDocumentos(): CatalogoDocumentos[] {
    return []
}

@Injectable({
    providedIn: 'root'
})
export class DocumentosStore extends Store<any> {
    constructor() {
        super(createInitialStateDocumentos());
    }

    /**
     * Guarda el catálogo de documentos en el state
     *
     * @param catalogoDocumentos
     */
    public establecerCatalogoDocumentos(catalogoDocumentos: CatalogoDocumentos[]) {
        this.update((state) => ({
            ...state,
            catalogoDocumentos,
        }));
    }
}