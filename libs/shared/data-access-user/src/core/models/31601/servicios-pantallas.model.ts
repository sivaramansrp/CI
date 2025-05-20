/**
 * Representa la acción de un botón en el wizard.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Datos de pago asociados a una transacción.
 */
export interface PagoData {
  claveReferencia: string;
  numeroOperacion: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  fechaPago: string;
  importePago: string | number;
}
/**
 * Representa un tipo de documento.
 */
export interface Tipos {
  tiposData: string; // Tipo de documento.
}
/**
 * Datos personales de una persona.
 */
export interface Personas {
  rfc: string; // RFC de la persona
  curp: string; // CURP de la persona
  nombre: string; // Nombre de la persona
  apellidoPaterno: string; // Apellido paterno de la persona
  apellidoMaterno: string; // Apellido materno de la persona
}
/**
 * Estructura para representar datos de una tabla.
 */
export interface TableData {
  tableHeader: string[];
  tableBody: TableBodyRow[];
}
/**
 * Fila del cuerpo de la tabla con sus celdas.
 */
export interface TableBodyRow {
  tbodyData: string[][];
}
