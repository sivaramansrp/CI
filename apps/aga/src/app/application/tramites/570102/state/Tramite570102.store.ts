import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Estado inicial para la interfaz del trámite 31803.
 */
export interface Solicitud570102State {
 
}

/**
 * Crea el estado inicial para la solicitud del trámite 31803.
 * @returns Estado inicial de tipo `Solicitud570102State`.
 */
export function createInitialState(): Solicitud570102State {
  return {
   
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 31803.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite570102', resettable: true })
export class Tramite570102Store extends Store<Solicitud570102State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  
  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
