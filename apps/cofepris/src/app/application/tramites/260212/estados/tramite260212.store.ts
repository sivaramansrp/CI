import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Catalogo, catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260212State {
  selectedEstado: catalogoResponse | null;
  setClave: catalogoResponse | null,
  setDescripcion: catalogoResponse | null,
  setDespecificarClasificacion:Catalogo |null
  setBanco:catalogoResponse|null,
  setRfcDelResponsableSanitario:string,
  setDenominacionRazonSocial:string,
  setCorreoElectronico:string,
  setMunicipio:string,
  setLocalidad:string,
  setColonia:string,
  setCaller:string,
  setLada:string,
  setTelefono:string,
  setCodigoPostal:string,
  setRegimen:catalogoResponse|null,
  setEntradas:catalogoResponse|null,
}

export function createInitialState(): Tramite260212State {
  return {
    selectedEstado: null,
    setClave: null,
    setDescripcion: null,
    setDespecificarClasificacion:null,
    setBanco:null,
    setRfcDelResponsableSanitario:'',
    setDenominacionRazonSocial:'',
    setCorreoElectronico:'',
    setMunicipio:'',
    setLocalidad:'',
    setColonia:'',
    setCaller:'',
    setLada:'',
    setTelefono:'',
    setCodigoPostal:'',
    setRegimen:null,
    setEntradas:null
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'estadoState', resettable: true })
export class Tramite260212Store extends Store<Tramite260212State> {
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

  public setDescripcion(selectedDescripcion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDescripcion,
    }));
  }

  public setDespecificarClasificacion(selectedDespecificarClasificacion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDespecificarClasificacion,
    }));
  }

  public setBanco(setBanco: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      setBanco,
    }));
  }

  public setRfcDelResponsableSanitario(setRfcDelResponsableSanitario: string):void {
    this.update((state) => ({
      ...state,
      setRfcDelResponsableSanitario,
    }));
  }

  public setDenominacionRazonSocial(setDenominacionRazonSocial: string):void {
    this.update((state) => ({
      ...state,
      setDenominacionRazonSocial,
    }));
  }

  public setCorreoElectronico(setCorreoElectronico: string):void {
    this.update((state) => ({
      ...state,
      setCorreoElectronico,
    }));
  }

  public setMunicipio(setMunicipio: string):void {
    this.update((state) => ({
      ...state,
      setMunicipio,
    }));
  }

  public setLocalidad(setLocalidad: string):void {
    this.update((state) => ({
      ...state,
      setLocalidad,
    }));
  }

  public setColonia(setColonia: string):void {
    this.update((state) => ({
      ...state,
      setColonia,
    }));
  }

  public setCaller(setCaller: string):void {
    this.update((state) => ({
      ...state,
      setCaller,
    }));
  }

  public setLada(setLada: string):void {
    this.update((state) => ({
      ...state,
      setLada,
    }));
  }

  public setTelefono(setTelefono: string):void {
    this.update((state) => ({
      ...state,
      setTelefono,
    }));
  }

  public setCodigoPostal(setCodigoPostal: string):void {
    this.update((state) => ({
      ...state,
      setCodigoPostal,
    }));
  }

  public setRegimen(setRegimen: catalogoResponse):void {
    this.update((state) => ({
      ...state,
      setRegimen,
    }));
  }

  public setEntradas(setEntradas: catalogoResponse):void {
    this.update((state) => ({
      ...state,
      setEntradas,
    }));
  }
}
