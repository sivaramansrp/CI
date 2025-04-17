import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns SolicitudPermisoState
 */

export interface SolicitudPermisoState {
  /**
   * La clave de referencia asociada con la solicitud.
   */
  claveDeReferencia?: string;
  /**
   * La cadena de pago proporcionada por la dependencia.
   */
  cadenaPagoDependencia?: string;
  /**
   * La clave del banco utilizada para el pago.
   */
  bancoClave?: string;
  /**
   * La llave de pago única asociada con la transacción.
   */
  llaveDePago?: string;
  /**
   * La fecha en que se realizó el pago.
   */
  fecPago?: string;
  /**
   * El importe del pago realizado.
   */
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
@StoreConfig({ name: 'solicitudpermisoprocedure', resettable: true })
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
