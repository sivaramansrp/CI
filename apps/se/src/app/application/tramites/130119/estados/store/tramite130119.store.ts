import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite130119State {
  regimen: string;
  clasificacionDeRegimen: string;
}

export function createInitialState(): Tramite130119State {
  return {
    regimen: '',
    clasificacionDeRegimen: ''
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130119', resettable: true })
export class Tramite130119Store extends Store<Tramite130119State> {
  constructor() {
    super(createInitialState());
  }
  public setRegimen(regimen: string): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setClasificacionDeRegimen(clasificacionDeRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasificacionDeRegimen,
    }));
  }

}