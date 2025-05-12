import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

/**
 * Interfaz que define el estado de la tienda `Tramite40401`.
 */
export interface Tramite40401State {
  /**
   * Paso activo en el flujo del trámite.
   */
  pasoActivo: number;

  /**
   * Pestaña activa en el flujo del trámite.
   */
  pestanaActiva: number;

  /**
   * País seleccionado en el trámite.
   */
  pais: string;

  /**
   * Código asociado al trámite.
   */
  codigo: string;

  /**
   * Información sobre la transportación en el trámite.
   */
  transportacion: string;
}

/**
 * Función que crea el estado inicial de la tienda `Tramite40401`.
 *
 * @returns {Tramite40401State} Estado inicial de la tienda.
 */
export function createInitialState(): Tramite40401State {
  return {
    pais: '',
    codigo: '',
    transportacion: '',
    pasoActivo: 1,
    pestanaActiva: 1,
  };
}

/**
 * Clase que representa la tienda `Tramite40401` para gestionar el estado del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite40401', resettable: true })
export class Tramite40401Store extends Store<Tramite40401State> {
  /**
   * Constructor de la tienda `Tramite40401`.
   *
   * Inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el país en el estado del trámite.
   *
   * @param {string} pais - País seleccionado.
   */
  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * Establece el código en el estado del trámite.
   *
   * @param {string} codigo - Código asociado al trámite.
   */
  public setCodigo(codigo: string): void {
    this.update((state) => ({
      ...state,
      codigo,
    }));
  }

  /**
   * Establece la información de transportación en el estado del trámite.
   *
   * @param {string} transportacion - Información sobre la transportación.
   */
  public setTransportacion(transportacion: string): void {
    this.update((state) => ({
      ...state,
      transportacion,
    }));
  }

  /**
   * Establece el paso activo en el estado del trámite.
   *
   * @param {number} pasoActivo - Número del paso activo.
   */
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }

  /**
   * Establece la pestaña activa en el estado del trámite.
   *
   * @param {number} pestanaActiva - Número de la pestaña activa.
   */
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }
}