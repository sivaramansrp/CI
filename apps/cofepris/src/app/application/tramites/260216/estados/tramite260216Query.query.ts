import { Tramite260216State, Tramite260216Store } from './tramite260216Store.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260216Query extends Query<Tramite260216State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite260216Store) {
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
