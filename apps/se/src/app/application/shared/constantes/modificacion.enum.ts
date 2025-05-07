import {
  Mercancia,
} from '../models/modificacion.enum';

/**
* Configuración para los campos de mercancía.
* Define los encabezados, claves y el orden para mostrar los datos relacionados con las mercancías.
*/
export const CONFIGURACION_MERCANCIA = [
  {
    encabezado: 'Fracción arancelaria', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre técnico', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreTecnico, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre comercial', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreComercial, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Número de registro de productos', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroDeRegistrodeProductos, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha expedición', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaExpedicion, // Función que devuelve el nombre técnico de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha vencimiento', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaVencimiento, // Función que devuelve el nombre comercial de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  }
];


export const MERCANCIA_SELECCIONADAS = [
  {
    encabezado: 'Fracción arancelaria', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'cantidad', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.cantidad, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Unidad de medida', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.unidadMedidaMasaBruta, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Valor mercancía', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.valorMercancia, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Tipo de fractura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.tipoFactura, // Función que devuelve el nombre técnico de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'numero', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroDeRegistrodeProductos, // Función que devuelve el nombre comercial de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  }
];

/**
 * @constant {Array<Object>} CARGA_MERCANCIA_SELECCIONADAS
 * 
 * @description
 * Este arreglo define la configuración de las columnas para la visualización de mercancías seleccionadas.
 * Cada objeto dentro del arreglo representa una columna con su encabezado, una función para obtener el valor
 * correspondiente de un objeto `Mercancia`, y el orden en que se debe mostrar la columna.
 * 
 * @property {string} encabezado - Título de la columna que se mostrará en la interfaz.
 * @property {function} clave - Función que recibe un objeto `Mercancia` y devuelve el valor correspondiente
 *                              para la columna.
 * @property {number} orden - Orden en el que se mostrará la columna en la tabla.
 * 
 * @example
 * // Uso:
 * // Este arreglo puede ser utilizado para generar dinámicamente una tabla de mercancías seleccionadas.
 * 
 * @comando
 * Este arreglo es utilizado para configurar las columnas de la tabla de mercancías seleccionadas en la aplicación.
 */
export const CARGA_MERCANCIA_SELECCIONADAS = [
  {
    encabezado: 'Fracción arancelaria', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Cantidad', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.cantidad, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Unidad de medida', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.unidadMedidaMasaBruta, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Valor mercancía', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.valorMercancia, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Tipo de fractura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.tipoFactura, // Función que devuelve el nombre técnico de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Número factura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroFactura, // Función que devuelve el nombre comercial de la mercancía
    orden: 6, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Complemento descripción', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.complementoDescripcion, // Función que devuelve el nombre comercial de la mercancía
    orden: 7, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha factura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaFinalInput, // Función que devuelve el nombre comercial de la mercancía
    orden: 8, // Orden en que se mostrará la columna
  }
];


/**
* Clave para identificar la entidad federativa.
* @type {string}
* @constant
*/
export const ENTIDAD_FEDERATIVA = 'entidadFederativa';

/**
* Clave para identificar el bloque de datos.
* @type {string}
* @constant
*/
export const BLOQUE = 'bloque';

/**
* Clave para identificar los datos de idiomas.
* @type {string}
* @constant
*/
export const IDIOMA_DATES = 'idiomaDates';

/**
* Clave para identificar los datos de entidades federativas.
* @type {string}
* @constant
*/
export const ENTIDAD_FEDREATIVE_DATES = 'EntidadFederativaDates';

/**
* Clave para identificar los datos de representación federal.
* @type {string}
* @constant
*/
export const REPRESENTACION_FEDERALDATES = 'representacionFederalDates';

/**
 * Texto que describe los requisitos y proporciona información sobre el número temporal de solicitud.
 * @type {string}
 * @constant
 */
export const TEXTOS_REQUISITOS =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';