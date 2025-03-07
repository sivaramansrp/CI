import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Interfaz que representa la estructura del formulario de Datos Adicionales**
 *
 * - `entidad`: Representa la entidad a la que pertenece la información.
 * - `representacion`: Indica la representación asociada a la entidad.
 *
 * Esta interfaz define la estructura de los datos utilizados en el formulario correspondiente.
 */
export interface DatosAdicionalesForm {
  entidad: string;
  representacion: string;
}

/**
 * **Interfaz que representa el estado de Datos Adicionales**
 *
 * - `formValues`: Contiene los valores del formulario de Datos Adicionales.
 *    - Si es `null`, significa que aún no hay datos cargados en el estado.
 *
 * Esta interfaz define la estructura del estado en la gestión de estado de la aplicación.
 */
export interface DatosAdicionalesState {
  formValues: DatosAdicionalesForm | null;
}

/**
 * **Función para crear el estado inicial de Datos Adicionales**
 *
 * - Establece `formValues` en `null` al inicio, indicando que no hay datos cargados.
 * - Esta función se usa para inicializar el estado en el store.
 *
 * @returns {DatosAdicionalesState} Estado inicial con `formValues` en `null`.
 */
export function createInitialState(): DatosAdicionalesState {
  return {
    formValues: null,
  };
}

/**
 * **Store para gestionar el estado de Datos Adicionales**
 *
 * - Utiliza Akita para manejar el estado de los datos adicionales en la aplicación.
 * - Se inicializa con el estado predeterminado utilizando `createInitialState()`.
 * - Está disponible a nivel global gracias a `@Injectable({ providedIn: 'root' })`.
 *
 * @extends Store<DatosAdicionalesState>
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosAdicionales' })
export class DatosAdicionalesStore extends Store<DatosAdicionalesState> {
  /**
   * **Inicializa la tienda con el estado predeterminado**
   *
   * - Llama a la función `createInitialState()` para establecer el estado inicial.
   * - Garantiza que la tienda comienza con una estructura de datos definida.
   *
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

}

