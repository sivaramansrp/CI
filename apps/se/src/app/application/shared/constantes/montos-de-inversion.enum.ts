export interface MontoDeInversion {
  PLANTA: string;
  TIPO: string;
  CANTIDAD: string;
  DESCRIPCION: string;
  MONTO: string;
}

//#Planta | Tipo | Cantidad | Descripción | Monto

export const MONTOS_DE_INVERSION = [
  {
    encabezado: '#Planta',
    clave: (ele: MontoDeInversion) => ele.PLANTA,
    orden: 1,
  },
  {
    encabezado: 'Tipo',
    clave: (ele: MontoDeInversion) => ele.TIPO,
    orden: 2,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: MontoDeInversion) => ele.CANTIDAD,
    orden: 3,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: MontoDeInversion) => ele.DESCRIPCION,
    orden: 4,
  },
  {
    encabezado: 'Monto',
    clave: (ele: MontoDeInversion) => ele.MONTO,
    orden: 5,
  },
];
