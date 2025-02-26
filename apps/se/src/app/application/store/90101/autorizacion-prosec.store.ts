import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { createDatosState, ListaDeDatosFinal, plantas, sectoresYMercancias } from 'libs/shared/data-access-user/src/core/models/90101/prosec.module';

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class AutorizacionProsecStore extends Store<ListaDeDatosFinal> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Actualiza el estado con la información de sectores y mercancias.
     * @param sectoresYMercancias Datos de sectores y mercancias.
     */
    public actualizarSectoresYMercancias(sectoresYMercancias: sectoresYMercancias): void {
        this.update(state => ({
            ...state,
            sectoresYMercancias: [sectoresYMercancias], // Envuelve los datos en un array
        }));
    }

    /**
     * Actualiza el estado con la información de plantas.
     * @param plantas Datos de plantas.
     */
    public actualizarPlantas(plantas: plantas): void {
        this.update(state => ({
            ...state,
            plantas: [plantas], // Envuelve los datos en un array
        }));
    }
}