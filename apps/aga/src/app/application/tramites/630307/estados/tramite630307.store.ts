/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 630307.
 * Contiene las propiedades necesarias para gestionar el estado del trámite.
 */
export interface Tramite630307State {
  /**
   * Clave de la aduana.
   */
  cveAduana: string;

  /**
   * Clave de la sección aduanal.
   */
  cveSeccionAduanal: string;

  /**
   * Fecha límite de retorno.
   */
  fechaLimiteRetorno: string;

  /**
   * Indica si se cuenta con prórroga.
   */
  cuentaProrroga: string;

  /**
   * Folio de información general de la prórroga.
   */
  folioInformacionGeneralProrroga: string;

  /**
   * Fecha de inicio de la prórroga.
   */
  fechaInicioProrroga: string;

  /**
   * Fecha de vencimiento de la prórroga.
   */
  fechaVencimientoProrroga: string;

  /**
   * Folio de información general de la autorización.
   */
  folioInformacionGeneralAutorizacion: string;

  /**
   * Aduana de ingreso.
   */
  aduanaIngreso: string;

  /**
   * Sección aduanera.
   */
  seccionAduanera: string;

  /**
   * Fecha de ingreso.
   */
  fechaIngreso: string;

  /**
   * Fecha de vencimiento.
   */
  fechaVencimiento: string;

   /** Marca de la mercancía. */
   marca: string;

   /** Modelo de la mercancía. */
   modelo: string;
 
   /** Número de serie de la mercancía. */
   numeroDeSerie: string;
 
   /** Número de motor de la mercancía. */
   numeroDeMotor: string;

  /**
   * Descripción de la mercancía.
   */
  descripcionMercancia: string;

  /**
   * Motivo relacionado con el trámite.
   */
  motivo: string;

 /**
   * Indica si se ha realizado la declaración.
   */
  declaracion:boolean;

  [key: string]: unknown; // Permite propiedades adicionales
}

/**
 * Función que crea el estado inicial del trámite 630307.
 * 
 * @returns Estado inicial del trámite 630307.
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
    declaracion:false,
  };
}

/**
 * Clase que representa el store del trámite 630307.
 * Extiende la clase `Store` de Akita para gestionar el estado del trámite.
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
   * Actualiza el estado del trámite 630307 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
  setTramite630307State(valores: Partial<Tramite630307State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }
}