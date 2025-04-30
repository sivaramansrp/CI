import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';


export interface Tramite420102State {

    rfc: string;
    fechaInicial: string;
    fechaFinal: string;
}


export function createTramiteState(): Tramite420102State {
  return {
    rfc: '',
    fechaInicial: '',
    fechaFinal: ''
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite420102', resettable: true })
export class Tramite420102Store extends Store<Tramite420102State> {

  constructor() {
    super(createTramiteState());
  }


public establecerRfc(rfc: string): void {
    this.update((state) => ({
        ...state,
        rfc,
    }));
}


public establecerFechaInicial(fechaInicial: string): void {
    this.update((state) => ({
        ...state,
        fechaInicial,
    }));
}

public establecerFechaFinal(fechaFinal: string): void {
    this.update((state) => ({
        ...state,
        fechaFinal,
    }));
}

  
}