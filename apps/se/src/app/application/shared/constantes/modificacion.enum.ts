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

/**
 * @constant MERCANCIA_SELECCIONADAS
 * 
 * @description
 * Arreglo que define las columnas y sus propiedades para la visualización de mercancías seleccionadas.
 * Cada objeto en el arreglo representa una columna con su encabezado, clave (función para obtener el valor de la propiedad de la mercancía),
 * y el orden en el que se mostrará la columna.
 * 
 * @property {string} encabezado - Título de la columna que se mostrará en la interfaz.
 * @property {(ele: Mercancia) => string | undefined} clave - Función que recibe un objeto de tipo `Mercancia` y devuelve el valor correspondiente a la columna.
 * @property {number} orden - Orden en el que se mostrará la columna en la tabla.
 * 
 * @example
 * // Ejemplo de uso:
 * MERCANCIA_SELECCIONADAS.forEach(columna => {
 *   console.log(`Encabezado: ${columna.encabezado}, Orden: ${columna.orden}`);
 * });
 * 
 * @comando
 * Utilice este arreglo para configurar las columnas de una tabla que muestre información de mercancías.
 */
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

export const MERCANCIA_SELECCIONADAS_LIST = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: Mercancia): string | undefined => ele.cantidad,
    orden: 2,
  },
  {
    encabezado: 'Unidad de medida',
    clave: (ele: Mercancia): string | undefined => ele.unidadMedidaMasaBruta,
    orden: 3,
  },
  {
    encabezado: 'Valor mercancía',
    clave: (ele: Mercancia): string | undefined => ele.valorMercancia,
    orden: 4,
  },
  {
    encabezado: 'Tipo de factura',
    clave: (ele: Mercancia): string | undefined => ele.tipoFactura,
    orden: 5,
  },
  {
    encabezado: 'Número factura',
    clave: (ele: Mercancia): string | undefined => ele.numeroFactura,
    orden: 6,
  },
  {
    encabezado: 'Complemento descripción',
    clave: (ele: Mercancia): string | undefined => ele.complementoDescripcion,
    orden: 7,
  },
  {
    encabezado: 'Fecha factura',
    clave: (ele: Mercancia): string | undefined => ele.fechaFactura,
    orden: 8,
  }
];

/**`
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
    encabezado: 'Fracción NALADI', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladi, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA93', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa93, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA96', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa96, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA02', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa02, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Cantidad', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.cantidad, // Función que devuelve la fracción Naladi SA93
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Unidad de medida', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.unidadMedidaMasaBruta, // Función que devuelve la fracción Naladi SA96
    orden: 6, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Valor mercancía', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.valorMercancia, // Función que devuelve la fracción Naladi SA02
    orden: 7, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Tipo de factura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.tipoFactura, // Función que devuelve el nombre técnico de la mercancía
    orden: 8, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Número factura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroFactura, // Función que devuelve el nombre comercial de la mercancía
    orden: 9, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Complemento descripción', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.complementoDescripcion, // Función que devuelve el nombre comercial de la mercancía
    orden: 10, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha factura', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaFinalInput, // Función que devuelve el nombre comercial de la mercancía
    orden: 11, // Orden en que se mostrará la columna
  }
];

export const CARGA_MERCANCIA_EXPORT = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: Mercancia): string | undefined => ele.cantidad,
    orden: 2,
  },
  {
    encabezado: 'Unidad de medida',
    clave: (ele: Mercancia): string | undefined => ele.umc,
    orden: 3,
  },
  {
    encabezado: 'Valor mercancía',
    clave: (ele: Mercancia): string | undefined => ele.valorMercancia,
    orden: 4,
  },
  {
    encabezado: 'Tipo de factura',
    clave: (ele: Mercancia): string | undefined => ele.tipoFactura,
    orden: 5,
  },
  {
    encabezado: 'Número factura',
    clave: (ele: Mercancia): string | undefined => ele.numeroFactura,
    orden: 6,
  },
  {
    encabezado: 'Complemento descripción',
    clave: (ele: Mercancia): string | undefined => ele.complementoDescripcion,
    orden: 7,
  },
  {
    encabezado: 'Fecha factura',
    clave: (ele: Mercancia): string | undefined => ele.fechaFactura,
    orden: 8,
  },
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
 * @descripcion
 * Identificador único del procedimiento.
 */
export const CAMPO_DE_DESTINATARIO = [110222, 110221]

/**
 * Texto que describe los requisitos y proporciona información sobre el número temporal de solicitud.
 * @type {string}
 * @constant
 */
export const TEXTOS_REQUISITOS =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';


/**
 * @constant CONFIGURACION_MERCANCIA_TABLA
 *
 * @description
 * Configuración de columnas para la tabla de mercancías, incluyendo fracciones NALADI y nombres técnicos/comerciales.
 * Cada objeto define el encabezado, la función para obtener el valor de la columna desde un objeto Mercancia y el orden de visualización.
 *
 * @property {string} encabezado - Título de la columna que se mostrará en la interfaz.
 * @property {(ele: Mercancia) => string | undefined} clave - Función que recibe un objeto de tipo `Mercancia` y devuelve el valor correspondiente a la columna.
 * @property {number} orden - Orden en el que se mostrará la columna en la tabla.
 *
 * @example
 * CONFIGURACION_MERCANCIA_TABLA.forEach(col => {
 *   console.log(col.encabezado, col.orden);
 * });
 */
export const CONFIGURACION_MERCANCIA_TABLA = [
  {
    encabezado: 'Fracción NALADI', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladi, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA93', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa93, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA96', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa96, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fracción NALADISA02', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa02, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre técnico', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreTecnico, // Función que devuelve el nombre técnico de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre comercial', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreComercial, // Función que devuelve el nombre comercial de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Número de registro de productos', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroDeRegistrodeProductos, // Función que devuelve el número de registro de productos
    orden: 6, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha expedición', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaExpedicion, // Función que devuelve la fecha de expedición de la mercancía
    orden: 7, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha vencimiento', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaVencimiento, // Función que devuelve la fecha de vencimiento de la mercancía
    orden: 8, // Orden en que se mostrará la columna
  }
];

/**
 * @constant FECHA_ID
 * @description
 * Arreglo que contiene los identificadores de procedimiento que requieren el campo de fecha en la configuración.
 * Se utiliza para determinar si se debe mostrar o procesar el campo de fecha en los formularios relacionados.
 * @type {number[]}
 */
export const FECHA_ID = [ 110204,110223 ];

export const CARGA_MERCANCIA_SELECCIONADAS_LIST = [110211]
/**
 * @constant REQUIREDA
 * @description
 * Arreglo de identificadores de procedimiento para los cuales ciertos campos son requeridos.
 * Se utiliza para establecer validaciones adicionales en formularios cuando el ID del procedimiento
 * coincide con algún valor de este arreglo.
 * @type {number[]}
 */
export const REQUIREDA = [110204,110205,110211];
/**
 * @constant BOTON_DE_OPCION_VER
 * @description
 * Arreglo que contiene los identificadores de procedimiento que requieren el campo de fecha en la configuración.
 * Se utiliza para determinar si se debe mostrar o procesar el campo de fecha en los formularios relacionados.
 * @type {number[]}
 */
export const BOTON_DE_OPCION_VER =[110221];
/**
 * @constant FECHA_ID
 * @description
 * Arreglo que contiene los identificadores de procedimiento que requieren el campo de fecha en la configuración.
 * Se utiliza para determinar si se debe mostrar o procesar el campo de fecha en los formularios relacionados.
 * @type {number[]}
 */
export const PRESENTA_ID = [ 110211,110205 ];