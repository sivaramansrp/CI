import { Solicitud10301State, Tramite10301Store } from './tramite10301.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite10301Query extends Query<Solicitud10301State> {
  constructor(protected override store: Tramite10301Store) {
    super(store);
  }

  selectSolicitud$ = this.select((state) => {
    return state;
  });

  selectManifesto$ = this.select((state) => state.manifesto);
  selectAduana$ = this.select((state) => state.aduana);
  selectAno$ = this.select((state) => state.ano);
  selectCondicion$ = this.select((state) => state.condicion);
  selectPais$ = this.select((state) => state.pais);
  selectTipoDocumento$ = this.select((state) => state.tipoDocumento);
  selectFechasSeleccionadas$ = this.select(
    (state) => state.fechasSeleccionadas
  );
  selectFinesElegidos$ = this.select((state) => state.finesElegidos);
  selectElegidosSeleccionados$ = this.select(
    (state) => state.elegidosSeleccionados
  );
  selectSelectRangoDias$ = this.select((state) => state.selectRangoDias);
  selectFechasDatos$ = this.select((state) => state.fechasDatos);
  selectFecha$ = this.select((state) => state.fecha);
  selectFechaSeleccionada$ = this.select((state) => state.fechaSeleccionada);
  selectShowTabla$ = this.select((state) => state.showTabla);
  selectIsPopupOpen$ = this.select((state) => state.isPopupOpen);
  selectIsPopupClose$ = this.select((state) => state.isPopupClose);
  selectValorSeleccionado$ = this.select((state) => state.valorSeleccionado);
  selectDocumento$ = this.select((state) => state.documentos);

}
