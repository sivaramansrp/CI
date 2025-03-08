import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 220402
 * @returns Transporte220402State
 */
export interface Transporte220402State {
  mediodeTransporte: string;
  identificationDelTransporte: string;
}

export function createInitialTransporteState(): Transporte220402State {
  return {
    mediodeTransporte: '',
    identificationDelTransporte: ''
}

}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'transporte220402', resettable: true })
export class Transporte220402Store extends Store<Transporte220402State> {
  constructor() {
    super(createInitialTransporteState());
  }

  public setMediodeTransporte(mediodeTransporte: string) {
    this.update((state) => ({
      ...state,
      mediodeTransporte
    }));
  }

  public setIdentificationDelTransporte(identificationDelTransporte: string) {
    this.update((state) => ({
      ...state,
      identificationDelTransporte
    }));
  }

}


