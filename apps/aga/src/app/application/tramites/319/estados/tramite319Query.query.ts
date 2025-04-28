import { FinalDataToSend } from "../models/personas.module";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Tramite319Store } from "./tramite319Store.store";

/**
 * @description
 * Servicio de consulta para el estado del formulario del trámite 319.
 * 
 * Este servicio extiende la clase `Query` de Akita y proporciona métodos
 * para acceder al estado actual de los datos del formulario.
 * 
 * @example
 * ```typescript
 * constructor(private tramite319Query: Tramite319Query) {}
 * 
 * const datos = this.tramite319Query.selectDatos$.subscribe(data => {
 *   console.log(data);
 * });
 * ```
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
    constructor(override readonly store: Tramite319Store) {
        super(store);
    }

    /**
     * @description
     * Observable que permite obtener el estado actual de los datos del formulario.
     * 
     * @returns {Observable<FinalDataToSend>} El estado actual de los datos del formulario.
     */
    selectDatos$ = this.select(state => state.datos);
}