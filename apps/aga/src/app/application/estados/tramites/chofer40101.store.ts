import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface Choferesnacionales40101State {
  choferes: any[];
  choferesextranjero:any[];
}

export function createInitialState(): Choferesnacionales40101State {
  const storedData = localStorage.getItem('choferesList');
  return {
    choferes: storedData ? JSON.parse(storedData) : [], 
    choferesextranjero: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40101', resettable: true })
export class Chofer40101Store extends Store<Choferesnacionales40101State> {
  constructor() {
    super(createInitialState());
  }

  set(nacionalArray: any[]) {
    this.update((state) => ({
      ...state,
      choferes: nacionalArray,
    }));
  }

  public clearChoferes() {
    this.reset(); // Reset the store
    // localStorage.removeItem('choferesList'); 
  }
}
