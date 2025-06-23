import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 31601
 * @returns DatosPorRegimen31601
 */
export interface DatosPorRegimenAgaceState {
    comboBimestresUno: string | null;
    comboBimestresDos: string | null;
    comboBimestresTres: string | null;
}

export function crearEstadoInicial(): DatosPorRegimenAgaceState {
  return {
    comboBimestresUno: null,
    comboBimestresDos: null,
    comboBimestresTres: null
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramiteAgace', resettable: true })
export class TramiteAgaceStore extends Store<DatosPorRegimenAgaceState> {
  constructor() {
    super(crearEstadoInicial());
  }

  public establecerComboBimestresUno(comboBimestresUno: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresUno,
    }));
  }

  public establecerComboBimestresDos(comboBimestresDos: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresDos,
    }));
  }

  public establecerComboBimestresTres(comboBimestresTres: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresTres,
    }));
  }

 
}
