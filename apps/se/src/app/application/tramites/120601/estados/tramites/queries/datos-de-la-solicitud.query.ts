import { DatosDeLaSolicitudState, DatosDeLaSolicitudStore } from '../store/datos-de-la-solicitud.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosDeLaSolicitudQuery extends Query<DatosDeLaSolicitudState> {

  
  selectTipoDeEmpresa$ = this.select((state) => {
    return state.tipoDeEmpresa;
  });

  constructor(
    protected override store: DatosDeLaSolicitudStore) {
    super(store);
  }
}