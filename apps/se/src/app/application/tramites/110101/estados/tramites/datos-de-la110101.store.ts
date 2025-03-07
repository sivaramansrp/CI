import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Interfaz FormMercancia**
 * 
 * Representa la estructura del formulario para la mercancía.
 */
export interface FormMercancia {
  /**
   * **Nombre Comercial**  
   * Nombre comercial de la mercancía.
   */
  nombreComercial: string;

  /**
   * **Nombre en Inglés**  
   * Nombre de la mercancía en inglés.
   */
  nombreIngles: string;

  /**
   * **Fracción Arancelaria**  
   * Código de fracción arancelaria correspondiente a la mercancía.
   */
  fraccionArancelaria: string;

  /**
   * **Descripción** *(Opcional)*  
   * Descripción detallada de la mercancía.
   */
  descripcion?: string;

  /**
   * **Valor de Transacción**  
   * Valor monetario de la mercancía en la transacción.
   */
  valorTransaccion: string;
}

export interface DatosDeLaState {
  /**
  * **Valores del Formulario de Mercancía**  
  * 
  * Contiene los valores actuales del formulario de mercancía.  
  * Si no hay datos cargados, su valor será `null`.
  */
  formValues: FormMercancia | null;

}

/**
 * **Crea el estado inicial de DatosDeLaState**
 * 
 * Esta función devuelve el estado inicial con `formValues` como `null`,
 * indicando que inicialmente no hay datos cargados en el formulario.
 * 
 * @returns {DatosDeLaState} Estado inicial del store.
 */
export function createInitialState(): DatosDeLaState {
  return {
    formValues: null, // Inicialmente no hay datos cargados.
  };
}

/**
 * **Store para gestionar el estado de DatosDeLa**
 * 
 * Esta clase extiende `Store<DatosDeLaState>` y se encarga de gestionar el estado 
 * de los datos relacionados con `DatosDeLa`. Se inicializa con el estado predeterminado
 * definido en `createInitialState()`.
 * 
 * - `@Injectable({ providedIn: 'root' })` permite que el servicio esté disponible en toda la aplicación.
 * - `@StoreConfig({ name: 'datosDeLa' })` define la configuración del store, asignándole un nombre.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosDeLa' })
export class DatosDeLaStore extends Store<DatosDeLaState> {
  constructor() {
    super(createInitialState());
  }
}
