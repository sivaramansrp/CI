import { ConfiguracionColumna } from '@ng-mf/data-access-user';


/**
 * Mensaje que indica que las tablas marcadas con asterisco son obligatorias
 * y que se debe agregar al menos un registro en ellas.
 */
export const MENSAJE_TABLA_OBLIGATORIA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';


/**
 * Interfaz que representa la información de un fabricante.
 */
export interface Fabricante {
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;

  /**
   * Nombre o razón social del fabricante.
   */
  nombreRazonSocial: string;

  /**
   * Registro Federal de Contribuyentes (RFC) del fabricante.
   */
  rfc: string;

  /**
   * Clave Única de Registro de Población (CURP) del fabricante.
   */
  curp: string;

  /**
   * Número de teléfono del fabricante.
   */
  telefono: string;

  /**
   * Correo electrónico del fabricante.
   */
  correoElectronico: string;

  /**
   * Calle donde se encuentra ubicado el fabricante.
   */
  calle: string;

  /**
   * Número exterior del domicilio del fabricante.
   */
  numeroExterior: string;

  /**
   * Número interior del domicilio del fabricante.
   */
  numeroInterior: string;

  /**
   * País donde se encuentra ubicado el fabricante.
   */
  pais: string;

  /**
   * Colonia donde se encuentra ubicado el fabricante.
   */
  colonia: string;

  /**
   * Municipio o alcaldía donde se encuentra ubicado el fabricante.
   */
  municipioAlcaldia: string;

  /**
   * Localidad donde se encuentra ubicado el fabricante.
   */
  localidad: string;

  /**
   * Estado o localidad donde se encuentra ubicado el fabricante.
   */
  estadoLocalidad: string;

  /**
   * Estado donde se encuentra ubicado el fabricante.
   */
  estado: string;

  /**
   * Colonia equivalente del fabricante.
   */
  coloniaEquivalente: string;

  /**
   * Lada telefónica del fabricante.
   */
  lada: string;

  /**
   * Descripción del país donde se encuentra ubicado el fabricante.
   */
  descPais: string;
}

/**
 * Configuración de las columnas para la tabla de fabricantes.
 * 
 * Cada objeto en el arreglo representa una columna de la tabla, definiendo su encabezado,
 * la clave para acceder al valor correspondiente en la fila, y el orden en el que se muestra.
 * 
 * @type {ConfiguracionColumna<Fabricante>[]}
 * 
 * @property {string} encabezado - El texto que se mostrará como encabezado de la columna.
 * @property {(fila: Fabricante) => any} clave - Una función que define cómo obtener el valor de la columna desde una fila.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
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
      encabezado: 'Estado',
      clave: (fila) => fila.estadoLocalidad,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (fila) => fila.estado,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.coloniaEquivalente,
      orden: 15
    },
  ];



/**
 * Interfaz que representa un destinatario con información detallada.
 */
export interface Destinatario {
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;

  /**
   * Nombre o razón social del destinatario.
   */
  nombreRazonSocial: string;

  /**
   * Nombres del destinatario.
   */
  nombres: string;

  /**
   * Primer apellido del destinatario.
   */
  primerApellido: string;

  /**
   * Segundo apellido del destinatario.
   */
  segundoApellido: string;

  /**
   * Registro Federal de Contribuyentes (RFC) del destinatario.
   */
  rfc: string;

  /**
   * Clave Única de Registro de Población (CURP) del destinatario.
   */
  curp: string;

  /**
   * Teléfono de contacto del destinatario.
   */
  telefono: string;

  /**
   * Correo electrónico del destinatario.
   */
  correoElectronico: string;

  /**
   * Calle del domicilio del destinatario.
   */
  calle: string;

  /**
   * Número exterior del domicilio del destinatario.
   */
  numeroExterior: string;

  /**
   * Número interior del domicilio del destinatario.
   */
  numeroInterior: string;

  /**
   * País del domicilio del destinatario.
   */
  pais: string;

  /**
   * Colonia del domicilio del destinatario.
   */
  colonia: string;

  /**
   * Municipio o alcaldía del domicilio del destinatario.
   */
  municipioAlcaldia: string;

  /**
   * Localidad del domicilio del destinatario.
   */
  localidad: string;

  /**
   * Estado del domicilio del destinatario.
   */
  estado: string;

  /**
   * Estado o localidad del domicilio del destinatario.
   */
  estadoLocalidad: string;

  /**
   * Código postal del domicilio del destinatario.
   */
  codigoPostal: string;

  /**
   * Lada telefónica del destinatario.
   */
  lada: string;

  /**
   * Descripción del estado del domicilio del destinatario.
   */
  descEstado: string;

  /**
   * Descripción del código postal del domicilio del destinatario.
   */
  descCodigoPostal: string;

  /**
   * Descripción de la colonia del domicilio del destinatario.
   */
  descColonia: string;

  /**
   * Descripción del municipio o alcaldía del domicilio del destinatario.
   */
  descMunicipio: string;

  /**
   * Descripción de la localidad del domicilio del destinatario.
   */
  descLocalidad: string;

  /**
   * Descripción del país del domicilio del destinatario.
   */
  descPais: string;
}

/**
 * Configuración de las columnas para la tabla de destinatarios.
 * 
 * Este arreglo define las columnas que se mostrarán en la tabla de destinatarios,
 * incluyendo el encabezado, la clave para acceder a los datos de cada fila y el orden
 * en el que se mostrarán las columnas.
 * 
 * @type {ConfiguracionColumna<Destinatario>[]}
 * 
 * @property {string} encabezado - El texto que se mostrará como encabezado de la columna.
 * @property {(fila: Destinatario) => any} clave - Una función que define cómo obtener el valor
 * del campo correspondiente de la fila.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 * 
 * Columnas definidas:
 * - Nombre/Denominación o Razón Social
 * - R.F.C.
 * - CURP
 * - Teléfono
 * - Correo Electrónico
 * - Calle
 * - Número Exterior
 * - Número Interior
 * - País
 * - Colonia
 * - Municipio o Alcaldía
 * - Localidad
 * - Estado/Localidad
 * - Estado
 * - Código Postal
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
    { encabezado: 'País', clave: (fila) => fila.descPais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.descColonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.descMunicipio,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.descLocalidad, orden: 12 },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.descEstado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (fila) => fila.estado,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.descCodigoPostal,
      orden: 15
    }
  ];





/**
 * Representa el estado del formulario de pago de derechos.
 */
export interface PagoDerechosFormState {
  /**
   * Clave de referencia del pago.
   */
  claveReferencia: string;

  /**
   * Cadena que identifica a la dependencia relacionada con el pago.
   */
  cadenaDependencia: string;

  /**
   * Estado actual del pago.
   */
  estado: string;

  /**
   * Llave única asociada al pago.
   */
  llavePago: string;

  /**
   * Fecha en la que se realizó el pago.
   */
  fechaPago: string;

  /**
   * Importe total del pago.
   */
  importePago: string;

  /**
   * Nombre del banco donde se realizó el pago (opcional).
   */
  banco?: string;
}



/**
 * Constante que representa la configuración para el campo "Fecha de pago".
 * 
 * @property {string} labelNombre - Etiqueta que describe el nombre del campo.
 * @property {boolean} required - Indica si el campo es obligatorio. Valor predeterminado: `false`.
 * @property {boolean} habilitado - Indica si el campo está habilitado. Valor predeterminado: `true`.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: false,
  habilitado: true,
};


/**
 * Interfaz que representa los datos relacionados con terceros.
 */
export interface TercerosRelacionadosDatos {
 
  /**
   * Lista de datos de los fabricantes asociados.
   */
  fabricanteTablaDatos: Fabricante[];

  /**
   * Lista de datos de los destinatarios finales asociados.
   */
  destinatarioFinalTablaDatos: Destinatario[];
}

