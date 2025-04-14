import { Injectable } from "@angular/core";
import { Store } from "@datorama/akita";
import { StoreConfig } from "@datorama/akita";


export interface Tramite130401State {
  pasoActivo: number;
  pestanaActiva: number;
}
export function createInitialState(): Tramite130401State {
  return {
    pasoActivo: 1,
    pestanaActiva: 1,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130401', resettable: true })
export class Tramite130401Store extends Store<Tramite130401State> {

  constructor() {
    super(createInitialState());
  }
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }

}