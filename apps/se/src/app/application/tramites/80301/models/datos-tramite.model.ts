/**
 * Representa una aduana con su descripción e identificador único.
 */
export interface Aduanas {
  /** Nombre o descripción de la aduana */
  descripcion: string;
  /** Identificador numérico de la aduana */
  id: number;
}

/**
 * Representa un tipo de contenedor con su identificador.
 */
export interface Contenedores {
  /** Tipo o categoría del contenedor (ej. seco, refrigerado, etc.) */
  tipo: string;
  /** Identificador del contenedor (posiblemente código único) */
  id: string;
}

/**
 * Contiene la información detallada de un contenedor registrado.
 */
export interface DatosDelContenedor {
  /** Identificador único del contenedor */
  id: number;
  /** Iniciales del equipo o prefijo del contenedor */
  inicialesEquipo: string;
  /** Número asignado al equipo */
  numeroEquipo: number;
  /** Dígito verificador del contenedor */
  digitoVerificador: number;
  /** Tipo del equipo (contenedor) */
  tipoEquipo: string;
  /** Identificador de la aduana asignada */
  aduana: number;
  /** Fecha de ingreso del contenedor */
  fechaIngreso: string;
  /** Fecha de vigencia o expiración del permiso/documento */
  vigencia: string;
  /** Estado actual de la constancia asociada al contenedor */
  estadoConstancia: string;
  /** Indica si el contenedor existe en el sistema VUCEM */
  existeEnVUCEM: string;
  /** Identificador de la constancia emitida */
  idConstancia: string;
  /** Número del manifiesto de carga relacionado */
  numeroManifiesto: string;
  /** ID de la solicitud relacionada al contenedor */
  idSolicitud: string;
  /** Fecha de inicio de operación o validez */
  fechaInicio: string;
}

/**
 * Respuesta de una solicitud que retorna un contenedor específico.
 */
export interface RespuestaContenedor {
  /** Indica si la operación fue exitosa */
  success: boolean;
  /** Datos del contenedor obtenidos */
  datos: DatosDelContenedor;
  /** Mensaje de éxito o error */
  message: string;
}

/**
 * Respuesta genérica de una API sin datos adicionales.
 */
export interface RespuestaApi {
  /** Indica si la operación fue exitosa */
  success: boolean;
  /** Mensaje de retorno del servidor */
  message: string;
}

/**
 * Respuesta que contiene una lista de contenedores.
 */
export interface RespuestaContenedores {
  /** Código de estado HTTP o personalizado */
  code: number;
  /** Lista de contenedores retornados */
  data: Contenedores[];
  /** Mensaje descriptivo del resultado */
  message: string;
}

/**
 * Respuesta que contiene una lista de aduanas.
 */
export interface RespuestaAduanas {
  /** Código de estado HTTP o personalizado */
  code: number;
  /** Lista de aduanas disponibles */
  data: Aduanas[];
  /** Mensaje descriptivo del resultado */
  message: string;
}

/**
 * Información general del solicitante que realiza el trámite.
 */
export interface DatosSolicitante {
  /** RFC del solicitante */
  rfc: string;
  /** Denominación o razón social de la empresa */
  denominacion: string;
  /** Actividad económica que realiza la empresa */
  actividadEconomica: string;
  /** Correo electrónico de contacto */
  correoElectronico: string;
}

/**
 * Estructura que representa los datos modificables de un domicilio
 * dentro del trámite de modificación del programa IMMEX.
 */
export interface DatosDelModificacion {
  /** Código postal actual del domicilio */
  codigoPostal: string | undefined;
  /** Localidad en la que se encuentra el domicilio */
  localidad: string | undefined;
  /** Delegación o municipio correspondiente */
  delegacionMunicipio: string | undefined;

  /** ID interno del registro de modificación */
  id?: number;
  /** Nombre de la calle */
  calle?: string;
  /** Número exterior del domicilio */
  numeroExterior?: number;
  /** Número interior del domicilio (si aplica) */
  numeroInterior?: number;
  /** Código postal alterno (posiblemente con error tipográfico) */
  codigoPosta?: number;
  /** Colonia o fraccionamiento */
  colonia?: string;
  /** Municipio o alcaldía */
  municipioOAlcaldia?: string;
  /** Estado o entidad federativa */
  entidadFederativa?: string;
  /** País donde se encuentra el domicilio */
  pais?: string;
  /** RFC del solicitante o de la empresa */
  rfc?: string;
  /** Domicilio fiscal completo */
  domicilioFiscal?: string;
  /** Razón social de la empresa */
  razonSocial?: string;
  /** Estatus descriptivo (ej. 'Activo', 'Inactivo') */
  desEstatus?: string;
  /** Descripción del domicilio o del trámite */
   descripcion?: string;
  /** Tipo de servicio relacionado con el trámite */
  tipoDeServicio?: string;
}

/**
 * Estructura que representa los datos de un servicio específico
 * dentro del trámite de modificación del programa IMMEX.
 */
export interface DatosDelServicios {
  /** ID del servicio */
  id?: number;
  /** Estatus descriptivo del servicio */
  desEstatus?: string;
  /** Descripción del servicio */
  descripcion?: string;
  /** Tipo de servicio relacionado con el trámite */
  tipoDeServicio?: string;
  /** Estado del servicio */
  estado?: string;
}