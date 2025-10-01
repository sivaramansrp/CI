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
  /** Identificador de la solicitud actual. */
  idSolicitud: number | null;
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
 * @función
 * @nombre createInitialState
 * @descripción
 * Crea y devuelve el estado inicial para el trámite 80211.
 *
 * @retorna {Tramites80211State} El estado inicial del trámite.
 */
export function createInitialState(): Tramites80211State {
  return {
    plantasDisponibles: [],
    plantasSeleccionadas: [],
    showPlantas: false,
    idSolicitud: 0,
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
   * @nombre establecerDatos
   * @descripción
   * Actualiza el estado con los valores proporcionados.
   * 
   * @param {Partial<Tramites80211State>} values - Valores parciales para actualizar el estado.
   */
  public establecerDatos(values: Partial<Tramites80211State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
     /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }

}
