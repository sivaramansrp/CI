import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

/**
 * Representa el estado de la aplicación para el trámite 260512.
 */
export interface Tramite260512State {
    /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number;
}

export function createInitialState(): Tramite260512State {
  return {
    idSolicitud: 0
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260512', resettable: true })
export class Tramite260512Store extends Store<Tramite260512State> {
  constructor() {
    super(createInitialState());
  }
   /**
   * Actualiza el estado con el nuevo valor de `idSolicitud`.
   */
  setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }
}
