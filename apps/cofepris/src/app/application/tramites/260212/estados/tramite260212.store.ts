import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260212State {
  selectedEstado: CatalogoResponse | null;
  setClave: CatalogoResponse | null,
  setDescripcion: CatalogoResponse | null,
  setDespecificarClasificacion:Catalogo |null
  setBanco:CatalogoResponse|null,
  setRfcDelResponsableSanitario:string,
  setDenominacionRazonSocial:string,
  setCorreoElectronico:string,
  setMunicipio:string,
  setLocalidad:string,
  setColonia:string,
  setCalle:string,
  setLada:string,
  setTelefono:string,
  setCodigoPostal:string,
  setRegimen:CatalogoResponse|null,
  setEntradas:CatalogoResponse|null,
  setClaveDeReferncia:string,
  setCadenaDeLaDependencia:string,
  setLlaveDePago:string,
  setFechaDePago:string,
  setImporteDePago:string
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
    setCalle:'',
    setLada:'',
    setTelefono:'',
    setCodigoPostal:'',
    setRegimen:null,
    setEntradas:null,
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
@StoreConfig({ name: 'permisoMaquilaState', resettable: true })
export class Tramite260212Store extends Store<Tramite260212State> {
  constructor() {
    super(createInitialState());
  }

  public setSelectedEstado(selectedEstado: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  public setClave(selectedClave: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedClave,
    }));
  }

  public setDescripcion(selectedDescripcion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDescripcion,
    }));
  }

  public setDespecificarClasificacion(selectedDespecificarClasificacion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDespecificarClasificacion,
    }));
  }

  public setBanco(setBanco: CatalogoResponse): void {
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

  public setCalle(setCalle: string):void {
    this.update((state) => ({
      ...state,
      setCalle,
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

  public setRegimen(setRegimen: CatalogoResponse):void {
    this.update((state) => ({
      ...state,
      setRegimen,
    }));
  }

  public setEntradas(setEntradas: CatalogoResponse):void {
    this.update((state) => ({
      ...state,
      setEntradas,
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
