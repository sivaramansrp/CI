import { DatosAdicionalesState} from '../tramites/datos-adicionales110101.store';
import {DatosAdicionalesStore } from '../tramites/datos-adicionales110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosAdicionalesQuery extends Query<DatosAdicionalesState> {
  constructor(protected override store: DatosAdicionalesStore) {
    super(store);
  }

  /**
   * Observable to get form values from state.
   */
  get formValues$(): Observable<DatosAdicionalesState['formValues']> {
    return this.select(state => state.formValues);
  }
}
