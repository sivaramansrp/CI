import { RefProcedureStore, RefProcedureState } from './130115.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class RefProcedureQuery extends Query<RefProcedureState> {


  constructor(
    protected override store: RefProcedureStore) {
    super(store);
  }
}