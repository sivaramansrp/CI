import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 32502
 * @returns Solicitud32502
 */
export interface Solicitud32502State {
  tipoBusqueda: string;
 
  /**
   * Estado de la solicitud.
   */
  adace: string;
  pais: string;
  anio: string;
  
}

export function createInitialState(): Solicitud32502State {
  return {
    adace: 'default',
   pais: '',
    anio: '',
    tipoBusqueda: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32505', resettable: true })
export class tramite32505Store extends Store<Solicitud32502State> {
  constructor() {
    super(createInitialState());
  }

  public setAdace(adace: string) {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }
  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }
  public setAnio(anio: string) {
    this.update((state) => ({
      ...state,
      anio,
    }));
  }
  public setTipoBusqueda(tipoBusqueda: string) {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }
 
}