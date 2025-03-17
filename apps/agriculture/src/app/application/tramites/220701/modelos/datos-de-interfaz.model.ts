/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @interface immexRegistroform
 * @description Interfaz para el formulario de registro IMMEX.
 */
export interface immexRegistroform {
  candidadPorPeriodo: string;
  capacidadPeriodo: string;
  candiadAnual: string;
  commodityNicoDescImportacion: string;
  nicoDatos: string;
  exportacionDescExportacion: string;
  FraccionDescExportacion: string;
  fraccionArancelariaDesc: string;
  permisoImmexDatos: number;
  fraccionArancelariaExportacion: string;
  productoDescExportacion: string;
  productoArancelariaExportacion: number;
  Nico: string;
  fraccionDatos: number;
  commodityCandiadAnual: number;
  commodityCapacidadInstalda: string;
  commodityCandidadPor: string;
  commodityFraccionImportacion: number;
  commodityImportacion: number;
  commodityDescImportacion: string;
  nicoDescImportacion: string;
}
export interface Mercancia {
  Partida: string;
  Tiporequisito: string;
  Requisito: string;
  Certificado: number;
  Fraccion: string;
  Descripcion: string;
  Nico: string;
}


/**
 * @constant MERCANCIA_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio IMMEX.
 */
export const MERCANCIA_SERVICIO = [
  {
    encabezado: 'No. pardita',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Tipo de requisito',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Requisito',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Número Certificado Internacional',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_6,
    orden: 6
  },
  {
    encabezado: 'Nico',
    clave: (ele: mercanciaInfo) => ele.TABLA_Columna_7,
    orden: 7
  },
]

/**
 * @interface mercanciaInfo
 * @description Interfaz para la información de IMMEX.
 */
export interface mercanciaInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  estatus: boolean;
}

/**
 * @constant EXPORTADOR_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio IMMEX.
 */
export const EXPORTADOR_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Domicilio',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'País',
    clave: (ele: exportadorInfo) => ele.TABLA_Columna_5,
    orden: 5
  }
]

/**
 * @interface exportadorInfo
 * @description Interfaz para la información de IMMEX.
 */
export interface exportadorInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}


/**
 * @constant DESTINO_SERVICIO
 * @description Configuración de las columnas de la tabla para el servicio IMMEX.
 */
export const DESTINO_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Calle',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Número extrior',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_5,
    orden: 5
  },
  {
    encabezado: 'Número interior',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_6,
    orden: 6
  },
  {
    encabezado: 'País',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_7,
    orden: 7
  }
  ,
  {
    encabezado: 'Colonia',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_8,
    orden: 8
  }
  ,
  {
    encabezado: 'Mucinipio o alcaldía',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_9,
    orden: 9
  }
  ,
  {
    encabezado: 'Entidad federativa',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_10,
    orden: 10
  }
  ,
  {
    encabezado: 'Código postal',
    clave: (ele: destinoInfo) => ele.TABLA_Columna_11,
    orden: 11
  }
]

/**
 * @interface exportadorInfo
 * @description Interfaz para la información de IMMEX.
 */
export interface destinoInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  TABLA_Columna_8: string;
  TABLA_Columna_9: string;
  TABLA_Columna_10: string;
  TABLA_Columna_11: string;
  estatus: boolean;
}


