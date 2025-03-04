import { ListaDeDatosFinal, Plantas, SectoresYMercancias, createDatosState } from '../models/prosec.module';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


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
    public actualizarSectoresYMercancias(sectoresYMercancias: SectoresYMercancias): void {
        this.update(state => ({
            ...state,
            sectoresYMercancias: [sectoresYMercancias], // Wraps the data in an array
        }));
    }

    /**
     * Updates the state with the information of plants.
     * @param Plantas Data of plants.
     */
    public actualizarPlantas(plantas: Plantas): void {
        this.update(state => ({
            ...state,
            plantas: [plantas], // Wraps the data in an array
        }));
    }
}