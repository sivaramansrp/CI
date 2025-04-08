import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';


/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Tramites30401State
 */
export interface Tramites30401State {
  claveDeReferencia: string;
  cadenaPagoDependencia: string;
  clave: string;
  llaveDePago: string;
  fecPago: string;
  impPago: string;
  efectuarElPago:boolean;

  numeroCaat:string;
  tipodeTransito:string;
  calle:string;
  numeroExterior: number;
  numeroInterior: number;
  entidadFederativa:string;
  municipioDelegacion:string;
  colonia:string;
  localidad:string;
  codigoPostal:string;
  capitalSocial: number;
  numero:number;
  fecha:string;
  capitalSocialCheck:boolean;
  miRepresentadaCheck:boolean;

}



export function createInitialState(): Tramites30401State {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    efectuarElPago:false,

    numeroCaat:'',
    tipodeTransito:'',
    calle:'',
    numeroExterior: 0,
    numeroInterior: 0,
    entidadFederativa:'',
    municipioDelegacion:'',
    colonia:'',
    localidad:'',
    codigoPostal:'',
    capitalSocial: 0,
    numero:0,
    fecha:'',
    capitalSocialCheck: false,
    miRepresentadaCheck: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites30401', resettable: true })
export class Tramite30401Store extends Store<Tramites30401State> {
  constructor() {
    super(createInitialState());
  }

  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  public setCadenaPagoDependencia(cadenaPagoDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  public setClave(clave: string) {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  public setLlaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  public setFecPago(fecPago: string) {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  public setImpPago(impPago: string) {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }

  public setEfectuarElPago(efectuarElPago: boolean) {
    this.update((state) => ({
      ...state,
      efectuarElPago,
    }));
  }



// new start
  
  public SetnumeroCaat(numeroCaat: string) {
    this.update((state) => ({
      ...state,
      numeroCaat,
    }));
  }

  public setTipodeTransito(tipodeTransito: string) {
    this.update((state) => ({
      ...state,
      tipodeTransito,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }
  public setNumeroExterior(numeroExterior: number) {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }
  public setNumeroInterior(numeroInterior: number) {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  public setEntidadFederativa(entidadFederativa: string) {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setMunicipioDelegacion(municipioDelegacion: string) {
    this.update((state) => ({
      ...state,
      municipioDelegacion,
    }));
  } 

  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }
  
  public setLocalidad(localidad: string) {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  public setCodigoPostal(codigoPostal: string) {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setCapitalSocial(capitalSocial: number) {
    this.update((state) => ({
      ...state,
      capitalSocial,
    }));
  }
  
  public setNumero(numero: number) {
    this.update((state) => ({
      ...state,
      numero,
    }));
  }

  public setFecha(fecha: string) {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }

  public setCapitalSocialCheck(capitalSocialCheck: boolean) {
    this.update((state) => ({
      ...state,
      capitalSocialCheck,
    }));
  }
  
  public setMiRepresentadaCheck(miRepresentadaCheck: boolean) {
    this.update((state) => ({
      ...state,
      miRepresentadaCheck,
    }));
  }
  
  
}