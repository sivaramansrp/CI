import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo, catalogoResponse } from '@libs/shared/data-access-user/src';
import { tableData } from '../../models/permiso-sanitario.model';

export interface Sanitario260215State {
  selectedEstado: catalogoResponse | null;
  setClave: catalogoResponse | null,
  setDescripcion: catalogoResponse | null,
  setDespecificarClasificacion:Catalogo |null,
  /**
   * Datos del fabricante.
   */
  Fabricante: tableData[];
  /**
   * Datos del destinatario.
   */
  Destinatario: tableData[];
  /**
   * Datos del proveedor.
   */
  Proveedor: tableData[];
  /**
   * Datos del facturador.
   */
  Facturador: tableData[];
}

export function createInitialState(): Sanitario260215State {
  return {
    selectedEstado: null,
    setClave: null,
    setDescripcion: null,
    setDespecificarClasificacion:null,
    Fabricante: [],
    Destinatario: [],
    Proveedor: [],
    Facturador: []
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'estadoState', resettable: true })
export class Sanitario260215Store extends Store<Sanitario260215State> {
  constructor() {
    super(createInitialState());
  }

  public setSelectedEstado(selectedEstado: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  public setClave(selectedClave: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedClave,
    }));
  }

  public setDescripcion(selectedDescripcion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDescripcion,
    }));
  }

  public setDespecificarClasificacion(selectedDespecificarClasificacion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDespecificarClasificacion,
    }));
  }
  /**
   * Establece los datos del fabricante en el estado del store.
   * 
   * @param fabricante Arreglo de datos del fabricante.
   */
  public setFabricante(fabricante: tableData[]) {
    this.update((state) => ({
      ...state,
      Fabricante: fabricante,
    }));
  }

  /**
   * Establece los datos del destinatario en el estado del store.
   * 
   * @param destinatario Arreglo de datos del destinatario.
   */
  public setDestinatario(destinatario: tableData[]) {
    this.update((state) => ({
      ...state,
      Destinatario: destinatario,
    }));
  }

  /**
   * Establece los datos del proveedor en el estado del store.
   * 
   * @param proveedor Arreglo de datos del proveedor.
   */
  public setProveedor(proveedor: tableData[]) {
    this.update((state) => ({
      ...state,
      Proveedor: proveedor,
    }));
  }

  /**
   * Establece los datos del facturador en el estado del store.
   * 
   * @param facturador Arreglo de datos del facturador.
   */
  public setFacturador(facturador: tableData[]) {
    this.update((state) => ({
      ...state,
      Facturador: facturador,
    }));
  }
}
