import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 140111
 * @returns Tramite140111
 */
export interface Tramite140111State {
  motivoRenunciaDeDerechos: string;
  mercacniaSolicitudControlar:boolean;
}

export function createInitialState(): Tramite140111State {
  return {
    motivoRenunciaDeDerechos: '',
    mercacniaSolicitudControlar:true
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite140111', resettable: true })
export class Tramite140111Store extends Store<Tramite140111State> {
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
