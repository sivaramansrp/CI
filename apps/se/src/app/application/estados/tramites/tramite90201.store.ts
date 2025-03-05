import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 90201
 * @returns Solicitud90201
 */
export interface Solicitud90201State {
  fraccion: string;
  sector: string;
  rfc: string;
}

/**
 * Creacion del estado inicial para la interfaz de tramite 90201
 * @returns Solicitud90201
 */
export function createInitialState(): Solicitud90201State {
  return {
    fraccion: '',
    sector: '',
    rfc: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite90201', resettable: true })
export class Tramite90201Store extends Store<Solicitud90201State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la fracción de la solicitud
   * @param fraccion
   */
  public setFraccion(fraccion: string) {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza el sector de la solicitud
   * @param sector
   */
  public setSector(sector: string) {
    this.update((state) => ({
      ...state,
      sector,
    }));
  }

  /**
   * Actualiza el RFC de la solicitud
   * @param rfc
   */
  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
