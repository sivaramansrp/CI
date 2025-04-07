import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

export interface Solicitud6101State {
  aduanaAux: string | number;
  juntaTecnicaDerivada: string | number;
  numeroPedimento: string;
  nombreComercialMercancia: string;
  descDetalladaMercancia: string;
  fraccionI: string;
  capitulo: string;
  partida: string;
  subpartida: string;
  subdivision: string;
  fraccionII: string;
  capituloII: string;
  partidaII: string;
  subpartidaII: string;
  subdivisionII: string;
  fraccionIII: string;
  capituloIII: string;
  partidaIII: string;
  subpartidaIII: string;
  subdivisionIII: string;
  manifiestosSeleccionados: boolean;
}

export function createInitialState(): Solicitud6101State {
  return {
    aduanaAux: '',
    juntaTecnicaDerivada: '',
    numeroPedimento: '',
    nombreComercialMercancia: '',
    descDetalladaMercancia: '',
    fraccionI: '',
    capitulo: '',
    partida: '',
    subpartida: '',
    subdivision: '',
    fraccionII: '',
    capituloII: '',
    partidaII: '',
    subpartidaII: '',
    subdivisionII: '',
    fraccionIII: '',
    capituloIII: '',
    partidaIII: '',
    subpartidaIII: '',
    subdivisionIII: '',
    manifiestosSeleccionados: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud6101', resettable: true })
export class Solicitud6101Store extends Store<Solicitud6101State> {
  constructor() {
    super(createInitialState());
  }

  public actualizarAduanaAux(aduanaAux: string | number): void {
    this.update((state) => ({
      ...state,
      aduanaAux,
    }));
  }

  public actualizarJuntaTecnicaDerivada(juntaTecnicaDerivada: string | number): void {
    this.update((state) => ({
      ...state,
      juntaTecnicaDerivada,
    }));
  }

  public actualizarNumeroPedimento(numeroPedimento: string): void {
    this.update((state) => ({
      ...state,
      numeroPedimento,
    }));
  }

  public actualizarNombreComercialMercancia(
    nombreComercialMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      nombreComercialMercancia,
    }));
  }

  public actualizarDescDetalladaMercancia(
    descDetalladaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descDetalladaMercancia,
    }));
  }

  public actualizarFraccionI(fraccionI: string): void {
    this.update((state) => ({
      ...state,
      fraccionI,
    }));
  }

  public actualizarCapitulo(capitulo: string): void {
    this.update((state) => ({
      ...state,
      capitulo,
    }));
  }

  public actualizarPartida(partida: string): void {
    this.update((state) => ({
      ...state,
      partida,
    }));
  }

  public actualizarSubpartida(subpartida: string): void {
    this.update((state) => ({
      ...state,
      subpartida,
    }));
  }

  public actualizarSubdivision(subdivision: string): void {
    this.update((state) => ({
      ...state,
      subdivision,
    }));
  }

  public actualizarFraccionII(fraccionII: string): void {
    this.update((state) => ({
      ...state,
      fraccionII,
    }));
  }

  public actualizarCapituloII(capituloII: string): void {
    this.update((state) => ({
      ...state,
      capituloII,
    }));
  }

  public actualizarPartidaII(partidaII: string): void {
    this.update((state) => ({
      ...state,
      partidaII,
    }));
  }

  public actualizarSubpartidaII(subpartidaII: string): void {
    this.update((state) => ({
      ...state,
      subpartidaII,
    }));
  }

  public actualizarSubdivisionII(subdivisionII: string): void {
    this.update((state) => ({
      ...state,
      subdivisionII,
    }));
  }

  public actualizarFraccionIII(fraccionIII: string): void {
    this.update((state) => ({
      ...state,
      fraccionIII,
    }));
  }

  public actualizarCapituloIII(capituloIII: string): void {
    this.update((state) => ({
      ...state,
      capituloIII,
    }));
  }

  public actualizarPartidaIII(partidaIII: string): void {
    this.update((state) => ({
      ...state,
      partidaIII,
    }));
  }

  public actualizarSubpartidaIII(subpartidaIII: string): void {
    this.update((state) => ({
      ...state,
      subpartidaIII,
    }));
  }

  public actualizarSubdivisionIII(subdivisionIII: string): void {
    this.update((state) => ({
      ...state,
      subdivisionIII,
    }));
  }

  public actualizarManifiestosSeleccionados(
    manifiestosSeleccionados: boolean
  ): void {
    this.update((state) => ({
      ...state,
      manifiestosSeleccionados,
    }));
  }
}
