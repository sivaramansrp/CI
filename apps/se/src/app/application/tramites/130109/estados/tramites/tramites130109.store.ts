import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface Tramite130109State {
  filaSeleccionada: null;
  cantidad : string,
  valorPartidaUSD : number,
  descripcion : string
}

export function createInitialState(): Tramite130109State {
  return {
    filaSeleccionada: null,
    cantidad: '',
    valorPartidaUSD: 0,
    descripcion: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130111' })
export class Tramite130109Store extends Store<Tramite130109State> {
  constructor() {
    super(createInitialState());
  }

  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }
  public setvalorPartidaUSD(valorPartidaUSD: number) : void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }
  public setDescripcion(descripcion: string) : void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }
  storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
