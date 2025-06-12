import { ConfiguracionColumna } from '@ng-mf/data-access-user'; // adjust the import path if needed

/**
 * Representa la información de una empresa submanufacturera.
 *
 * @property estatus - El estado actual de la empresa submanufacturera.
 * @property rfc - El Registro Federal de Contribuyentes (RFC) de la empresa.
 * @property razonSocial - La razón social de la empresa.
 * @property calle - La calle donde se encuentra ubicada la empresa.
 * @property numeroInterior - El número interior del domicilio de la empresa.
 * @property numeroExterior - El número exterior del domicilio de la empresa.
 * @property codigoPostal - El código postal del domicilio de la empresa.
 * @property localidad - La localidad donde se encuentra la empresa.
 * @property municipioAlcaldia - El municipio o alcaldía donde se encuentra la empresa.
 * @property entidadFederativa - La entidad federativa (estado) donde se encuentra la empresa.
 * @property pais - El país donde se encuentra la empresa.
 * @property telefono - El número de teléfono de contacto de la empresa.
 * @property fax - El número de fax de la empresa.
 * @property correoElectronico - La dirección de correo electrónico de la empresa.
 */
export interface EmpresaSubmanufacturera {
  estatus: string;
  rfc: string;
  razonSocial: string;
  calle: string;
  numeroInterior: string;
  numeroExterior: string;
  codigoPostal: string;
  localidad: string;
  municipioAlcaldia: string;
  entidadFederativa: string;
  pais: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
}

/**
 * Constante que define la configuración de columnas para la tabla de empresas submanufactureras.
 *
 * @const
 * @type {ConfiguracionColumna<EmpresaSubmanufacturera>[]}
 */
export const EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<EmpresaSubmanufacturera>[] =
  [
    { encabezado: 'Estatus', clave: (fila) => fila.estatus, orden: 1 },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'Razón social', clave: (fila) => fila.razonSocial, orden: 3 },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 4 },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 5,
    },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 6,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 7,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 8 },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 9,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 10,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 11 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 12 },
    { encabezado: 'Fax', clave: (fila) => fila.fax, orden: 13 },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 14,
    },
  ];

/**
 * Representa la información de una bitácora de modificaciones.
 *
 * @property tipoModificacion - El tipo de modificación realizada.
 * @property fechaModificacion - La fecha en que se realizó la modificación.
 * @property valoresAnteriores - Los valores anteriores antes de la modificación.
 * @property valoresNuevos - Los nuevos valores después de la modificación.
 *
 */

export interface Bitacora {
  tipoModificacion: string;
  fechaModificacion: string;
  valoresAnteriores: string;
  valoresNuevos: string;
}

/**
 * Constante que define la configuración de columnas para la tabla de bitácora.
 *
 * @const
 * @type {ConfiguracionColumna<Bitacora>[]}
 */
export const BITACORA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Bitacora>[] = [
  {
    encabezado: 'Tipo modificación',
    clave: (fila) => fila.tipoModificacion,
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación',
    clave: (fila) => fila.fechaModificacion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (fila) => fila.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos',
    clave: (fila) => fila.valoresNuevos,
    orden: 4,
  },
];

/**
 * Representa los datos de modificación de un programa IMMEX para una empresa submanufacturera.
 *
 * @property rfc - El Registro Federal de Contribuyentes (RFC) de la empresa.
 * @property representacionFederal - La representación federal de la empresa.
 * @property tipoModificacion - El tipo de modificación que se está realizando.
 * @property modificacionPrograma - Detalles específicos sobre la modificación del programa.
 */
export interface ModificacionDatos {
  rfc: string;
  representacionFederal: string;
  tipoModificacion: string;
  modificacionPrograma: string;
}
