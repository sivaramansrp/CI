/**
 * Este es el store 110209
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Mercancias } from '../../constantes/certificado-sgp.enum';

/**
 * Interfaz que define el estado del trámite 110209.
 */
export interface Tramite110209State {
  medioDeTransporte: string;
  rutaCompleta: string;
  puertoDeEmbarque: string;
  puertoDeDesembarque: string;
  observaciones: string;
  mercanciasSeleccionadas: Mercancias;
}

/**
 * Función que crea el estado inicial del trámite 110209.
 * @returns {Tramite110209State} - El estado inicial del trámite 110209.
 */
export function createInitialState(): Tramite110209State {
  return {
    medioDeTransporte: '',
    rutaCompleta: '',
    puertoDeEmbarque: '',
    puertoDeDesembarque: '',
    observaciones: '',
    mercanciasSeleccionadas: {
      numeroDeOrden: '',
      fraccionArancelaria: '',
      nombreTecnico: '',
      nombreComercial: '',
      nombreIngles: '',
      numeroDeRegistro: ''
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110209', resettable: true })
/**
 * Clase que representa el store del trámite 110209.
 */
export class Tramite110209Store extends Store<Tramite110209State> {
  /**
   * Constructor del store.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el medio de transporte en el estado.
   * @param {string} medioDeTransporte - El medio de transporte.
   */
  public setMedioDeTransporte(medioDeTransporte: string): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

  /**
   * Establece la ruta completa en el estado.
   * @param {string} rutaCompleta - La ruta completa.
   */
  public setRutaCompleta(rutaCompleta: string): void {
    this.update((state) => ({
      ...state,
      rutaCompleta,
    }));
  }

  /**
   * Establece el puerto de embarque en el estado.
   * @param {string} puertoDeEmbarque - El puerto de embarque.
   */
  public setPuertoDeEmbarque(puertoDeEmbarque: string): void {
    this.update((state) => ({
      ...state,
      puertoDeEmbarque,
    }));
  }

  /**
   * Establece el puerto de desembarque en el estado.
   * @param {string} puertoDeDesembarque - El puerto de desembarque.
   */
  public setPuertoDeDesembarque(puertoDeDesembarque: string): void {
    this.update((state) => ({
      ...state,
      puertoDeDesembarque,
    }));
  }

  /**
   * Establece las observaciones en el estado.
   * @param {string} observaciones - Las observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * Establece las mercancías seleccionadas en el estado.
   * @param {Mercancias} mercanciasSeleccionadas - Las mercancías seleccionadas.
   */
  public setMercanciasSeleccionadas(mercanciasSeleccionadas: Mercancias): void {
    this.update((state) => ({
      ...state,
      mercanciasSeleccionadas,
    }));
  }
}