export interface datosDeMercancias {
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  nicoDescripcion: string;
  cantidadSolicitadaUMT: number;
  unidadMedidaUMT: string;
  cantidadTotalUMT: number;
  saldoPendiente: number;
  selected?: boolean;
}

export interface carrosDeFerrocarril {
  idInspeccionFisica: number;
  numeroAutorizacion: string;
  numeroPartidaMercancia: string;
  numeroTotalCarros: number;
}

export interface historialInspeccionFisica {
  numeroPartidaMercancia: string;
  fraccionArancelaria: string;
  nico: string;
  cantidadUmt: string;
  cantidadInspeccion: string;
  saldoPendiente: string;
  fechaInspeccionString: string;
}

export interface solicitud {
  fechaCreacion: string;
  mercancia: string;
  cantidad: string;
  proovedor: string;
}

export interface mercanciaTablaData {
  hMercanciaTabla :string[];
  dMercanciaBody:datosDeMercancias[];
}

export interface cargarDatosIniciales {
  hHistorialinspeccion: string[];
  dHistorialInspecciones: historialInspeccionFisica[];
  dCarrosDeFerrocarril: carrosDeFerrocarril[];
  hCarroFerrocarril: string[];
  hSolicitud: string[];
  dSolicitud: solicitud[];
  hMerchandise: string[];
  dMercancia: datosDeMercancias[];
}