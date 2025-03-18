import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';


import { Agricultura, DatosMercancia220701, FormularioMovilizacion, FormularioPago, createDatosState } from '../../220701/modelos/importacion-de-acuicultura.module';




@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'importacion-de-Agricultura', resettable: true })
export class AgriculturaStore extends Store<Agricultura> {
    constructor() {
        super(createDatosState());
    }

    /**
         * Actualiza el estado con la información del formulario.
         * @param formularioPago Datos del formulario.
         */
    public actualizarFormularioPago(formularioPago: FormularioPago): void {
        this.update(state => ({
            ...state,
            formularioPago, // Envuelve los datos en un array
        }));
    }
    /**
      * Actualiza el estado con la información del formulario.
      * @param formularioMovilizacion Datos del formulario.
      */
    public actualizarFormularioMovilizacion(formularioMovilizacion: FormularioMovilizacion): void {
        this.update(state => ({
            ...state,
            formularioMovilizacion, // Envuelve los datos en un array
        }));
    }

    /**
    * Actualiza el estado con la información del formulario.
    * @param datosMercancia Datos del formulario.
    */
    public actualizarDatosMercancia(datosMercancia: DatosMercancia220701): void {
        this.update(state => ({
            ...state,
            datosMercancia
        }));
    }


    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }

    /**
     * Restablece el estado a su estado inicial.
     */
    public actualizarformaValida(updatedFormaValida: { [key: string]: boolean }): void {
        this.update(state => ({
            ...state,
            formaValida: {
                ...state.formaValida,
                ...updatedFormaValida,
            }
        }));
    }

}
