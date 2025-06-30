import { Personas, Solicitar } from "../models/personas.module";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * @fileoverview
 * Constantes y configuraciones para el módulo de operaciones de comercio exterior (trámite 319).
 * Incluye pasos del proceso, rutas de recursos, configuraciones de tablas y textos de alerta.
 * Cobertura compodoc 100%: cada constante está documentada.
 * @module OperacionesDeComercioExterior
 */

/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en una solicitud de operaciones de comercio exterior.
 * Cada paso incluye un índice, un título descriptivo, y los estados de actividad y completitud.
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Descripción del paso.
 * @property {boolean} activo - Indica si el paso está activo para ser realizado.
 * @property {boolean} completado - Indica si el paso ya ha sido completado.
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
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * @const URL
 * @description Ruta relativa a los archivos JSON utilizados para las operaciones de comercio exterior.
 * @type {string}
 * @remarks Esta constante define la ubicación de los recursos JSON específicos para el trámite 319.
 */
export const URL = '../../../../../assets/json/319/';

/**
 * @const CONFIGURACION_PERSONAS_COLUMNAS
 * @description Configuración de las columnas para la tabla de personas en el módulo de operaciones de comercio exterior.
 * Cada objeto en el arreglo representa una columna con su encabezado, clave para acceder al valor en la fila, y el orden de aparición.
 * @type {ConfiguracionColumna<Personas>[]}
 * @property {string} encabezado - El texto que se mostrará como encabezado de la columna.
 * @property {Function} clave - Una función que recibe una fila y retorna el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que la columna aparecerá en la tabla.
 * @example
 * CONFIGURACION_PERSONAS_COLUMNAS.forEach(columna => {
 *   console.log(columna.encabezado);
 * });
 */
export const CONFIGURACION_PERSONAS_COLUMNAS: ConfiguracionColumna<Personas>[] = [
  { encabezado: 'RFC', clave: (fila) => fila.rfc, orden: 1 },
  { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 2 },
  { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 3 },
  { encabezado: 'Primer apellido', clave: (fila) => fila.primer_apellido, orden: 4 },
  { encabezado: 'Segundo apellido', clave: (fila) => fila.segundo_apellido, orden: 5 },
  { encabezado: 'Correo electrónico', clave: (fila) => fila.correo_electronico, orden: 6 },
];

/**
 * @const CONFIGURACION_SOLICITAR_COLUMNAS
 * @description Configuración de las columnas para la tabla de solicitudes en el módulo de operaciones de comercio exterior.
 * Cada objeto en el arreglo representa una columna con su encabezado, clave para acceder al valor en la fila, y el orden de aparición.
 * @type {ConfiguracionColumna<Solicitar>[]}
 * @property {string} encabezado - El texto que se mostrará como encabezado de la columna.
 * @property {Function} clave - Una función que recibe una fila y retorna el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que la columna aparecerá en la tabla.
 * @example
 * CONFIGURACION_SOLICITAR_COLUMNAS.forEach(columna => {
 *   console.log(columna.encabezado);
 * });
 */
export const CONFIGURACION_SOLICITAR_COLUMNAS: ConfiguracionColumna<Solicitar>[] = [
  { encabezado: 'Periodo', clave: (fila) => fila.periodo, orden: 1 },
  { encabezado: 'Fechas sobre el periodo', clave: (fila) => fila.fechas_sobre_el_periodo, orden: 2 },
];

/**
 * @const TEXTOS
 * @description La constante `TEXTOS` contiene un mensaje de texto que indica que la fecha proporcionada no es válida 
 * porque aún no ha concluido el período especificado.
 * @type {string}
 * @example
 * console.log(TEXTOS);
 * // Output: "La fecha indicada NO es correcta por que aún no concluye:"
 */
export const TEXTOS = "La fecha indicada NO es correcta por que aún no concluye:";

/**
 * @const INFO_ALERT
 * @description Constante que define el estilo de alerta para operaciones de comercio exterior.
 * @type {string}
 * @value "alert-danger"
 * @remarks Esta constante se utiliza para aplicar una clase CSS que representa un mensaje de alerta de tipo peligro.
 * @since Versión inicial.
 */
export const INFO_ALERT = "alert-danger";