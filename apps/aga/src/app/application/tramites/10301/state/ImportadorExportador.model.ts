export interface ImportadorExportadorState {
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

export function createInitialState(): ImportadorExportadorState {
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