
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite110209State{
    medioDeTransporte: string;
    rutaCompleta: string,
    puertoDeEmbarque: string,
    puertoDeDesembarque: string,
    observaciones: string

}

export function createInitialState(): Tramite110209State {
    return {
        medioDeTransporte: '',
        rutaCompleta: '',
        puertoDeEmbarque: '',
        puertoDeDesembarque: '',
        observaciones: ''
    }
}

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite110209', resettable: true })
  export class Tramite110209Store extends Store<Tramite110209State> {
    constructor() {
      super(createInitialState());
    }


public setMedioDeTransporte(medioDeTransporte: string):void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

    public setRutaCompleta(rutaCompleta: string):void {
        this.update((state) => ({
        ...state,
        rutaCompleta,
        }));
    }

    public setPuertoDeEmbarque(puertoDeEmbarque: string):void {
        this.update((state) => ({
        ...state,
        puertoDeEmbarque,
        }));
    }

    public setPuertoDeDesembarque(puertoDeDesembarque: string):void {
        this.update((state) => ({
        ...state,
        puertoDeDesembarque,
        }));
    }

    public setObservaciones(observaciones: string):void {
        this.update((state) => ({
        ...state,
        observaciones,
        }));
    }

}