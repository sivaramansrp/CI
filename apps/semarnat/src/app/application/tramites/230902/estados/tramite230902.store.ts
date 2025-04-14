import { Store, StoreConfig } from '@datorama/akita';
import { ConfiguracionItem } from '../enum/mercancia.enum';
import { Injectable } from '@angular/core';


/**
 * Creación del estado inicial para la interfaz de trámite.
 * Define las propiedades necesarias para gestionar el estado del trámite 230902.
 */
export interface Solicitud230902State {
  /** Tipo de movimiento seleccionado en el trámite. */
  tipodeMovimiento: string;

  /** Tipo de régimen seleccionado en el trámite. */
  tipoRegimen: string;

  /** Entidad federativa seleccionada en el trámite. */
  entidadFederativa: string;

  /** Clave de referencia proporcionada para el trámite. */
  claveDeReferencia: string;

  /** Cadena de pago de dependencia asociada al trámite. */
  cadenaPagoDependencia: string;

  /** Banco seleccionado para el pago del trámite. */
  bancoseleccionado: string;

  /** Llave de pago proporcionada para el trámite. */
  llaveDePago: string;

  /** Fecha de pago registrada en el trámite. */
  fecPago: string;

  /** Importe del pago realizado para el trámite. */
  impPago: Date | null;

  /** Indica si el popup está abierto. */
  popupAbierto: boolean;

  /** Indica si el popup está cerrado. */
  popupCerrado: boolean;

  /** Datos de la tabla de mercancías asociada al trámite. */
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
   * {string} tipodeMovimiento - Tipo de movimiento seleccionado.
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
   * {string} tipoRegimen - Tipo de régimen seleccionado.
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
   * {string} entidadFederativa - Entidad federativa seleccionada.
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
   * {string} claveDeReferencia - Clave de referencia proporcionada.
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
   * {string} cadenaPagoDependencia - Cadena de pago de dependencia proporcionada.
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
   * {string} bancoseleccionado - Banco seleccionado.
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
   * {string} llaveDePago - Llave de pago proporcionada.
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
   * {string} fecPago - Fecha de pago proporcionada.
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
   * {Date} impPago - Importe de pago proporcionado.
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
   * {boolean} popupAbierto - Indica si el popup está abierto.
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
   * {boolean} popupCerrado - Indica si el popup está cerrado.
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
   * {ConfiguracionItem[]} mercanciaTablaDatos - Datos de la tabla de mercancías.
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }

}
