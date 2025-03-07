import { RepresentacionFederaState, RepresentacionFederaStore } from '../store/representacion-federal.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class RepresentacionFederaQuery extends Query<RepresentacionFederaState> {

  
  selectEstado$ = this.select((state) => {
    return state.estado;
  });

  selectRepresentacion$ = this.select((state)=> {
    return state.representacion;
  })

  constructor(
    protected override store: RepresentacionFederaStore) {
    super(store);
  }
}
