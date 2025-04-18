export interface TablaDatos {
  tbodyData: string[];
}
export interface Transporte {
  numeroIdentificacion: string;
  numeroEconomico: string;
  placa: string;
}

export interface Requisito {
  No: string;
  Fecha: string;
  Tipo: string | undefined;
}
export interface Producto {
  descripcion: string | undefined;
}

export interface Detalle {
  fraccionArancelaria: string | undefined;
  cantidad: string;
  unidadMedida: string | undefined;
  nombreCientifico: string | undefined;
  nombreComun: string | undefined;
  paisOrigen: string | undefined;
  paisProcedencia: string | undefined;
}
export const CONFIGURATION_TABLA = [
  {
    encabezado: 'Descripción de la mercancía',
    clave: (item: Producto): string | undefined => item.descripcion,
    orden: 1,
  },
];
export const CONFIGURATION_TABLA_MERCANCIAS = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (item: Detalle): string | undefined => item.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Cantidad',
    clave: (item: Detalle): string => item.cantidad,
    orden: 2,
  },
  {
    encabezado: 'Unidad de medida',
    clave: (item: Detalle): string | undefined => item.unidadMedida,
    orden: 3,
  },
  {
    encabezado: 'Nombre científico',
    clave: (item: Detalle): string | undefined => item.nombreCientifico,
    orden: 4,
  },
  {
    encabezado: 'Nombre común',
    clave: (item: Detalle): string | undefined => item.nombreComun,
    orden: 5,
  },
  {
    encabezado: 'País de origen',
    clave: (item: Detalle): string | undefined => item.paisOrigen,
    orden: 6,
  },
  {
    encabezado: 'País de procedencia',
    clave: (item: Detalle): string | undefined => item.paisProcedencia,
    orden: 7,
  },
];
export const CONFIGURATION_TABLA_TRANSPORTE = [
  {
    encabezado: 'No. de Identificación',
    clave: (item: Transporte): string => item.numeroIdentificacion,
    orden: 1,
  },
  {
    encabezado: 'No. económico',
    clave: (item: Transporte): string => item.numeroEconomico,
    orden: 2,
  },
  {
    encabezado: 'Placa',
    clave: (item: Transporte): string => item.placa,
    orden: 3,
  },
];

export const CONFIGURATION_TABLA_REQUISITOS = [
  { encabezado: 'No', clave: (item: Requisito): string => item.No, orden: 1 },
  {
    encabezado: 'Fecha',
    clave: (item: Requisito): string => item.Fecha,
    orden: 2,
  },
  {
    encabezado: 'Tipo',
    clave: (item: Requisito): string | undefined => item.Tipo,
    orden: 3,
  },
];
export interface CertificadosTablaDatos {
  columns: string[];
}
export interface DestinatarioTablaDatos {
  columns: string[];
}
