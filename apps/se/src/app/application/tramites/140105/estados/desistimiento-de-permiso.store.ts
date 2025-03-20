import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Cancelacion, createDatosState, PermisosDatos } from '../models/cancelacion-de-solicitus.model';





@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'importacion-de-acuicultura', resettable: true })
export class AcuiculturaStore extends Store<PermisosDatos> {
    constructor() {
        super(createDatosState());
    }



}
