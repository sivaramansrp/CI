export interface MontoDeInversion {
  planta: string;
  tipo: string;
  cantidad: string;
  descripcion: string;
  monto: string;
}

export const MONTOS_DE_INVERSION = [
  {
    encabezado: '#Planta',
    clave: (ele: MontoDeInversion): string => ele.planta,
    orden: 1,
  },
  {
    encabezado: 'Tipo',
    clave: (ele: MontoDeInversion): string => ele.tipo,
    orden: 2,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: MontoDeInversion): string => ele.cantidad,
    orden: 3,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: MontoDeInversion): string => ele.descripcion,
    orden: 4,
  },
  {
    encabezado: 'Monto',
    clave: (ele: MontoDeInversion): string => ele.monto,
    orden: 5,
  },
];
