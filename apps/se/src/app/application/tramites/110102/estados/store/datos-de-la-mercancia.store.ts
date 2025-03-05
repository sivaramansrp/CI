import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DatosDeLaMercanciaState{
    cveRegistroProductor:string
}

export function createInitialState(): DatosDeLaMercanciaState {
    return {
        cveRegistroProductor:''
    }
}

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'datosdelamercancia', resettable: true })
  export class DatosDeLaMercanciaStore extends Store<DatosDeLaMercanciaState> {
    constructor() {
      super(createInitialState());
    }


public setCveRegistroProductor(cveRegistroProductor: string):void {
    this.update((state) => ({
      ...state,
      cveRegistroProductor,
    }));
  }
}