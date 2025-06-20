import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { FitosanitarioStore } from '../estados/fitosanitario.store';
import { ListaDeDatosFinal } from '../models/220202/fitosanitario.model';

/**
 * @summary Servicio de consulta para el estado de fitosanitarios.
 * 
 * @description 
 * La clase `FitosanitarioQuery` extiende de `Query<ListaDeDatosFinal>` 
 * y proporciona una interfaz para consultar el estado del almacenamiento 
 * de datos fitosanitarios mediante Akita.
 * 
 * @injectable
 */
@Injectable({ providedIn: 'root' })
export class FitosanitarioQuery extends Query<ListaDeDatosFinal> {

    /**
     * @summary Constructor del servicio.
     * 
     * @param store Instancia del `FitosanitarioStore` utilizada para 
     * inicializar la consulta.
     */
    constructor(protected override store: FitosanitarioStore) {
        super(store);
    }

    
  /**
   * Selector para obtener los datos de pago de derechos.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarPagoDerechos$ = this.select(estado => estado.pago);
}