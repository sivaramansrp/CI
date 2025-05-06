import { Store, StoreConfig } from '@datorama/akita';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

export interface Solicitud120702State {
  [key: string]: unknown;

  anoDelOficio: CatalogoResponse | null;
  numeroOficio: number;
  estado: string;
  representacionFederal: string;
  montoAsignado: number;
  montoExpedido: number;
  montoDisponible: number;
  datosNumeroOficio: number;
  montoADisponible: number;
  montoAExpedir: number;
  totalAExpedir: number;
}

export function createInitialState(): Solicitud120702State {
  return {
    anoDelOficio: null,
    numeroOficio: 0,
    estado: '',
    representacionFederal: '',
    montoAsignado: 0,
    montoExpedido: 0,
    montoDisponible: 0,
    datosNumeroOficio: 0,
    montoADisponible: 0,
    montoAExpedir: 0,
    totalAExpedir: 0,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120702', resettable: true })
export class Tramite120702Store extends Store<Solicitud120702State> {
  constructor() {
    super(createInitialState());
  }

  public setDynamicFieldValue(fieldName: string, value: unknown): void {
    this.update((state) => ({
      ...state,
      [fieldName]: value,
    }));
  }

  public setAnoDelOficio(anoDelOficio: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      anoDelOficio,
    }));
  }

  public setNumeroOficio(numeroOficio: number): void {
    this.update((state) => ({
      ...state,
      numeroOficio,
    }));
  }

  public setMontoAExpedir(montoAExpedir: number): void {
    this.update((state) => ({
      ...state,
      montoAExpedir,
    }));
  }
}
