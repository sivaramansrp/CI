/**
 * Representa una lista de trámites.
 */
export interface TramiteList {
  /**
   * Descripción del trámite.
   */
  descripcion: string;

  /**
   * Identificador único del trámite.
   */
  id: number;
}

/**
 * @interface RespuestaTramite
 * @description Representa la respuesta de un trámite en el sistema.
 * 
 * @property {number} code - Código de estado de la respuesta.
 * @property {TramiteList[]} data - Lista de trámites asociados a la respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface RespuestaTramite {
  code: number;
  data: TramiteList[]
  message: string;
}

/**
 * @interface Contenedores
 * @description Representa un contenedor en el sistema.
 * 
 * @property {string} tipo - Tipo de contenedor.
 * @property {string} id - Identificador único del contenedor.
 */
export interface Contenedores {
  tipo: string;
  id: string;
}

/**
 * @interface RespuestaContenedor
 * @description Representa la respuesta de un contenedor en el sistema.
 * 
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {DatosDeLaTabla} datos - Datos asociados al contenedor.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDeLaTabla;
  message: string;
}

/**
 * @interface RespuestaContenedores
 * @description Representa la respuesta de múltiples contenedores en el sistema.
 * 
 * @property {number} code - Código de estado de la respuesta.
 * @property {Contenedores[]} data - Lista de contenedores asociados a la respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

/**
 * @interface DatosDeLaTabla
 * @description Representa los datos de una tabla en el sistema.
 * 
 * @property {number} id - Identificador único de la tabla.
 * @property {string} folioDePrograma - Folio del programa asociado.
 * @property {string} tipoDePrograma - Tipo de programa asociado.
 */
export interface DatosDeLaTabla {
  id: number;
  folioDePrograma: string;
  tipoDePrograma: string;
}