import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface FormMercancia {
    nombreComercial: string;
    nombreIngles: string;
    fraccionArancelaria: string;
    descripcion?: string;
    valorTransaccion: string;
  }

export interface DatosDeLaState {
  formValues: FormMercancia | null;
}

export function createInitialState(): DatosDeLaState {
  return {
    formValues: null, // Initially empty
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'datosDeLa' })
export class DatosDeLaStore extends Store<DatosDeLaState> {
  constructor() {
    super(createInitialState());
  }
}
