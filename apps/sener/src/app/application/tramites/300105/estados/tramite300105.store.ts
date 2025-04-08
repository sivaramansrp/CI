import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 300105
 * @returns Tramite300105
 */
export interface Tramite300105State {
  motivoRenunciaDeDerechos: string;
  mercacniaSolicitudControlar:boolean;
}

export function createInitialState(): Tramite300105State {
  return {
    motivoRenunciaDeDerechos: '',
    mercacniaSolicitudControlar:true
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite300105', resettable: true })
export class Tramite300105Store extends Store<Tramite300105State> {
  constructor() {
    super(createInitialState());
  }

  setMotivoRenunciaDeDerechos(motivoRenunciaDeDerechos: string): void {
    this.update((state) => ({
      ...state,
      motivoRenunciaDeDerechos,
    }));
  }

}
