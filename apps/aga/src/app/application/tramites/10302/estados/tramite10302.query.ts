import { Solicitud10302State, Tramite10302Store } from './tramite10302.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite10302Query extends Query<Solicitud10302State> {
  /**
     * Selecciona el estado completo de la solicitud
     */
    selectSolicitud$ = this.select((state) => {
      return state;
    });
  
    /**Guarda el estado completo del formulario de la solicitud */
    constructor(
      protected override store: Tramite10302Store) {
      super(store);
    }

  // selectManifesto$ = this.select((state) => state.manifesto);
  selectAduana$ = this.select((state) => state.aduana);
  // selectAno$ = this.select((state) => state.ano);
  // selectCondicion$ = this.select((state) => state.condicion);
  // selectPais$ = this.select((state) => state.pais);
  // selectTipoDocumento$ = this.select((state) => state.tipoDocumento);
  selectFechasSeleccionadas$ = this.select(
    (state) => state.fechasSeleccionadas
  );
  // selectFinesElegidos$ = this.select((state) => state.finesElegidos);
  // selectElegidosSeleccionados$ = this.select(
  //   (state) => state.elegidosSeleccionados
  // );
  // selectSelectRangoDias$ = this.select((state) => state.selectRangoDias);
  // selectFechasDatos$ = this.select((state) => state.fechasDatos);
  // selectFecha$ = this.select((state) => state.fecha);
  // selectFechaSeleccionada$ = this.select((state) => state.fechaSeleccionada);
  // selectShowTabla$ = this.select((state) => state.showTabla);
  // selectIsPopupOpen$ = this.select((state) => state.isPopupOpen);
  // selectIsPopupClose$ = this.select((state) => state.isPopupClose);
  // selectValorSeleccionado$ = this.select((state) => state.valorSeleccionado);
  // selectDocumento$ = this.select((state) => state.documentos);

}
