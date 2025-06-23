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
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  dropdown: string;
  commonCheckbox: boolean;
  individualCheckbox: boolean [];
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
    claveAduana: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    dropdown: '',
    commonCheckbox: false,
    individualCheckbox: [false, false, false, false, false, false],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32502', resettable: true })
export class Tramite32502Store extends Store<Solicitud32502State> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFraccionRegla(arg0: string): void {
    throw new Error('Method not implemented in ' + this.constructor.name);
  }
  constructor() {
    super(createInitialState());
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public setAdace(adace: string): void {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }

  public setRfcExtranjero(rfcExtranjero: string): void {
    this.update((state) => ({
      ...state,
      rfcExtranjero,
    }));
  }

  public setCveFraccionArancelaria(cveFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      cveFraccionArancelaria,
    }));
  }

  public setReglaFraccion(reglaFraccion: string): void {
    this.update((state) => ({
      ...state,
      reglaFraccion,
    }));
  }

  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setValorUSD(valorUSD: string): void {
    this.update((state) => ({
      ...state,
      valorUSD,
    }));
  }

  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  public setPeso(peso: string): void {
    this.update((state) => ({
      ...state,
      peso,
    }));
  }

  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }

  public setNumeroSerie(numeroSerie: string): void {
    this.update((state) => ({
      ...state,
      numeroSerie,
    }));
  }

  public setDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  public setInformacionExtra(informacionExtra: string): void {
    this.update((state) => ({
      ...state,
      informacionExtra,
    }));
  }

  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setDelegacionMunicipio(delegacionMunicipio: string): void {
    this.update((state) => ({
      ...state,
      delegacionMunicipio,
    }));
  }

  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setPatenteAutorizacion(patenteAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      patenteAutorizacion,
    }));
  }

  public setRfcAgenteAduanal(rfcAgenteAduanal: string): void {
    this.update((state) => ({
      ...state,
      rfcAgenteAduanal,
    }));
  }

  public setNumeroPedimento(numeroPedimento: string): void {
    this.update((state) => ({
      ...state,
      numeroPedimento,
    }));
  }

  public setClaveAduana(claveAduana: string): void {
    this.update((state) => ({
      ...state,
      claveAduana,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  public setTipoDocumento(tipoDocumento: string): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  public setDropdown(dropdown: string): void {
    this.update((state) => ({
      ...state,
      dropdown,
    }));
  }

  public setCommonCheckbox(commonCheckbox: boolean): void {
    this.update((state) => ({
      ...state,
      commonCheckbox,
    }));
  }
  public setIndividualCheckbox(individualCheckbox: []): void {
    this.update((state) => ({
      ...state,
      individualCheckbox,
    }));
  }
}