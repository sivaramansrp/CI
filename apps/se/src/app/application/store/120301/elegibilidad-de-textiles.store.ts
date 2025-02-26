import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ElegibilidadDeTextiles, ImportadorForm, FacturaForm, FitosanitarioForm, formularioAsociacionFactura, HistoricoFabricantesForm, ElegibilidadDeTextilesState } from '../../../../../../../libs/shared/data-access-user/src/core/models/120301/elegibilidad-de-textiles.model';



@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'elegibilidadDeTextiles' })
export class ElegibilidadDeTextilesStore extends Store<ElegibilidadDeTextilesState> {
  constructor() {
    super({
      textileSolicitudCargaUtil: {
        importadorForm: {} as ImportadorForm,
        facturaForm: {} as FacturaForm,
        fitosanitarioForm: {} as FitosanitarioForm,
        formularioAsociacionFactura: {} as formularioAsociacionFactura,
        historicoFabricantesForm: {} as HistoricoFabricantesForm
      }
    });
  }
}
