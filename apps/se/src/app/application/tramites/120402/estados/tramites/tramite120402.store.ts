import { Injectable } from '@angular/core';
 
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';


export interface Tramite120402State {
  entidad: Catalogo | null;
  representacion: Catalogo | null;
  regimen: Catalogo | null;
  tratado: Catalogo | null;
  producto: Catalogo | null;
  subproducto: Catalogo | null;
  cantidadSolicitada: string;
}



export function createInitialState(): Tramite120402State {
  return {
    entidad: null,
    representacion: null,
    regimen: null,
    tratado: null,
    producto: null,
    subproducto: null,
    cantidadSolicitada: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120402', resettable: true })
export class Tramite120402Store extends Store<Tramite120402State> {
  constructor() {
    super(createInitialState());
  }
 
  public setEntidad(entidad: Catalogo) {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  public setRepresentacion(representacion: Catalogo) {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  public setRegimen(regimen: Catalogo) {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setTratado(tratado: Catalogo) {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  public setProducto(producto: Catalogo) {
    this.update((state) => ({
      ...state,
      producto,
    }));
  }

  public setSubproducto(subproducto: Catalogo) {
    this.update((state) => ({
      ...state,
      subproducto,
    }));
  }

  public setCantidadSolicitada(cantidadSolicitada: string) {
    this.update((state) => ({
      ...state,
      cantidadSolicitada,
    }));
  }
}
