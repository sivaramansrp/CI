import { TramiteSedenaSharedState, TramiteSedenaSharedStore } from './tramiteStore.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio que permite consultar (leer) el estado del Trámite 
 * usando el patrón de Akita para manejo de estado.
 */

/**
 * Query de Akita para gestionar el estado compartido relacionado con el trámite Sedena.
 *
 * Proporciona un observable para acceder a la configuración de edición de una sola mercancía
 * en la tabla de datos, permitiendo la suscripción a los cambios de estado relevantes.
 *
 * @example
 * // Suscribirse a la configuración de edición de una mercancía
 * tramiteSedenaSharedQuery.getEditSingleMerccancialTablaDatosConfig$.subscribe(config => {
 *   // lógica con la configuración recibida
 * });
 *
 * @see TramiteSedenaSharedStore para la gestión del estado asociado.
 */
@Injectable({ providedIn: 'root' })
export class TramiteSedenaSharedQuery extends Query<TramiteSedenaSharedState> {
  /**
   * Constructor que inicializa el query con el store correspondiente.
   *
   * @param {TramiteSedenaSharedStore} store - Instancia del store para el Trámite .
   */
  constructor(protected override store: TramiteSedenaSharedStore) {
    super(store);
  }

  /**
 * Observable que emite la configuración de edición de una sola mercancía.
 *
 * @property {Observable<any>} getEditSingleMerccancialTablaDatosConfig$
 */
  public getEditSingleMerccancialTablaDatosConfig$ = this.select(
    (state) => state.editSingleMerccancialTablaDatosConfig
  );
}
