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

  /** Banco para el pago del trámite. */
  banco: string;

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
    banco: '',
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
  * @método
  * @nombre establecerDatos
  * @descripción
  * Actualiza el estado con los valores proporcionados.
  * 
  * @param {Partial<Tramites30401State>} datos - Valores parciales para actualizar el estado.
  */
  public establecerDatos(datos: Partial<Solicitud230902State>): void {    
    this.update((state) => ({
     ...state,
     ...datos,
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
