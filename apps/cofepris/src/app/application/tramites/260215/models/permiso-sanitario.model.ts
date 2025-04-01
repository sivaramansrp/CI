export interface PermisoModel {
  Nombre: string;
  RFC: string;
  CURP: string;
  Teléfono: number;
  CorreoElectrónico: string;
  calle: string;
}
export interface NicoInfo {
  clave_Scian: string;
  descripcion_Scian: string;
}

export const NICO_TABLA = [
  {
    encabezado: 'Clave S.C.I.A.N.',
    clave: (ele: NicoInfo) => ele.clave_Scian,
    orden: 1,
  },
  {
    encabezado: 'Descripción del S.C.I.A.N.',
    clave: (ele: NicoInfo) => ele.descripcion_Scian,
    orden: 2,
  },
];

export interface MercanciasInfo {
  clasificacion: string;
  especificar: string;
  denominacionEspecifica: string;
  denominacionDistintiva: string;
  denominacionComun: string;
  formaFarmaceutica: string;
  estadoFisico: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidad: string;
  cantidadUMC: string;
  unidadUMT: string;
  cantidadUMT: string;
  presentacion: string;
  numeroRegistro: string;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  tipoProducto: string;
  usoEspecifico: string;
  fechaCaducidad: string;
}

export const MERCANCIAS_DATA = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: MercanciasInfo) => ele.clasificacion,
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: MercanciasInfo) => ele.especificar,
    orden: 2,
  },
  {
    encabezado: 'Denominación específica del producto',
    clave: (ele: MercanciasInfo) => ele.denominacionEspecifica,
    orden: 3,
  },
  {
    encabezado: 'Denominación distintiva',
    clave: (ele: MercanciasInfo) => ele.denominacionDistintiva,
    orden: 4,
  },
  {
    encabezado: 'Denominación común, nombre común o nombre científico',
    clave: (ele: MercanciasInfo) => ele.denominacionComun,
    orden: 5,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: MercanciasInfo) => ele.formaFarmaceutica,
    orden: 6,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: MercanciasInfo) => ele.estadoFisico,
    orden: 7,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: MercanciasInfo) => ele.fraccionArancelaria,
    orden: 8,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: MercanciasInfo) => ele.descripcionFraccion,
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (ele: MercanciasInfo) => ele.unidad,
    orden: 10,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: MercanciasInfo) => ele.cantidadUMC,
    orden: 11,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: MercanciasInfo) => ele.unidadUMT,
    orden: 12,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: MercanciasInfo) => ele.cantidadUMT,
    orden: 13,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: MercanciasInfo) => ele.presentacion,
    orden: 14,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: MercanciasInfo) => ele.numeroRegistro,
    orden: 15,
  },
  {
    encabezado: 'País de orígen',
    clave: (ele: MercanciasInfo) => ele.paisDeOrigen,
    orden: 16,
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: MercanciasInfo) => ele.paisDeProcedencia,
    orden: 17,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: MercanciasInfo) => ele.tipoProducto,
    orden: 18,
  },
  {
    encabezado: 'Uso específico',
    clave: (ele: MercanciasInfo) => ele.usoEspecifico,
    orden: 19,
  },
  {
    encabezado: 'Fecha de caducidad',
    clave: (ele: MercanciasInfo) => ele.fechaCaducidad,
    orden: 20,
  },
];

/**
 * Modelo de datos para una fila de una tabla.
 * Representa los datos que se mostrarán en la tabla.
 */
export interface TablaDatos {
  /**
   * Datos de la fila representados por un arreglo de cadenas.
   *
   * @property {string[]} tbodyData - Datos de la fila que se mostrarán en la tabla.
   */
  tbodyData: string[];
}
