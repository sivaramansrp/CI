import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 230301.
 */
export interface Solicitud230301State {
  /**
   * Folio de desistimiento del trámite.
   */
  desistimientoFolio: string;

  /**
   * Tipo de solicitud del trámite.
   */
  solicitudTipo: string;

  /**
   * Motivo de desistimiento del trámite.
   */
  desistimientoMotivo: string;
}

/**
 * Crea el estado inicial para la interfaz de trámite 230301.
 * @returns {Solicitud230301State} Estado inicial del trámite 230301.
 */
export function createInitialSolicitudState(): Solicitud230301State {
  return {
    desistimientoFolio: '',
    solicitudTipo: '',
    desistimientoMotivo: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud230301', resettable: true })
export class Solicitud230301Store extends Store<Solicitud230301State> {
  /**
   * Constructor de la clase `Solicitud230301Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialSolicitudState());
  }

  /**
   * Actualiza el motivo de desistimiento en el estado.
   * @param {string} desistimientoMotivo - Nuevo valor para el motivo de desistimiento.
   */
  public setDesistimientoMotivo(desistimientoMotivo: string): void {
    this.update((state) => ({
      ...state,
      desistimientoMotivo,
    }));
  }

  /**
   * Actualiza el folio de desistimiento en el estado.
   * @param {string} desistimientoFolio - Nuevo valor para el folio de desistimiento.
   */
  public setDesistimientoFolio(desistimientoFolio: string): void {
    this.update((state) => ({
      ...state,
      desistimientoFolio,
    }));
  }

  /**
   * Actualiza el tipo de solicitud en el estado.
   * @param {string} solicitudTipo - Nuevo valor para el tipo de solicitud.
   */
  public setSolicitudTipo(solicitudTipo: string): void {
    this.update((state) => ({
      ...state,
      solicitudTipo,
    }));
  }
}