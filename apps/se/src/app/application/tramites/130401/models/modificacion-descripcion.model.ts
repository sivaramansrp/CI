/**
 * Representa una acción de un botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Representa una lista de elementos de un catálogo.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}
/**
 * Representa un elemento de un catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
export interface DatosSolicitud {
  numeroFolioTramiteOriginal: string;
  solicitud: string;
  regimen: string;
  clasificacionRegimen: string;
  condicionMercancia: string;
  mercanciaDescripcion: string;
  fraccionArancelaria: string;
  unidadMedidaComercial: string;
  unidadesAutorizadas: string;
  importeFacturaAutorizadoUSD: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  representacionFederal: string;
}
export interface SolicitudTablaDatos {
  id: number;
  cantidad: string;
  descripcionAutorizada: string;
  precioUnitarioUSD: string;
  totalUSD: string;
}
export interface PartidasLista {
  datos: SolicitudTablaDatos[]
}
export interface DatosArancelaria {
  id: number;
  fraccionArancelaria: string;
  descripcion: string;
}
export interface ArancelariaLista {
  datos: DatosArancelaria[]
}
export interface Solicitud {
  numeroFolioTramiteOriginal: string;
  solicitud: string;
  regimen: string;
  clasificacionRegimen: string;
  condicionMercancia: string;
  mercanciaDescripcion: string;
  fraccionArancelaria: string;
  unidadMedidaComercial: string;
  unidadesAutorizadas: string;
  importeFacturaAutorizadoUSD: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  representacionFederal: string;
}
export interface SolicitudLista {
  datos: Solicitud
}