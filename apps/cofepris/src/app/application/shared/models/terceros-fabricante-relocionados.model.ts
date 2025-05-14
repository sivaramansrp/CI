import { TablaDatos } from "./terceros-fabricante.model";

/**
 * Modelo que extiende a tableData, incluyendo información sobre la selección de la fila.
 * Indica si la fila está seleccionada o no.
 */
export interface DatosSeleccionados extends TablaDatos {

  checked: boolean;
}
/*
  * Interfaz que representa la estructura de datos de un fabricante.
  * Contiene información detallada sobre el fabricante, incluyendo su nacionalidad,
  * tipo de persona, RFC, CURP, nombre, dirección y otros datos relevantes.
  */

export interface FabricanteRowData {
  tercerosNacionalidad: string;
  tipoPersona: string;
  rfc: string;
  curp: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  denominacionRazonSocial: string;
  pais: string;
  extranjeroEstado: string;
  estadoLocalidad: string;
  municipioAlcaldia: string;
  localidad: string;
  entidadFederativa: string;
  codigoPostaloEquivalente: string;
  colonia: string;
  coloniaoEquivalente: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
}