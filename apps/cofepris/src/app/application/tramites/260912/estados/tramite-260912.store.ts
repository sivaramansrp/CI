import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Tramites260912State
 */
export interface Tramites260912State {
  claveDeReferencia: string;
  cadenaPagoDependencia: string;
  clave: string;
  llaveDePago: string;
  fecPago: string;
  impPago: string;
}

export function createInitialState(): Tramites260912State {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites260912', resettable: true })
export class Tramite260912Store extends Store<Tramites260912State> {
  constructor() {
    super(createInitialState());
  }

  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  public setCadenaPagoDependencia(cadenaPagoDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  public setClave(clave: string) {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  public setLlaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  public setFecPago(fecPago: string) {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  public setImpPago(impPago: string) {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }

}
