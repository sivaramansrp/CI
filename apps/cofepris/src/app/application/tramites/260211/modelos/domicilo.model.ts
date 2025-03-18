/**
 * Interfaz que define la estructura de la información NICO.
 * 
 * Esta interfaz se utiliza para modelar la información de las claves y descripciones
 * del Sistema de Clasificación Industrial de América del Norte (S.C.I.A.N.).
 */
export interface nicoInfo {
    /** Clave del S.C.I.A.N. */
    clave_Scian: string;
    /** Descripción asociada a la clave del S.C.I.A.N. */
    descripcion_Scian: string;
  }
   
  /**
   * Configuración de la tabla para la visualización de datos NICO.
   * 
   * Esta constante define las columnas y el orden en que se mostrarán los datos.
   */
  export const NICO_TABLA = [
    {
      /** Encabezado para la clave del S.C.I.A.N. */
      encabezado: 'Clave S.C.I.A.N.',
      /** Función que obtiene la clave del elemento */
      clave: (ele: nicoInfo) => ele.clave_Scian,
      /** Orden de visualización de la columna */
      orden: 1,
    },
    {
      /** Encabezado para la descripción del S.C.I.A.N. */
      encabezado: 'Descripción del S.C.I.A.N.',
      /** Función que obtiene la descripción del elemento */
      clave: (ele: nicoInfo) => ele.descripcion_Scian,
      /** Orden de visualización de la columna */
      orden: 2,
    },
  ];
   
  /**
   * Interfaz que define la estructura de la información de mercancías.
   * 
   * Esta interfaz se utiliza para modelar todos los atributos relacionados con las mercancías,
   * incluyendo clasificación, denominaciones, medidas, procedencia y caducidad.
   */
  export interface mercanciasInfo {
    /** Clasificación del producto */
    clasificacion: string;
    /** Especificación de la clasificación */
    especificar: string;
    /** Denominación específica del producto */
    denominacionEspecifica: string;
    /** Denominación distintiva del producto */
    denominacionDistintiva: string;
    /** Denominación común o científica */
    denominacionComun: string;
    /** Forma farmacéutica del producto */
    formaFarmaceutica: string;
    /** Estado físico del producto */
    estadoFisico: string;
    /** Fracción arancelaria asociada */
    fraccionArancelaria: string;
    /** Descripción de la fracción arancelaria */
    descripcionFraccion: string;
    /** Unidad de medida de comercialización (UMC) */
    unidad: string;
    /** Cantidad correspondiente a la UMC */
    cantidadUMC: string;
    /** Unidad de medida de tarifa (UMT) */
    unidadUMT: string;
    /** Cantidad correspondiente a la UMT */
    cantidadUMT: string;
    /** Presentación del producto */
    presentacion: string;
    /** Número de registro sanitario del producto */
    numeroRegistro: string;
    /** País de origen del producto */
    paisDeOrigen: string;
    /** País de procedencia del producto */
    paisDeProcedencia: string;
    /** Tipo de producto */
    tipoProducto: string;
    /** Uso específico del producto */
    usoEspecifico: string;
    /** Fecha de caducidad del producto */
    fechaCaducidad: string;
  }
   
  /**
   * Configuración de la tabla para la visualización de datos de mercancías.
   * 
   * Esta constante define las columnas y el orden en que se mostrarán los datos.
   */
  export const MERCANCIAS_DATA = [
    {
      encabezado: 'Clasificación del producto',
      clave: (ele: mercanciasInfo) => ele.clasificacion,
      orden: 1,
    },
    {
      encabezado: 'Especificar clasificación del producto',
      clave: (ele: mercanciasInfo) => ele.especificar,
      orden: 2,
    },
    {
      encabezado: 'Denominación específica del producto',
      clave: (ele: mercanciasInfo) => ele.denominacionEspecifica,
      orden: 3,
    },
    {
      encabezado: 'Denominación distintiva',
      clave: (ele: mercanciasInfo) => ele.denominacionDistintiva,
      orden: 4,
    },
    {
      encabezado: 'Denominación común, nombre común o nombre científico',
      clave: (ele: mercanciasInfo) => ele.denominacionComun,
      orden: 5,
    },
    {
      encabezado: 'Forma farmacéutica',
      clave: (ele: mercanciasInfo) => ele.formaFarmaceutica,
      orden: 6,
    },
    {
      encabezado: 'Estado físico',
      clave: (ele: mercanciasInfo) => ele.estadoFisico,
      orden: 7,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: mercanciasInfo) => ele.fraccionArancelaria,
      orden: 8,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (ele: mercanciasInfo) => ele.descripcionFraccion,
      orden: 9,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (ele: mercanciasInfo) => ele.unidad,
      orden: 10,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (ele: mercanciasInfo) => ele.cantidadUMC,
      orden: 11,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (ele: mercanciasInfo) => ele.unidadUMT,
      orden: 12,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (ele: mercanciasInfo) => ele.cantidadUMT,
      orden: 13,
    },
    {
      encabezado: 'Presentación',
      clave: (ele: mercanciasInfo) => ele.presentacion,
      orden: 14,
    },
    {
      encabezado: 'Número de registro sanitario',
      clave: (ele: mercanciasInfo) => ele.numeroRegistro,
      orden: 15,
    },
    {
      encabezado: 'País de origen',
      clave: (ele: mercanciasInfo) => ele.paisDeOrigen,
      orden: 16,
    },
    {
      encabezado: 'País de procedencia',
      clave: (ele: mercanciasInfo) => ele.paisDeProcedencia,
      orden: 17,
    },
    {
      encabezado: 'Tipo producto',
      clave: (ele: mercanciasInfo) => ele.tipoProducto,
      orden: 18,
    },
    {
      encabezado: 'Uso específico',
      clave: (ele: mercanciasInfo) => ele.usoEspecifico,
      orden: 19,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (ele: mercanciasInfo) => ele.fechaCaducidad,
      orden: 20,
    },
  ];
   