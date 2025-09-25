/**
 * Constantes utilizadas en el trámite 80205 para la configuración de pasos y tablas relacionadas con domicilios y servicios IMMEX.
 *
 * Este archivo contiene configuraciones que definen los pasos del trámite, así como las columnas de las tablas
 * que se utilizan para mostrar información relacionada con los domicilios y servicios IMMEX.
 */

import { EmpresasNacionales, Servicio, ServicioAmpliacion, ServicioAutorizado, ServicioInmex } from '../models/datos-info.model';

/**
 * Configuración de los pasos del trámite.
 *
 * Cada paso está representado por un objeto que contiene las siguientes propiedades:
 * - `indice`: Número del paso.
 * - `titulo`: Título descriptivo del paso.
 * - `activo`: Indica si el paso está activo.
 * - `completado`: Indica si el paso ha sido completado.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar necesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Configuración de la tabla de domicilios.
 *
 * Define las columnas de la tabla que muestra información relacionada con los domicilios. Cada columna está representada
 * por un objeto que contiene las siguientes propiedades:
 * - `encabezado`: El título de la columna que se mostrará en la tabla.
 * - `clave`: Una función que toma un elemento de tipo `ServicioInmex` y devuelve el valor correspondiente a mostrar en la columna.
 * - `orden`: Un número que indica la posición de la columna en la tabla.
 */
export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Servicio',
    clave: (ele: EmpresasNacionales): string | undefined => ele.descripcionServicio,
    orden: 1,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: EmpresasNacionales): string | undefined =>
      ele.rfc,
    orden: 2,
  },
  {
    encabezado: 'Denominación o razón social',
    clave: (ele: EmpresasNacionales): string | undefined => ele.razonSocial,
    orden: 3,
  },
  {
    encabezado: 'Número del programa IMMEX',
    clave: (ele: EmpresasNacionales): string | undefined => ele.numeroPrograma,
    orden: 4,
  },
  {
    encabezado: 'Año del programa IMMEX',
    clave: (ele: EmpresasNacionales): string | undefined => ele.tiempoPrograma,
    orden: 5,
  },
];

/**
 * Configuración de la tabla de servicios IMMEX.
 *
 * Define las columnas de la tabla que muestra información relacionada con los servicios IMMEX. Cada columna está representada
 * por un objeto que contiene las siguientes propiedades:
 * - `encabezado`: El título de la columna que se mostrará en la tabla.
 * - `clave`: Una función que toma un elemento de tipo `Servicio` y devuelve el valor correspondiente a mostrar en la columna.
 * - `orden`: Un número que indica la posición de la columna en la tabla.
 */
export const CONFIGURACION_SERVICIO_IMMEX = [
  {
    encabezado: 'Descripción del servicio',
    clave: (ele: ServicioAmpliacion): string | undefined => ele.descripcion ?? undefined,
    orden: 1,
  },
  {
    encabezado: 'Tipo de servicio',
    clave: (ele: ServicioAmpliacion): string | undefined => ele.descripcionTipo,
    orden: 2,
  },
];


export const CONFIGURACION_SERVICIO_AUTORIZADO = [
  {
    encabezado: 'Descripción del servicio',
    clave: (ele: ServicioAutorizado): string | undefined => ele.descripcion,
    orden: 1,
  },
  {
    encabezado: 'Tipo de servicio',
    clave: (ele: ServicioAutorizado): string | undefined => ele.descripcionTipo,
    orden: 2,
  },
];


export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
  /** Clave opcional del catálogo. */
  tipode?: string;
}