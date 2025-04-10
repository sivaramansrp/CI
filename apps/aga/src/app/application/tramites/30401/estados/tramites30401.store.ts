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

  cveFolioCaat: string;
  tipoTransito: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  entidadFederativa: string;
  delegacionMunicipio: string;
  colonia: string;
  localidad: string;
  codigoPostal: string;
  capitalSocial: string;
  numeroFolioPermiso: string;
  fechaExpedicion: string;
  elCapitalSocial: boolean;
  miRepresentada: boolean;

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

    cveFolioCaat: '',
    tipoTransito: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    localidad: '',
    codigoPostal: '',
    capitalSocial: '',
    numeroFolioPermiso: '',
    fechaExpedicion: '',
    elCapitalSocial: false,
    miRepresentada: false,
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

  // public establecerDatos(datos: Tramites30401State):void {
  //   this.update((state) => ({
  //     ...state,
  //     ...datos,
  //   }));
  // }
  
  public establecerDatos(values: Partial<Tramites30401State>): void {    
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }


  public setEfectuarElPago(efectuarElPago: boolean) {
    this.update((state) => ({
      ...state,
      efectuarElPago,
    }));
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





// new start
  
  // public SetcveFolioCaat(cveFolioCaat: string) {
  //   this.update((state) => ({
  //     ...state,
  //     cveFolioCaat,
  //   }));
  // }

  // public setTipodeTransito(tipoTransito: string) {
  //   this.update((state) => ({
  //     ...state,
  //     tipoTransito,
  //   }));
  // }

  // public setCalle(calle: string) {
  //   this.update((state) => ({
  //     ...state,
  //     calle,
  //   }));
  // }
  // public setNumeroExterior(numeroExterior: number) {
  //   this.update((state) => ({
  //     ...state,
  //     numeroExterior,
  //   }));
  // }
  // public setNumeroInterior(numeroInterior: number) {
  //   this.update((state) => ({
  //     ...state,
  //     numeroInterior,
  //   }));
  // }

  // public setEntidadFederativa(entidadFederativa: string) {
  //   this.update((state) => ({
  //     ...state,
  //     entidadFederativa,
  //   }));
  // }

  // public setMunicipioDelegacion(delegacionMunicipio: string) {
  //   this.update((state) => ({
  //     ...state,
  //     delegacionMunicipio,
  //   }));
  // } 

  // public setColonia(colonia: string) {
  //   this.update((state) => ({
  //     ...state,
  //     colonia,
  //   }));
  // }
  
  // public setLocalidad(localidad: string) {
  //   this.update((state) => ({
  //     ...state,
  //     localidad,
  //   }));
  // }

  // public setCodigoPostal(codigoPostal: string) {
  //   this.update((state) => ({
  //     ...state,
  //     codigoPostal,
  //   }));
  // }

  // public setCapitalSocial(capitalSocial: number) {
  //   this.update((state) => ({
  //     ...state,
  //     capitalSocial,
  //   }));
  // }
  
  // public setNumero(numeroFolioPermiso: number) {
  //   this.update((state) => ({
  //     ...state,
  //     numero,
  //   }));
  // }

  // public setFecha(fechaExpedicion: string) {
  //   this.update((state) => ({
  //     ...state,
  //     fecha,
  //   }));
  // }

  // public setCapitalSocialCheck(capitalSocialCheck: boolean) {
  //   this.update((state) => ({
  //     ...state,
  //     capitalSocialCheck,
  //   }));
  // }
  
  // public setMiRepresentadaCheck(miRepresentadaCheck: boolean) {
  //   this.update((state) => ({
  //     ...state,
  //     miRepresentadaCheck,
  //   }));
  // }
  
}