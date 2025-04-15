import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 630303.
 * Contiene las propiedades necesarias para gestionar el estado del trámite.
 */
export interface Tramite630303State {
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

  /**
   * Descripción de la mercancía.
   */
  descripcionMercancia: string;

  /**
   * Motivo relacionado con el trámite.
   */
  motivo: string;

  /**
   * Lista de mercancías asociadas.
   */
  listaMercancia: string;
}

/**
 * Función que crea el estado inicial del trámite 630303.
 * 
 * @returns Estado inicial del trámite 630303.
 */
export function createInitialState(): Tramite630303State {
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
    descripcionMercancia: '',
    motivo: '',
    listaMercancia: ''
  };
}

/**
 * Clase que representa el store del trámite 630303.
 * Extiende la clase `Store` de Akita para gestionar el estado del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630303', resettable: true })
export class Tramite630303Store extends Store<Tramite630303State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
  setTramite630303State(valores: Partial<Tramite630303State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }
}