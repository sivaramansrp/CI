import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ImportadorExportadorState, createInitialState } from './ImportadorExportador.model';

export interface TramiteState {
  aduana: string | null;
  ano: string | null;
  condicion: string | null;
  pais: string | null;
  finesElegidos: string[];
  elegidosSeleccionados: string[];
  selectRangoDias: string[];
  fechasSeleccionadas: string[];
  fechasDatos: string[];
  fecha: string | null;
  fechaSeleccionada: string | null;
  showTabla: boolean;
  isPopupOpen: boolean;
  isPopupClose: boolean;
  valorSeleccionado: string | null;
}

export function createInitialTramiteState(): TramiteState {
  return {
    aduana: null,
    ano: null,
    condicion: null,
    pais: null,
    finesElegidos: [],
    elegidosSeleccionados: [],
    selectRangoDias: [],
    fechasSeleccionadas: [],
    fechasDatos: [],
    fecha: null,
    fechaSeleccionada: null,
    showTabla: true,
    isPopupOpen: false,
    isPopupClose: true,
    valorSeleccionado: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'importadorExportador' })
export class ImportadorExportadorStore extends Store<ImportadorExportadorState> {
  constructor() {
    super(createInitialState());
  }
}