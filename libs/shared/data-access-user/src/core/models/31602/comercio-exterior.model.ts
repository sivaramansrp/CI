export interface EmpresasDelGrupo {
    rfc: string;
    denominctionORazonSocial: string;
    domicillo: string;
}

export interface Anteriores {
    denominacionSocial: string;
    rfc: string;
    numeroEmpleaUno: string;
    bimestreUno: string;
    numeroEmpleaDos: string;
    bimestreDos: string;
    numeroEmpleaTres: string;
    bimestreTres: string;
}

export const EMPRESAS_TABLA = [
    {
      encabezado: 'RFC',
      clave: (ele: EmpresasDelGrupo) => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominction o razon social',
      clave: (ele: EmpresasDelGrupo) => ele.denominctionORazonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicillo',
      clave: (ele: EmpresasDelGrupo) => ele.domicillo,
      orden: 3,
    },
];

export const ANTERIORES_TABLA = [
  {
    encabezado: 'Denominacion Social',
    clave: (ele: Anteriores) => ele.denominacionSocial,
    orden: 1,
  },
  {
    encabezado: 'RFC',
    clave: (ele: Anteriores) => ele.rfc,
    orden: 2,
  },
  {
    encabezado: 'Número de empleados',
    clave: (ele: Anteriores) => ele.numeroEmpleaUno,
    orden: 3,
  },
  {
    encabezado: '1er Bimestre',
    clave: (ele: Anteriores) => ele.bimestreUno,
    orden: 4,
  },
  {
    encabezado: 'Número de empleados',
    clave: (ele: Anteriores) => ele.numeroEmpleaDos,
    orden: 5,
  },
  {
    encabezado: '2do Bimestre',
    clave: (ele: Anteriores) => ele.bimestreDos,
    orden: 6,
  },
  {
    encabezado: 'Número de empleados',
    clave: (ele: Anteriores) => ele.numeroEmpleaTres,
    orden: 7,
  },
  {
    encabezado: '3er Bimestre',
    clave: (ele: Anteriores) => ele.bimestreTres,
    orden: 8,
  }

];