/**
 * @nombre DesistimientoQuery
 * @descripción Esta clase es una consulta (Query) de Akita que permite obtener el estado del store `DesistimientoStore`.
 * Se utiliza para seleccionar y acceder a los datos del estado de la aplicación relacionados con `DesistimientoStore`.
 * 
 * @autor [Tu Nombre]
 * @fecha [Fecha de Creación]
 */
import { DesistimientoState, DesistimientoStore } from './tramite220404.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DesistimientoQuery extends Query<DesistimientoState> {

    /**
     * @constructor
     * @param {DesistimientoStore} store - Inyección del store que maneja el estado de `DesistimientoState`.
     */
    constructor(protected override store: DesistimientoStore) {
        super(store);
    }

    /**
     * @propiedad selectDesistimiento$
     * @tipo Observable<DesistimientoState>
     * @descripción Selector que permite obtener el estado completo de `DesistimientoState`.
     */
    selectDesistimiento$ = this.select((state) => {
        return state;
    });

    /**
     * @propiedad selectDescripcion$
     * @tipo Observable<string>
     * @descripción Selector que permite obtener la descripción del desistimiento.
     */
    selectDescripcion$ = this.select((state) => {
        return state.descripcion;
    });
}
