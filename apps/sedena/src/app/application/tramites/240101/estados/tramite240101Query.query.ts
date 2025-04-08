import {
  Tramite240101State,
  Tramite240101Store,
} from './tramite240101Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio que permite consultar (leer) el estado del Trámite 240101
 * usando el patrón de Akita para manejo de estado.
 */
@Injectable({ providedIn: 'root' })
export class Tramite240101Query extends Query<Tramite240101State> {
  /**
   * Constructor que inicializa el query con el store correspondiente.
   * @param store Instancia del store para el Trámite 240101.
   */
  constructor(protected override store: Tramite240101Store) {
    super(store);
  }

  /**
   * Observable que emite el estado completo de la solicitud.
   */
  public selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
   * Observable que emite la pestaña actualmente seleccionada.
   */
  public getTabSeleccionado$ = this.select((state) => state.tabSeleccionado);
}
