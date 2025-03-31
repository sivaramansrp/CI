import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260402State {
  selectedEstado: catalogoResponse | null;
  setClave: catalogoResponse | null,
  setBanco:catalogoResponse|null,
  setClaveDeReferncia:string,
  setCadenaDeLaDependencia:string,
  setLlaveDePago:string,
  setFechaDePago:string,
  setImporteDePago:string
}

export function createInitialState(): Tramite260402State {
  return {
    selectedEstado: null,
    setClave: null,
    setBanco:null,
    setClaveDeReferncia:'',
    setCadenaDeLaDependencia:'',
    setLlaveDePago:'',
    setFechaDePago:'',
    setImporteDePago:''
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'estadoState', resettable: true })
export class Tramite260402Store extends Store<Tramite260402State> {
  constructor() {
    super(createInitialState());
  }

  public setSelectedEstado(selectedEstado: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  public setClave(selectedClave: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedClave,
    }));
  }


  public setBanco(setBanco: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      setBanco,
    }));
  }

  public setClaveDeReferncia(setClaveDeReferncia: string):void {
    this.update((state) => ({
      ...state,
      setClaveDeReferncia,
    }));
  }
  public setCadenaDeLaDependencia(setCadenaDeLaDependencia: string):void {
    this.update((state) => ({
      ...state,
      setCadenaDeLaDependencia,
    }));
  }

  public setLlaveDePago(setLlaveDePago: string):void {
    this.update((state) => ({
      ...state,
      setLlaveDePago,
    }));
  }
  public setFechaDePago(setFechaDePago: string):void {
    this.update((state) => ({
      ...state,
      setFechaDePago,
    }));
  }
  public setImporteDePago(setImporteDePago: string):void {
    this.update((state) => ({
      ...state,
      setImporteDePago,
    }));
  }
}
