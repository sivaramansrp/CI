import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';


export interface Solicitud32501State {
 
}


export function createInitialSolicitudState(): Solicitud32501State {
  return {
  
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud32501', resettable: true })
export class Solicitud32501Store extends Store<Solicitud32501State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  resetStore(): void {
    this.reset();
  }
}
