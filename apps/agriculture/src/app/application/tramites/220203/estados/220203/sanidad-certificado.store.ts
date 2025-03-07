import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { DatosMercancia } from '@ng-mf/data-access-user';

import { Acuicultura, FormularioMovilizacion, FormularioPago, createDatosState } from '../../models/220203/importacion-de-acuicultura.module';




@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class AcuiculturaStore extends Store<Acuicultura> {
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
            datos: [formularioPago], // Envuelve los datos en un array
        }));
    }
    /**
      * Actualiza el estado con la información del formulario.
      * @param formularioMovilizacion Datos del formulario.
      */
    public actualizarFormularioMovilizacion(formularioMovilizacion: FormularioMovilizacion): void {
        this.update(state => ({
            ...state,
            datos: [formularioMovilizacion], // Envuelve los datos en un array
        }));
    }

    /**
    * Actualiza el estado con la información del formulario.
    * @param datosMercancia Datos del formulario.
    */
    public actualizarDatosMercancia(datosMercancia: DatosMercancia): void {
        this.update(state => ({
            ...state,
            datos: [datosMercancia], // Envuelve los datos en un array
        }));
    }


    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}
