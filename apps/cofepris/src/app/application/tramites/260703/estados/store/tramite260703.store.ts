import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
export interface SolicitudPermisoState {
  claveDeReferencia?: string;
  cadenaPagoDependencia?: string;
  bancoseleccionado?: string;
  llaveDePago?: string;
  fecPago?: string;
  impPago?: string;
}

export function createInitialState(): SolicitudPermisoState {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoseleccionado: '',
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
  constructor() {
    super(createInitialState());
  }

  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  public setCadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  /**
   * 
   * Actualiza el estado con el banco seleccionado.
   *
   * {string} bancoseleccionado - El banco seleccionado.
   */
  public setBancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  /**
   * 
   * Actualiza el estado con la llave de pago proporcionada.
   *
   * {string} llaveDePago - La llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * 
   * Actualiza el estado con la fecha de pago proporcionada.
   *
   *  {string} fechaDePago - La fecha de pago.
   */
  public setFecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  public setImpPago(impPago: string): void {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }

}
