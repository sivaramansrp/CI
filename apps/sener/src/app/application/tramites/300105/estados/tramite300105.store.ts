import { Store, StoreConfig } from '@datorama/akita';
import { ConfiguracionItem } from '../enum/mercancia-tabla.enum';
import { DestinatarioConfiguracionItem } from '../enum/destinatario-tabla.enum';
import { Injectable } from '@angular/core';

/**
 * interface Tramite300105State
 * description Define la estructura del estado para el trámite 300105.
 */
export interface Tramite300105State {
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
   * Actualiza el estado con los nuevos datos proporcionados.
   * Utiliza el método update del store para modificar el estado actual.
   */
  public establecerDatos(datos: Partial<Tramite300105State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
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
}