import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
export interface Tramite630307State {
  cveAduana: string;
  cveSeccionAduanal: string;
  fechaLimiteRetorno: string;
  cuentaProrroga: string;
  folioInformacionGeneralProrroga: string;
  fechaInicioProrroga: string;
  fechaVencimientoProrroga: string;
  folioInformacionGeneralAutorizacion: string;
  aduanaIngreso: string;
  seccionAduanera: string;
  fechaIngreso: string;
  fechaVencimiento: string;
  marca: string;
  modelo: string;
  numeroDeSerie: string;
  numeroDeMotor: string;
  descripcionMercancia: string;
  motivo: string;
}

export function createInitialState(): Tramite630307State {
  return {
    cveAduana: '',
    cveSeccionAduanal: '',
    fechaLimiteRetorno: '',
    cuentaProrroga: '',
    folioInformacionGeneralProrroga: '',
    fechaInicioProrroga: '',
    fechaVencimientoProrroga: '',
    folioInformacionGeneralAutorizacion: '',
    aduanaIngreso: '',
    seccionAduanera: '',
    fechaIngreso: '',
    fechaVencimiento: '',
    marca: '',
    modelo: '',
    numeroDeSerie: '',
    numeroDeMotor: '',
    descripcionMercancia: '',
    motivo: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630307', resettable: true })
export class Tramite630307Store extends Store<Tramite630307State> {
  constructor() {
    super(createInitialState());
  }

  setTramite630307State(values: Partial<Tramite630307State>): void {
    this.update((state => ({
      ...state,
      ...values,
    })));
  }
}