import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

/**
 * Representa el estado de la aplicación para el trámite 260515.
 */
export interface Tramite260515State {
    /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number;
}

export function createInitialState(): Tramite260515State {
  return {
    idSolicitud: 0
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260515', resettable: true })
export class Tramite260515Store extends Store<Tramite260515State> {
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
