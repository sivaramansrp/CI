/**
 * @module CambioModalidadStore
 * @description
 * Este servicio administra el estado de `CambioModalidadState` utilizando Akita.
 */
import { ServicioInfo, ServicioInmex } from '../modelos/cambio-de-modalidad.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface CambioModalidadState
 * @description
 * Representa el estado de la modalidad de cambio.
 *
 * @property {CambioDeModalidadForm} cambioDeModalidad - Datos del formulario de cambio de modalidad.
 * @property {string} cambioModalidad - Modalidad de cambio seleccionada.
 * @property {string} serviciosImmx - Servicios IMMEX asociados.
 */
export interface CambioModalidadState {
  seleccionaLaModalidad: string;
  folio: number;
  ano: number;
  seleccionaModalidad: string;
  cambioModalidad: string;
  serviciosImmx: string;
  rfcEmpresa: string;
  numeroPrograma: string;
  tiempoPrograma: string;
  datos: ServicioInmex[];
  ServiciosDatos: ServicioInfo[]
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {CambioModalidadState} Estado inicial.
 */
export function createInitialState(): CambioModalidadState {
  return {

    seleccionaLaModalidad: '',
    folio: 0,
    ano: 0,
    seleccionaModalidad: '',
    cambioModalidad: '-1',
    serviciosImmx: '-1',
    rfcEmpresa: '',
    numeroPrograma: '',
    tiempoPrograma: '',
    datos: [],
    ServiciosDatos: []

  };
}

/**
 * @class CambioModalidadStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class CambioModalidadStore extends Store<CambioModalidadState> {
  /**
   * @constructor
   * @description
   * Constructor que inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
* Actualiza el estado del store con los valores proporcionados.
* @param {Partial<CambioModalidadState>} valores - Valores parciales del estado a actualizar.
* @method actualizarEstado
* @description
* Actualiza el estado del store con los valores proporcionados.
* Utiliza el método `update` de Akita para fusionar los nuevos valores con el estado actual.
* @param {Partial<CambioModalidadState>} valores - Valores parciales del estado a actualizar.
* @returns {void}
* */

  public actualizarEstado(valores: Partial<CambioModalidadState>): void {
    this.update((state) => {
      const NEW_STATE = {
        ...state,
        ...valores,
      };
      return NEW_STATE;
    });
  }

}