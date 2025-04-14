import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
export interface SolicitudPermisoState {
  claveDeReferencia?: string;
  cadenaPagoDependencia?: string;
  bancoClave?: string;
  llaveDePago?: string;
  fecPago?: string;
  impPago?: string;
}

export function createInitialState(): SolicitudPermisoState {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoClave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'refprocedure', resettable: true })
export class Tramite260703Store extends Store<SolicitudPermisoState> {
  /**
   * Constructor de la clase Tramite260703Store.
   * Inicializa el estado del store con el estado inicial definido.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * valores Un objeto parcial de SolicitudPermisoState con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<SolicitudPermisoState>): void {
    this.update((state) => ({
      ...state,
      ...valores
    }));
  }

}
