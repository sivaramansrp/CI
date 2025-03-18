import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Estructura del formulario de Datos Adicionales**  
 * 
 * Define los campos requeridos para capturar la información  
 * relacionada con la entidad y su representación.
 */
export interface DatosAdicionalesForm {
  /** Nombre de la entidad asociada. */
  entidad: string;

  /** Representación legal o administrativa de la entidad. */
  representacion: string;
}


/**
 * **Estado de Datos Adicionales**  
 * 
 * Representa el estado de los valores del formulario de datos adicionales.  
 * Si no hay datos almacenados, el valor será `null`.
 */
export interface DatosAdicionalesState {
  /** Valores actuales del formulario de datos adicionales. */
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

  /**
   * **Actualiza los valores del formulario en la tienda (store)**
   *
   * - Recibe un objeto `DatosAdicionalesForm` con los nuevos valores del formulario.
   * - Utiliza `this.update()` para modificar el estado en la store.
   * - Se debe llamar a este método cuando los valores del formulario cambien y sea necesario almacenarlos.
   *
   * @param {DatosAdicionalesForm} nuevosValoresFormulario - Nuevos valores del formulario.
   */
  actualizarValoresFormulario(nuevosValoresFormulario: DatosAdicionalesForm): void {
    this.update({ formValues: nuevosValoresFormulario });
  }

}

