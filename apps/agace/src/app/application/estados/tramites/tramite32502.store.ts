import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 32502
 * @returns Solicitud32502
 */
export interface Solicitud32502State {
  adace: string;
  razonSocial: string;
  rfc: string;
  rfcExtranjero: string;
  cveFraccionArancelaria: string;
  reglaFraccion: string;
  nico: string;
  valorUSD: string;
  marca: string;
  peso: string;
  fechaInicio: string;
  numeroSerie: string;
  descripcionMercancia: string;
  informacionExtra: string;
  entidadFederativa: string;
  delegacionMunicipio: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  patenteAutorizacion: string;
  rfcAgenteAduanal: string;
  numeroPedimento: string;
  claveAduana: string;
}

export function createInitialState(): Solicitud32502State {
  return {
    adace: '',
    razonSocial: '',
    rfc: '',
    rfcExtranjero: '',
    cveFraccionArancelaria: '',
    reglaFraccion: '',
    nico: '',
    valorUSD: '',
    marca: '',
    peso: '',
    fechaInicio: '',
    numeroSerie: '',
    descripcionMercancia: '',
    informacionExtra: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    patenteAutorizacion: '',
    rfcAgenteAduanal: '',
    numeroPedimento: '',
    claveAduana: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32502', resettable: true })
export class Tramite32502Store extends Store<Solicitud32502State> {
  constructor() {
    super(createInitialState());
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setFraccionRegla(reglaFraccion: string) {
    this.update((state) => ({
      ...state,
      reglaFraccion
    }));
  }

}
