//Directos

// #Planta
// Total
// Directos
// Cedula de cuotas
// Fecha de cedula
// Indirectos
// Contrato
// Objeto del contrato del servicio
// Fecha firma
// Fecha fin vigencia
// RFC
// Razon social

export interface Directos {
  PLANTA: string;
  TOTAL: string;
  DIRECTOS: string;
  CEDULA_DE_CUOTAS: string;
  FECHA_DE_CEDULA: string;
  INDIRECTOS: string;
  CONTRATO: string;
  OBJETO_DEL_CONTRATO_DEL_SERVICIO: string;
  FECHA_FIRMA: string;
  FECHA_FIN_VIGENCIA: string;
  RFC: string;
  RAZON_SOCIAL: string;
}

export const DIRECTOS = [
  {
    encabezado: '#Planta',
    clave: (ele: Directos): string => ele.PLANTA,
    orden: 1,
  },
  { encabezado: 'Total', clave: (ele: Directos) => ele.TOTAL, orden: 2 },
  { encabezado: 'Directos', clave: (ele: Directos) => ele.DIRECTOS, orden: 3 },
  {
    encabezado: 'Cedula de cuotas',
    clave: (ele: Directos) => ele.CEDULA_DE_CUOTAS,
    orden: 4,
  },
  {
    encabezado: 'Fecha de cedula',
    clave: (ele: Directos) => ele.FECHA_DE_CEDULA,
    orden: 5,
  },
  {
    encabezado: 'Indirectos',
    clave: (ele: Directos) => ele.INDIRECTOS,
    orden: 6,
  },
  { encabezado: 'Contrato', clave: (ele: Directos) => ele.CONTRATO, orden: 7 },
  {
    encabezado: 'Objeto del contrato del servicio',
    clave: (ele: Directos) => ele.OBJETO_DEL_CONTRATO_DEL_SERVICIO,
    orden: 8,
  },
  {
    encabezado: 'Fecha firma',
    clave: (ele: Directos) => ele.FECHA_FIRMA,
    orden: 9,
  },
  {
    encabezado: 'Fecha fin vigencia',
    clave: (ele: Directos) => ele.FECHA_FIN_VIGENCIA,
    orden: 10,
  },
  { encabezado: 'RFC', clave: (ele: Directos) => ele.RFC, orden: 11 },
  {
    encabezado: 'Razon social',
    clave: (ele: Directos): string => ele.RAZON_SOCIAL,
    orden: 12,
  },
];

export const FECHA_DE_CEDULA = {
  labelNombre: 'Fecha de cédulas del IMSS',
  required: true,
  habilitado: true,
};
export const FECHA_DE_FIRMA = {
  labelNombre: 'Fecha de firma',
  required: true,
  habilitado: true,
};

export const FECHA_FIN_VIGENCIA = {
  labelNombre: 'Fecha de fin de vigencia',
  required: true,
  habilitado: true,
};
