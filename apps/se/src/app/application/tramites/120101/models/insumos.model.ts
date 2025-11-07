/**
 * @interface InsumosTabla
 * @description
 * Representa la estructura de los datos utilizados en la tabla de insumos.
 */
export interface InsumosTabla{
    DescripcionDelInsumo: string;
    FraccionArancelaria: string;
    PaisDeOrigen: string;
}
/**
 * Representa la estructura de una solicitud TPLCANR.
 *
 * @property {Solicitud} solicitud - Objeto que contiene la información de la solicitud.
 * @property {boolean} puedeCapturarRepresentanteLegalCG - Indica si se puede capturar el representante legal CG.
 * @property {string} buscarInstrumentos - Criterio o texto para buscar instrumentos.
 * @property {number} idMecanismoAsignacion - Identificador del mecanismo de asignación.
 * @property {string} cveFraccionArancelaria - Clave de la fracción arancelaria.
 * @property {string} paisOrigenDestino - País de origen o destino.
 * @property {string} idCategoriaTextil - Identificador de la categoría textil.
 * @property {string} descripcionHTSUSA - Descripción del código HTSUSA.
 * @property {string} idHtsUsa - Identificador del HTSUSA.
 * @property {string} countHTSUSA - Cantidad relacionada con el HTSUSA.
 * @property {string} _sourcePage - Página de origen de la solicitud.
 * @property {string} urlRedirect - URL de redirección posterior a la solicitud.
 * @property {ParametrosBP} parametrosBP - Parámetros adicionales para el proceso de negocio.
 */
export interface SolicitudTPLCANR {
  solicitud: Solicitud;
  puedeCapturarRepresentanteLegalCG: boolean;
  buscarInstrumentos: string;
  idMecanismoAsignacion: number;
  cveFraccionArancelaria: string;
  paisOrigenDestino: string;
  idCategoriaTextil: string;
  descripcionHTSUSA: string;
  idHtsUsa: string;
  countHTSUSA: string;
  _sourcePage: string;
  urlRedirect: string;
  parametrosBP: ParametrosBP;
}

/**
 * Representa una solicitud dentro del sistema.
 *
 * @property {Solicitante} solicitante - Información del solicitante de la solicitud.
 * @property {string} cveRolCapturista - Clave del rol del usuario que captura la solicitud.
 * @property {string} cveUsuarioCapturista - Clave del usuario que captura la solicitud.
 * @property {InstrumentoCupoTPL} instrumentoCupoTPL - Instrumento de cupo asociado a la solicitud.
 * @property {string} idSolicitud - Identificador único de la solicitud.
 * @property {Tramite} tramite - Información del trámite relacionado con la solicitud.
 */
export interface Solicitud {
  solicitante: Solicitante;
  cveRolCapturista: string;
  cveUsuarioCapturista: string;
  instrumentoCupoTPL: InstrumentoCupoTPL;
  idSolicitud: string;
  tramite: Tramite;
}

/**
 * Representa la información de un solicitante.
 *
 * @property domicilio - Objeto que contiene la información del domicilio del solicitante.
 * @property rfc - Registro Federal de Contribuyentes del solicitante.
 * @property razonSocial - Razón social del solicitante.
 * @property descripcionGiro - Descripción del giro o actividad del solicitante.
 * @property correoElectronico - Correo electrónico de contacto del solicitante.
 * @property telefono - Número telefónico de contacto del solicitante.
 * @property cveUsuario - Clave única del usuario solicitante.
 */
export interface Solicitante {
  domicilio: Domicilio;
  rfc: string;
  razonSocial: string;
  descripcionGiro: string;
  correoElectronico: string;
  telefono: string;
  cveUsuario: string;
}

/**
 * Representa un domicilio con información detallada de ubicación.
 *
 * @property {CatalogoClaveNombre} pais - País del domicilio.
 * @property {CatalogoClaveNombre} entidadFederativa - Entidad federativa (estado o provincia).
 * @property {CatalogoClaveNombre} delegacionMunicipio - Delegación o municipio correspondiente.
 * @property {CatalogoClaveNombre} colonia - Colonia o barrio.
 * @property {CatalogoClaveNombre} localidad - Localidad específica dentro del municipio.
 * @property {string} codigoPostal - Código postal del domicilio.
 * @property {string} calle - Nombre de la calle.
 * @property {string} numeroExterior - Número exterior del domicilio.
 * @property {string} numeroInterior - Número interior del domicilio (opcional).
 */
export interface Domicilio {
  pais: CatalogoClaveNombre;
  entidadFederativa: CatalogoClaveNombre;
  delegacionMunicipio: CatalogoClaveNombre;
  colonia: CatalogoClaveNombre;
  localidad: CatalogoClaveNombre;
  codigoPostal: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
}

/**
 * Representa un catálogo con una clave y un nombre descriptivo.
 *
 * @property clave - Identificador único del elemento en el catálogo.
 * @property nombre - Nombre descriptivo asociado a la clave.
 */
export interface CatalogoClaveNombre {
  clave: string;
  nombre: string;
}

/**
 * Representa un instrumento de cupo TPL (Tariff Preference Level) asociado a un tratado o acuerdo.
 *
 * @property idTratadoAcuerdo - Identificador numérico del tratado o acuerdo comercial.
 * @property claveRegimen - Clave que representa el régimen aduanero aplicable.
 * @property clavePais - Clave del país relacionado con el instrumento de cupo.
 * @property cveFraccion - Clave de la fracción arancelaria nacional.
 * @property descripcionFraccion - Descripción de la fracción arancelaria.
 * @property idFraccionHtsUsa - Identificador de la fracción HTS (Harmonized Tariff Schedule) de Estados Unidos.
 */
export interface InstrumentoCupoTPL {
  idTratadoAcuerdo: number;
  claveRegimen: string;
  clavePais: string;
  cveFraccion: string;
  descripcionFraccion: string;
  idFraccionHtsUsa: string;
}

/**
 * Representa un trámite con su número de folio asociado.
 *
 * @property numFolioTramite - Número de folio que identifica el trámite.
 */
export interface Tramite {
  numFolioTramite: string;
}

/**
 * Representa los parámetros necesarios para el proceso de negocio (BP).
 *
 * @property idSolicitud - Identificador único de la solicitud.
 */
export interface ParametrosBP {
  idSolicitud: string;
}

/**
 * Representa la respuesta de la API para la operación de búsqueda de insumos.
 *
 * @property causa - Describe la causa del resultado de la operación.
 * @property codigo - Código de estado o error devuelto por la API.
 * @property datos - Arreglo de objetos de tipo `Dato` que contiene los resultados de la búsqueda.
 * @property error - Mensaje de error, si ocurrió alguno durante la operación.
 * @property mensaje - Mensaje adicional proporcionado por la API.
 */
export interface BuscarApiResponse {
  causa: string;
  codigo: string;
  datos: Dato[];
  error: string;
  mensaje: string;
}

/**
 * Representa un dato relacionado con insumos para trámites específicos.
 *
 * @property idMecanismo - Identificador del mecanismo de asignación.
 * @property idCupo - Identificador del cupo.
 * @property clavefraccionArancelaria - Clave de la fracción arancelaria.
 * @property codCategoriaTextil - Código de la categoría textil (opcional).
 * @property cvePais - Clave del país (opcional).
 * @property cveRegimen - Clave del régimen (opcional).
 * @property descripcionCategoriaTextil - Descripción de la categoría textil (opcional).
 * @property descripcionFraccion - Descripción de la fracción arancelaria (opcional).
 * @property descripcionMecanismoAsignacion - Descripción del mecanismo de asignación (opcional, puede ser nulo).
 * @property descripcionUnidadMedida - Descripción de la unidad de medida (opcional, puede ser nulo).
 * @property factorConversion - Factor de conversión (opcional).
 * @property fechaFinVigenciaMecanismo - Fecha de fin de vigencia del mecanismo (opcional).
 * @property fechaInicioVigenciaMecanismo - Fecha de inicio de vigencia del mecanismo (opcional).
 * @property montoDisponible - Monto disponible (opcional).
 * @property producto - Nombre del producto (opcional).
 * @property subproducto - Nombre del subproducto (opcional).
 * @property tratadoAcuerdo - Tratado o acuerdo relacionado (opcional).
 * @property categoriaTextil - Categoría textil (opcional).
 * @property paisOrigenDestino - País de origen o destino (opcional).
 * @property regimen - Régimen aplicable (opcional).
 */
export interface Dato {
  idMecanismo: number;
  idCupo: number;
  clavefraccionArancelaria: string;
  codCategoriaTextil?: string;
  cvePais?: string;
  cveRegimen?: string;
  descripcionCategoriaTextil?: string;
  descripcionFraccion?: string;
  descripcionMecanismoAsignacion?: string | null;
  descripcionUnidadMedida?: string | null;
  factorConversion?: number;
  fechaFinVigenciaMecanismo?: string;
  fechaInicioVigenciaMecanismo?: string;
  montoDisponible?: number;
  producto?: string;
  subproducto?: string;
  tratadoAcuerdo?: string;
  categoriaTextil?: string;
  paisOrigenDestino?: string;
  regimen?: string;
}


/**
 * Representa la estructura de datos para la búsqueda de información en una tabla de insumos.
 *
 * @property {number} id - Identificador único del registro.
 * @property {string} cveTratado - Clave del tratado relacionado.
 * @property {string} cveRegimenClasificacion - Clave del régimen de clasificación.
 * @property {string} cvePaisDestino - Clave del país de destino.
 * @property {string} fraccionArancelaria - Fracción arancelaria asociada.
 * @property {string} categoriaTextilDescripcion - Descripción de la categoría textil.
 * @property {string} productoDescripcion - Descripción del producto.
 * @property {string} subProductoClasificacion - Clasificación del subproducto.
 * @property {string} fechaInicioVigencia - Fecha de inicio de vigencia (formato ISO).
 * @property {string} fechaFinVigencia - Fecha de fin de vigencia (formato ISO).
 * @property {number} montoDisponible - Monto disponible para el insumo.
 * @property {string} categoriaTextil - Categoría textil del insumo.
 * @property {string | null} asignacionMecanismo - Mecanismo de asignación, puede ser nulo.
 * @property {string | null} unidad - Unidad de medida, puede ser nulo.
 * @property {number} conversionFactor - Factor de conversión para la unidad.
 */
export interface BuscarTablaDatos {
  id: number;
  cveTratado: string;
  cveRegimenClasificacion: string;
  cvePaisDestino: string;
  fraccionArancelaria: string;
  categoriaTextilDescripcion: string;
  productoDescripcion: string;
  subProductoClasificacion: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  montoDisponible: number;
  categoriaTextil: string;
  asignacionMecanismo: string | null;
  unidad: string | null;
  conversionFactor: number;
}