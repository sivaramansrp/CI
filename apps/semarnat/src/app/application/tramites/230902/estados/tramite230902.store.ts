import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Solicitud230902State
 */
export interface Solicitud230902State {
  tipoDeMovimiento: string;
  tipoDeRegimen: string;

  entidadFederativa: string;
  claveDeReferencia: string;
  cadenaDeLaDependencia: string;
  bancoseleccionado: string;
  llaveDePago: string;
  fechaDePago: string;
  importeDePago: Date | null;
  isPopupOpen: boolean;
  isPopupClose: boolean;

}

export function createInitialState(): Solicitud230902State {
  return {
    tipoDeMovimiento: '',
    tipoDeRegimen: '',

    entidadFederativa: '',
    claveDeReferencia: '',
    cadenaDeLaDependencia: '',
    bancoseleccionado: '',
    llaveDePago: '',
    fechaDePago: '',
    importeDePago: null,
    isPopupOpen: false,
    isPopupClose: true,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230902', resettable: true })
export class Tramite230902Store extends Store<Solicitud230902State> {

  constructor() {
    super(createInitialState());
  }

  public setTipoDeMovimiento(tipoDeMovimiento: string): void {
    this.update((state) => ({
      ...state,
      tipoDeMovimiento,
    }));

  }

  public setTipoDeRegimen(tipoDeRegimen: string): void {
    this.update((state) => ({
      ...state,
      tipoDeRegimen,
    }));
  }

  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setlCaveDeReferencia(caveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      caveDeReferencia,
    }));
  }

  public setCadenaDeLaDependencia(cadenaDeLaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDeLaDependencia,
    }));
  }

  public setbancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago,
    }));
  }

  public setImporteDePago(importeDePago: Date): void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }
  public setIsPopupOpen(isPopupOpen: boolean): void {
    this.update((state) => ({
      ...state,
      isPopupOpen,
    }));
  }

  public setIsPopupClose(isPopupClose: boolean): void {
    this.update((state) => ({
      ...state,
      isPopupClose,
    }));
  }

}
