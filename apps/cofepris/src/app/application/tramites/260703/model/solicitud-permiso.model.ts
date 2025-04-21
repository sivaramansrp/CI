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
 * Estado del formulario preoperativo.
 * Contiene los datos relacionados con el formulario preoperativo.
 */
export interface PreOperativeFormState {
  ideGenerica1: string;
  observaciones: string;
}

/**
 * Estado del formulario de datos del establecimiento.
 * Contiene los datos relacionados con el establecimiento.
 */
export interface DatosDelEstablecimientoFormState {
  razonSocial: string;
  correoElectronico: string;
}

/**
 * Estado del formulario de manifiestos.
 * Contiene los datos relacionados con los manifiestos y declaraciones.
 */
export interface ManiFiestosFormState {
  seleccionadaManifiesto: boolean[];
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
export interface RepresentanteLegalFormState {
  rfc: string;
  nombreOrazonsocial: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

/**
 * Estado del formulario del domicilio del establecimiento.
 * Contiene los datos relacionados con el domicilio del establecimiento.
 */
export interface DomicilioDelEstablecimientoFormState {
  codigoPostal: string;
  estado: string;
  descripcionMunicipio: string;
  informacionExtra: string;
  descripcionColonia: string;
  calle: string;
  lada: string;
  telefono: string;
  funcionamiento: string;
  licencia: string;
  regimen: string;
  aduana: string;
}