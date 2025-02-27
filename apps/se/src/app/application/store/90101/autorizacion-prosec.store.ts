import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { createDatosState, ListaDeDatosFinal, plantas, sectoresYMercancias } from 'libs/shared/data-access-user/src/core/models/90101/prosec.module';

/**
 * Store to manage the state of Prosec authorization.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class AutorizacionProsecStore extends Store<ListaDeDatosFinal> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Updates the state with the information of sectors and goods.
     * @param sectoresYMercancias Data of sectors and goods.
     */
    public actualizarSectoresYMercancias(sectoresYMercancias: sectoresYMercancias): void {
        this.update(state => ({
            ...state,
            sectoresYMercancias: [sectoresYMercancias], // Wraps the data in an array
        }));
    }

    /**
     * Updates the state with the information of plants.
     * @param plantas Data of plants.
     */
    public actualizarPlantas(plantas: plantas): void {
        this.update(state => ({
            ...state,
            plantas: [plantas], // Wraps the data in an array
        }));
    }
}