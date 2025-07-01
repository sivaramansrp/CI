/**
 * Modelo que representa la información de un destinatario.
 * Contiene los datos personales y de contacto del destinatario.
 */
export interface Destinatario {
  /**
   * Nombre completo del destinatario.
   */
  nombre: string;

  /**
   * Registro Federal de Contribuyentes (RFC) del destinatario.
   */
  rfc: string;

  /**
   * Clave Única de Registro de Población (CURP) del destinatario.
   */
  curp: string;

  /**
   * Número de teléfono del destinatario.
   */
  telefono: string;

  /**
   * Correo electrónico del destinatario.
   */
  correoElectronico: string;

  /**
   * Calle donde reside el destinatario.
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
   * País donde reside el destinatario.
   */
  pais: string;

  /**
   * Colonia donde reside el destinatario.
   */
  colonia: string;

  /**
   * Municipio donde reside el destinatario.
   */
  municipio: string;

  /**
   * Localidad donde reside el destinatario.
   */
  localidad: string;

  /**
   * Estado donde reside el destinatario.
   */
  estado: string;

  /**
   * Código postal del domicilio del destinatario.
   */
  codigoPostal: string;
}

/**
 * Modelo que representa la información de un fabricante.
 * Contiene los datos personales y de contacto del fabricante.
 */
export interface Fabricante {
  /**
   * Nombre completo del fabricante.
   */
  nombre: string;

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
   * Calle donde reside el fabricante.
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
   * País donde reside el fabricante.
   */
  pais: string;

  /**
   * Colonia donde reside el fabricante.
   */
  colonia: string;

  /**
   * Municipio donde reside el fabricante.
   */
  municipio: string;

  /**
   * Localidad donde reside el fabricante.
   */
  localidad: string;

  /**
   * Estado donde reside el fabricante.
   */
  estado: string;

  /**
   * Código postal del domicilio del fabricante.
   */
  codigoPostal: string;
}

/**
 * Representa la información de una mercancía.
 * 
 * Mercancia
 * 
 * productoClassificacion - Clasificación del producto.
 * productoEspecificarClassificacion - Especificación de la clasificación del producto.
 * denomiacionEspecifica - Denominación específica del producto.
 * marca - Marca del producto.
 * fraccionArancelaria - Fracción arancelaria asociada al producto.
 * descripcionFraccion - Descripción de la fracción arancelaria.
 */
export interface Mercancia {
  /**
   * Clasificación del producto.
   * @type {string}
   */
  productoClassificacion: string;
  /**
   * Especificación de la clasificación del producto.
   * @type {string}
   */
  productoEspecificarClassificacion: string;
  /**
   * Denominación específica del producto.
   * @type {string}
   */
  denomiacionEspecifica: string;
  /**
   * Marca del producto.
   * @type {string}
   */
  marca: string,
  /**
   * Fracción arancelaria asociada al producto.
   * @type {number}
   */
  fraccionArancelaria: number;
  /**
   * Descripción de la fracción arancelaria.
   * @type {string}
   */
  descripcionFraccion: string;
}

/**
 * Estado del formulario preoperativo.
 * Contiene los datos relacionados con el formulario preoperativo.
 */
export interface PreOperativeFormState {
  /**
   * Identificador genérico del formulario preoperativo.
   * @type {string}
   */
  ideGenerica1: string;
  /**
   * Observaciones del formulario preoperativo.
   * @type {string}
   */
  observaciones: string;
}

/**
 * Estado del formulario de datos del establecimiento.
 * Contiene los datos relacionados con el establecimiento.
 */
export interface DatosDelEstablecimientoFormState {
  /**
   * Razón social del establecimiento.
   * @type {string}
   */
  razonSocial: string;
  /**
   * Correo electrónico del establecimiento.
   * @type {string}
   */
  correoElectronico: string;
}

/**
 * Estado del formulario de manifiestos.
 * Contiene los datos relacionados con los manifiestos y declaraciones.
 */
export interface ManiFiestosFormState {
  /**
   * Lista de manifiestos seleccionados.
   * @type {boolean[]}
   */
  seleccionadaManifiesto: boolean[];
  /**
   * Información confidencial relacionada con los manifiestos.
   * @type {string}
   */
  informacionConfidencial: string;
}

/**
 * Interfaz que representa una declaración de manifiesto.
 */
export interface Manifiestos {
  /**
   * Los detalles de la declaración.
   * clave El identificador único de la declaración.
   * descripcion La descripción de la declaración.
   */
  declaracion: {
    clave: string;
    descripcion: string;
  };

  /**
   * Indicador de si la declaración forma parte del manifiesto.
   */
  manifiestoDeclaracion: boolean;
}

/**
 * Respuesta de la API al obtener múltiples manifiestos.
 * Contiene la lista de manifiestos obtenidos.
 */
export interface ManifiestosRespuesta {
  /**
   * Lista de manifiestos.
   */
  data: Manifiestos[];
}

/**
 * Estado del formulario del representante legal.
 * Contiene los datos relacionados con el representante legal.
 */
/**
 * Estado del formulario del representante legal.
 * Contiene los datos relacionados con el representante legal.
 */
export interface RepresentanteLegalFormState {
  /**
   * RFC del representante legal.
   * @type {string}
   */
  rfc: string;
  /**
   * Nombre o razón social del representante legal.
   * @type {string}
   */
  nombreOrazonsocial: string;
  /**
   * Apellido paterno del representante legal.
   * @type {string}
   */
  apellidoPaterno: string;
  /**
   * Apellido materno del representante legal.
   * @type {string}
   */
  apellidoMaterno: string;
}

/**
 * Estado del formulario del domicilio del establecimiento.
 * Contiene los datos relacionados con el domicilio del establecimiento.
 */
export interface DomicilioDelEstablecimientoFormState {
  /**
   * Código postal del domicilio.
   * @type {string}
   */
  codigoPostal: string;
  /**
   * Estado donde se ubica el domicilio.
   * @type {string}
   */
  estado: string;
  /**
   * Descripción del municipio.
   * @type {string}
   */
  descripcionMunicipio: string;
  /**
   * Información extra del domicilio.
   * @type {string}
   */
  informacionExtra: string;
  /**
   * Descripción de la colonia.
   * @type {string}
   */
  descripcionColonia: string;
  /**
   * Calle del domicilio.
   * @type {string}
   */
  calle: string;
  /**
   * Lada telefónica del domicilio.
   * @type {string}
   */
  lada: string;
  /**
   * Teléfono del domicilio.
   * @type {string}
   */
  telefono: string;
  /**
   * Funcionamiento del establecimiento.
   * @type {string}
   */
  funcionamiento: string;
  /**
   * Licencia del establecimiento.
   * @type {string}
   */
  licencia: string;
  /**
   * Régimen del establecimiento.
   * @type {string}
   */
  regimen: string;
  /**
   * Aduana asociada al establecimiento.
   * @type {string}
   */
  aduana: string;
}