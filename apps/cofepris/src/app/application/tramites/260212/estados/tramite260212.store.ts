import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260212State {
  // selectedClave: string;
  selectedEstado: CatalogoResponse | null;
  selectedClave: CatalogoResponse | null,
  selectedDescripcion: CatalogoResponse | null,
  selecteDespecificarClasificacion:Catalogo |null
  banco:string,
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
  ClaveDeReferncia:string,
  CadenaDeLaDependencia:string,
  llaveDePago:string,
  setFechaDePago:string,
  importeDePago:string
}

export function createInitialState(): Tramite260212State {
  return {
    // selectedClave: '',
    selectedEstado: null,
    selectedClave: null,
    selectedDescripcion: null,
    selecteDespecificarClasificacion:null,
    banco:'',
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
    ClaveDeReferncia:'',
    CadenaDeLaDependencia:'',
    llaveDePago:'',
    setFechaDePago:'',
    importeDePago:''
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

  public setDespecificarClasificacion(selecteDespecificarClasificacion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selecteDespecificarClasificacion,
    }));
  }

  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
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
  public setClaveDeReferncia(ClaveDeReferncia: string):void {
    this.update((state) => ({
      ...state,
      ClaveDeReferncia,
    }));
  }
  public setCadenaDeLaDependencia(CadenaDeLaDependencia: string):void {
    this.update((state) => ({
      ...state,
      CadenaDeLaDependencia,
    }));
  }

  public setLlaveDePago(llaveDePago: string):void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }
  public setFechaDePago(setFechaDePago: string):void {
    this.update((state) => ({
      ...state,
      setFechaDePago,
    }));
  }
  public setImporteDePago(importeDePago: string):void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }
}
