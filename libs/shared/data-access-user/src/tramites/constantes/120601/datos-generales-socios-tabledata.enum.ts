interface Socios {
  rfc: string;
  razonsocial: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoM: string;
}

interface Extranjeros {
  taxID: string;
  razonSocial: string;
  nombre: string;
  apellidoPaterno: string;
  pais: string;
  cp: string;
  estado: string;
}

interface Representacion {
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  colonia: string;
  municipio: string;
  estado: string;
}

export const DATOS_GENERALES_SOCIOS = [
  {
    encabezado: 'RFC',
    clave: (ele: Socios) => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: Socios) => ele.razonsocial,
    orden: 2,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Socios) => ele.nombre,
    orden: 3,
  },
  {
    encabezado: 'Apellido paterno',
    clave: (ele: Socios) => ele.apellidoPaterno,
    orden: 4,
  },
  {
    encabezado: 'Apellido m',
    clave: (ele: Socios) => ele.apellidoM,
    orden: 5,
  },
];

export const DATOS_GENERALES_EXTRANJEROS = [
  {
    encabezado: 'TAX ID',
    clave: (ele: Extranjeros) => ele.taxID,
    orden: 1,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: Extranjeros) => ele.razonSocial,
    orden: 2,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Extranjeros) => ele.nombre,
    orden: 3,
  },
  {
    encabezado: 'Apellido paterno',
    clave: (ele: Extranjeros) => ele.apellidoPaterno,
    orden: 4,
  },
  {
    encabezado: 'Pais',
    clave: (ele: Extranjeros) => ele.pais,
    orden: 5,
  },
  {
    encabezado: 'CP',
    clave: (ele: Extranjeros) => ele.cp,
    orden: 6,
  },
  {
    encabezado: 'Estado',
    clave: (ele: Extranjeros) => ele.estado,
    orden: 7,
  },
];

export const DATOS_GENERALES_REPRESENTACION = [
  {
    encabezado: 'Calle',
    clave: (ele: Representacion) => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: Representacion) => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: Representacion) => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: Representacion) => ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: Representacion) => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: Representacion) => ele.municipio,
    orden: 6,
  },
  {
    encabezado: 'Estado',
    clave: (ele: Representacion) => ele.estado,
    orden: 7,
  },
];