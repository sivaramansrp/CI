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