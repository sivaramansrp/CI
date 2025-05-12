import { Tramite260214State, Tramite260214Store } from './tramite260214Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260214Query extends Query<Tramite260214State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260214Store) {
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
  public getTabSeleccionado$ = this.select(
    (state) => state.tabSeleccionado
  );
}
