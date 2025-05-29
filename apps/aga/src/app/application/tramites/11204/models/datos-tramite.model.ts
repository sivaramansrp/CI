/**
 * Interfaz que representa una aduana.
 * Utilizamos esta interfaz para definir la estructura de los datos de una aduana.
 */
export interface Aduanas {
  /**
   * Descripción de la aduana.
   */
  descripcion: string;

  /**
   * Identificador de la aduana.
   */
  id: number;
}

/**
 * Interfaz que representa un contenedor.
 * Utilizamos esta interfaz para definir la estructura de los datos de un contenedor.
 */
export interface Contenedores {
  /**
   * Tipo de contenedor.
   */
  tipo: string;

  /**
   * Identificador del contenedor.
   */
  id: string;
}

/**
 * Interfaz que representa los datos de un contenedor.
 * Utilizamos esta interfaz para definir la estructura de los datos detallados de un contenedor.
 */
export interface DatosDelContenedor {
  /**
   * Identificador del contenedor.
   */
  id: number;

  /**
   * Iniciales del equipo.
   */
  inicialesEquipo: string;

  /**
   * Número del equipo.
   */
  numeroEquipo: number;

  /**
   * Dígito verificador del equipo.
   */
  digitoVerificador: number;

  /**
   * Tipo de equipo.
   */
  tipoEquipo: string;

  /**
   * Identificador de la aduana.
   */
  aduana: number;

  /**
   * Fecha de ingreso del equipo.
   */
  fechaIngreso: string;

  /**
   * Vigencia del equipo.
   */
  vigencia: string;

  /**
   * Estado actual del equipo o contenedor.
   */
  estado: string;

  /**
   * Indica si el equipo o contenedor existe en el sistema.
   */
  existe: string;
}

/**
 * Interfaz que representa los datos de un csv.
 * Utilizamos esta interfaz para definir la estructura de los datos detallados de un contenedor.
 */
export interface datosDelCsvArchivo {
  /**
   * Identificador del contenedor.
   */
  id: number;

  /**
   * Iniciales del equipo.
   */
  inicialesEquipo: string;

  /**
   * Número del equipo.
   */
  numeroEquipo: number;

  /**
   * Dígito verificador del equipo.
   */
  digitoVerificador: number;

  /**
   * Tipo de equipo.
   */
  tipoEquipo: string;

  /**
   * Identificador de la aduana.
   */
  aduana: number;

  /**
   * Fecha de ingreso del equipo.
   */
  fechaIngreso: string;

  /**
   * Vigencia del equipo.
   */
  vigencia: string;

  
  /**
   * Estado actual del equipo o contenedor.
   */
  estado: string;

  /**
   * Indica si el equipo o contenedor existe en el sistema.
   */
  existe: string;
}

/**
 * Interfaz que representa la respuesta de una operación relacionada con un contenedor.
 * Utilizamos esta interfaz para definir la estructura de la respuesta de una operación que involucra un contenedor.
 */
export interface RespuestaContenedor {
  /**
   * Indica si la operación fue exitosa.
   */
  success: boolean;

  /**
   * Datos del contenedor.
   */
  datos: DatosDelContenedor;

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

/**
 * Interfaz que representa una respuesta genérica de una API.
 * Utilizamos esta interfaz para definir la estructura de una respuesta genérica de una API.
 */
export interface RespuestaApi {
  /**
   * Indica si la operación fue exitosa.
   */
  success: boolean;

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

/**
 * Interfaz que representa la respuesta de una operación que devuelve un arreglo de contenedores.
 * Utilizamos esta interfaz para definir la estructura de la respuesta de una operación que involucra múltiples contenedores.
 */
export interface RespuestaContenedores {
  /**
   * Código de la respuesta.
   */
  code: number;

  /**
   * Arreglo de contenedores.
   */
  data: Contenedores[];

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

/**
 * Interfaz que representa la respuesta de una operación que devuelve un arreglo de aduanas.
 * Utilizamos esta interfaz para definir la estructura de la respuesta de una operación que involucra múltiples aduanas.
 */
export interface RespuestaAduanas {
  /**
   * Código de la respuesta.
   */
  code: number;

  /**
   * Arreglo de aduanas.
   */
  data: Aduanas[];

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}