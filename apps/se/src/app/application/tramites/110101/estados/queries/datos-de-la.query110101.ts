import { DatosDeLaState } from '../tramites/datos-de-la110101.store';
import { DatosDeLaStore } from '../tramites/datos-de-la110101.store';
import { FormMercancia } from '../tramites/datos-de-la110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosDeLaQuery extends Query<DatosDeLaState> {
  constructor(protected override store: DatosDeLaStore) {
    super(store);
  }

  /** Returns an observable of form values */
  get formValues$(): Observable<FormMercancia | null> {
    return this.select(state => state.formValues);
  }
}
