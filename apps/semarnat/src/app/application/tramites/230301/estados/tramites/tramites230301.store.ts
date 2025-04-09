import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 230301.
 */
export interface Solicitud23030State {
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
export function createInitialSolicitudState(): Solicitud23030State {
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
export class Solicitud230301Store extends Store<Solicitud23030State> {
  constructor() {
    super(createInitialSolicitudState());
  }

/**
 * Actualiza el motivo de desistimiento.
 * @param {string} desistimientoMotivo - Nuevo valor para el motivo de desistimiento.
 */
public setDesistimientoMotivo(desistimientoMotivo: Solicitud23030State): void {
    this.update(() => ({
        ...desistimientoMotivo
    }));
}

}