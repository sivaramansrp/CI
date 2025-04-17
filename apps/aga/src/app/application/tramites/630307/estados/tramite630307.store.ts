import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creación del estado inicial para la interfaz de trámite.
 * Define las propiedades necesarias para gestionar el estado del trámite 630307.
 */
export interface Tramite630307State {
  /** Clave de la aduana seleccionada. */
  cveAduana: string;

  /** Clave de la sección aduanal seleccionada. */
  cveSeccionAduanal: string;

  /** Fecha límite para el retorno de la mercancía. */
  fechaLimiteRetorno: string;

  /** Indica si cuenta con prórroga. */
  cuentaProrroga: string;

  /** Folio de información general de la prórroga. */
  folioInformacionGeneralProrroga: string;

  /** Fecha de inicio de la prórroga. */
  fechaInicioProrroga: string;

  /** Fecha de vencimiento de la prórroga. */
  fechaVencimientoProrroga: string;

  /** Folio de información general de la autorización. */
  folioInformacionGeneralAutorizacion: string;

  /** Aduana de ingreso seleccionada. */
  aduanaIngreso: string;

  /** Sección aduanera seleccionada. */
  seccionAduanera: string;

  /** Fecha de ingreso de la mercancía. */
  fechaIngreso: string;

  /** Fecha de vencimiento de la mercancía. */
  fechaVencimiento: string;

  /** Marca de la mercancía. */
  marca: string;

  /** Modelo de la mercancía. */
  modelo: string;

  /** Número de serie de la mercancía. */
  numeroDeSerie: string;

  /** Número de motor de la mercancía. */
  numeroDeMotor: string;

  /** Descripción de la mercancía. */
  descripcionMercancia: string;

  /** Motivo relacionado con la mercancía. */
  motivo: string;

  /** Declaración del manifiesto. */
  declaracion: boolean;
}

/**
 * Crea el estado inicial para el trámite 630307.
 * 
 * @returns Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite630307State {
  return {
    cveAduana: '',
    cveSeccionAduanal: '',
    fechaLimiteRetorno: '',
    cuentaProrroga: '',
    folioInformacionGeneralProrroga: '',
    fechaInicioProrroga: '',
    fechaVencimientoProrroga: '',
    folioInformacionGeneralAutorizacion: '',
    aduanaIngreso: '',
    seccionAduanera: '',
    fechaIngreso: '',
    fechaVencimiento: '',
    marca: '',
    modelo: '',
    numeroDeSerie: '',
    numeroDeMotor: '',
    descripcionMercancia: '',
    motivo: '',
    declaracion: false,
  };
}

/**
 * Servicio que implementa el store para gestionar el estado del trámite 630307.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630307', resettable: true })
export class Tramite630307Store extends Store<Tramite630307State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del trámite con los valores proporcionados.
   * 
   * @param values Valores parciales para actualizar el estado.
   */
  setTramite630307State(values: Partial<Tramite630307State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}