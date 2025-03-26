export interface ScianData {
  clave: string;
  descripcion: string;
}
export interface PreOperativo {
  label: string;
  value: string;
}

export interface DatosProducto {
  clasificacionProducto: string;
  especificarClasificacionProducto: string;
  marcaComercialODenominacionDistintiva: string;
  denominacionComunInternacionalODenominacionGenerica: string;
  tipoProducto: string;
  estadoFisico: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidadMedidaComercializacion: string;
  cantidadUMC: number;
  usoEspecifico: string;
  porcentajeConcentracion: number;
  valorComercialDolares: number;
  fechaMovimiento: Date;
  presentacionFarmaceuticaOTipoEnvase: string;
  paisDestino: string;
  paisProcedencia: string;
  paisOrigen: string;
}

