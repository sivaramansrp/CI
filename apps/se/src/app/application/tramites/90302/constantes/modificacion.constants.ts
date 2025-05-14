/**
 * @fileoverview
 * Este archivo contiene constantes y configuraciones utilizadas en el módulo de ampliación de servicios.
 * Proporciona configuraciones para tablas, textos, pasos del proceso y alertas que se utilizan en la interfaz de usuario.
 *
 * @module ModificacionEnum
 * @description
 * Este archivo define configuraciones para sectores, fracciones arancelarias, fracciones de importación, textos de instrucciones,
 * alertas y pasos del proceso de ampliación de servicios.
 */

import {
  Bitacora,
  DatosDelModificacion,
  MercanciasAProducir,
  Plantas,
  ProductorIndirecto,
  Sector,
} from '../models/datos-info.model';

/**
 * Pasos del proceso de ampliación de servicios.
 * @constant {Array<Object>} PASOS
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
    titulo: 'Anexar requisitos',
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
 * @const CONFIGURACION_BITCORA
 * @description Configuración utilizada para definir las propiedades de la bitácora de modificaciones.
 * Cada objeto dentro del arreglo representa una columna con su encabezado, clave de acceso y orden.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Bitacora) => string | undefined, orden: number}>}
 * 
 * @property {string} encabezado - El título de la columna que se mostrará en la interfaz de usuario.
 * @property {(ele: Bitacora) => string | undefined} clave - Una función que toma un objeto de tipo `Bitacora` y devuelve el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 * 
 * @example
 * // Ejemplo de uso:
 * CONFIGURACION_BITCORA.forEach(config => {
 *   console.log(config.encabezado); // Muestra el encabezado de cada columna
 * });
 */
export const CONFIGURACION_BITCORA = [
  {
    encabezado: 'Tipo modificación ',
    clave: (ele: Bitacora): string | undefined => ele.tipoModificacion,
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación  ',
    clave: (ele: Bitacora): string | undefined => ele.fechaModificacion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (ele: Bitacora): string | undefined => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos ',
    clave: (ele: Bitacora): string | undefined => ele.valoresNuevos,
    orden: 4,
  },
];

/**
 * @const CONFIGURACION_SECTOR
 * @description Configuración utilizada para definir las propiedades de los sectores en la aplicación.
 * Contiene una lista de objetos que especifican encabezados, claves y el orden de las columnas.
 * 
 * @property {string} encabezado - El título o encabezado que se mostrará en la interfaz de usuario.
 * @property {(ele: Sector) => string | undefined} clave - Una función que toma un objeto de tipo `Sector` 
 * y devuelve el valor correspondiente a la clave especificada.
 * @property {number} orden - El orden en el que se deben mostrar las columnas en la interfaz.
 * 
 * @example
 * // Ejemplo de uso:
 * CONFIGURACION_SECTOR.forEach(config => {
 *   console.log(config.encabezado);
 * });
 */
export const CONFIGURACION_SECTOR = [
  {
    encabezado: 'Lista de sectores',
    clave: (ele: Sector): string | undefined => ele.listaSectores,
    orden: 1,
  },
  {
    encabezado: 'Clave del sector ',
    clave: (ele: Sector): string | undefined => ele.claveSector,
    orden: 2,
  },
  {
    encabezado: 'Estatus',
    clave: (ele: Sector): string | undefined => ele.estatus,
    orden: 3,
  },
];

/**
 * @const CONFIGURACION_PRODUCTOR_INDIRECTO
 * @description Configuración utilizada para definir las propiedades de los productores indirectos en el sistema.
 * Cada objeto en el arreglo representa una columna con su encabezado, clave de acceso y orden de aparición.
 * 
 * @type {Array<{encabezado: string, clave: (ele: ProductorIndirecto) => string | undefined, orden: number}>}
 * 
 * @property {string} encabezado - El título o nombre de la columna que se mostrará en la interfaz de usuario.
 * @property {(ele: ProductorIndirecto) => string | undefined} clave - Una función que toma un objeto de tipo `ProductorIndirecto` 
 * y devuelve el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que la columna debe aparecer en la tabla.
 */
export const CONFIGURACION_PRODUCTOR_INDIRECTO = [
  {
    encabezado: 'Registro federal de contribuyentes  ',
    clave: (ele: ProductorIndirecto): string | undefined => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Denominación o razón social  ',
    clave: (ele: ProductorIndirecto): string | undefined => ele.denominacion,
    orden: 2,
  },
  {
    encabezado: 'Correo ',
    clave: (ele: ProductorIndirecto): string | undefined => ele.correo,
    orden: 3,
  },
  {
    encabezado: 'Estatus',
    clave: (ele: ProductorIndirecto): string | undefined => ele.estatus,
    orden: 4,
  },
];


/**
 * @const CONFIGURACION_MERCANCIAS_A_PRODUCIR
 * @description Configuración utilizada para definir las propiedades de las mercancías a producir.
 * Contiene información sobre el encabezado, la clave y el orden de las columnas.
 * 
 * @property {string} encabezado - El título de la columna que se mostrará en la interfaz de usuario.
 * @property {Function} clave - Una función que toma un objeto de tipo `MercanciasAProducir` y devuelve
 * un valor de tipo `string` o `undefined`, correspondiente a la clave específica de la columna.
 * @property {number} orden - El orden en el que se deben mostrar las columnas.
 */
export const CONFIGURACION_MERCANCIAS_A_PRODUCIR = [
  {
    encabezado: 'Fracción arancelaria  ',
    clave: (ele: MercanciasAProducir): string | undefined =>
      ele.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Clave del sector ',
    clave: (ele: MercanciasAProducir): string | undefined => ele.claveSector,
    orden: 2,
  },
  {
    encabezado: 'Estatus',
    clave: (ele: MercanciasAProducir): string | undefined => ele.estatus,
    orden: 3,
  },
];

/**
 * @const CONFIGURACION_PLANTAS
 * @description Configuración de las columnas para la visualización de datos relacionados con las plantas.
 * Cada objeto en el arreglo representa una columna con su encabezado, clave de acceso a los datos y orden de aparición.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Plantas) => string | undefined, orden: number}>}
 * 
 * @property {string} encabezado - El nombre de la columna que se mostrará en la interfaz de usuario.
 * @property {(ele: Plantas) => string | undefined} clave - Una función que toma un objeto de tipo `Plantas` y devuelve el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 */
export const CONFIGURACION_PLANTAS = [
  {
    encabezado: 'Calle',
    clave: (ele: Plantas): string | undefined => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: Plantas): string | undefined => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número interior ',
    clave: (ele: Plantas): string | undefined => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código postal ',
    clave: (ele: Plantas): string | undefined => ele.codingPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: Plantas): string | undefined => ele.colonia,
    orden: 4,
  },
  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: Plantas): string | undefined => ele.municipio,
    orden: 5,
  },
  {
    encabezado: 'Estado',
    clave: (ele: Plantas): string | undefined => ele.estado,
    orden: 6,
  },
  {
    encabezado: 'País',
    clave: (ele: Plantas): string | undefined => ele.pais,
    orden: 7,
  },
  {
    encabezado: 'Registro federal de contribuyentes ',
    clave: (ele: Plantas): string | undefined => ele.rfc,
    orden: 8,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: Plantas): string | undefined => ele.razonSocial,
    orden: 8,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: Plantas): string | undefined => ele.domicilioFisical,
    orden: 9,
  },
  {
    encabezado: 'Estatus ',
    clave: (ele: Plantas): string | undefined => ele.estatus,
    orden: 9,
  },
];

/**
 * @const CONFIGURACION_MODIFICACION
 * @description Configuración utilizada para definir las propiedades de modificación en una lista de datos.
 * Cada objeto dentro del arreglo representa una columna con su encabezado, clave de acceso y orden.
 * 
 * @type {Array<{encabezado: string, clave: (ele: DatosDelModificacion) => string | number | undefined, orden: number}>}
 * 
 * @property {string} encabezado - El título de la columna que se mostrará en la interfaz de usuario.
 * @property {(ele: DatosDelModificacion) => string | number | undefined} clave - Una función que toma un objeto de tipo `DatosDelModificacion` y devuelve el valor correspondiente a la columna.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 * 
 * @example
 * // Ejemplo de uso:
 * CONFIGURACION_MODIFICACION.forEach(config => {
 *   console.log(config.encabezado); // Muestra el encabezado de cada columna
 * });
 */
export const CONFIGURACION_MODIFICACION = [
  {
    encabezado: 'Estatus',
    clave: (ele: DatosDelModificacion): string | undefined => ele.desEstatus,
    orden: 1,
  },
  {
    encabezado: 'Calle',
    clave: (ele: DatosDelModificacion): string | undefined => ele.calle,
    orden: 2,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: DatosDelModificacion): number | undefined =>
      ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: DatosDelModificacion): number | undefined =>
      ele.numeroExterior,
    orden: 4,
  },

  {
    encabezado: 'Código Postal',
    clave: (ele: DatosDelModificacion): number | undefined => ele.codigoPostal,
    orden: 5,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: DatosDelModificacion): string | undefined => ele.colonia,
    orden: 6,
  },
  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: DatosDelModificacion): string | undefined =>
      ele.municipioOAlcaldia,
    orden: 7,
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (ele: DatosDelModificacion): string | undefined =>
      ele.entidadFederativa,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: DatosDelModificacion): string | undefined => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: DatosDelModificacion): string | undefined => ele.telefono,
    orden: 10,
  },
];
