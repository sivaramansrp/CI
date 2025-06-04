import { Query } from '@datorama/akita';

import { Injectable } from '@angular/core';

import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store';
import { PermisosDatos } from '../models/cancelacion-de-solicitus.model';

/**
 * Consulta para el estado de desistimiento de permiso.
 * Proporciona selectores para acceder a los datos del estado.
 */
@Injectable({
    providedIn: 'root',
})
export class DesistimientoQuery extends Query<PermisosDatos> {
    // Constructor que inyecta el store correspondiente.
    constructor(protected override store: DesistimientoStore) {
        super(store);
    }

    /**
     * Selector para obtener todo el estado del trámite.
     */
    selectTramite$ = this.select((state) => {
        return state;
    });

    /**
     * Selector para obtener el motivo de cancelación.
     */
    selectMotivoCancelacion$ = this.select((state) => {
        return state.motivoCancelacion;
    });
}
