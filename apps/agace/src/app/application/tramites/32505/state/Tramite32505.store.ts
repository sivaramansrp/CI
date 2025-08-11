import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
}

/**
 * Estado inicial para la interfaz del trámite 32505.
 */
export interface Solicitud32505State {
 adace: string;
 pais: string;
 anio: string;
 tipoBusqueda: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 32505.
 * @returns Estado inicial de tipo `Solicitud32505State`.
 */
export function createInitialState(): Solicitud32505State {
  return {
    adace: '',
    pais: '',
    anio: '',
    tipoBusqueda: ''
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32505.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32505', resettable: true })
export class Tramite32505Store extends Store<Solicitud32505State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }
  /**
   * Actualiza el campo "adace" en el estado.
   * @param adace Nuevo valor para el campo "adace".
   */
  public setAdace(adace: string): void {
    this.update((state) => ({ ...state, adace }));
  }
  /**
   * Actualiza el campo "pais" en el estado.
   * @param pais Nuevo valor para el campo "pais".
   */
  public setPais(pais: string): void {
    this.update((state) => ({ ...state, pais }));
  }
  /**
   * Actualiza el campo "anio" en el estado.
   * @param anio Nuevo valor para el campo "anio".
   */
  public setAnio(anio: string): void {
    this.update((state) => ({ ...state, anio }));
  }
  /**
   * Actualiza el campo "tipoBusqueda" en el estado.
   * @param tipoBusqueda Nuevo valor para el campo "tipoBusqueda".
   */
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({ ...state, tipoBusqueda }));
  }
  
  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
