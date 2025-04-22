import { ColumnasTabla } from "../models/avios-model";

/**
 * @constant ENCABEZADAS_CONSTANT
 * @description Define la estructura de las encabezadas de la tabla, incluyendo el encabezado, clave y orden.
 * @type {Object}
 * @property {string} encabezado - El encabezado de la columna.
 * @property {function} clave - Función que toma un elemento de tipo ColumnasTabla y devuelve un valor.
 * @property {number} orden - El orden de la columna.
 * @default {Object} - Objeto con propiedades por defecto para la encabezada de la tabla.
 * @example
 * const encabezada = ENCABEZADAS_CONSTANT.encabezado; // ''
 * const clave = ENCABEZADAS_CONSTANT.clave; // (ele: ColumnasTabla) => ''
 * const orden = ENCABEZADAS_CONSTANT.orden; // 0
* **/
export const ENCABEZADAS_CONSTANT = {
  encabezado: '',
  clave: (ele: ColumnasTabla) => '',
  orden: 0,
};


/**
 * @constant TABLA_DE_DATOS_AVISO
 * @description Contiene la estructura de la tabla de datos de aviso, incluyendo encabezadas y datos.
 * @type {Object}
 * @property {Array} encabezadas - Lista de encabezadas de la tabla.
 * @property {Array} datos - Lista de datos de la tabla.
 * @default {Object} - Objeto con propiedades por defecto para la tabla de datos de aviso.
 * @example
 * const encabezadas = TABLA_DE_DATOS_AVISO.encabezadas; // []
 * const datos = TABLA_DE_DATOS_AVISO.datos; // []
 * **/
export const TABLA_DE_DATOS_AVISO = {
  encabezadas: [
    {
      encabezado: 'Datos del tipo de registro',
      clave: (ele: ColumnasTabla) => ele.headerTipoRegistro,
      orden: 1,
    },
    {
      encabezado: 'NIV o número de serie',
      clave: (ele: ColumnasTabla) => ele.headerNIV,
      orden: 2,
    },
    {
      encabezado: 'Año modelo',
      clave: (ele: ColumnasTabla) => ele.headerAnioModelo,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (ele: ColumnasTabla) => ele.headerMarca,
      orden: 4,
    },
    {
      encabezado: 'Modelo',
      clave: (ele: ColumnasTabla) => ele.headerModelo,
      orden: 5,
    },
    {
      encabezado: 'Tipo/Variante',
      clave: (ele: ColumnasTabla) => ele.headerTVV,
      orden: 5,
    },
    {
      encabezado:
        'Nombre en el título de propiedad extranjero o en su caso, nombre de la persona a la que se haya concedido la propiedad',
      clave: (ele: ColumnasTabla) => ele.headerNombreTitulo,
      orden: 6,
    },
    {
      encabezado: 'No. del título de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerNoTitulo,
      orden: 7,
    },
    {
      encabezado: 'País que emitió el título de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerPais,
      orden: 8,
    },
    {
      encabezado: 'Estado o provincia de emisión del titulo de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerEstado,
      orden: 9,
    },
    {
      encabezado: 'No. de placas de circulación en el país de procedencia',
      clave: (ele: ColumnasTabla) => ele.headerPlacas,
      orden: 10,
    },
    {
      encabezado: 'Forma de adquisición del vehículo importado',
      clave: (ele: ColumnasTabla) => ele.headerAdquisicion,
      orden: 12,
    },
    {
      encabezado: 'No. de documento de exportación',
      clave: (ele: ColumnasTabla) => ele.headerDocumentoExportacion,
      orden: 13,
    },
    {
      encabezado: 'Aduana de importación',
      clave: (ele: ColumnasTabla) => ele.headerAduana,
      orden: 14,
    },
    {
      encabezado: 'Patente de importación',
      clave: (ele: ColumnasTabla) => ele.headerPatente,
      orden: 15,
    },
    {
      encabezado: 'Pedimento de importación',
      clave: (ele: ColumnasTabla) => ele.headerPedimento,
      orden: 16,
    },
    {
      encabezado: 'Kilometraje a la fecha de la importación',
      clave: (ele: ColumnasTabla) => ele.headerKilometraje,
      orden: 17,
    },
    {
      encabezado: 'Valor en dólares',
      clave: (ele: ColumnasTabla) => ele.headerValorDolares,
      orden: 18,
    },
    {
      encabezado: 'Valor en la aduana',
      clave: (ele: ColumnasTabla) => ele.headerValorAduana,
      orden: 19,
    },
    {
      encabezado: 'Monto de IGI pagado',
      clave: (ele: ColumnasTabla) => ele.headerMontoIGI,
      orden: 20,
    },
    {
      encabezado: 'Forma de pago del IGI',
      clave: (ele: ColumnasTabla) => ele.headerFormaPago,
      orden: 21,
    },
    {
      encabezado: 'Monto de DTA pagado',
      clave: (ele: ColumnasTabla) => ele.headerMontoDTA,
      orden: 22,
    },
    {
      encabezado: 'Folio del CFDI por el servicio de importación',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 23,
    },
    {
      encabezado: 'Valor de venta en territorio nacional sin IVA',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 24,
    },
    {
      encabezado: 'Folio del CFDI por la venta en territorio nacional',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 25,
    },
    {
      encabezado:
        'Identificador de transacción de VUCEM correspondiente al aviso de importación previa relacionado',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 26,
    },
  ],
  datos: [],
};


/**
 * @constant PASOS
 * @description Define los pasos del proceso de trámite, incluyendo el índice, título, y estado de cada paso.
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
 * @constant TEXTOS_REQUISITOS
 * @description Contiene los textos de instrucciones y requisitos para el trámite.
 */
export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- La solicitud ha quedado registrada con el número temporal 67922457.</p>
      <p>- Éste no tiene validez legal y será solamente para efectos de identificar tu solicitud.</p>
      <p>- Un folio oficial le sera asignado a la solicitud al momento en que ésta sea firmada.</p>`,
};

/**
 * @constant TEXTOS
 * @description Contiene textos genéricos utilizados en la interfaz, como mensajes de carga de archivos.
 */
export const TEXTOS = {
  INSTRUCCIONES: `
  <p>- El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click</p>`,
  CARGA_DE_ARCHIVOS: `Seleccionar archivo`,
  CARGA_DE_ARCHIVO_DE_TEXTO: `Sin archivos seleccionados`,
  CARGA_DE_ARCHIVO_DE_TEXTO_EXITOSO: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
};

/**
 * @constant ALPHANUMERIC_PATTERN
 * @description Expresión regular para validar cadenas alfanuméricas.
 */
export const ALPHANUMERIC_PATTERN = '^[a-zA-Z0-9]*$';

/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio para seleccionar "Sí" o "No".
 */
export const RADIO_OPCIONS = [
  { label: 'Sí', value: 'Si' },
  { label: 'No', value: 'No' },
];

/**
 * @constant RADIO_TIPO_AVISO
 * @description Opciones de radio para seleccionar el tipo de aviso (Manual o Carga masiva).
 */
export const RADIO_TIPO_AVISO = [
  { label: 'Manual', value: 'Manual' },
  { label: 'Carga masiva', value: 'Carga masiva' },
];

/**
 * @constant RADIO_OPCIONS_AVISO
 * @description Opciones de radio para seleccionar el tipo de aviso (Importación, Venta, o Importación y venta).
 */
export const RADIO_OPCIONS_AVISO = [
  { label: 'Importación', value: 'Importación' },
  { label: 'Venta', value: 'Venta' },
  { label: 'Importación y venta', value: 'Importación y venta' },
];