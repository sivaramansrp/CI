import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface FolioState {
  folio: string | null;
}

export function createInitialState(): FolioState {
  return {
    folio: null, // Valor inicial del folio
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'folio' })
export class FolioStore extends Store<FolioState> {
  constructor() {
    super(createInitialState());
  }
}