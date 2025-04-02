import { Tramite260205State, Tramite260205Store } from '../stores/tramite260205.store';
import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260205Query extends Query<Tramite260205State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260205Store) {
    super(store);
  }
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  public getFabricanteTablaDatos$ = this.select(
    (state) => state.fabricanteTablaDatos
  );
  public getDestinatarioFinalTablaDatos$ = this.select(
    (state) => state.destinatarioFinalTablaDatos
  );
  public getProveedorTablaDatos$ = this.select(
    (state) => state.proveedorTablaDatos
  );
  public getFacturadorTablaDatos$ = this.select(
    (state) => state.facturadorTablaDatos
  );

  public indicePrevioRuta$ = this.select((state) => state.indice);
}
