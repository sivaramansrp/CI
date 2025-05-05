import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Estado inicial para la interfaz del trámite 90303.
 */
export interface Solicitud90303State {
  estatus: string;
}
/**
 * Crea el estado inicial para la solicitud del trámite 90303.
 * @returns Estado inicial de tipo `Solicitud90303State`.
 */
export function createInitialState(): Solicitud90303State {
  return {
    estatus:'',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite90303', resettable: true })
export class Tramite90303Store extends Store<Solicitud90303State> {
  constructor() {
    super(createInitialState());
  }
  
  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
