import {
  Tramite80303State,
  Tramite80303Store,
} from './tramite80303Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio que permite consultar (leer) el estado del Trámite 240101
 * usando el patrón de Akita para manejo de estado.
 */

@Injectable({ providedIn: 'root' })
export class Tramite80303Query extends Query<Tramite80303State> {
  /**
   * Constructor que inicializa el query con el store correspondiente.
   *
   * @param {Tramite80303Store} store - Instancia del store para el Trámite 240101.
   */
  constructor(protected override store: Tramite80303Store) {
    super(store);
  }

  /**
   * Observable que emite el estado completo del trámite.
   *
   * @property {Observable<Tramite240101State>} selectTramiteState$
   */
  public selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * Observable que emite la pestaña actualmente seleccionada por el usuario.
   *
   * @property {Observable<string>} getTabSeleccionado$
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);

    /**
   * Observable que emite la pestaña actualmente seleccionada por el usuario.
   *
   * @property {Observable<string>} getSubTabSeleccionado$
   */
    public getSubTabSeleccionado$ = this.select((state) => state.subTabSeleccionado);
}
