import {
  catalogoResponse,
  Personas,
  ResponsablesDespacho,
} from '@ng-mf/data-access-user';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 * @returns Solicitud5701
 */
export interface Solicitud231001State {
  //entidadFederativa: catalogoResponse | null
  numeroRegistroAmbiental: string;
  descripcionGenerica1: string;
  nombreDeLaMateriaPrima: string;
  cantidad: number;
  numeroProgramaImmex: Catalogo | null;
  aduanas: string;
  unidadMedidaComercial: {
    clave: string;
    descUnidadMedida: string;
  };
  capituloFraccion: string;
  partidaFraccion: string;
  subPartidaFraccion: string;
  fraccion: {
    descFraccion: string;
  }
}

export function createInitialState(): Solicitud231001State {
  return {
    numeroRegistroAmbiental: '1000',
    descripcionGenerica1: '',
    nombreDeLaMateriaPrima: '',
    cantidad: 0,
    numeroProgramaImmex: null,
    aduanas: '',
    unidadMedidaComercial: {
      clave: '',
      descUnidadMedida: '',
    },
    capituloFraccion: '',
    partidaFraccion: '',
    subPartidaFraccion: '',
    fraccion: {
      descFraccion: '',
    }
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite231001', resettable: true })
export class Tramite231001Store extends Store<Solicitud231001State> {
  constructor() {
    super(createInitialState());
  }

  public setNumeroRegistroAmbiental(numeroRegistroAmbiental: string) {
    this.update((state) => ({
      ...state,
      numeroRegistroAmbiental,
    }));
  }

  public setDescripcionGenerica1(descripcionGenerica1: string): void {
    this.update((state) => ({
      ...state,
      descripcionGenerica1,
    }));
  }

  public setNombreDeLaMateriaPrima(nombreDeLaMateriaPrima: string): void {
    this.update((state) => ({
      ...state,
      nombreDeLaMateriaPrima,
    }));
  }
  public setcantidad(cantidad: number): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }
  public setnumeroProgramaImmex(numeroProgramaImmex: Catalogo): void {
    this.update((state) => ({
      ...state,
      numeroProgramaImmex,
    }));
  }
  public setAduanas(aduanas: string): void {
    this.update((state) => ({
      ...state,
      aduanas,
    }));
  }
  public setDescUnidadMedida(descUnidadMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadMedidaComercial: {
        ...state.unidadMedidaComercial,
        descUnidadMedida,
      },
    }));
  }
  public setCapituloFraccion(capituloFraccion: string): void {
    this.update((state) => ({
      ...state,
      capituloFraccion,
    }));
  }
  public setpartidaFraccion(partidaFraccion: string): void {
    this.update((state) => ({
      ...state,
      partidaFraccion,
    }));
  }
  public setSubPartidaFraccion(subPartidaFraccion: string): void {
    this.update((state) => ({
      ...state,
      subPartidaFraccion,
    }));
  }
  public setFraccion(descFraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion: {
        ...state.fraccion,
        descFraccion,
      },
    }));
  }
}