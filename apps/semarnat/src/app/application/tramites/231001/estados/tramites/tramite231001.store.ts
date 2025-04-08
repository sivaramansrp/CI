import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 * @returns Solicitud5701
 */
export interface Solicitud231001State {
  numeroRegistroAmbiental: string;
  descripcionGenerica1: string;
  nombreDeLaMateriaPrima: string;
  cantidad: number;
  numeroProgramaImmex: Catalogo | null;
  aduanas: string;
  unidadMedidaComercial: Catalogo | null;
  capituloFraccion: Catalogo | null;
  partidaFraccion: Catalogo | null;
  subPartidaFraccion: Catalogo | null;
  fraccion: Catalogo | null;
}

export function createInitialState(): Solicitud231001State {
  return {
    numeroRegistroAmbiental: '1000',
    descripcionGenerica1: '',
    nombreDeLaMateriaPrima: '',
    cantidad: 0,
    numeroProgramaImmex: null,
    aduanas: '',
    unidadMedidaComercial: null,
    capituloFraccion: null,
    partidaFraccion: null,
    subPartidaFraccion: null,
    fraccion: null
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

  public setNumeroRegistroAmbiental(numeroRegistroAmbiental: string): void {
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
  public setDescUnidadMedida(unidadMedidaComercial: Catalogo): void {
    this.update((state) => ({
      ...state,
      unidadMedidaComercial
    }));
  }
  public setCapituloFraccion(capituloFraccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      capituloFraccion,
    }));
  }
  public setpartidaFraccion(partidaFraccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      partidaFraccion,
    }));
  }
  public setSubPartidaFraccion(subPartidaFraccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      subPartidaFraccion,
    }));
  }
  public setFraccion(fraccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      fraccion
    }));
  }
}