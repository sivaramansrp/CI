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

/** 
 * **Estado de los datos de la mercancía**  
 * 
 * Representa la estructura de almacenamiento para los valores  
 * del formulario de mercancía dentro del estado de la aplicación.  
 */
export interface DatosMercanciaState {
  /**
   * **Valores actuales del formulario de mercancía**  
   * 
   * Contiene los datos ingresados en el formulario de mercancía.  
   * Si aún no se han registrado datos, su valor será `null`.  
   */
  formValues: FormMercancia | null;
}



/**
 * **Crea el estado inicial de DatosMercanciaState**
 * 
 * Esta función devuelve el estado inicial con `formValues` como `null`,
 * indicando que inicialmente no hay datos cargados en el formulario.
 * 
 * @returns {DatosMercanciaState} Estado inicial del store.
 */
export function createInitialState(): DatosMercanciaState {
  return {
    formValues: null, // Inicialmente no hay datos cargados.
  };
}

/**
 * **Store para gestionar el estado de DatosMercancia**
 * 
 * Esta clase extiende `Store<DatosMercanciaState>` y se encarga de gestionar el estado 
 * de los datos relacionados con `DatosMercancia`. Se inicializa con el estado predeterminado
 * definido en `createInitialState()`.
 * 
 * - `@Injectable({ providedIn: 'root' })` permite que el servicio esté disponible en toda la aplicación.
 * - `@StoreConfig({ name: 'DatosMercancia' })` define la configuración del store, asignándole un nombre.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'DatosMercancia' })
export class DatosMercanciaStore extends Store<DatosMercanciaState> {
  /**
  * **Constructor de la tienda**
  *
  * - Inicializa el estado de la tienda con los valores predeterminados definidos en `createInitialState()`.
  * - Garantiza que la tienda comience con una estructura de datos válida.
  *
  * @constructor
  */
  constructor() {
    super(createInitialState());
  }

  /**
   * **Actualiza los valores del formulario en el estado**
   * 
   * - Compara los valores actuales del estado con los nuevos valores.
   * - Si hay cambios, actualiza el estado con los nuevos datos.
   * - Evita actualizaciones innecesarias cuando los datos son iguales.
   * 
   * @param nuevosValores - Nuevos valores del formulario de mercancía.
   */
  actualizarValoresFormulario(nuevosValores: FormMercancia): void {
    const VALORESACTUALES = this.getValue().formValues;
    // Solo actualiza el estado si hay cambios
    if (JSON.stringify(VALORESACTUALES) !== JSON.stringify(nuevosValores)) {
      this.update({ formValues: nuevosValores });
    }
  }


}
