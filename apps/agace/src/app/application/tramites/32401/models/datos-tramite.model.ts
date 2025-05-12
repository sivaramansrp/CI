/**
 * Representa un elemento de la lista de trámites.
 * Incluye una descripción y un identificador único.
 */
export interface TramiteList {
  /** Descripción del trámite. */
  descripcion: string;

  /** Identificador único del trámite. */
  id: number;
}

/**
 * Representa la respuesta de la API relacionada con los trámites.
 * Incluye un código, los datos del trámite y un mensaje adicional.
 */
export interface RespuestaTramite {
  /** Código de estado de la respuesta. */
  code: number;

  /** Lista de trámites obtenida de la API. */
  data: TramiteList[];

  /** Mensaje adicional proporcionado en la respuesta. */
  message: string;
}

/**
 * Representa un contenedor con su tipo e identificador único.
 */
export interface Contenedores {
  /** Tipo del contenedor. */
  tipo: string;

  /** Identificador único del contenedor. */
  id: string;
}

/**
 * Representa la respuesta de la API para un único contenedor.
 * Incluye un indicador de éxito, datos y un mensaje.
 */
export interface RespuestaContenedor {
  /** Indica si la operación fue exitosa. */
  success: boolean;

  /** Datos de la tabla asociados al contenedor. */
  datos: DatosDeLaTabla;

  /** Mensaje adicional proporcionado en la respuesta. */
  message: string;
}

/**
 * Representa la respuesta de la API para una lista de contenedores.
 * Incluye un código, los datos de los contenedores y un mensaje adicional.
 */
export interface RespuestaContenedores {
  /** Código de estado de la respuesta. */
  code: number;

  /** Lista de contenedores obtenida de la API. */
  data: Contenedores[];

  /** Mensaje adicional proporcionado en la respuesta. */
  message: string;
}

/**
 * Representa los datos que se mostrarán en una tabla.
 * Incluye información del trámite y datos relacionados.
 */
export interface DatosDeLaTabla {
  /** Identificador único del registro de la tabla. */
  id: number;

  /** Folio del trámite asociado. */
  folioTramite: string;

  /** Tipo de trámite realizado. */
  tipoTramite: string;

  /** RFC del usuario asociado al trámite. */
  rfc: string;

  /** Razón social asociada al trámite. */
  razonSocial: string;

  /** Estado actual del trámite. */
  estadoDelTramite: string;
}

/**
 * Representa el folio del trámite y su tipo.
 */
export interface FolioTramite {
  /** Folio único del trámite. */
  folioTramite: string;

  /** Tipo de trámite realizado. */
  tipoTramite: string;
}

/**
 * Interfaz que representa los datos para capturar el texto libre.
 * Contiene detalles administrativos, dirección y otros campos relevantes.
 */
export interface CapturarElTextoLibre {
  /** Detalles administrativos, primera sección. */
  detalles_de_administracion_1: string;

  /** Detalles administrativos, segunda sección. */
  detalles_de_administracion_2: string;

  /** Detalles administrativos, tercera sección. */
  detalles_de_administracion_3: string;

  /** Campo para datos relacionados con el exterior. */
  exterior: string;

  /** Campo para datos del oficio. */
  officio: string;

  /** Ubicación en la Ciudad de México. */
  ciudad_de_mexico: string;

  /** Primera dirección proporcionada. */
  direccion_1: string;

  /** Segunda dirección proporcionada. */
  direccion_2: string;

  /** Identificación del texto libre. */
  identificacion: string;
}

/**
 * Representa un catálogo de selección con una lista de elementos.
 * Incluye un código, una lista de elementos y un mensaje adicional.
 */
export interface RequerimientoOpcions {
  /** Código de estado del catálogo. */
  label: string;
  /** Lista de elementos del catálogo. */
  value: number;
}
