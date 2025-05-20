/**
 * Representa la información de un servicio IMMEX.
 *
 * @property {string} [Servicio] - Nombre del servicio asociado.
 * @property {string} [RegistroContribuyentes] - Registro de contribuyentes relacionado.
 * @property {string} [DenominaciónSocial] - Denominación social de la empresa.
 * @property {string} [NumeroIMMEX] - Número del programa IMMEX.
 * @property {string} [AñoIMMEX] - Año de inicio del programa IMMEX.
 */
export interface ServicioInmex {
  Servicio?: string;
  RegistroContribuyentes?: string;
  DenominaciónSocial?: string;
  NumeroIMMEX?: string;
  AñoIMMEX?: string;
}

/**
 * Representa la información de un servicio.
 *
 * @property {string} [descripiónDelServicio] - Descripción del servicio.
 * @property {string} [descripcion] - Descripción adicional del servicio.
 * @property {string} [tipode] - Tipo de servicio.
 */
export interface Servicio {
  descripiónDelServicio?: string;
  descripcion?: string;
  tipode?: string;
}

/**
 * Interfaz que representa la información de los servicios.
 *
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Folio único asociado al servicio.
 * @property {string} ano - Año relacionado con el servicio.
 */
export interface InfoServicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * Interfaz que representa los datos de los servicios.
 *
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Folio único asociado al servicio.
 * @property {string} ano - Año relacionado con el servicio.
 */
export interface Servicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * Representa la estructura de los datos de respuesta.
 *
 * @property idsubmanufacturer - Identificador único del subfabricante.
 * @property infoServicios - Información detallada de los servicios asociados.
 */
export interface ResponseData {
  idsubmanufacturer: string;
  infoServicios: InfoServicios;
}

/**
 * Representa la respuesta de una API.
 *
 * @property {number} code - Código de estado de la respuesta.
 * @property {ResponseData} data - Datos específicos de la respuesta.
 * @property {InfoServicios} infoServicios - Información adicional sobre los servicios relacionados.
 */
export interface ApiResponse {
  code: number;
  data: ResponseData;
  infoServicios: InfoServicios;
}

/**
 * Representa la estructura de una acción asociada a un botón.
 *
 * @property {string} accion - Describe la acción que se ejecutará al interactuar con el botón.
 * @property {number} valor - Representa un valor numérico asociado a la acción del botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}
