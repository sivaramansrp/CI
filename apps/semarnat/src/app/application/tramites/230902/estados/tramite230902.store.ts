import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Solitud230902State
 */
export interface Solitud230902State {
  tipoDeMovimiento:string;
  tipoDeRegimen:string;
}

export function createInitialState(): Solitud230902State {
  return {
    tipoDeMovimiento:'',
    tipoDeRegimen:'',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230902', resettable: true })
export class Tramite230902Store extends Store<Solitud230902State> {

  constructor() {
    super(createInitialState());
  }

  public setTipoDeMovimiento(tipoDeMovimiento: string):void {
    this.update((state) => ({
      ...state,
      tipoDeMovimiento,
    }));

  }

  public setTipoDeRegimen(tipoDeRegimen: string):void {
    this.update((state) => ({
      ...state,
      tipoDeRegimen,
    }));
  }

}