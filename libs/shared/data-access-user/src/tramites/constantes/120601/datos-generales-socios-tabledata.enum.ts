interface Socios {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}

interface Extranjeros {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  F: string;
  G: string;
}

export const DATOS_GENERALES_SOCIOS = [
  {
    encabezado: 'RFC',
    clave: (ele: Socios) => ele.a,
    orden: 1,
  },
  {
    encabezado: 'Razon social',
    clave: (ele: Socios) => ele.b,
    orden: 2,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Socios) => ele.c,
    orden: 3,
  },
  {
    encabezado: 'Apellido paterno',
    clave: (ele: Socios) => ele.d,
    orden: 4,
  },
  {
    encabezado: 'Apellido m',
    clave: (ele: Socios) => ele.e,
    orden: 5,
  },
];

export const DATOS_GENERALES_EXTRANJEROS = [
  {
    encabezado: 'TAX ID ',
    clave: (ele: Extranjeros) => ele.a,
    orden: 1,
  },
  {
    encabezado: 'Razon social',
    clave: (ele: Extranjeros) => ele.b,
    orden: 2,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Extranjeros) => ele.c,
    orden: 3,
  },
  {
    encabezado: 'Apellido paterno',
    clave: (ele: Extranjeros) => ele.d,
    orden: 4,
  },
  {
    encabezado: 'Pais',
    clave: (ele: Extranjeros) => ele.e,
    orden: 5,
  },
  {
    encabezado: 'CP',
    clave: (ele: Extranjeros) => ele.F,
    orden: 6,
  },
  {
    encabezado: 'Estado',
    clave: (ele: Extranjeros) => ele.G,
    orden: 7,
  },
];
