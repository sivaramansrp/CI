import { ConfiguracionColumna } from '@ng-mf/data-access-user';

/**
 * @const MENSAJE_TABLA_OBLIGATORIA
 * @description Mensaje que indica que las tablas marcadas con asterisco son obligatorias
 * y se debe agregar al menos un registro.
 */
export const MENSAJE_TABLA_OBLIGATORIA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * @interface Fabricante
 * @description Representa los datos correspondientes a un fabricante.
 */
export interface Fabricante {
  id?:number;
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
  coloniaEquivalente: string;
}

/**
 * @const FABRICANTE_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del fabricante en una tabla.
 */
export const FABRICANTE_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Fabricante>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o Equivalente',
      clave: (fila) => fila.coloniaEquivalente,
      orden: 16,
    },
  ];

/**
 * @interface Destinatario
 * @description Representa los datos correspondientes a un destinatario.
 */
export interface Destinatario {
  id?:number;
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
  coloniaEquivalente: string;
}

/**
 * @const DESTINATARIO_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del destinatario en una tabla.
 */
export const DESTINATARIO_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Destinatario>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o Equivalente',
      clave: (fila) => fila.coloniaEquivalente,
      orden: 16,
    },
  ];

/**
 * @interface Proveedor
 * @description Representa los datos correspondientes a un proveedor.
 */
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
  coloniaEquivalente: string;
}

/**
 * @const PROVEEDOR_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del proveedor en una tabla.
 */
export const PROVEEDOR_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Proveedor>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o Equivalente',
      clave: (fila) => fila.coloniaEquivalente,
      orden: 16,
    },
  ];

/**
 * @interface Facturador
 * @description Representa los datos correspondientes a un facturador.
 */
export interface Facturador {
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
  coloniaEquivalente: string;
}

/**
 * @const FACTURADOR_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del facturador en una tabla.
 */
export const FACTURADOR_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Facturador>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o Equivalente',
      clave: (fila) => fila.coloniaEquivalente,
      orden: 16,
    },
  ];

/**
 * @interface PagoDerechosFormState
 * @description Representa el estado del formulario para el pago de derechos.
 */
export interface PagoDerechosFormState {
  claveReferencia: string;
  cadenaDependencia: string;
  estado: string;
  llavePago: string;
  fechaPago: string;
  importePago: string;
  banco?: string;
}

/**
 * @const FECHA_DE_PAGO
 * @description Configuración del campo “Fecha de pago” en el formulario.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: false,
  habilitado: true,
};

export interface TercerosRelacionadosDatos {
  fabricanteTablaDatos: Fabricante[];
  destinatarioFinalTablaDatos: Destinatario[];
  proveedorTablaDatos: Proveedor[];
  facturadorTablaDatos: Facturador[];
}
 
