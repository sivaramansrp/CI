import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud32501State {
  adace: string;
  fechaIniExposicion: string;
  ideGenerica1: string;
  idTransaccionVU: string;
  cveFraccionArancelaria: string | number;
  nico: string;
  peso: string;
  valorUSD: string;
  descripcionMercancia: string;
  nombreComercial: string;
  entidadFederativa: string | number;
  delegacionMunicipio: string | number;
  colonia: string | number;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  patente: string;
  rfc: string;
  pedimento: string;
  aduana: string | number;
}

export function createInitialSolicitudState(): Solicitud32501State {
  return {
    adace: '',
    fechaIniExposicion: '',
    ideGenerica1: '',
    idTransaccionVU: '',
    cveFraccionArancelaria: '',
    nico: '',
    peso: '',
    valorUSD: '',
    descripcionMercancia: '',
    nombreComercial: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    patente: '',
    rfc: '',
    pedimento: '',
    aduana: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud32501', resettable: true })
export class Solicitud32501Store extends Store<Solicitud32501State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  actualizarAdace(adace: string): void {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }

  actualizarFechaIniExposicion(fechaIniExposicion: string): void {
    this.update((state) => ({
      ...state,
      fechaIniExposicion,
    }));
  }

  actualizarIdeGenerica1(ideGenerica1: string): void {
    this.update((state) => ({
      ...state,
      ideGenerica1,
    }));
  }

  actualizarIdTransaccionVU(idTransaccionVU: string): void {
    this.update((state) => ({
      ...state,
      idTransaccionVU,
    }));
  }

  actualizarCveFraccionArancelaria(
    cveFraccionArancelaria: string | number
  ): void {
    this.update((state) => ({
      ...state,
      cveFraccionArancelaria,
    }));
  }

  actualizarNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  actualizarPeso(peso: string): void {
    this.update((state) => ({
      ...state,
      peso,
    }));
  }

  actualizarValorUSD(valorUSD: string): void {
    this.update((state) => ({
      ...state,
      valorUSD,
    }));
  }

  actualizarDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  actualizarNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  actualizarEntidadFederativa(entidadFederativa: string | number): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  actualizarDelegacionMunicipio(delegacionMunicipio: string | number): void {
    this.update((state) => ({
      ...state,
      delegacionMunicipio,
    }));
  }

  actualizarColonia(colonia: string | number): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  actualizarCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  actualizarNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  actualizarNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  actualizarCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  actualizarPatente(patente: string): void {
    this.update((state) => ({
      ...state,
      patente,
    }));
  }

  actualizaRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  actualizarPedimento(pedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimento,
    }));
  }

  actualizarAduana(aduana: string | number): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  resetStore(): void {
    this.reset();
  }
}
