/* eslint-disable @typescript-eslint/naming-convention */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface solicitud260604State {
    nombre:string;
    apellidoPrimer:string;
    apellidoSegundo:string;
    denominacionRazonSocial:string;
    estadoLocalidad:string;
    codPostal1:string;
    coloniaEquiv:string;
    calle:string;
    numExterior:string;
    numInterior:string;
    lada:string;
    telefono:string;
    correoElectronico:string;
    selectPais:string;
    tipoPersona:string;

}

export function createInitialState(): solicitud260604State {
    return {
        nombre:'',
        apellidoPrimer:'',
        apellidoSegundo:'',
        denominacionRazonSocial:'',
        estadoLocalidad:'',
        codPostal1:'',
        coloniaEquiv:'',
        calle:'',
        numExterior:'',
        numInterior:'',
        lada:'',
        telefono:'',
        correoElectronico:'',
        selectPais:'',
        tipoPersona:''
    }

}

@Injectable({
    providedIn: 'root'
  })
  @StoreConfig({ name: 'tramites260604store', resettable: true })
  export class Tramites260604Store extends Store<solicitud260604State> {
    constructor() {
      super(createInitialState());
    }

    public setnombre(nombre: string) {
        this.update((state) => ({
          ...state,
          nombre,
        }));
      }

      public setapellidoPrimer(apellidoPrimer: string) {
        this.update((state) => ({
          ...state,
          apellidoPrimer,
        }));
      }

      public setapellidoSegundo(apellidoSegundo: string) {
        this.update((state) => ({
          ...state,
          apellidoSegundo,
        }));
      }

      public setdenominacionRazonSocial(denominacionRazonSocial: string) {
        this.update((state) => ({
          ...state,
          denominacionRazonSocial,
        }));
      }

      public setestadoLocalidad(estadoLocalidad: string) {
        this.update((state) => ({
          ...state,
          estadoLocalidad,
        }));
      }

      public setcodPostal1(codPostal1: string) {
        this.update((state) => ({
          ...state,
          codPostal1,
        }));

      }

      public setcoloniaEquiv(coloniaEquiv: string) {
        this.update((state) => ({
          ...state,
          coloniaEquiv,
        }));
      }

      public setcalle(calle: string) {
        this.update((state) => ({
          ...state,
          calle,
        }));
}

public setnumExterior(numExterior: string) {
    this.update((state) => ({
      ...state,
      numExterior,
    }));
}

public setnumInterior(numInterior: string) {
    this.update((state) => ({
      ...state,
      numInterior,
    }));
}

public setlada(lada: string) {
    this.update((state) => ({
      ...state,
      lada,
    }));
}

public settelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
}

public setcorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
}

public setselectPais(selectPais: string) {
  this.update((state) => ({
    ...state,
    selectPais,
  }));
}

public settipoPersona(tipoPersona: string) {
  this.update((state) => ({
    ...state,
    tipoPersona,
  }));
}
  }