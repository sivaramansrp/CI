import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TableData } from '../../models/aviso-siglos.models';

export interface DatosSolicitud270201State {
  ObraDeArte: TableData[];
}

export function createInitialState(): DatosSolicitud270201State {
  return {
    ObraDeArte: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite270201', resettable: true })
export class Tramite270201Store extends Store<DatosSolicitud270201State> {
  constructor() {
    super(createInitialState());
  }

  public setObraDeArte(obraDeArte: TableData[]): void {
    this.update((state) => ({
      ...state,
      ObraDeArte: obraDeArte,
    }));
  }
}
