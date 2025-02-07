export interface DatosMercancia {
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unico: string;
  nicoDescripcion: string;
  cantidadSolicitadaUMT: number;
  unidadMedidaUMT: string;
  cantidadTotalUMT: number;
  saldoPendiente: number;
  selected?: boolean;
}

export interface CarroFerrocarril {
  idInspeccionFisica: number;
  numeroAutorizacion: string;
  numeroPartidaMercancia: string;
  numeroTotalCarros: number;
}

export interface InspeccionFisica {
  numeroPartidaMercancia: string;
  fraccionArancelaria: string;
  nico: string;
  cantidadUmt: string;
  cantidadInspeccion: string;
  saldoPendiente: string;
  fechaInspeccionString: string;
}

export interface Solicitud {
  fechaCreacion: string;
  mercancia: string;
  cantidad: string;
  proovedor: string;
}

export interface mercanciaTablaData {
  hMercanciaTabla :string[];
  dMercanciaBody:DatosMercancia[];
}
