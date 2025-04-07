import {
    CuposDisponibles,
    CuposDisponiblesDatos,
    createDatosState,
} from '../models/cancelacion-de-certificados.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})

@StoreConfig({ name: 'desistimiento-de-permiso', resettable: true })

export class DesistimientoStore extends Store<CuposDisponiblesDatos> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Método para actualizar los datos de la forma de cancelación en el estado.
     * Este método recibe un array de objetos de tipo Cancelacion y actualiza 
     * el estado con la nueva información.
     * 
     * @param datos Array de objetos de tipo Cancelacion que se va a actualizar en el estado.
     */
    
    public actualizarDatosForma(datos: CuposDisponibles[]): void {
        this.update(state => ({
            datos
        }));
    }

}
