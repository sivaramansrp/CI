import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

interface Tratado {
  /** 
   * Nombre del país o bloque al que pertenece el tratado.
   */
  pais: string;

  /** 
   * Nombre del tratado o acuerdo comercial.
   */
  tratado: string;

  /** 
   * Criterio de origen aplicado en el tratado.
   */
  origen: string;
}


export interface TratadosState {
  /** 
 * Lista de tratados registrados en la aplicación.  
 * Cada tratado contiene información sobre el país, el acuerdo y el criterio de origen.
 */
  tratados: Tratado[];

}

/**
 * **Akita store para gestionar tratados**
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
