import { RegistroStates, RegistroStore } from '../estados/registro.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * BusquedaRFCQuery
 * 
 * Esta clase extiende de Akita Query y permite consultar el estado de RegistroStore.
 * Provee un observable `selectSolicitud$` para suscribirse a los cambios del estado completo.
 * 
 * @example
 *   this.busquedaRFCQuery.selectSolicitud$.subscribe(state => { ... });
 */
@Injectable({ providedIn: 'root' })
export class BusquedaRFCQuery extends Query<RegistroStore> {

  /**
   * Observable que emite el estado completo de RegistroStore.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor que recibe el store de estados de registro.
   * @param store Instancia de RegistroStates
   */
  constructor(
    protected override store: RegistroStates) {
    super(store);
  }
}