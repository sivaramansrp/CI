/**
 * @interface Aduanas
 * @description Representa la información de una aduana.
 * 
 * @property {string} descripcion - Descripción de la aduana.
 * @property {number} id - Identificador único de la aduana.
 */
export interface Aduanas {
  descripcion: string;
  id: number;
}

/**
 * @interface Contenedores
 * @description Representa la información de un contenedor.
 * 
 * @property {string} tipo - Tipo de contenedor.
 * @property {string} id - Identificador único del contenedor.
 */
export interface Contenedores {
  tipo: string;
  id: string;
}

/**
 * @interface DatosDelContenedor
 * @description Representa los datos detallados de un contenedor.
 * 
 * @property {number} id - Identificador único del contenedor.
 * @property {string} inicialesEquipo - Iniciales del equipo.
 * @property {number} numeroEquipo - Número del equipo.
 * @property {number} digitoVerificador - Dígito verificador del equipo.
 * @property {string} tipoEquipo - Tipo de equipo.
 * @property {number} aduana - Identificador de la aduana asociada.
 * @property {string} fechaIngreso - Fecha de ingreso del contenedor.
 * @property {string} vigencia - Vigencia del contenedor.
 * @property {string} estadoConstancia - Estado de la constancia.
 * @property {string} existeEnVUCEM - Indica si existe en VUCEM.
 * @property {string} idConstancia - Identificador de la constancia.
 * @property {string} numeroManifiesto - Número del manifiesto.
 * @property {string} idSolicitud - Identificador de la solicitud.
 * @property {string} fechaInicio - Fecha de inicio.
 */
export interface DatosDelContenedor {
  id: number;
  inicialesEquipo: string;
  numeroEquipo: number;
  digitoVerificador: number;
  tipoEquipo: string;
  aduana: number;
  fechaIngreso: string;
  vigencia: string;
  estadoConstancia: string;
  existeEnVUCEM: string;
  idConstancia: string;
  numeroManifiesto: string;
  idSolicitud: string;
  fechaInicio: string;
}

/**
 * @interface GridContenedores
 * @description Representa los datos de un contenedor en formato de tabla.
 * 
 * @property {number} id - Identificador único del contenedor.
 * @property {string} inicialesContenedor - Iniciales del contenedor.
 * @property {number} numeroContenedor - Número del contenedor.
 * @property {string} digitoVerificador - Dígito verificador del contenedor.
 * @property {number} digito - Dígito asociado al contenedor.
 * @property {string} tipoContenedor - Tipo del contenedor.
 * @property {string} estadoConstancia - Estado de la constancia del contenedor.
 * @property {number} aduana - Identificador de la aduana asociada.
 * @property {string} existeEnVUCEM - Indica si el contenedor existe en VUCEM.
 * @property {string} idConstancia - Identificador de la constancia.
 */
export interface GridContenedores {
  id?: number;
  inicialesContenedor: string;
  numeroContenedor: number;
  digitoVerificador?: string;
  digito: number;
  tipoContenedor: string;
  estadoConstancia?: string;
  aduana: number;
  existeEnVUCEM?: string;
  idConstancia?: string;
}

/**
 * @interface RespuestaContenedor
 * @description Representa la respuesta de una consulta sobre un contenedor.
 * 
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {DatosDelContenedor} datos - Datos del contenedor.
 * @property {string} message - Mensaje de la respuesta.
 */
export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDelContenedor;
  message: string;
}

/**
 * @interface RespuestaApi
 * @description Representa una respuesta genérica de la API.
 * 
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {string} message - Mensaje de la respuesta.
 */
export interface RespuestaApi {
  success: boolean;
  message: string;
}

/**
 * @interface RespuestaContenedores
 * @description Representa la respuesta de una consulta sobre múltiples contenedores.
 * 
 * @property {number} code - Código de la respuesta.
 * @property {Contenedores[]} data - Lista de contenedores.
 * @property {string} message - Mensaje de la respuesta.
 */
export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

/**
 * @interface RespuestaAduanas
 * @description Representa la respuesta de una consulta sobre aduanas.
 * 
 * @property {number} code - Código de la respuesta.
 * @property {Aduanas[]} data - Lista de aduanas.
 * @property {string} message - Mensaje de la respuesta.
 */
export interface RespuestaAduanas {
  code: number;
  data: Aduanas[];
  message: string;
}

/**
 * @interface DatosSolicitante
 * @description Representa los datos del solicitante.
 * 
 * @property {string} rfc - RFC del solicitante.
 * @property {string} denominacion - Denominación del solicitante.
 * @property {string} actividadEconomica - Actividad económica del solicitante.
 * @property {string} correoElectronico - Correo electrónico del solicitante.
 */
export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

/**
 * @interface RespuestaConsulta
 * @description Representa la respuesta de una consulta realizada en el trámite.
 * 
 * @property {boolean} success - Indica si la consulta fue exitosa.
 * @property {ConsultaDatos} datos - Contiene los datos obtenidos de la consulta.
 * @property {string} message - Mensaje asociado a la respuesta de la consulta.
 */
export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

/**
 * @interface ConsultaDatos
 * @description Representa los datos obtenidos de una consulta en el trámite.
 * 
 * @property {string} tipoBusqueda - Tipo de búsqueda realizada.
 * @property {string} aduana - Aduana asociada.
 * @property {string} fechaIngreso - Fecha de ingreso.
 * @property {string} inicialesContenedor - Iniciales del contenedor.
 * @property {string} numeroContenedor - Número del contenedor.
 * @property {string} tipoContenedor - Tipo del contenedor.
 * @property {GridContenedores[]} datosDelContenedor - Lista de datos detallados de los contenedores.
 */
export interface ConsultaDatos {
  tipoBusqueda: string;
  aduana: string;
  fechaIngreso: string;
  inicialesContenedor: string;
  numeroContenedor: string;
  tipoContenedor: string;
  datosDelContenedor: GridContenedores[];
}