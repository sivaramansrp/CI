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
 * Representa los datos generales de una mercancía.
 * 
 * Contiene información detallada como la fracción arancelaria, descripción, cantidades, unidades de medida,
 * nombres comunes y científicos, uso, país de origen, marcas distintivas, número y empaques.
 */
export interface DatosGenerales {
  id: number;
  fraccionArancelaria: string;
  descdelaFraccion: string;
  cantidadUMT: string;
  UMT: string;
  cantidadUMC: string;
  UMC: string;
  descripcionProducto: string;
  nombreComun: string;
  nombreCientifico: string;
  USO: string;
  paisdeOrigen: string;
  marcasDistintivas: string;
  numero: string;
  empaques: string;
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
/**
 * Representa la información de una mercancía en la tabla.
 * 
 * Contiene datos básicos como el identificador, la entidad federativa de origen y el municipio de origen.
 */
export interface TablaMercancia {
  id: number;
  federativaOrigen: string;
  origen: string;
}
