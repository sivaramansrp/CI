import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Plantas } from '../modelos/registro-solicitud-immex.model';

/**
 * @interfaz
 * @nombre Tramites80210State
 * @descripción
 * Define la estructura del estado para el trámite 80210.
 * Contiene propiedades relacionadas con los datos del trámite, como información de pago, datos de vehículos, agentes y más.
 */
export interface Tramites80210State {

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
 * Crea y devuelve el estado inicial para el trámite 80210.
 *
 * @retorna {Tramites80210State} El estado inicial del trámite.
 */
export function createInitialState(): Tramites80210State {
  return {
    plantasDisponibles: [],
    plantasSeleccionadas: [],
    showPlantas: false,
  };
}

/**
 * @clase
 * @nombre Tramite80210Store
 * @descripción
 * Clase que extiende de `Store` de Akita para gestionar el estado del trámite 80210.
 * Proporciona métodos para actualizar diferentes partes del estado, como datos de vehículos, agentes y registros.
 *
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites80210', resettable: true })
export class Tramite80210Store extends Store<Tramites80210State> {
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
   * @param {Partial<Tramites30401State>} values - Valores parciales para actualizar el estado.
   */
  public establecerDatos(values: Partial<Tramites80210State>): void {    
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}
