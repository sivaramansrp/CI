/**
 * @nombre CancelarSolicitudQuery
 * @descripción Esta clase es una consulta (Query) de Akita que permite obtener el estado del store `CancelarSolicitudStore`.
 * Se utiliza para seleccionar y acceder a los datos del estado de la aplicación relacionados con `CancelarSolicitudStore`.
 * 
 * @autor [Tu Nombre]
 * @fecha [Fecha de Creación]
 */

import { CancelarSolicitudState, CancelarSolicitudStore } from './tramite570101.store';
import { Query, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
@StoreConfig({name: 'cancelarSolicitud', resettable: true})
export class CancelarSolicitudQuery extends Query<CancelarSolicitudState> {

    /**
     * @constructor
     * @param {CancelarSolicitudStore} store - Inyección del store que maneja el estado de `CancelarSolicitudState`.
     */
    constructor(protected override store: CancelarSolicitudStore) {
        super(store);
    }

    /**
     * @propiedad selectCancelarSolicitud$
     * @tipo Observable<CancelarSolicitudState>
     * @descripción Selector que permite obtener el estado completo de `CancelarSolicitudState`.
     */
    selectCancelarSolicitud$ = this.select((state) => {
        return state;
    });
}
