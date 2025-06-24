/**
 * Interfaz que representa una lista de pasos en un asistente.
 * 
 */
export interface ListaPasosWizard {
  /**
 * @property {number} indice - El índice del paso en el asistente.
 */
  indice: number;
  /**
 * @property {string} titulo - El título del paso.
 */
  titulo: string;
  /**
 * @property {boolean} activo - Indica si el paso está activo.
 */
  activo: boolean;
  /**
 * Interfaz que representa una lista de pasos en un asistente.
 * 
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
  completado: boolean;
}
/**
 * @interface DatosGenerales
 * @description Representa los datos generales relacionados con el trámite.
 * 
 * @property {string} fraccionArancelaria - Fracción arancelaria asociada al trámite.
 * @property {string} descdelaFraccion - Descripción de la fracción arancelaria.
 * @property {number} cantidadUMT - Cantidad en la unidad de medida de transporte (UMT).
 * @property {string} UMT - Unidad de medida de transporte.
 * @property {number} cantidadUMC - Cantidad en la unidad de medida comercial (UMC).
 * @property {string} UMC - Unidad de medida comercial.
 * @property {string} paisdeOrigen - País de origen de la mercancía.
 * @property {string} entidadFederativadeOrigen - Entidad federativa de origen de la mercancía.
 * @property {string[]} municipiodeOrigen - Lista de municipios de origen de la mercancía.
 * @property {string} marcasDistintivas - Marcas distintivas de la mercancía.
 * @property {string} USO - Uso de la mercancía.
 */
export interface DatosGenerales {
  fraccionArancelaria: string;
  descdelaFraccion: string;
  cantidadUMT: string;
  UMT: string;
  cantidadUMC: string;
  UMC: string;
  paisdeOrigen: string;
  entidadFederativadeOrigen: string;
  municipiodeOrigen: string[];
  marcasDistintivas: string;
  USO: string;
}
/**
 * Representa la información de un destinatario.
 * 
 * Contiene los datos básicos de un destinatario, como su identificación, nombre o razón social,
 * teléfono, correo electrónico, domicilio y país.
 */
export interface Destinatario {
  id: number;
  nombreDenominacionORazonSocial: string;
  telefono: string;
  correoElectronico: string;
  domicilio: string | undefined;
  pais: string | undefined;
}

/**
 * Representa la respuesta de una consulta de destinatarios.
 * 
 * Contiene una lista de destinatarios obtenidos como resultado de una consulta.
 */
export interface DestinatarioRespuesta {
  datos: Destinatario[];
}
