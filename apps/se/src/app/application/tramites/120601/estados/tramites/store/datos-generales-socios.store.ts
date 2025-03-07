import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RepresentacionFederaState
 */
export interface DatosGeneralesSociosState {
    nacionalidad: string;
    persona: string;
    cadenaDependencia: string;
}

export function createInitialState(): DatosGeneralesSociosState {
  return {
    nacionalidad: 'No',
    persona: 'No',
    cadenaDependencia: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'datosgeneralessocios', resettable: true })
export class DatosGeneralesSociosStore extends Store<DatosGeneralesSociosState> {
  constructor() {
    super(createInitialState());
  }

  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDependencia,
    }));
  }

  public setNacionalidad(nacionalidad: string) {
    this.update((state) => ({
      ...state,
      nacionalidad,
    }));
  }

  public setPersona(persona: string) {
    this.update((state) => ({
      ...state,
      persona,
    }));
  }

}
