import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '@libs/shared/data-access-user/src/core/models/260906/detos.model';

/**
 * Interfaz que define el estado de la tienda Sanitario260906.
 */
export interface Solicitud260906State {
  /** Referencia única asociada a la solicitud */
  referencia: string;
  /** Cadena de dependencia asociada */
  cadenaDependencia: string;
  /** Nombre del banco */
  banco: string;
  /** llave identificadora */
  llave: string;
  /** Tipo de operación de fetch */
  tipoFetch: string;
  /** Importe asociado */
  importe: string;
  /** Estado seleccionado */
  selectedEstado: CatalogoResponse | null;
  /** Clave seleccionada */
  setClave: CatalogoResponse | null;
  /** Descripción seleccionada */
  setDescripcion: CatalogoResponse | null;
  /** Clasificación específica seleccionada */
  setDespecificarClasificacion: Catalogo | null;
  /** Lista de fabricantes */
  Fabricante: TablaDatos[];
  /** Lista de destinatarios */
  Destinatario: TablaDatos[];
  /** Lista de proveedores */
  Proveedor: TablaDatos[];
  /** Lista de facturadores */
  Facturador: TablaDatos[];
}

/**
 * Función que crea el estado inicial de la tienda.
 * @returns El estado inicial de la tienda.
 */
export function createInitialState(): Solicitud260906State {
  return {
    referencia: '',
    cadenaDependencia: '',
    banco: '',
    llave: '',
    tipoFetch: '',
    importe: '',
    selectedEstado: null,
    setClave: null,
    setDescripcion: null,
    setDespecificarClasificacion: null,
    Fabricante: [],
    Destinatario: [],
    Proveedor: [],
    Facturador: []
  };
}

/**
 * Tienda que gestiona el estado de Sanitario260906.
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'sanitario260906Store',
  resettable: true
})
export class Sanitario260906Store extends Store<Solicitud260906State> {
  /**
   * Constructor que inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el campo `referencia` en el estado.
   * @param referencia Nueva referencia.
   */
  public setreferencia(referencia: string): void {
    this.update((state) => ({
      ...state,
      referencia
    }));
  }

  /**
   * Actualiza el campo `cadenaDependencia` en el estado.
   * @param cadenaDependencia Nueva cadena de dependencia.
   */
  public setcadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  /**
   * Actualiza el campo `banco` en el estado.
   * @param banco Nuevo nombre del banco.
   */
  public setbanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  /**
   * Actualiza el campo `llave` en el estado.
   * @param llave Nueva llave identificadora.
   */
  public setLlave(llave: string): void {
    this.update((state) => ({
      ...state,
      llave
    }));
  }

  /**
   * Actualiza el campo `tipoFetch` en el estado.
   * @param tipoFetch Nuevo tipo de fetch.
   */
  public settipoFetch(tipoFetch: string): void {
    this.update((state) => ({
      ...state,
      tipoFetch
    }));
  }

  /**
   * Actualiza el campo `importe` en el estado.
   * @param importe Nuevo importe.
   */
  public setimporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe
    }));
  }

  /**
   * Actualiza el campo `selectedEstado` en el estado.
   * @param selectedEstado Nuevo estado seleccionado.
   */
  public setSelectedEstado(selectedEstado: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado
    }));
  }

  /**
   * Actualiza el campo `setClave` en el estado.
   * @param selectedClave Nueva clave seleccionada.
   */
  public setClave(selectedClave: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setClave: selectedClave
    }));
  }

  /**
   * Actualiza el campo `setDescripcion` en el estado.
   * @param selectedDescripcion Nueva descripción seleccionada.
   */
  public setDescripcion(selectedDescripcion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setDescripcion: selectedDescripcion
    }));
  }

  /**
   * Actualiza el campo `setDespecificarClasificacion` en el estado.
   * @param selectedDespecificarClasificacion Nueva clasificación específica seleccionada.
   */
  public setDespecificarClasificacion(selectedDespecificarClasificacion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setDespecificarClasificacion: selectedDespecificarClasificacion
    }));
  }

  /**
   * Actualiza el campo `Fabricante` en el estado.
   * @param fabricante Nueva lista de fabricantes.
   */
  public setFabricante(fabricante: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Fabricante: fabricante
    }));
  }

  /**
   * Actualiza el campo `Destinatario` en el estado.
   * @param destinatario Nueva lista de destinatarios.
   */
  public setDestinatario(destinatario: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Destinatario: destinatario
    }));
  }

  /**
   * Actualiza el campo `Proveedor` en el estado.
   * @param proveedor Nueva lista de proveedores.
   */
  public setProveedor(proveedor: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Proveedor: proveedor
    }));
  }

  /**
   * Actualiza el campo `Facturador` en el estado.
   * @param facturador Nueva lista de facturadores.
   */
  public setFacturador(facturador: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Facturador: facturador
    }));
  }
}