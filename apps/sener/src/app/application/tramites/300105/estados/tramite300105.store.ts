import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 300105
 * @returns Tramite300105
 */
export interface Tramite300105State {
  motivoRenunciaDeDerechos: string;
  mercacniaSolicitudControlar:boolean;
  /**
   * claveDeReferencia
   * @type {string}
   */
  claveDeReferencia: string;

  /**
   * cadenaDependencia
   * @type {string}
   */
  cadenaDependencia: string;

  /**
   * banco
   * @type {string}
   */
  banco: string;

  /**
   * llaveDePago
   * @type {string}
   */
  llaveDePago: string;

  /**
   * fechaPago
   * @type {string}
   */
  fechaPago: string;

  /**
   * importePago
   * @type {string}
   */
  importePago: string;
}

export function createInitialState(): Tramite300105State {
  return {
    motivoRenunciaDeDerechos: '',
    mercacniaSolicitudControlar:true,

    /**
     * claveDeReferencia
     * @type {string}
     */
    claveDeReferencia: '',

    /**
     * cadenaDependencia
     * @type {string}
     * */
    cadenaDependencia: '',

    /**
     * banco
     * @type {string}
     */
    banco: '',

    /**
     * llaveDePago
     * @type {string}
     */
    llaveDePago: '',

    /**
     * fechaPago
     * @type {string}
     */
    fechaPago: '',

    /**
     * importePago
     * @type {string}
     */
    importePago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite300105', resettable: true })
export class Tramite300105Store extends Store<Tramite300105State> {
  constructor() {
    super(createInitialState());
  }

  setMotivoRenunciaDeDerechos(motivoRenunciaDeDerechos: string): void {
    this.update((state) => ({
      ...state,
      motivoRenunciaDeDerechos,
    }));
  }

  /**
   * Guarda la clave de referencia en el estado.
   * @param claveDeReferencia
   */
  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Guarda la cadena de dependencia en el estado.
   * @param cadenaDependencia
   */
  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * Guarda el banco en el estado.
   * @param banco
   */
  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Guarda la llave de pago en el estado.
   * @param llaveDePago
   */
  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Guarda la fecha de pago en el estado.
   * @param fechaPago
   */
  public setFechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }

  /**
   * Guarda el importe de pago en el estado.
   * @param importePago
   * */
  public setImportePago(importePago: string) {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }
}
