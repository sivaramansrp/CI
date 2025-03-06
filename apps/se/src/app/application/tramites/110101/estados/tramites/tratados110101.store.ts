import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

interface Tratado {
  pais: string;
  tratado: string;
  origen: string;
}

export interface TratadosState {
  tratados: Tratado[];
}

/**
 * **Akita store para gestionar tratados**
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tratados' })
export class TratadosStore extends Store<TratadosState> {
  constructor() {
    super({ tratados: [] });
  }

  /**
   * **Agrega un nuevo tratado al estado**
   */
  addTratado(tratado: Tratado): void {
    this.update((state) => ({
      tratados: [...state.tratados, tratado]
    }));
  }

  /**
   * **Actualiza el último tratado en el estado**
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
