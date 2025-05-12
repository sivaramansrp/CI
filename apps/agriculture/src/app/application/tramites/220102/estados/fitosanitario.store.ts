import { Injectable } from "@angular/core";

import {
    Store,

    StoreConfig
} from "@datorama/akita";

import {
    FinalDataToSend,

    MercanciaForm,

    createDatosState,
} from "../models/fitosanitario.model";

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'fitosanitariostore', resettable: true })
export class FitosanitarioStore extends Store<FinalDataToSend> {
    constructor() {
        super(createDatosState());
    }
    /**
        * Actualiza el estado con la información del formulario.
        * @param datos Datos del formulario.
        */
    public actualizarDatosForma(datos: MercanciaForm[]): void {
        this.update(state => ({
            datos
        }));
    }

    public eliminarDatoPorId(id: number): void {
        this.update(state => ({
            ...state,
            datos: state.datos.filter(dato => dato.id !== id),
        }));
    }
}