import { ConfiguracionColumna } from '@ng-mf/data-access-user';

export interface DestinoFinal {
  nombreRazonSocial: string;
  rfc: string;
  curp: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  colonia: string;
  municipioAlcaldia: string;
  localidad: string;
  entidadFederativa: string;
  estadoLocalidad: string;
  codigoPostal: string;
}

/**
 * @const DESTINO_FINAL_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del destino final en una tabla.
 */
export const DESTINO_FINAL_ENCABEZADO_DE_TABLA: ConfiguracionColumna<DestinoFinal>[] =
  [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
  ];

export interface Proveedor {
  nombreRazonSocial: string;
  rfc: string;
  curp: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  colonia: string;
  municipioAlcaldia: string;
  localidad: string;
  entidadFederativa: string;
  estadoLocalidad: string;
  codigoPostal: string;
}

/**
 * @const PROVEEDOR_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del proveedor en una tabla.
 */
export const PROVEEDOR_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Proveedor>[] =
  [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
  ];

export const TERCEROR_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
