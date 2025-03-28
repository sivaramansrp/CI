import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { Tramite260203State, Tramite260203Store } from '../stores/tramite260203Store.store';

@Injectable({ providedIn: 'root' })
export class Tramite260203Query extends Query<Tramite260203State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260203Store) {
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
