import {
    DatosForma,

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
@StoreConfig({ name: 'seccion', resettable: true })
export class FitosanitarioStore extends Store<ListaDeDatosFinal> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Actualiza el estado con la información del formulario.
     * @param datosForma Datos del formulario.
     */
    public actualizarDatosForma(datosForma: DatosForma): void {
        this.update(state => ({
            ...state,
            datosForma, // Envuelve los datos en un array
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
    * Updates the 'formaValida' field.
    * @param updatedFormaValida The updated boolean values for 'formaValida'.
    */
    public actualizarformaValida(updatedFormaValida: { [key: string]: boolean }): void {
        this.update(state => ({
            ...state,
            formaValida: {
                ...state?.finalEnviar,
                ...updatedFormaValida, // Only the updated fields are merged here
            }
        }));
    }
    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}