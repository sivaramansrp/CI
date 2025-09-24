export const FECHA_DE_FIRMA = {
  labelNombre: 'Fecha de firma',
  required: true,
  habilitado: true,
};
export const FECHA_DE_FIN_DE_VIGENCIA = {
  labelNombre: 'Fecha de fin de vigencia',
  required: true,
  habilitado: true,
};

export interface ComplementoDePlanta { 
  PLANTA: string;
  PERMANECERA_MERCANCIA_PROGRAMA: string;
  TIPO_DOCUMENTO: string;
  FECHA_DE_FIRMA: string;
  FECHA_DE_FIN_DE_VIGENCIA: string;
  DOCUMENTO_RESPALDO: string;
  FECHA_DE_FIRMA_DOCUMENTO: string;
  FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO: string;
}

/**
 * Configuración de las columnas para la tabla de complemento de planta.
 * Cada objeto dentro del arreglo representa una columna de la tabla,
 * definiendo su encabezado, la clave para obtener el valor correspondiente
 */
export interface MontoDeInversion {
  PLANTA: string;
  TIPO: string;
  CANTIDAD: string;
  DESCRIPCION: string;
  MONTO: string;
}

export const COMPLEMENTO_DE_PLANTA = [
  {
    encabezado: '#Planta',
    clave: (ele: ComplementoDePlanta): string => ele.PLANTA,
    orden: 1,
  },
  {
    encabezado: 'Permanecerá mercancía al amparo del programa',
    clave: (ele: ComplementoDePlanta): string =>
      ele.PERMANECERA_MERCANCIA_PROGRAMA,
    orden: 2,
  },
  {
    encabezado: 'Tipo de documento',
    clave: (ele: ComplementoDePlanta): string => ele.TIPO_DOCUMENTO,
    orden: 3,
  },
  {
    encabezado: 'Fecha de firma (programa)',
    clave: (ele: ComplementoDePlanta): string => ele.FECHA_DE_FIRMA,
    orden: 4,
  },
  {
    encabezado: 'Fecha de fin de vigencia (programa)',
    clave: (ele: ComplementoDePlanta): string => ele.FECHA_DE_FIN_DE_VIGENCIA,
    orden: 5,
  },
  {
    encabezado: 'Documento respaldo',
    clave: (ele: ComplementoDePlanta): string => ele.DOCUMENTO_RESPALDO,
    orden: 6,
  },
  {
    encabezado: 'Fecha de firma (documento)',
    clave: (ele: ComplementoDePlanta): string => ele.FECHA_DE_FIRMA_DOCUMENTO,
    orden: 7,
  },
  {
    encabezado: 'Fecha de fin de vigencia (documento)',
    clave: (ele: ComplementoDePlanta): string =>
      ele.FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO,
    orden: 8,
  },
];

/**
 * Configuración de las columnas para la tabla de montos de inversión.
 * Cada objeto dentro del arreglo representa una columna de la tabla,
 * definiendo su encabezado, la clave para obtener el valor correspondiente
 */
export const MONTOS_DE_INVERSION = [
  {
    encabezado: '#Planta',
    clave: (ele: MontoDeInversion): string => ele.PLANTA,
    orden: 1,
  },
  {
    encabezado: 'Tipo',
    clave: (ele: MontoDeInversion): string => ele.TIPO,
    orden: 2,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: MontoDeInversion): string => ele.CANTIDAD,
    orden: 3,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: MontoDeInversion): string => ele.DESCRIPCION,
    orden: 4,
  },
  {
    encabezado: 'Monto',
    clave: (ele: MontoDeInversion): string => ele.MONTO,
    orden: 5,
  },
];

export const CATALOGO_TIPO = [{ "id": 1, "descripcion": "JALISCO" }];

/**
 * Opciones para indicar si la mercancía permanecerá al amparo del programa.
 */
export const PERMANCERA_OPTIONS = [
  { "id": 1, "descripcion": "SI" },
  { "id": 2, "descripcion": "NO" }
]