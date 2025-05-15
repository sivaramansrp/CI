import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * @interface Tramite420102State
 * @description Interfaz que define el estado del trámite 420102.
 *
 * @property {string} rfc - Registro Federal de Contribuyentes asociado al trámite.
 * @property {string} fechaInicial - Fecha inicial del trámite.
 * @property {string} fechaFinal - Fecha final del trámite.
 */
export interface Tramite420102State {
  rfc: string;
  fechaInicial: string;
  fechaFinal: string;
}

/**
 * @function createTramiteState
 * @description Función que crea el estado inicial del trámite 420102.
 *
 * @returns {Tramite420102State} El estado inicial del trámite.
 */
export function createTramiteState(): Tramite420102State {
  return {
    rfc: '',
    fechaInicial: '',
    fechaFinal: '',
  };
}

/**
 * @class Tramite420102Store
 * @description Clase que representa el store para manejar el estado del trámite 420102.
 * Utiliza Akita para la gestión reactiva del estado.
 *
 * @example
 * ```typescript
 * constructor(private tramite420102Store: Tramite420102Store) {}
 *
 * this.tramite420102Store.establecerRfc('ABC123456789');
 * this.tramite420102Store.establecerFechaInicial('2025-01-01');
 * this.tramite420102Store.establecerFechaFinal('2025-12-31');
 * ```
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite420102', resettable: true })
export class Tramite420102Store extends Store<Tramite420102State> {
  /**
   * @constructor
   * @description Constructor que inicializa el store con el estado inicial.
   */
  constructor() {
    super(createTramiteState());
  }

  /**
   * @method establecerRfc
   * @description Método para actualizar el RFC en el estado del trámite.
   *
   * @param {string} rfc - Nuevo RFC a establecer.
   * @returns {void}
   */
  public establecerRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * @method establecerFechaInicial
   * @description Método para actualizar la fecha inicial en el estado del trámite.
   *
   * @param {string} fechaInicial - Nueva fecha inicial a establecer.
   * @returns {void}
   */
  public establecerFechaInicial(fechaInicial: string): void {
    this.update((state) => ({
      ...state,
      fechaInicial,
    }));
  }

  /**
   * @method establecerFechaFinal
   * @description Método para actualizar la fecha final en el estado del trámite.
   *
   * @param {string} fechaFinal - Nueva fecha final a establecer.
   * @returns {void}
   */
  public establecerFechaFinal(fechaFinal: string): void {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }
}