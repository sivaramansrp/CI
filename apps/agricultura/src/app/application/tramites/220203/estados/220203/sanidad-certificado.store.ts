import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';


import { Acuicultura, Consulta, DatosMercancia220203, FormularioMovilizacion, FormularioPago, createDatosState } from '../../models/220203/importacion-de-acuicultura.module';
import { PersonaTerceros } from '@libs/shared/data-access-user/src';




@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'importacion-de-acuicultura', resettable: true })
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
    public actualizarDatosMercancia(datosMercancia: DatosMercancia220203): void {
        this.update(state => ({
            ...state,
            datosMercancia
        }));
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

    /**
     * Actualiza el estado con la información de la consulta.
     * @param consulta Datos de la consulta.
     */
    public setConsultaioState(consulta: Consulta): void {
        this.update(state => ({
            ...state,
            consulta
        }));
    }

    /**
     * @description Updates the store with related third parties.
     * @param tercerosRelacionados Array of related third-party persons.
     */
    public actualizarTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
    this.update(state => ({
        ...state,
        tercerosRelacionados: tercerosRelacionados,
    }));
    }

    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}
