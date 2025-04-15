import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '../models/flora-fauna.models';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite250101State {
  tipoAduana: catalogoResponse | null;
  tipoInspectoria: catalogoResponse | null;
  tipoMunicipio: catalogoResponse | null;
  destinatarioDenominacion: string;
  destinatarioPais: catalogoResponse | null;
  destinatarioEstado: catalogoResponse | null;
  destinatarioCodigoPostal: string;
  destinatarioDomicilio: string;
  agenteAduanalNombre: string;
  agenteAduanalPrimerApellido: string;
  agenteAduanalSegundoApellido: string;
  agenteAduanalPatente: string;

  destinatarioRowData: TablaDatos[];
  agenteAduanalRowData: TablaDatos[];
}

export function createInitialState(): Tramite250101State {
  return {
    tipoAduana: null,
    tipoInspectoria: null,
    tipoMunicipio: null,
    destinatarioDenominacion: '',
    destinatarioPais: null,
    destinatarioEstado: null,
    destinatarioCodigoPostal: '',
    destinatarioDomicilio: '',
    agenteAduanalNombre: '',
    agenteAduanalPrimerApellido: '',
    agenteAduanalSegundoApellido: '',
    agenteAduanalPatente: '',

    destinatarioRowData: [],
    agenteAduanalRowData: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'floraFaunaState', resettable: true })
export class Tramite250101Store extends Store<Tramite250101State> {
  constructor() {
    super(createInitialState());
  }

  public establecerTipoAduana(tipoAduana: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      tipoAduana,
    }));
  }

  public establecerTipoInspectoria(tipoInspectoria: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      tipoInspectoria,
    }));
  }

  public establecerTipoMunicipio(tipoMunicipio: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      tipoMunicipio,
    }));
  }

  public establecerDestinatarioDenominacion(
    destinatarioDenominacion: string
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioDenominacion,
    }));
  }

  public establecerDestinatarioPais(destinatarioPais: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      destinatarioPais,
    }));
  }

  public establecerDestinatarioEstado(
    destinatarioEstado: catalogoResponse
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioEstado,
    }));
  }

  public establecerDestinatarioCodigoPostal(
    destinatarioCodigoPostal: string
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioCodigoPostal,
    }));
  }

  public establecerDestinatarioDomicilio(destinatarioDomicilio: string): void {
    this.update((state) => ({
      ...state,
      destinatarioDomicilio,
    }));
  }

  public establecerAgenteAduanalNombre(agenteAduanalNombre: string): void {
    this.update((state) => ({
      ...state,
      agenteAduanalNombre,
    }));
  }

  public establecerAgenteAduanalPrimerApellido(
    agenteAduanalPrimerApellido: string
  ): void {
    this.update((state) => ({
      ...state,
      agenteAduanalPrimerApellido,
    }));
  }

  public establecerAgenteAduanalSegundoApellido(
    agenteAduanalSegundoApellido: string
  ): void {
    this.update((state) => ({
      ...state,
      agenteAduanalSegundoApellido,
    }));
  }

  public establecerAgenteAduanalPatente(agenteAduanalPatente: string): void {
    this.update((state) => ({
      ...state,
      agenteAduanalPatente,
    }));
  }

  public establecerDestinatario(destinaraioRowData: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      destinaraioRowData,
    }));
  }

  public establecerAgenteAduanal(agenteAduanalRowData: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      agenteAduanalRowData,
    }));
  }

  resetStore():void{
    this.reset();
  }
}
