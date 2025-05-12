import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { Tramite260204State } from '../stores/tramite260204Store.store';
import { Tramite260204Store } from '../stores/tramite260204Store.store';

@Injectable({ providedIn: 'root' })
export class Tramite260204Query extends Query<Tramite260204State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260204Store) {
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
}
