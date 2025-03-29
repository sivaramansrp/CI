export interface ConfiguracionItem {
  fraccionArancelaria: string;
  otraFraccion: boolean;
  descripcion: string;
  clasificacionTaxonomica: string;
  rendimientoProducto: string;
  nombreCientifico: string;
  nombreComun: string;
  marca: string;
  cantidad: number;
  unidadMedida: string;
  paisOrigen: string;
  paisProcedencia: string;
}

export const CONFIGURACION_TABLA_MERCANCIA = [
  {
    encabezado: 'Fracción arancelaria',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Otra fracción',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.otraFraccion,
    orden: 2,
  },
  {
    encabezado: 'Descripción',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.descripcion,
    orden: 3,
  },
  {
    encabezado: 'Rendimiento del producto',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.rendimientoProducto,
    orden: 4,
  },
  {
    encabezado: 'Nombre científico',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.nombreCientifico,
    orden: 5,
  },
  {
    encabezado: 'Nombre común',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.nombreComun,
    orden: 6,
  },
  {
    encabezado: 'Marca (marcaje)',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.marca,
    orden: 7,
  },
  {
    encabezado: 'Cantidad',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.cantidad,
    orden: 8,
  },
  {
    encabezado: 'Unidad de medida',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.unidadMedida,
    orden: 9,
  },
  {
    encabezado: 'País de orígen',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.paisOrigen,
    orden: 10,
  },
  {
    encabezado: 'País de procedencia',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    clave: (item: ConfiguracionItem) => item.paisProcedencia,
    orden: 11,
  },
];
