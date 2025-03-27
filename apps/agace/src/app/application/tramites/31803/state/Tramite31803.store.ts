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
 * Estado inicial para la interfaz del trámite 31803.
 */
export interface Solicitud31803State {
  
}
/**
 * Crea el estado inicial para la solicitud del trámite 31803.
 * @returns Estado inicial de tipo `Solicitud31803State`.
 */
export function createInitialState(): Solicitud31803State {
  return {
   
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31803', resettable: true })
export class Tramite31803Store extends Store<Solicitud31803State> {
  constructor() {
    super(createInitialState());
  }
  
  public limpiarSolicitud() {
    this.reset();
  }
}
