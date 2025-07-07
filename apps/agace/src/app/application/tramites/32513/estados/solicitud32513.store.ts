import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Estado centralizado para la solicitud 32513.
 * Contiene todos los campos necesarios para el llenado del formulario correspondiente.
 */
export interface Solicitud32513State {
  
  descripcionMercancia?: string; 
  porcentajeDesperdicio?: string;

}

/**
 * Función que crea el estado inicial de la solicitud.
 * Esta función devuelve un objeto vacío que representa el estado inicial
 * de la solicitud, el cual puede ser modificado posteriormente.
 *
 * @returns {Solicitud32513State} Estado inicial de la solicitud.
 */
export function createInitialSolicitudState(): Solicitud32513State {
  return {
    descripcionMercancia: '', // Descripción de la mercancía, inicialmente vacío
    porcentajeDesperdicio: '' // Porcentaje de desperdicio, inicialmente 0
  };
}
@Injectable({
  providedIn: 'root',
})

@StoreConfig({
  name: 'solicitud32513', // Nombre de la configuración para el store
  resettable: true, // Habilita la opción de restablecer el estado del store
})
export class Solicitud32513Store extends Store<Solicitud32513State> {

  constructor() {
    // Llama al constructor de la clase padre Store con el estado inicial
    super(createInitialSolicitudState());
  }

  public setDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  public setPorcentajeDesperdicio(porcentajeDesperdicio: string): void {
    this.update((state) => ({
      ...state,
      porcentajeDesperdicio,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
