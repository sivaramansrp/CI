import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import {
    Cancelacion,

    PermisosDatos,

    createDatosState,
} from '../models/cancelacion-de-solicitus.model';





@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'desistimiento-de-permiso', resettable: true })
export class DesistimientoStore extends Store<PermisosDatos> {
    constructor() {
        super(createDatosState());
    }
    setDatos(datos: Cancelacion[]): void {
        this.update({ datos });
    }



}
