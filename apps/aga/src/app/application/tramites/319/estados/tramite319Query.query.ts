import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Tramite319Store } from "./tramite319Store.store";

import { FinalDataToSend, Solicitar } from "../models/personas.module";

/**
 * @description
 * Servicio de consulta para el estado del formulario del trámite 319.
 * 
 * Este servicio extiende la clase `Query` de Akita y proporciona métodos
 * para acceder al estado actual de los datos del formulario.
 * 
 * @example
 * constructor(private tramite319Query: Tramite319Query) {}
 * 
 * const datos = this.tramite319Query.selectDatos$.subscribe(data => {
 *   console.log(data);
 * });
 */
@Injectable({
    providedIn: 'root',
})
export class Tramite319Query extends Query<FinalDataToSend> {

    /**
     * @description
     * Constructor del servicio `Tramite319Query`.
     * 
     * @param {Tramite319Store} store - La tienda de estado asociada al trámite 319.
     */
    constructor(protected override store: Tramite319Store) {
        super(store);
    }

    /**
     * @description
     * Observable para obtener la lista de datos (`Solicitar[]`).
     * 
     * @returns {Observable<Solicitar[]>}
     */
    selectDatos$ = this.select(state => state.datos);

    /**
     * @description
     * Observable para obtener la operación actual (`string`).
     * 
     * @returns {Observable<string>}
     */
    selectOperacion$ = this.select(state => state.operacion);

    /**
     * @description
     * Getter síncrono para obtener directamente todos los datos (`Solicitar[]`) actuales del estado.
     * 
     * @returns {Solicitar[]}
     */
    get datos(): Solicitar[] {
        return this.getValue().datos;
    }

    /**
     * @description
     * Getter síncrono para obtener directamente la operación actual del estado.
     * 
     * @returns {string}
     */
    get operacion(): string {
        return this.getValue().operacion;
    }
}
