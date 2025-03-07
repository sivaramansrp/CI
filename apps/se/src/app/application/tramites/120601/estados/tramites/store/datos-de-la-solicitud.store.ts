import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RepresentacionFederaState
 */
export interface DatosDeLaSolicitudState {
    tipoDeEmpresa: string;
}

export function createInitialState(): DatosDeLaSolicitudState {
  return {
    tipoDeEmpresa: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'datosdelasolicitud', resettable: true })
export class DatosDeLaSolicitudStore extends Store<DatosDeLaSolicitudState> {
  constructor() {
    super(createInitialState());
  }

  public setTipoDeEmpresa(tipoDeEmpresa: string) {
    this.update((state) => ({
      ...state,
      tipoDeEmpresa,
    }));
  }

}
