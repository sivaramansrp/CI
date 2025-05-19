import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la Solicitud31910.
 * Contiene los datos relacionados con la solicitud, como justificacion, destinatarios y detalles de pago.
 */
export interface Solicitud31910State {
  /**
   * justificacion relacionadas con la solicitud.
   */
  justificacion: string;
}

/**
 * Función para crear el estado inicial de la Solicitud31910.
 * Retorna un objeto con los valores iniciales del estado.
 */
export function createInitialState(): Solicitud31910State {
  return {
    justificacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31910', resettable: true })
export class Tramite31910Store extends Store<Solicitud31910State> {
  /**
   * Crea una instancia de Tramite31910Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }


  /**
   * Actualiza el estado de la solicitud con los valores proporcionados.
   * Param valores Objeto parcial con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<Solicitud31910State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}