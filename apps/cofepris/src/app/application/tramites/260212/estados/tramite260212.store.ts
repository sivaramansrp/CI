import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260212State {
  // selectedClave: string;
  estado: string ;
  selectedClave: CatalogoResponse | null,
  selectedDescripcion: CatalogoResponse | null,
  selecteDespecificarClasificacion:Catalogo |null
  banco:string,
  rfcDelResponsableSanitario:string,
  denominacionRazonSocial:string,
  correoElectronico:string,
  municipio:string,
  localidad:string,
  colonia:string,
  calle:string,
  lada:string,
  teléfono:string,
  codigoPostal:string,
  regimen:string,
  entradas:string,
  ClaveDeReferncia:string,
  CadenaDeLaDependencia:string,
  llaveDePago:string,
  setFechaDePago:string,
  importeDePago:string
}

export function createInitialState(): Tramite260212State {
  return {
    // selectedClave: '',
    estado: '',
    selectedClave: null,
    selectedDescripcion: null,
    selecteDespecificarClasificacion:null,
    banco:'',
    rfcDelResponsableSanitario:'',
    denominacionRazonSocial:'',
    correoElectronico:'',
    municipio:'',
    localidad:'',
    colonia:'',
    calle:'',
    lada:'',
    teléfono:'',
    codigoPostal:'',
    regimen:'',
    entradas:'',
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

  public setSelectedEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
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

  public setRfcDelResponsableSanitario(rfcDelResponsableSanitario: string):void {
    this.update((state) => ({
      ...state,
      rfcDelResponsableSanitario,
    }));
  }

  public setDenominacionRazonSocial(denominacionRazonSocial: string):void {
    this.update((state) => ({
      ...state,
      denominacionRazonSocial,
    }));
  }

  public setCorreoElectronico(correoElectronico: string):void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setMunicipio(municipio: string):void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }

  public setLocalidad(localidad: string):void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  public setColonia(colonia: string):void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string):void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setLada(lada: string):void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(teléfono: string):void {
    this.update((state) => ({
      ...state,
      teléfono,
    }));
  }

  public setCodigoPostal(codigoPostal: string):void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setRegimen(regimen: string):void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setEntradas(entradas: string):void {
    this.update((state) => ({
      ...state,
      entradas,
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
