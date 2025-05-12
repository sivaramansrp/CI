import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Tramites120601State
 */
export interface Tramites120601State {
  datosGeneralesSocios: {
    nacionalidad: string;
    persona: string;
    cadenaDependencia: string;
  },
  datosDeLaSolicitud: {
    tipoDeEmpresa: string;
  },
  representacionFederal: {
    estado: string;
    representacion: string;
  }
}

export function createInitialState(): Tramites120601State {
  return {
    datosGeneralesSocios: {
      nacionalidad: 'No',
      persona: 'No',
      cadenaDependencia: ''
    },
    datosDeLaSolicitud: {
      tipoDeEmpresa: ''
    },
    representacionFederal: {
      estado: '',
      representacion: '',
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites120601', resettable: true })
export class Tramite120601Store extends Store<Tramites120601State> {
  constructor() {
    super(createInitialState());
  }

  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        cadenaDependencia,
      }
    }));
  }

  public setNacionalidad(nacionalidad: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        nacionalidad,
      }
    }));
  }

  public setPersona(persona: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        persona,
      }
    }));
  }

  public setTipoDeEmpresa(tipoDeEmpresa: string) {
    this.update((state) => ({
      ...state,
      datosDeLaSolicitud: {
        ...state.datosDeLaSolicitud,
        tipoDeEmpresa,
      }
    }));
  }

  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      representacionFederal: {
        ...state.representacionFederal,
        estado
      }
    }));
  }

  public setRepresentacion(representacion: string) {
    this.update((state)=> ({
      ...state,
      representacionFederal: {
        ...state.representacionFederal,
        representacion
      }
    }))
  }

}
