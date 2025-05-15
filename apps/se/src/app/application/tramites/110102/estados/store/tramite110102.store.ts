import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite110102State {
  cveRegistroProductor: string,
  unidadAdministrativaClave: string,
  solicitudEntidadFederativaEntidadClave: string,
  protestoDecirVerdad: boolean,
  solicitaSeparacionContable: boolean,
  solicitaExportadorAutorizado: boolean,
  condicionExportador: string,
  solicitaExportadorAutorizadoJPN: boolean,
  condicionExportadorJPN: string
}

export function createInitialState(): Tramite110102State {
  return {
    cveRegistroProductor: '',
    unidadAdministrativaClave: '',
    solicitudEntidadFederativaEntidadClave: '',
    protestoDecirVerdad: false,
    solicitaSeparacionContable: false,
    solicitaExportadorAutorizado: false,
    condicionExportador: '',
    solicitaExportadorAutorizadoJPN: false,
    condicionExportadorJPN: ''
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110102', resettable: true })
export class Tramite110102Store extends Store<Tramite110102State> {
  constructor() {
    super(createInitialState());
  }


  /**
   * @method reset
   * @description
   * Método que reinicia el estado del store a su estado inicial.
   * 
   * @returns {void}
   */
  public establecerDatos(datos: Partial<Tramite110102State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }
}