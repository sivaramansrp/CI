import { Injectable } from "@angular/core";

import { Store, StoreConfig } from "@datorama/akita";

import { Solicitar} from "../models/personas.module";

import { FinalDataToSend, createDatosState } from "../models/tramite319-state.model";

/**
 * @description
 * Servicio que representa el estado de la tienda para el manejo de datos fitosanitarios.
 * Proporciona métodos para actualizar y eliminar datos relacionados con el formulario.
 *
 * @providedIn root
 * @storeConfig
 * - name: 'fitosanitariostore'
 * - resettable: true
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite319Store', resettable: true })
export class Tramite319Store extends Store<FinalDataToSend> {
    /**
     * @constructor
     * Initializes the `Tramite319Store` class by invoking the parent class constructor
     * with the initial state created by `createDatosState`.
     *
     * @description
     * This constructor is responsible for setting up the store's initial state
     * by calling the `createDatosState` function and passing the resulting state
     * to the parent class. This ensures that the store is properly initialized
     * with the required data structure and default values.
     *
     * @see {@link createDatosState} for details on the initial state structure.
     */
    constructor() {
        super(createDatosState());
    }
     /**
     * @method actualizarDatosForma
     * @description Elimina un dato del estado actual basado en su identificador único (ID).
     * 
     * @param {Solicitar[]} datos - El identificador único del dato que se desea eliminar.
     * 
     */
     public actualizarDatosForma(datos: Solicitar[]): void {
        this.update(state => ({
            ...state,
            datos : datos as Solicitar[],
        }));
    }

    /**
     * @method eliminarDatoPorId
     * @description Elimina un dato del estado actual basado en su identificador único (ID).
     * 
     * @param {number} id - El identificador único del dato que se desea eliminar.
     * 
     * @example
     * // Ejemplo de uso:
     * this.eliminarDatoPorId(123);
     * 
     * @remarks
     * Este método actualiza el estado eliminando el elemento cuyo ID coincide con el proporcionado.
     * Utiliza el método `filter` para crear una nueva lista de datos excluyendo el elemento especificado.
     */
    public eliminarDatoPorId(id: number): void {
        this.update(state => ({
            ...state,
            datos: state.datos.filter(dato => dato.id !== id),
        }));
    }

    /**
     * @method actualizarOperacion
     * @description Actualiza el estado de la operación con un nuevo valor.
     * @param {string} nuevaOperacion - El nuevo valor de la operación que se establecerá en el estado.
     * @returns {void}
     * 
     * @example
     * // Ejemplo de uso:
     * tramite319Store.actualizarOperacion('nuevaOperacion');
     * 
     * @category Estados
     */
    public actualizarOperacion(nuevaOperacion: string): void {
        this.update(state => ({
          ...state,
          operacion: nuevaOperacion as string,
        }));
      }

}