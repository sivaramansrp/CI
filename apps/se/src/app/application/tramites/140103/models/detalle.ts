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
export interface ConfiguracionItem {
  folioOficioCertificado: string;
  nombreRazonSocial: string;
  estado: string;
  fabricante: string;
  importador: string;
  unidadPrimaria: number;
  montoExpediente: number;
  montocancelar: number;
  montoutilizado: number;
}
