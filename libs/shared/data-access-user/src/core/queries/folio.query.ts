import { FolioState, FolioStore } from '../estados/folio.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
//import { FolioState, FolioStore } from './folio.store';

@Injectable({ providedIn: 'root' })
export class FolioQuery extends Query<FolioState> {
  constructor(protected override store: FolioStore) {
    super(store);
  }

  // Selector para obtener el folio
  getFolio() {
    return this.select(state => state.folio);
  }

  // Método para obtener el folio de forma sincrónica
  getFolioSync(): string | null {
    return this.getValue().folio;
  }
}