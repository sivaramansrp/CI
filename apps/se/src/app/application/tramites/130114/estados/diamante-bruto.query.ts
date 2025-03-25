import { DiamanteBrutoStore, DiamanteBruto } from './diamante-bruto.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class RefProcedureQuery extends Query<DiamanteBruto> {


  constructor(
    protected override store: DiamanteBrutoStore) {
    super(store);
  }
}