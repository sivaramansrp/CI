
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 6001
 * @returns AgregarCuenta6001
 */
export interface AgregarCuenta6001State {
    titularDeLaCuenta: string;
    tipoDePersona: string;
    rfc: string;
    numeroDeCuenta: string;
    paisDondeRadica: string;
    institucion: string;
    estado: string;
    sucursal: string;
    numeroDePlaza: string;
}

export function createInitialState(): AgregarCuenta6001State {
  return {
    titularDeLaCuenta: '',
    tipoDePersona: '',
    rfc: '',
    numeroDeCuenta: '',
    paisDondeRadica: '',
    institucion: '',
    estado: '',
    sucursal: '',
    numeroDePlaza: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite6001', resettable: true })

export class Tramite6001Store extends Store<AgregarCuenta6001State> {
  constructor() {
    super(createInitialState());
  }

  public setTitularDeLaCuenta(titularDeLaCuenta: string) {
    this.update((state) => ({
      ...state,
      titularDeLaCuenta,
    }));
  }

  public setTipoDePersona(tipoDePersona: string) {
    this.update((state) => ({
      ...state,
      tipoDePersona,
    }));
  }

  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setNumeroDeCuenta(numeroDeCuenta: string) {
    this.update((state) => ({
      ...state,
      numeroDeCuenta,
    }));
  }

  public setPaisDondeRadica(paisDondeRadica: string) {
    this.update((state) => ({
      ...state,
      paisDondeRadica,
    }));
  }

  public setInstitucion(institucion: string) {
    this.update((state) => ({
      ...state,
      institucion,
    }));
  }

  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setSucursal(sucursal: string) {
    this.update((state) => ({
      ...state,
      sucursal,
    }));
  }


  public setNumeroDePlaza(numeroDePlaza: string) {
    this.update((state) => ({
      ...state,
      numeroDePlaza,
    }));
  }
}
