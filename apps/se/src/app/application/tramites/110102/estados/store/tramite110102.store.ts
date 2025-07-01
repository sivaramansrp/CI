/**
 * @fileoverview
 * Este archivo define el store de estado para el trámite 110102 usando Akita.
 * Proporciona la interfaz de estado, el estado inicial y el store con métodos para actualizar el estado.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado del trámite 110102.
 * @interface
 */
export interface Tramite110102State {
  /** Clave de registro del productor */
  cveRegistroProductor: string;
  /** Clave de la unidad administrativa */
  claveUnidadAdministrativa: string;
  /** Clave de la entidad federativa de la solicitud */
  claveEntidadFederativa: string;
  /** Indica si se protesta decir verdad */
  protestoDecirVerdad: boolean;
  /** Indica si se solicita separación contable */
  solicitaSeparacionContable: boolean;
  /** Indica si se solicita exportador autorizado */
  solicitaExportadorAutorizado: boolean;
  /** Condición del exportador */
  condicionExportador: string;
  /** Indica si se solicita exportador autorizado para Japón */
  solicitaExportadorAutorizadoJPN: boolean;
  /** Condición del exportador para Japón */
  condicionExportadorJPN: string;
}

/**
 * Función que retorna el estado inicial del trámite 110102.
 * @returns {Tramite110102State} Estado inicial
 */
export function createInitialState(): Tramite110102State {
  return {
    cveRegistroProductor: '',
    claveEntidadFederativa: '',
    claveUnidadAdministrativa: '',
    protestoDecirVerdad: false,
    solicitaSeparacionContable: false,
    solicitaExportadorAutorizado: false,
    condicionExportador: '',
    solicitaExportadorAutorizadoJPN: false,
    condicionExportadorJPN: ''
  };
}

/**
 * Store de Akita para el trámite 110102.
 * Permite gestionar y actualizar el estado de la información del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110102', resettable: true })
export class Tramite110102Store extends Store<Tramite110102State> {
  /**
   * Constructor que inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los datos proporcionados.
   * @param {Partial<Tramite110102State>} datos - Datos parciales para actualizar el estado.
   */
  public establecerDatos(datos: Partial<Tramite110102State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }
}