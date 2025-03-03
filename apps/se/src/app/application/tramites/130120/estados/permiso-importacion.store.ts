import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { createDatosGruposState, DatosGrupos } from 'apps/se/src/app/application/tramites/130120/models/permiso-importacion-modification.model';

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class PermisoImportacionStore extends Store<DatosGrupos> {
    constructor() {
        super(createDatosGruposState());
    }

    /**
     * @description Updates the store with applicant information.
     * @param params Whole form grouped data.
     */
    public actualizarDatosGrupos(params: Partial<DatosGrupos>): void {
        this.update(state => ({
            ...state,
            ...params, // No need to wrap in an array
        }));
    }
    
    /**
     * @description Resets the store to its initial state.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}
