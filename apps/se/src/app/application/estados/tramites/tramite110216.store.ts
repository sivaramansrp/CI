
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Tramite110216State {
  observaciones: string;
  idioma: Catalogo | null;
  entidadFederativa: Catalogo | null;
  representacionFederal: Catalogo | null;
}

export function createInitialState(): Tramite110216State {
  return {
    observaciones: '',
    idioma: null,
    entidadFederativa: null,
    representacionFederal: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite5701', resettable: true })
export class Tramite110216Store extends Store<Tramite110216State> {
  constructor() {
    super(createInitialState());
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  public setIdioma(idioma: Catalogo): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  public setEntidadFederativa(entidadFederativa: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setRepresentacionFederal(representacionFederal: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

}
