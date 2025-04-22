
/**
 * Importaciones necesarias para el funcionamiento del store.
 */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '../../models/terceros-fabricante.model';


/**
 * Interfaz que define el estado de los terceros relacionados para el trámite.
 * Contiene arreglos de datos para fabricante, destinatario, proveedor y facturador.
 */
export interface TercerosRelacionadasState {
  /**
   * Datos del fabricante.
   */
  Fabricante: TablaDatos[];
  /**
   * Datos del destinatario.
   */
  Destinatario: TablaDatos[];
  /**
   * Datos del proveedor.
   */
  Proveedor: TablaDatos[];
  /**
   * Datos del facturador.
   */
  Facturador: TablaDatos[];
}

/**
 * Función que crea el estado inicial del store.
 * Inicializa todos los arreglos de datos como vacíos.
 * 
 * @returns Estado inicial del store.
 */
export function createInitialState(): TercerosRelacionadasState {
  return {
    Fabricante: [],
    Destinatario: [],
    Proveedor: [],
    Facturador: []
  };
}

/**
 * Store que gestiona el estado de los terceros relacionados para el trámite .
 * Se provee en el ámbito de la aplicación y permite reiniciar su estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tercerosRelacionadas', resettable: true })
export class TramiteRelacionadaseStore extends Store<TercerosRelacionadasState> {

  /**
   * Constructor del store.
   * Inicializa el estado del store con el estado inicial creado por la función `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece los datos del fabricante en el estado del store.
   * 
   * @param fabricante Arreglo de datos del fabricante.
   */
  public setFabricante(fabricante: TablaDatos[]) {
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
  public setDestinatario(destinatario: TablaDatos[]) {
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
  public setProveedor(proveedor: TablaDatos[]) {
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
  public setFacturador(facturador: TablaDatos[]) {
    this.update((state) => ({
      ...state,
      Facturador: facturador,
    }));
  }

}
