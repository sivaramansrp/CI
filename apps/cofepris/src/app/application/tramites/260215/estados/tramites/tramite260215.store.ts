import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 260215
 * @returns Solicitud260215
 */
export interface Solicitud260215State {
  /**
   * linea
   * @type {string}
   */
  linea: string;
}

export function createInitialState(): Solicitud260215State {
  return {
    /**
     * linea
     * @type {string}
     */
    linea: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260215', resettable: true })
export class Tramite260215Store extends Store<Solicitud260215State> {
  /**
   * Crea una instancia de Tramite260215Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda la línea en el estado.
   * @param linea
   */
  public setLinea(linea: string) {
    this.update((state) => ({
      ...state,
      linea,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
