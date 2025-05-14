import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Plantas } from '../modelos/registro-expansion.model';

/**
 * @interfaz
 * @nombre Tramites80211State
 * @descripción
 * Define la estructura del estado para el trámite 80211.
 * Contiene propiedades relacionadas con los datos del trámite, como información de pago, datos de vehículos, agentes y más.
 */
export interface Tramites80211State {
  /**
   * RFC asociado al trámite.
   */
  rfc: string;

  /**
   * Estado seleccionado en el trámite.
   */
  estados: string;

  /**
   * Lista de identificadores de plantas disponibles.
   */
  plantasDisponibles: Plantas[];

  /**
   * Lista de identificadores de plantas seleccionadas.
   */
  plantasSeleccionadas: Plantas[];

  /**
   * Indica si las plantas deben mostrarse en la interfaz.
   */
  showPlantas: boolean;
}

/**
 * Crea y devuelve el estado inicial para el trámite 80211.
 *
 * {Tramites80211State} El estado inicial del trámite.
 */
export function createInitialState(): Tramites80211State {
  return {
    rfc: '',
    estados: '',
    plantasDisponibles: [],
    plantasSeleccionadas: [],
    showPlantas: false,
  };
}

/**
 * @clase
 * @nombre Tramite80211Store
 * @descripción
 * Clase que extiende de `Store` de Akita para gestionar el estado del trámite 80211.
 * Proporciona métodos para actualizar diferentes partes del estado, como datos de vehículos, agentes y registros.
 *
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites80211', resettable: true })
export class Tramite80211Store extends Store<Tramites80211State> {
  /**
   * @constructor
   * @descripción
   * Constructor que inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @método
   * @nombre setRFC
   * @descripción
   * Actualiza el RFC en el estado global.
   *
   * @param rfc - RFC a establecer.
   */
  public setRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * @método
   * @nombre setEstado
   * @descripción
   * Actualiza el estado seleccionado en el estado global.
   *
   * @param estados - Estado a establecer.
   */
  public setEstado(estados: string): void {
    this.update((state) => ({
      ...state,
      estados,
    }));
  }

  /**
   * @método
   * @nombre setShowPlantas
   * @descripción
   * Actualiza la visibilidad de las plantas en el estado global.
   *
   * @param values - Valor booleano que indica si se deben mostrar las plantas.
   */
  public setShowPlantas(values: boolean): void {
    this.update((state) => ({
      ...state,
      showPlantas: values,
    }));
  }

  /**
   * @método
   * @nombre setPlantasDisponibles
   * @descripción
   * Actualiza la lista de plantas disponibles en el estado global.
   *
   * @param values - Lista de identificadores de plantas disponibles.
   */
  public setPlantasDisponibles(plantasDisponibles: Plantas[]): void {
    this.update((state) => ({
      ...state,
      plantasDisponibles: plantasDisponibles,
    }));
  }

  /**
   * @método
   * @nombre setPlantasSeleccionada
   * @descripción
   * Actualiza la lista de plantas seleccionadas en el estado global.
   *
   * @param values - Lista de identificadores de plantas seleccionadas.
   */
  public setPlantasSeleccionada(plantasSeleccionadas: Plantas[]): void {
    this.update((state) => ({
      ...state,
      plantasSeleccionadas: plantasSeleccionadas,
    }));
  }
}
