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
  popupAbierto: boolean;
  popupCerrado: boolean;
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
    popupAbierto: false,
    popupCerrado: true,
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

  /**
   * Establece el tipo de movimiento en el estado.
   * 
   * @param {string} tipodeMovimiento - Tipo de movimiento seleccionado.
   */
  public setTipoDeMovimiento(tipodeMovimiento: string): void {
    this.update((state) => ({
      ...state,
      tipodeMovimiento,
    }));
  }

  /**
   * Establece el tipo de régimen en el estado.
   * 
   * @param {string} tipoRegimen - Tipo de régimen seleccionado.
   */
  public setTipoDeRegimen(tipoRegimen: string): void {
    this.update((state) => ({
      ...state,
      tipoRegimen,
    }));
  }

  /**
   * Establece la entidad federativa en el estado.
   * 
   * @param {string} entidadFederativa - Entidad federativa seleccionada.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * Establece la clave de referencia en el estado.
   * 
   * @param {string} claveDeReferencia - Clave de referencia proporcionada.
   */
  public setlclaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Establece la cadena de pago de dependencia en el estado.
   * 
   * @param {string} cadenaPagoDependencia - Cadena de pago de dependencia proporcionada.
   */
  public setcadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  /**
   * Establece el banco seleccionado en el estado.
   * 
   * @param {string} bancoseleccionado - Banco seleccionado.
   */
  public setbancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  /**
   * Establece la llave de pago en el estado.
   * 
   * @param {string} llaveDePago - Llave de pago proporcionada.
   */
  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Establece la fecha de pago en el estado.
   * 
   * @param {string} fecPago - Fecha de pago proporcionada.
   */
  public setfecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  /**
   * Establece el importe de pago en el estado.
   * 
   * @param {Date} impPago - Importe de pago proporcionado.
   */
  public setimpPago(impPago: Date): void {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }

  /**
   * Establece el estado del popup como abierto.
   * 
   * @param {boolean} popupAbierto - Indica si el popup está abierto.
   */
  public setIsPopupOpen(popupAbierto: boolean): void {
    this.update((state) => ({
      ...state,
      popupAbierto,
    }));
  }

  /**
   * Establece el estado del popup como cerrado.
   * 
   * @param {boolean} popupCerrado - Indica si el popup está cerrado.
   */
  public setIsPopupClose(popupCerrado: boolean): void {
    this.update((state) => ({
      ...state,
      popupCerrado,
    }));
  }

  /**
   * Establece los datos de la tabla de mercancías en el estado.
   * 
   * @param {ConfiguracionItem[]} mercanciaTablaDatos - Datos de la tabla de mercancías.
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }

}
