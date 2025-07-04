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
   * Selector para obtener la lista de terceros relacionados.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof FitosanitarioQuery
   */
  seleccionarTercerosRelacionados$ = this.select(estado => estado.tercerosRelacionados);
    
  /**
   * Selector para obtener los datos de pago de derechos.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof FitosanitarioQuery
   */
  seleccionarPagoDerechos$ = this.select(estado => estado.pago);

  /**
   * Selector para obtener los datos de movilización.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof FitosanitarioQuery
   */
  seleccionarState$ = this.select(estado => estado);
}