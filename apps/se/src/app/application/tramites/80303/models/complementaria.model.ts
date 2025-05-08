/**
 * Representa la información básica del contribuyente.
 * 
 * @interface DatosContribuyente
 * @property {string} [RFC] - Registro Federal de Contribuyentes.
 * @property {string} [Nombres] - Nombre o nombres del contribuyente.
 * @property {string} [PrimerApellido] - Primer apellido del contribuyente.
 * @property {string} [SegundoApellido] - Segundo apellido del contribuyente.
 */
export interface DatosContribuyente {
  RFC?: string;
  Nombres?: string;
  PrimerApellido?: string;
  SegundoApellido?: string;
}


/**
* Representa la información de un federatario.
* 
* @interface Federatario
* @property {string} [Nombre] - Nombre del federatario.
* @property {string} [PrimerApellido] - Primer apellido.
* @property {string} [SegundoApellido] - Segundo apellido.
* @property {string} [NumeroActa] - Número de acta.
* @property {string} [FechaActa] - Fecha del acta.
* @property {string} [NumeroNotaria] - Número de notaría.
* @property {string} [MunicipioDelegacion] - Municipio o Delegación.
* @property {string} [EstadoDistrito] - Estado o Distrito Federal.
*/
export interface Federatario {
  Nombre?: string;
  PrimerApellido?: string;
  SegundoApellido?: string;
  NumeroActa?: string;
  FechaActa?: string;
  NumeroNotaria?: string;
  MunicipioDelegacion?: string;
  EstadoDistrito?: string;
}


/**
 * Interfaz utilizada para proporcionar los tipos de encabezados de tabla y listas
 * en el componente `tabladynamica`.
 * 
 * Esta interfaz define las propiedades necesarias para representar la información
 * relacionada con los federatarios que realizarán las operaciones, incluyendo datos
 * de dirección, identificación fiscal y estatus.
 * 
 * Propiedades:
 * - Calle: (Opcional) La calle donde se encuentra el federatario.
 * - NumeroExterior: (Opcional) El número exterior del domicilio.
 * - NumeroInterior: (Opcional) El número interior del domicilio.
 * - CodigoPostal: (Opcional) El código postal del domicilio.
 * - Colonia: (Opcional) La colonia donde se encuentra el federatario.
 * - Localidad: (Opcional) La localidad donde se encuentra el federatario.
 * - MunicipioDelegacion: (Opcional) El municipio o delegación donde se encuentra el federatario.
 * - EstadoDistrito: (Opcional) El estado o distrito donde se encuentra el federatario.
 * - Pais: (Opcional) El país donde se encuentra el federatario.
 * - RFC: (Opcional) Registro Federal de Contribuyentes del federatario.
 * - DomicilioFiscal: (Opcional) El domicilio fiscal registrado del federatario.
 * - DenominacionSocial: (Opcional) La denominación social del federatario.
 * - Estatus: (Opcional) El estatus actual del federatario.
 */
export interface FederatarioRealizaranLasOperaciones {
  Calle?: string;
  NumeroExterior?: string;
  NumeroInterior?: string;
  CodigoPostal?: string;
  Colonia?: string;
  Localidad?: string;
  MunicipioDelegacion?: string;
  EstadoDistrito?: string;
  Pais?: string;
  RFC?: string;
  DomicilioFiscal?: string;
  DenominacionSocial?: string;
  Estatus?: string;
}


/**
 * Representa los datos de una empresa submanufacturera.
 * 
 * @property rfc - (Opcional) Registro Federal de Contribuyentes de la empresa.
 * @property razonSocial - (Opcional) Razón social de la empresa.
 * @property calle - (Opcional) Calle donde se encuentra la empresa.
 * @property numeroInterior - (Opcional) Número interior del domicilio de la empresa.
 * @property numeroExterior - (Opcional) Número exterior del domicilio de la empresa.
 * @property codigoPostal - (Opcional) Código postal del domicilio de la empresa.
 * @property colonia - (Opcional) Colonia donde se encuentra la empresa.
 * @property municipioDelegacion - (Opcional) Municipio o delegación donde se encuentra la empresa.
 * @property entidadFederativa - (Opcional) Entidad federativa donde se encuentra la empresa.
 * @property pais - (Opcional) País donde se encuentra la empresa.
 * @property telefono - (Opcional) Teléfono de contacto de la empresa.
 * @property estatus - (Opcional) Estatus actual de la empresa.
 */
export interface DatosEmpresaSubmanufacturera {
  rfc?: string;
  razonSocial?: string;
  calle?: string;
  numeroInterior?: string;
  numeroExterior?: string;
  codigoPostal?: string;
  colonia?: string;
  municipioDelegacion?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  estatus?: string;
}

/**
 * Representa los datos de una planta manufacturera.
 * 
 * @property {string} [Calle] - La calle donde se encuentra la planta manufacturera.
 * @property {string} [NumeroExterior] - El número exterior del domicilio de la planta.
 * @property {string} [NumeroInterior] - El número interior del domicilio de la planta, si aplica.
 * @property {string} [CodigoPostal] - El código postal del domicilio de la planta.
 * @property {string} [Colonia] - La colonia donde se ubica la planta manufacturera.
 * @property {string} [MunicipioDelegacion] - El municipio o delegación donde se encuentra la planta.
 * @property {string} [EntidadFederativa] - La entidad federativa (estado) donde se ubica la planta.
 * @property {string} [Pais] - El país donde se encuentra la planta manufacturera.
 * @property {string} [RFC] - El Registro Federal de Contribuyentes (RFC) asociado a la planta.
 * @property {string} [DomicilioFiscal] - El domicilio fiscal registrado de la planta manufacturera.
 * @property {string} [Estatus] - El estatus actual de la planta manufacturera.
 */
export interface DatosPlantaManufacturera {
  Calle?: string;
  NumeroExterior?: string;
  NumeroInterior?: string;
  CodigoPostal?: string;
  Colonia?: string;
  MunicipioDelegacion?: string;
  EntidadFederativa?: string;
  Pais?: string;
  RFC?: string;
  DomicilioFiscal?: string;
  Estatus?: string;
}

/**
 * Representa un servicio IMMEX con información relevante sobre su descripción,
 * tipo, estado y estatus.
 *
 * @property descripcionServicio - Una descripción del servicio proporcionado.
 * @property tipoServicio - El tipo de servicio IMMEX.
 * @property testado - El estado actual del servicio.
 * @property estatus - El estatus del servicio.
 */
export interface ServicioImmex {
  descripcionServicio?: string;
  tipoServicio?: string;
  testado?: string;
  estatus?: string;
}

/**
* Representa la información de una fracción arancelaria en el anexo de exportación.
* 
* @interface AnexoExportacion
* @property {string} [fraccionArancelaria] - Fracción arancelaria del producto.
* @property {string} [descripcion] - Descripción del producto.
* @property {string} [tipoFraccion] - Tipo de fracción.
*/
export interface AnexoExportacion {
  fraccionArancelaria?: string;
  descripcion?: string;
  tipoFraccion?: string;
}

/**
* Representa una relación de fracción arancelaria entre exportación e importación.
* 
* @interface AnexoImportacion
* @property {string} [fraccionExportacion] - Fracción arancelaria del producto exportado.
* @property {string} [fraccionImportacion] - Fracción arancelaria de la mercancía importada.
* @property {string} [descripcion] - Descripción de la mercancía.
* @property {string} [tipoFraccion] - Tipo de fracción.
*/
export interface AnexoImportacion {
  fraccionExportacion?: string;
  fraccionImportacion?: string;
  descripcion?: string;
  tipoFraccion?: string;
}


/**
* Representa un producto sensible en la tabla de importación.
*
* @interface Sensible
* @property {string} [fraccionImportacion] - Fracción arancelaria de importación.
* @property {string} [cantidad] - Cantidad importada.
* @property {string} [valor] - Valor de la importación.
* @property {string} [unidadMedida] - Unidad de medida tarifaria.
*/
export interface Sensible {
  fraccionImportacion?: string;
  cantidad?: string;
  valor?: string;
  unidadMedida?: string;
}
