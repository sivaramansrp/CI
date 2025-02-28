import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 31601
 * @returns DatosPorRegimen31601
 */
export interface DatosPorRegimenAgaceState {
    comboBimestresOne: string | null;
    comboBimestresTwo: string | null;
    comboBimestresThree: string | null;
}

export function createInitialState(): DatosPorRegimenAgaceState {
  return {
    comboBimestresOne: null,
    comboBimestresTwo: null,
    comboBimestresThree: null
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramiteAgace', resettable: true })
export class TramiteAgaceStore extends Store<DatosPorRegimenAgaceState> {
  constructor() {
    super(createInitialState());
  }

  public setComboBimestresOne(comboBimestresOne: string) {
    this.update((state) => ({
      ...state,
      comboBimestresOne,
    }));
  }

  public setComboBimestresTwo(comboBimestresTwo: string) {
    this.update((state) => ({
      ...state,
      comboBimestresTwo,
    }));
  }

  public setComboBimestresThree(comboBimestresThree: string) {
    this.update((state) => ({
      ...state,
      comboBimestresThree,
    }));
  }

 
}
