/**
 * Interfaz que representa la estructura de un cupo, incluyendo detalles del producto, mecanismo y tipo.
 */
export interface Cupos {
  /** Cantidad asignada del cupo */
  cupo: number;
  /** Nombre del producto asociado al cupo */
  nombreProducto: string;
  /** Nombre del subproducto asociado al cupo */
  nombreSubproducto: string;
  /** Mecanismo utilizado para la asignación del cupo */
  mecanismoAsignacion: string;
  /** Tipo de cupo asignado */
  tipoCupo: string;
}
/**
 * Representa la configuración de un cupo con datos como folio, razón social,
 * estado, fabricante, importador, unidades y montos económicos asociados.
 * Funciona como contrato de datos para validar y gestionar la información.
 */
export interface ConfiguracionCertificados {
  idExpedicion: number;
  numCertificado: number;
  rfc: string;
  denominacion: string;
  numFolioOficio: string;
  numFolioTramite: string | null;
  estado: string;
  estadoCancelacion: number;
  montoAsignado: number;
  montoDisponible: number;
  montoExpedido: number;
  montoCancelado: number;
  representacionFederal: string;
  claveRepresentacionFederal: string;
  factorConversion: number;
  estadoTransmision: string | null;
  montoEjercidoCBP: number;
  fabricante: string;
  importador: string;
}
