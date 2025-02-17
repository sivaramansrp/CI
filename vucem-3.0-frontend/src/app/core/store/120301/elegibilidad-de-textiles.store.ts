import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ElegibilidadDeTextiles, ImportadorForm, FacturaForm, FitosanitarioForm, FacturaAssociationForm, HistoricoFabricantesForm } from '../../models/120301/elegibilidad-de-textiles.model';

export interface ElegibilidadDeTextilesState {
  textileSolicitudCargaUtil: ElegibilidadDeTextiles;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'elegibilidadDeTextiles' })
export class ElegibilidadDeTextilesStore extends Store<ElegibilidadDeTextilesState> {
  constructor() {
    super({
      textileSolicitudCargaUtil: {
        importadorForm: {} as ImportadorForm,
        facturaForm: {} as FacturaForm,
        fitosanitarioForm: {} as FitosanitarioForm,
        facturaAssociationForm: {} as FacturaAssociationForm,
        historicoFabricantesForm: {} as HistoricoFabricantesForm
      }
    });
  }
}
