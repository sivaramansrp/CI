import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 220402
 * @returns Derecho220402State
 */
export interface Derecho220402State {
  exentoDePago: string;
  nombreImportExport: string;
  justificacion: string;
  claveDeReferencia: string;
  cadenaDependencia: string;
  llaveDePago: string;
  fechaPago: string;
  importePago: string;
}

export function createInitialDerechoState(): Derecho220402State {
  return {
    exentoDePago: 'No',
    nombreImportExport: '',
    justificacion: '',
    claveDeReferencia: '',
    cadenaDependencia: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: ''
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Derecho220402', resettable: true })
export class Derecho220402Store extends Store<Derecho220402State> {
  constructor() {
    super(createInitialDerechoState());
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setFraccionRegla(reglaFraccion: string) {
    this.update((state) => ({
      ...state,
      reglaFraccion
    }));
  }

}


