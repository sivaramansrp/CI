import { Store, StoreConfig } from '@datorama/akita';
import { ConfiguracionItem } from '../enum/mercancia.enum';
import { Injectable } from '@angular/core';


/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Solicitud230902State
 */
export interface Solicitud230902State {
  tipodeMovimiento: string;
  tipoRegimen: string;

  entidadFederativa: string;
  claveDeReferencia: string;
  cadenaPagoDependencia: string;
  bancoseleccionado: string;
  llaveDePago: string;
  fecPago: string;
  impPago: Date | null;
  isPopupOpen: boolean;
  isPopupClose: boolean;
  mercanciaTablaDatos: ConfiguracionItem[];

}

export function createInitialState(): Solicitud230902State {
  return {
    tipodeMovimiento: '',
    tipoRegimen: '',

    entidadFederativa: '',
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoseleccionado: '',
    llaveDePago: '',
    fecPago: '',
    impPago: null,
    isPopupOpen: false,
    isPopupClose: true,
    mercanciaTablaDatos: [],
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

  public setTipoDeMovimiento(tipodeMovimiento: string): void {
    this.update((state) => ({
      ...state,
      tipodeMovimiento,
    }));

  }

  public setTipoDeRegimen(tipoRegimen: string): void {
    this.update((state) => ({
      ...state,
      tipoRegimen,
    }));
  }

  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setlclaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  public setcadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  public setbancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  public setfecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  public setimpPago(impPago: Date): void {
    this.update((state) => ({
      ...state,
      impPago,
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

  public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }

}
