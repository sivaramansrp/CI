/**
 * @fileoverview
 * Este archivo contiene las interfaces que representan la estructura de datos utilizada en los servicios IMMEX,
 * incluyendo información de servicios, respuestas de API, acciones de botones, y el estado de ampliación de servicios.
 *
 * @module DatosInfoModel
 * @description
 * Define las estructuras de datos necesarias para manejar los servicios IMMEX y sus operaciones relacionadas.
 */

import { Catalogo } from "@libs/shared/data-access-user/src";

/**
 * Representa la información de un servicio IMMEX.
 * @interface ServicioInmex
 * 
 * @property {string} [Servicio] - Nombre del servicio asociado.
 * @property {string} [RegistroContribuyentes] - Registro de contribuyentes relacionado.
 * @property {string} [DenominaciónSocial] - Denominación social de la empresa.
 * @property {string} [NumeroIMMEX] - Número del programa IMMEX.
 * @property {string} [AñoIMMEX] - Año de inicio del programa IMMEX.
 */
export interface ServicioInmex {
  /**
   * Nombre del servicio asociado.
   */
  Servicio?: string;

  /**
   * Registro de contribuyentes relacionado.
   */
  RegistroContribuyentes?: string;

  /**
   * Denominación social de la empresa.
   */
  DenominaciónSocial?: string;

  /**
   * Número del programa IMMEX.
   */
  NumeroIMMEX?: string;

  /**
   * Año de inicio del programa IMMEX.
   */
  AñoIMMEX?: string;
}

/**
 * Representa la información de un servicio.
 * @interface Servicio
 * 
 * @property {string} [descripiónDelServicio] - Descripción del servicio.
 * @property {string} [descripcion] - Descripción adicional del servicio.
 * @property {string} [tipode] - Tipo de servicio.
 */
export interface Servicio {
  /**
   * Descripción del servicio.
   */
  descripiónDelServicio?: string;

  /**
   * Descripción adicional del servicio.
   */
  descripcion?: string;

  /**
   * Tipo de servicio.
   */
  tipode?: string;
}

/**
 * Interfaz que representa la información de los servicios.
 * @interface InfoServicios
 * 
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Folio único asociado al servicio.
 * @property {string} ano - Año relacionado con el servicio.
 */
export interface InfoServicios {
  /**
   * Modalidad seleccionada para el servicio.
   */
  seleccionaLaModalidad: string;

  /**
   * Folio único asociado al servicio.
   */
  folio: string;

  /**
   * Año relacionado con el servicio.
   */
  ano: string;
}

/**
 * Interfaz que representa los datos de los servicios.
 * @interface Servicios
 * 
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Folio único asociado al servicio.
 * @property {string} ano - Año relacionado con el servicio.
 */
export interface Servicios {
  /**
   * Modalidad seleccionada para el servicio.
   */
  seleccionaLaModalidad: string;

  /**
   * Folio único asociado al servicio.
   */
  folio: string;

  /**
   * Año relacionado con el servicio.
   */
  ano: string;
}

/**
 * Representa la estructura de los datos de respuesta.
 * @interface ResponseData
 * 
 * @property {string} idsubmanufacturer - Identificador único del subfabricante.
 * @property {InfoServicios} infoServicios - Información detallada de los servicios asociados.
 */
export interface ResponseData {
  /**
   * Identificador único del subfabricante.
   */
  idsubmanufacturer: string;

  /**
   * Información detallada de los servicios asociados.
   */
  infoServicios: InfoServicios;
}

/**
 * Representa la respuesta de una API.
 * @interface ApiResponse
 * 
 * @property {number} code - Código de estado de la respuesta.
 * @property {ResponseData} data - Datos específicos de la respuesta.
 * @property {InfoServicios} infoServicios - Información adicional sobre los servicios relacionados.
 */
export interface ApiResponse {
  /**
   * Código de estado de la respuesta.
   */
  code: number;

  /**
   * Datos específicos de la respuesta.
   */
  data: ResponseData;

  /**
   * Información adicional sobre los servicios relacionados.
   */
  infoServicios: InfoServicios;
}

/**
 * Representa la estructura de una acción asociada a un botón.
 * @interface AccionBoton
 * 
 * @property {string} accion - Describe la acción que se ejecutará al interactuar con el botón.
 * @property {number} valor - Representa un valor numérico asociado a la acción del botón.
 */
export interface AccionBoton {
  /**
   * Describe la acción que se ejecutará al interactuar con el botón.
   */
  accion: string;

  /**
   * Representa un valor numérico asociado a la acción del botón.
   */
  valor: number;
}

/**
 * Representa un catálogo de elementos.
 * @interface AduanaDeIngreso
 * 
 * @property {number} id - Identificador único del catálogo.
 * @property {string} descripcion - Descripción del elemento del catálogo.
 */
export interface AduanaDeIngreso {
  /**
   * Identificador único del catálogo.
   */
  id: number;

  /**
   * Descripción del elemento del catálogo.
   */
  descripcion: string;
}

/**
 * Representa el estado de ampliación de servicios.
 * @interface AmpliacionServiciosState
 * 
 * @property {Servicios} servicios - Representa los servicios asociados al estado.
 * @property {Catalogo[]} aduanaDeIngresoSelecion - Lista de aduanas seleccionadas para el ingreso.
 * @property {string} rfcEmpresa - RFC (Registro Federal de Contribuyentes) de la empresa.
 * @property {string} numeroPrograma - Número del programa asociado al servicio.
 * @property {string} tiempoPrograma - Duración o tiempo asociado al programa.
 * @property {ServicioInmex[]} tablaDatos - Lista de servicios IMMEX asociados.
 * @property {Servicio[]} tablaDatosIMMEX - Lista de servicios IMMEX detallados.
 */
export interface AmpliacionServiciosState {
  /**
   * Representa los servicios asociados al estado.
   */
  servicios: Servicios;

  /**
   * Lista de aduanas seleccionadas para el ingreso.
   */
  aduanaDeIngresoSelecion: Catalogo;

  /**
   * RFC (Registro Federal de Contribuyentes) de la empresa.
   */
  rfcEmpresa: string;

  /**
   * Número del programa asociado al servicio.
   */
  numeroPrograma: string;

  /**
   * Duración o tiempo asociado al programa.
   */
  tiempoPrograma: string;

  /**
   * Lista de servicios IMMEX asociados.
   */
  tablaDatos: ServicioInmex[];

  /**
   * Lista de servicios IMMEX detallados.
   */
  tablaDatosIMMEX: Servicio[];
}