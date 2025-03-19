export interface CapacidadInstalada {
  planta: string;
  fraccionArancelariaProductoTerminadoCatlogo: string;
  umt: string;
  descripcionComercialProductoTerminado: string;
  turnos: string;
  horasPorTurno: string;
  cantidadEmpleados: string;
  cantidadMaquinaria: string;
  descripcionMaquinaria: string;
  capacidadInstaladaMensual: string;
  capacidadInstaladaAnual: string;
  capacidadEfectivamenteUtilizada: string;
  calculoCapacidadInstalada: string;
}

export const CAPACIDAD_INSTALADA = [
  {
    encabezado: 'Planta',
    clave: (ele: CapacidadInstalada): string => ele.planta,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria de producto',
    clave: (ele: CapacidadInstalada): string =>
      ele.fraccionArancelariaProductoTerminadoCatlogo,
    orden: 2,
  },
  {
    encabezado: 'UMT',
    clave: (ele: CapacidadInstalada): string => ele.umt,
    orden: 3,
  },
  {
    encabezado: 'Descripción comercial del producto terminado',
    clave: (ele: CapacidadInstalada): string =>
      ele.descripcionComercialProductoTerminado,
    orden: 4,
  },
  {
    encabezado: 'Turnos',
    clave: (ele: CapacidadInstalada): string => ele.turnos,
    orden: 5,
  },
  {
    encabezado: 'Horas por turno',
    clave: (ele: CapacidadInstalada): string => ele.horasPorTurno,
    orden: 6,
  },
  {
    encabezado: 'Cantidad empleados',
    clave: (ele: CapacidadInstalada): string => ele.cantidadEmpleados,
    orden: 7,
  },
  {
    encabezado: 'Cantidad maquinaria',
    clave: (ele: CapacidadInstalada): string => ele.cantidadMaquinaria,
    orden: 8,
  },
  {
    encabezado: 'Descripción de la maquinaria',
    clave: (ele: CapacidadInstalada): string => ele.descripcionMaquinaria,
    orden: 9,
  },
  {
    encabezado: 'Capacidad instalada mensual',
    clave: (ele: CapacidadInstalada): string => ele.capacidadInstaladaMensual,
    orden: 10,
  },
  {
    encabezado: 'Capacidad instalada anual',
    clave: (ele: CapacidadInstalada): string => ele.capacidadInstaladaAnual,
    orden: 11,
  },
  {
    encabezado: 'Capacidad efectivamente utilizada (porcentaje)',
    clave: (ele: CapacidadInstalada): string =>
      ele.capacidadEfectivamenteUtilizada,
    orden: 12,
  },
  {
    encabezado: 'Cálculo capacidad instalada',
    clave: (ele: CapacidadInstalada): string => ele.calculoCapacidadInstalada,
    orden: 13,
  },
];
