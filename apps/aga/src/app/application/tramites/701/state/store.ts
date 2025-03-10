/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-redeclare */
/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TipoDocumento, createInitialState } from './tipo-documento.model';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

export interface TramiteState {
  descripcion: string | null;
  /**
   * Indica si el documento está seleccionado.
   */
  selected?: boolean;

  /**
   * Información del tipo de documento.
   */
  tipoDocumento?: Catalogo | null;

  /**
   * RFC para consulta.
   */
  rfcParaConsulta?: string | null;

  /**
   * Nombre o razón social del documento.
   */
  nombre?: string[];
}
export function createInitialTramiteState(): TramiteState {
  return {
    descripcion: null,
    selected: false,
    tipoDocumento: null,
    rfcParaConsulta: null,
    nombre: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'TipoDocumento' })
export class TipoDocumentoStore extends Store<TipoDocumento> {
  
  selected: unknown;
  [key: string]: any;
  constructor() {
    super(createInitialState());
  }
}
