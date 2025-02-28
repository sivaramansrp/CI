import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Acuicultura, createDatosState, FormularioMovilizacion, FormularioPago } from 'libs/shared/data-access-user/src/core/models/220203/importacion-de-acuicultura.module';
import { DatosMercancia } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';



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
