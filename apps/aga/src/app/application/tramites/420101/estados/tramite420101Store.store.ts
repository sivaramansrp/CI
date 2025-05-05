
import { Destinatario } from '../models/proveedores.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite420101State {
  /**
   * @type {Destinatario[]}
   * Lista de datos de destinatarios
   */
  destinatarioTableDatos: Destinatario[];

  /**
   * @type {number | undefined}
   * Índice de la pestaña seleccionada
   */
  tabSeleccionado?: number;
}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para la tienda del trámite 420101.
 * @returns {Tramite420101State} Estado inicial.
 */
export function createInitialState(): Tramite420101State {
  return {
    destinatarioTableDatos: [],
    tabSeleccionado: 1,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite420101', resettable: true })
/**
 * @class
 * @name Tramite420101Store
 * @description
 * Tienda para manejar el estado del trámite 420101. Proporciona métodos para actualizar
 * diferentes partes del estado.
 * @extends {Store<Tramite420101State>}
 */
export class Tramite420101Store extends Store<Tramite420101State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @method updateDestinatarioTablaDatos
   * @description Agrega nuevos fabricantes a la lista existente.
   * @param {Destinatario[]} newFabricantes - Lista de nuevos fabricantes.
   */
  public updateDestinatarioTablaDatos(newDestinatario: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioTableDatos: [
        ...state.destinatarioTableDatos,
        ...newDestinatario,
      ],
    }));
  }

  /**
   * @method updateTabSeleccionado
   * @description Actualiza el índice de la pestaña seleccionada.
   * @param {number} tabSeleccionado - Nuevo índice de la pestaña.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }
}
