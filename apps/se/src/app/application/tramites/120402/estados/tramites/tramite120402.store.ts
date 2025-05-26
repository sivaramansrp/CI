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
  cupoSeleccionado: unknown | null; 
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
    cupoSeleccionado: null,
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
 
  public setEntidad(entidad: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  public setRepresentacion(representacion: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  public setRegimen(regimen: Catalogo): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setTratado(tratado: Catalogo): void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  public setProducto(producto: Catalogo): void {
    this.update((state) => ({
      ...state,
      producto,
    }));
  }

  public setSubproducto(subproducto: Catalogo): void {
    this.update((state) => ({
      ...state,
      subproducto,
    }));
  }

  public setCantidadSolicitada(cantidadSolicitada: string):void {
    this.update((state) => ({
      ...state,
      cantidadSolicitada,
    }));
  }
  public setCupoSeleccionado(cupoSeleccionado: unknown): void {
    this.update((state) => ({
      ...state,
      cupoSeleccionado,
    }));
  }
}
