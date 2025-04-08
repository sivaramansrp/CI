import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';


/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Tramites260912State
 */
export interface Tramites260912State {
  claveDeReferencia: string;
  cadenaPagoDependencia: string;
  clave: string;
  llaveDePago: string;
  fecPago: string;
  impPago: string;
  btonDeRadio: string;
  justificacion: string;
  rfcDel: string;
  denominacion: string;
  correo: string;
  codigoPostal: string;
  estado: Catalogo | null;
  municipioOAlcaldia: string;
  localidad: string;
  colonias: string;
  calle:string;
  lada: string;
  telefono: string;
  avisoCheckbox: string;
  regimen: Catalogo | null;
  aduanasEntradas: Catalogo | null;
  aifaCheckbox: string;
  manifests: string;
  acuerdoPublico: string;
  rfc: string;
}



export function createInitialState(): Tramites260912State {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    btonDeRadio: '',
    justificacion: '',
    rfcDel: '',
    denominacion: '',
    correo: '',
    codigoPostal: '',
    estado: null,
    municipioOAlcaldia: '',
    localidad: '',
    colonias: '',
    calle: '',
    lada: '',
    telefono: '',
    avisoCheckbox: '',
    regimen: null,
    aduanasEntradas: null,
    aifaCheckbox: '',
    manifests: '',
    acuerdoPublico: '',
    rfc: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites260912', resettable: true })
export class Tramite260912Store extends Store<Tramites260912State> {
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

  public setBtonDeRadio(btonDeRadio: string): void {
    this.update((state) => ({
      ...state,
      btonDeRadio,
    }));
  }

  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  public setRfcDel(rfcDel: string): void {
    this.update((state) => ({
      ...state,
      rfcDel,
    }));
  } 

  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  } 

  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  } 

  public setMunicipioOAlcaldia(municipioOAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioOAlcaldia,
    }));
  } 

  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }  

  public setColonias(colonias: string): void {
    this.update((state) => ({
      ...state,
      colonias,
    }));
  } 

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  } 

  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  } 

  public setAvisoCheckbox(avisoCheckbox: string): void {
    this.update((state) => ({
      ...state,
      avisoCheckbox,
    }));
  }

  public setRegimen(regimen: Catalogo): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setAduanasEntradas(aduanasEntradas: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanasEntradas,
    }));
  } 

  public setAifaCheckbox(aifaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      aifaCheckbox,
    }));
  }

  public setManifests(manifests: string): void {
    this.update((state) => ({
      ...state,
      manifests,
    }));
  }

  public setAcuerdoPublico(acuerdoPublico: string): void {
    this.update((state) => ({
      ...state,
      acuerdoPublico,
    }));
  }

  public setRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

}
