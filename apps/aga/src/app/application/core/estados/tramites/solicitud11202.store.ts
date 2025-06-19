import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 11202
 * @returns Solicitud11202
 */
export interface Solicitud11202State {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  pais: string;
  codigoPostal: number;
  estado: string;
  municipioAlcaldia: string;
  localidad: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: number;
}

export function createInitialState(): Solicitud11202State {
  return {
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: '',
    pais: '',
    codigoPostal: 0,
    estado: '',
    municipioAlcaldia: '',
    localidad: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    lada: '',
    telefono: 0,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud11202', resettable: true })
export class Solicitud11202Store extends Store<Solicitud11202State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param rfc - El tipo de solicitud que se va a guardar.
   */
  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  public setActividadEconomica(actividadEconomica: string) {
    this.update((state) => ({
      ...state,
      actividadEconomica,
    }));
  }

  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setCodigoPostal(codigoPostal: number) {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setMunicipioAlcaldia(municipioAlcaldia: string) {
    this.update((state) => ({
      ...state,
      municipioAlcaldia,
    }));
  }

  public setLocalidad(localidad: string) {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setNumeroExterior(numeroExterior: string) {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }
  
  public setnumeroInterior(numeroInterior: string) {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  public setLada(lada: string) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: number) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
