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
 * Interfaz que representa el estado inicial de la solicitud 230202.
 */
export interface Solicitud230202State {
  
  numeroDeCertificado: Catalogo[] | null;
  aduana: Catalogo[] | null;
  fechasSeleccionadas: Catalogo[] | null;
  pais: Catalogo[] | null;
  entidades: Catalogo[] | null;
  descripcionProducto: Catalogo[] | null;
  datosSolicitud: Catalogo[] | null;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidad: string;
  cantidadLetra: string;

}

/**
 * Función que crea el estado inicial de la solicitud 230202.
 * @returns Estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud230202State {
  return {
    numeroDeCertificado: null,
    aduana: null,
    fechasSeleccionadas: null,
    pais: null,
    entidades: null,
    descripcionProducto: null,
    datosSolicitud: [],
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidad: '',
    cantidadLetra: '',

  };
}

/**
 * Clase que representa el store para manejar el estado de la solicitud 230202.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230202', resettable: true })
export class Tramite230202Store extends Store<Solicitud230202State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece la lista de numeroDeCertificado en el estado.
   * @param numeroDeCertificado Lista de numeroDeCertificado.
   */
  public setNumeroDeCertificado(numeroDeCertificado: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      numeroDeCertificado,
    }));
  }

  /**
   * Establece la lista de aduanas en el estado.
   * @param aduana Lista de aduanas.
   */
  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setFechasSeleccionadas(fechasSeleccionadas: Catalogo[]) {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }

  public setPais(pais: Catalogo[]) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setEntidades (entidades: Catalogo[]) {
    this.update((state) => ({
      ...state,
      entidades,
    }));
  }

  public setDescripcionProducto (descripcionProducto: Catalogo[]) {
    this.update((state) => ({
      ...state,
      descripcionProducto,
    }));
  }

  public setDatosSolicitud(datosSolicitud: Catalogo[]) {
    this.update((state) => ({
      ...this.getValue(),
      datosSolicitud,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  public setCantidad(cantidad: string) {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  public setCantidadLetra(cantidadLetra: string) {
    this.update((state) => ({
      ...state,
      cantidadLetra,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
