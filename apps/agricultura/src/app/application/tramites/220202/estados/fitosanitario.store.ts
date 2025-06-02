import {
    DatosForma,

    FilaSolicitud,

    ListaDeDatosFinal,

    Movilizacion,

    PagoForm,

    createDatosState,
} from '../models/220202/fitosanitario.model';


import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'fitosanitariostore', resettable: true })
export class FitosanitarioStore extends Store<ListaDeDatosFinal> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Actualiza el estado con la información del formulario.
     * @param datos Datos del formulario.
     */
    public actualizarDatosForma(datos: DatosForma): void {
        this.update(state => ({
            ...state,
            datos, // Envuelve los datos en un array
        }));

    }

    /**
     * Actualiza el estado con la información de movilización.
     * @param movilizacion Datos de movilización.
     */
    public actualizarMovilizacion(movilizacion: Movilizacion): void {
        this.update(state => ({
            ...state,
            movilizacion, // Envuelve los datos en un array
        }));
    }

    /**
     * Actualiza el estado con la información de pago.
     * @param pago Datos de pago.
     */
    public actualizarPago(pago: PagoForm): void {
        this.update(state => ({
            ...state,
            pago, // Envuelve los datos en un array
        }));
    }

    /**
     * Actualiza el estado de validez de los formularios.
     * @param updatedFormaValida Objeto con las claves de los formularios y su estado de validez (true/false).
     */
    public actualizarformaValida(updatedFormaValida: { [key: string]: boolean }): void {
        this.update(state => ({
            ...state,
            finalEnviar: {
                ...state.finalEnviar,
                ...updatedFormaValida,
            }
        }));
    }

    /**
     * Actualiza el estado con los datos finales de la tabla.
     * @param tablaDatos Arreglo de filas con los datos de la solicitud.
     */
    public tablaDatosFinal(tablaDatos: FilaSolicitud[]): void {
        this.update(state => ({
            ...state,
            tablaDatos,
        }));
    }

    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}