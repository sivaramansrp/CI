import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/** 
 * **Interfaz que representa un Tratado Comercial**  
 * 
 * Define la estructura de datos para almacenar información sobre los tratados  
 * comerciales entre países o bloques económicos.  
 */
interface Tratado {
  /** 
   * **Nombre del país o bloque al que pertenece el tratado**  
   * Indica la nación o región que forma parte del acuerdo comercial.  
   */
  pais: string;

  /** 
   * **Nombre del tratado o acuerdo comercial**  
   * Especifica el nombre del tratado firmado entre los países involucrados.  
   */
  tratado: string;

  /** 
   * **Criterio de origen aplicado en el tratado**  
   * Define la regla utilizada para determinar el origen de la mercancía.  
   */
  origen: string;
}


/**
 * **Estado de los tratados en la aplicación**
 * 
 * Representa la estructura del estado para los tratados, incluyendo una lista de tratados registrados.
 */
export interface TratadosState {
  /** 
   * **Lista de tratados registrados**  
   * Contiene información sobre el país, el acuerdo y el criterio de origen de cada tratado.
   */
  tratados: Tratado[];
}


/**
 * **Akita Store para gestionar tratados**
 *
 * Este store se encarga de administrar el estado de los tratados dentro de la aplicación.
 * Utiliza Akita para la gestión de estado reactivo, permitiendo la actualización y consulta 
 * de los datos de tratados en tiempo real.
 *
 * @@Injectable({ providedIn: 'root' }) - Hace que el store esté disponible en toda la aplicación.
 * @StoreConfig({ name: 'tratados' }) - Configura el store con el nombre 'tratados'.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tratados' })

export class TratadosStore extends Store<TratadosState> {
  /**
   * **Constructor de la tienda**
   *
   * - Inicializa el estado de la tienda con una lista vacía de tratados.
   * - Garantiza que la tienda comience con una estructura de datos válida.
   *
   * @constructor
   */
  constructor() {
    super({ tratados: [] });
  }


  /**
   * **Agrega un nuevo tratado al estado**
   * 
   * Este método actualiza el estado de la tienda agregando un nuevo tratado 
   * a la lista existente de tratados.
   * 
   * @param tratado - Objeto que contiene la información del tratado a agregar.
   */
  addTratado(tratado: Tratado): void {
    this.update((state) => ({
      tratados: [...state.tratados, tratado]
    }));
  }

  /**
   * **Actualiza el último tratado en el estado**
   * 
   * Este método reemplaza el último tratado en la lista con el nuevo tratado proporcionado.
   * Si la lista de tratados está vacía, agrega el tratado como el primero en la lista.
   * 
   * @param tratado - Objeto que contiene la información actualizada del tratado.
   */
  updateTratado(tratado: Tratado): void {
    this.update((state) => {
      const TRATADOSACTUALIZADOS = [...state.tratados];

      if (TRATADOSACTUALIZADOS.length > 0) {
        TRATADOSACTUALIZADOS[TRATADOSACTUALIZADOS.length - 1] = tratado;
      } else {
        TRATADOSACTUALIZADOS.push(tratado);
      }

      return { tratados: TRATADOSACTUALIZADOS };
    });
  }

}
