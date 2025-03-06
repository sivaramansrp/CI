import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface representing the form structure.
 */
export interface DatosAdicionalesForm {
  entidad: string;
  representacion: string;
}

/**
 * Interface representing the state for DatosAdicionales.
 */
export interface DatosAdicionalesState {
  formValues: DatosAdicionalesForm | null;
}

/**
 * Function to create the initial state.
 */
export function createInitialState(): DatosAdicionalesState {
  return {
    formValues: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosAdicionales' })
export class DatosAdicionalesStore extends Store<DatosAdicionalesState> {
  constructor() {
    super(createInitialState());
  }
}
