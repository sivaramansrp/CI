import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado del formulario de solicitante.
 */
export interface Solicitante110101State {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

/**
 * Función para crear el estado inicial de solicitante.
 */
export function createSolicitanteInitialState(): Solicitante110101State {
  return {
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: ''
  };
}

/**
 * Store para gestionar el estado de los datos del solicitante.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitante', resettable: true })
export class Tramite110101Store extends Store<Solicitante110101State> {
  constructor() {
    super(createSolicitanteInitialState());
  }

  // Métodos para actualizar el estado de los campos del formulario
  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  public setActividadEconomica(actividadEconomica: string) {
    this.update((state) => ({
      ...state,
      actividadEconomica,
    }));
  }

  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Limpiar los datos del solicitante
   */
  public limpiarSolicitante() {
    this.reset();
  }
}
