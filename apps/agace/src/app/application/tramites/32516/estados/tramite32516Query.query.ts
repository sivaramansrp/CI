/**
 * @nombre TramiteStoreQuery
 * @descripción Esta clase es una consulta (Query) de Akita que permite obtener el estado del store `TramiteStore`.
 * Se utiliza para seleccionar y acceder a los datos del estado de la aplicación relacionados con `TramiteState`.
 * 
 * @autor [Tu Nombre]
 * @fecha [Fecha de Creación]
 */

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TramiteState } from '../estados/tramite32516Store.store';
import { TramiteStore } from '../estados/tramite32516Store.store';

@Injectable({ providedIn: 'root' })
export class TramiteStoreQuery extends Query<TramiteState> {

    /**
     * @constructor
     * @descripción Constructor de la clase `TramiteStoreQuery`. Inicializa la consulta con el store inyectado.
     * 
     * @param {TramiteStore} store - Inyección del store que maneja el estado de `TramiteState`.
     */
    constructor(protected override store: TramiteStore) {
        super(store);
    }

    /**
     * @propiedad selectSolicitudTramite$
     * @tipo Observable<TramiteState>
     * @descripción Selector que permite obtener el estado completo de `TramiteState`.
     * Este observable emite el estado actual del store cada vez que cambia.
     */
    selectSolicitudTramite$ = this.select((state) => {
        return state;
    });
}
