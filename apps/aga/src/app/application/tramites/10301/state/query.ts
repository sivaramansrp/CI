import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TramiteState, TramiteStore } from './store';

@Injectable({ providedIn: 'root' })
export class TramiteQuery extends Query<TramiteState> {
  constructor(protected override store: TramiteStore) {
    super(store);
  }

  selectAduana$ = this.select(state => state.aduana);
  selectAno$ = this.select(state => state.ano);
  selectCondicion$ = this.select(state => state.condicion);
  selectPais$ = this.select(state => state.pais);
  selectFinesElegidos$ = this.select(state => state.finesElegidos);
  selectElegidosSeleccionados$ = this.select(state => state.elegidosSeleccionados);
  selectSelectRangoDias$ = this.select(state => state.selectRangoDias);
  selectFechasSeleccionadas$ = this.select(state => state.fechasSeleccionadas);
  selectFechasDatos$ = this.select(state => state.fechasDatos);
  selectFecha$ = this.select(state => state.fecha);
  selectFechaSeleccionada$ = this.select(state => state.fechaSeleccionada);
  selectShowTabla$ = this.select(state => state.showTabla);
  selectIsPopupOpen$ = this.select(state => state.isPopupOpen);
  selectIsPopupClose$ = this.select(state => state.isPopupClose);
  selectValorSeleccionado$ = this.select(state => state.valorSeleccionado);
}