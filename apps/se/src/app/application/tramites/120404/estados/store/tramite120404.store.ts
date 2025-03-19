import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite120404State{
    asignacionRadio:boolean,
    asignacionsolitud:string,
    numTramite:string
}

export function createInitialState(): Tramite120404State {
    return {
        asignacionRadio: false,
        asignacionsolitud: '',
        numTramite: ''
    }
}

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite120404', resettable: true })
  export class Tramite120404Store extends Store<Tramite120404State> {
    constructor() {
      super(createInitialState());
    }


  public setAsignacionRadio(asignacionRadio: boolean):void {
    this.update((state) => ({
      ...state,
      asignacionRadio,
    }));
  }

  public setAsignacionsolitud(asignacionsolitud: string):void {
    this.update((state) => ({
      ...state,
      asignacionsolitud,
    }));
  }

  public setNumTramite(numTramite: string):void {
    this.update((state) => ({
      ...state,
      numTramite,
    }));
  }
}