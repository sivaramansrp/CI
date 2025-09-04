import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa un catálogo genérico.
 * Un catálogo contiene un identificador único y una descripción asociada.
 */
export interface Catalogo {
  /**
   * Identificador único del catálogo.
   * @type {number}
   */
  id: number;

  /**
   * Descripción del catálogo.
   * @type {string}
   */
  descripcion: string;
}

/**
 * Interfaz que representa el estado inicial de la solicitud 90304.
 */
export interface Solicitud90304State {
  /**
   * Nombre del organismo público.
   */
  isBaja: boolean;

  /**
   * Datos relacionados con la mercancía.
   */
  datosDelMercancia: [];
}

/**
 * Función que crea el estado inicial de la solicitud 90304.
 * @returns Estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud90304State {
  return {
    isBaja: true,
    datosDelMercancia: [],
  };
}

/**
 * Clase que representa el store para manejar el estado de la solicitud 90304.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite90304', resettable: true })
export class Tramite90304Store extends Store<Solicitud90304State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el valor de isBaja.
   * @param isBaja Valor a establecer.
   */
  public setIsBaja(isBaja: boolean): void {
    this.update((state) => ({
      ...state,
      isBaja,
    }));
  }

  /**
   * Establece los datos del contenedor.
   * @param datosDelMercancia Datos del contenedor.
   */
  public setDelMercancia(datosDelMercancia: []): void {
    this.update((state) => ({
      ...state,
      datosDelMercancia,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
