import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { createDatosState, DatosForma, ListaDeDatosFinal, Mercancia, Movilizacion, PagoForm } from '../core/models/220202/fitosanitario.model';



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
            datos: [datosForma], // Envuelve los datos en un array
        }));
    }

    /**
     * Actualiza el estado con la información de movilización.
     * @param movilizacion Datos de movilización.
     */
    public actualizarMovilizacion(movilizacion: Movilizacion): void {
        this.update(state => ({
            ...state,
            movilizacion: [movilizacion], // Envuelve los datos en un array
        }));
    }

    /**
     * Actualiza el estado con la información de pago.
     * @param pago Datos de pago.
     */
    public actualizarPago(pago: PagoForm): void {
        this.update(state => ({
            ...state,
            pago: [pago], // Envuelve los datos en un array
        }));
    }


    /**
     * Actualiza las mercancías en el estado.
     * @param mercancias Array de mercancías.
     */
    public actualizarMercancias(mercancias: Mercancia[]): void {
        this.update(state => ({
            ...state,
            datos: [{ ...state.datos[0], mercancias: mercancias }] // Actualiza las mercancías dentro de datos
        }));
    }


    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}
