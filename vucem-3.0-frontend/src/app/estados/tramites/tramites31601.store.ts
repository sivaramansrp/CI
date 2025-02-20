import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 31601
 * @returns DatosPorRegimen31601
 */
export interface DatosPorRegimen31601State {
    comboBimestresOne: string;
    comboBimestresTwo: string;
    comboBimestresThree: string;
}

export function createInitialState(): DatosPorRegimen31601State {
  return {
    comboBimestresOne: null,
    comboBimestresTwo: null,
    comboBimestresThree: null
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31601', resettable: true })
export class Tramite31601Store extends Store<DatosPorRegimen31601State> {
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
