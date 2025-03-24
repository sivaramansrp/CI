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
 * Estado inicial para la interfaz del trámite 110219.
 */
export interface Solicitud110219State {

}
/**
 * Crea el estado inicial para la solicitud del trámite 110219.
 * @returns Estado inicial de tipo `Solicitud110219State`.
 */
export function createInitialState(): Solicitud110219State {
  return {
   
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110219', resettable: true })
export class Tramite110219Store extends Store<Solicitud110219State> {
  constructor() {
    super(createInitialState());
  }

}