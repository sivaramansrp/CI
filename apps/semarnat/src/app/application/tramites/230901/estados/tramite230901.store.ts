import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Solitud230901State
 */
export interface Solitud230901State {
  tipoDeMovimiento:string;
  tipoDeRegimen:string;
}

export function createInitialState(): Solitud230901State {
  return {
    tipoDeMovimiento:'',
    tipoDeRegimen:'',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230901', resettable: true })
export class Tramite230901Store extends Store<Solitud230901State> {

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
