import { Store, StoreConfig } from '@datorama/akita';
import { ConfiguracionItem } from '../enum/mercancia-tabla.enum';
import { DestinatarioConfiguracionItem } from '../enum/destinatario-tabla.enum';
import { Injectable } from '@angular/core';

/**
 * interface Tramite300105State
 * description Define la estructura del estado para el trámite 300105.
 */
export interface Tramite300105State {
  /** description Motivo de renuncia de derechos. */
  motivoRenunciaDeDerechos: string;

  /** description Indica si se debe controlar la mercancía en la solicitud. */
  mercacniaSolicitudControlar: boolean;

  /** description Observaciones relacionadas con el trámite. */
  observaciones: string;

  /** description Estado del popup de terceros relacionados. */
  tercerosPopupState: boolean;

  /** description Datos de la tabla de mercancías asociadas al trámite. */
  mercanciaTablaDatos: ConfiguracionItem[];

  /** description Datos de la tabla de destinatarios asociados al trámite. */
  destinatarioTablaDatos: DestinatarioConfiguracionItem[];

  /** description Clave de referencia del trámite. */
  claveDeReferencia: string;

  /** description Cadena de dependencia asociada al trámite. */
  cadenaDependencia: string;

  /** description Banco relacionado con el trámite. */
  banco: string;

  /** description Llave de pago asociada al trámite. */
  llaveDePago: string;

  /** description Fecha de pago asociada al trámite. */
  fechaPago: string;

  /** description Importe del pago asociado al trámite. */
  importePago: string;

  /** description Número de expediente del trámite. */
  numeroExpediente?: string;

  /** description Tipo de operación asociada al trámite. */
  tipoOperacion?: string;

  /** description Finalidad del trámite. */
  finalidad?: string;

  /** description Indica si el trámite está exento. */
  isExento?: boolean;

  /** description Indica si el trámite tiene autorización. */
  isAutorizacion?: boolean;

  /** description Número de autorización 1. */
  numAutorizacion1?: string;

  /** description Número de autorización 2. */
  numAutorizacion2?: string;

  /** description Número de autorización 3. */
  numAutorizacion3?: string;
}

/**
 * function createInitialState
 * description Crea el estado inicial para el trámite 300105.
 * returns {Tramite300105State} Estado inicial del trámite.
 */
export function createInitialState(): Tramite300105State {
  return {
    motivoRenunciaDeDerechos: '',
    mercacniaSolicitudControlar: true,
    mercanciaTablaDatos: [],
    destinatarioTablaDatos: [],
    observaciones: '',
    tercerosPopupState: false,
    claveDeReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: '',
    numeroExpediente: '',
    tipoOperacion: '',
    finalidad: '',
    isExento: false,
    isAutorizacion: false,
    numAutorizacion1: '',
    numAutorizacion2: '',
    numAutorizacion3: '',
  };
}

/**
 * class Tramite300105Store
 * description Clase que representa el estado del trámite 300105.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite300105', resettable: true })
export class Tramite300105Store extends Store<Tramite300105State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * method setMotivoRenunciaDeDerechos
   * description Actualiza el motivo de renuncia de derechos en el estado.
   * param {string} motivoRenunciaDeDerechos Motivo de renuncia de derechos.
   */
  setMotivoRenunciaDeDerechos(motivoRenunciaDeDerechos: string): void {
    this.update((state) => ({
      ...state,
      motivoRenunciaDeDerechos,
    }));
  }

  /**
   * method setMercanciaTablaDatos
   * description Actualiza los datos de la tabla de mercancías en el estado.
   * param {ConfiguracionItem[]} mercanciaTablaDatos Datos de la tabla de mercancías.
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }

  /**
   * method setDestinatarioTablaDatos
   * description Actualiza los datos de la tabla de destinatarios en el estado.
   * param {DestinatarioConfiguracionItem[]} destinatarioTablaDatos Datos de la tabla de destinatarios.
   */
  public setDestinatarioTablaDatos(destinatarioTablaDatos: DestinatarioConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      destinatarioTablaDatos,
    }));
  }

  /**
   * method setObservaciones
   * description Actualiza las observaciones en el estado.
   * param {string} observaciones Observaciones relacionadas con el trámite.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * method setTercerosPopupState
   * description Actualiza el estado del popup de terceros relacionados.
   * param {boolean} tercerosPopupState Estado del popup de terceros.
   */
  public setTercerosPopupState(tercerosPopupState: boolean): void {
    this.update((state) => ({
      ...state,
      tercerosPopupState,
    }));
  }

  /**
   * method setClaveDeReferencia
   * description Actualiza la clave de referencia en el estado.
   * param {string} claveDeReferencia Clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * method setCadenaDependencia
   * description Actualiza la cadena de dependencia en el estado.
   * param {string} cadenaDependencia Cadena de dependencia.
   */
  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  /**
   * method setBanco
   * description Actualiza el banco en el estado.
   * param {string} banco Banco relacionado con el trámite.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * method setllaveDePago
   * description Actualiza la llave de pago en el estado.
   * param {string} llaveDePago Llave de pago.
   */
  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * method setFechaPago
   * description Actualiza la fecha de pago en el estado.
   * param {string} fechaPago Fecha de pago.
   */
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }

  /**
   * method setImportePago
   * description Actualiza el importe de pago en el estado.
   * param {string} importePago Importe de pago.
   */
  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago,
    }));
  }

  /**
   * method setNumeroExpediente
   * description Actualiza el número de expediente en el estado.
   * param {string} numeroExpediente Número de expediente.
   */
  public setNumeroExpediente(numeroExpediente: string): void {
    this.update((state) => ({
      ...state,
      numeroExpediente,
    }));
  }

  /**
   * method setTipoOperacion
   * description Actualiza el tipo de operación en el estado.
   * param {string} tipoOperacion Tipo de operación.
   */
  public setTipoOperacion(tipoOperacion: string): void {
    this.update((state) => ({
      ...state,
      tipoOperacion,
    }));
  }

  /**
   * method setFinalidad
   * description Actualiza la finalidad en el estado.
   * param {string} finalidad Finalidad del trámite.
   */
  public setFinalidad(finalidad: string): void {
    this.update((state) => ({
      ...state,
      finalidad,
    }));
  }

  /**
   * method setIsExento
   * description Actualiza el valor de isExento en el estado.
   * param {boolean} isExento Indica si el trámite está exento.
   */
  public setIsExento(isExento: boolean): void {
    this.update((state) => ({
      ...state,
      isExento,
    }));
  }

  /**
   * method setIsAutorizacion
   * description Actualiza el valor de isAutorizacion en el estado.
   * param {boolean} isAutorizacion Indica si el trámite tiene autorización.
   */
  public setIsAutorizacion(isAutorizacion: boolean): void {
    this.update((state) => ({
      ...state,
      isAutorizacion,
    }));
  }

  /**
   * method setNumAutorizacion1
   * description Actualiza el valor de numAutorizacion1 en el estado.
   * param {string} numAutorizacion1 Número de autorización 1.
   */
  public setNumAutorizacion1(numAutorizacion1: string): void {
    this.update((state) => ({
      ...state,
      numAutorizacion1,
    }));
  }

  /**
   * method setNumAutorizacion2
   * description Actualiza el valor de numAutorizacion2 en el estado.
   * param {string} numAutorizacion2 Número de autorización 2.
   */
  public setNumAutorizacion2(numAutorizacion2: string): void {
    this.update((state) => ({
      ...state,
      numAutorizacion2,
    }));
  }

  /**
   * method setNumAutorizacion3
   * description Actualiza el valor de numAutorizacion3 en el estado.
   * param {string} numAutorizacion3 Número de autorización 3.
   */
  public setNumAutorizacion3(numAutorizacion3: string): void {
    this.update((state) => ({
      ...state,
      numAutorizacion3,
    }));
  }
}