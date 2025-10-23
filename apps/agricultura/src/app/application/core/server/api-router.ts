import { ENVIRONMENT } from "../../../environments/environment";
/**
 * URLs de API comunes
 */
export const COMUN_URL = {
  BASE_URL: `${ENVIRONMENT.URL_SERVER}`,
  API: '/api',
  API_VERSION: '/v3',
  CATALOGO_URL: '/catalogo',
  SOLICITUD_URL: '/solicitud',
  TRAMITE_URL: '/tramite',
};

/**
 * Servicio que permite consultar los establecimientos..
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta
 */
export const API_GET_CATALOGO_ESTABLECIMIENTO_TIF = (TRAMITE: string, RFC: string, CVEUCON: string) : string => `sat-t${TRAMITE}/catalogo/${RFC}/establecimiento-tif/${CVEUCON}`;

/**
 * Servicio que permite consultar las plantas autorizadas de origen.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta
 */
export const API_GET_CATALOGO_PLANTAS_AUTORIZADAS = (TRAMITE: string, CVEPAIS: string, CVEPLANTA: string) : string => `sat-t${TRAMITE}/catalogo/${CVEPAIS}/plantas-autorizadas/${CVEPLANTA}`;

/**
 * Servicio que permite consultar las unidades de medida comerciales asociadas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-umc
 */
export const API_GET_CATALOGO_UNIDADES_MEDIDA_COMERCIALES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/unidades-medida-comercial`;

/**
 * Servicio que permite consultar los usos de mercancía ACTIVOS por tipo de trámite ordenados por nombre ascendente.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-usos-mercancia
 */
export const API_GET_CATALOGO_USOS_MERCANCIA = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/tramite/usos-mercancia`;

/**
 * Servicio que permite consultar la información de restricción por el identificador del trámite.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-usos-mercancia
 */
export const API_GET_CATALOGO_RESTRICCIONES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/tramite/restricciones`;

/**
 * Servicio que permite consultar los datos de las francciones arancelarías ACTIVAS por el identificador del trámite.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-fracciones-tramite
 */
export const API_GET_CATALOGO_FRACCIONES_ARANCELARIAS = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/tramite/fracciones-arancelarias`;

/**
 * Servicio que permite consultar una lista de Tipo Presentacion.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta_2
 */
export const API_GET_CATALOGO_TIPO_PRESENTACION = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/tipos-presentacion`;

/**
 * Servicio que permite consultar una lista de Tipo Planta.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta_3
 */
export const API_GET_CATALOGO_TIPO_PLANTA = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/tipos-planta`;

/**
 * Servicio que permite consultar una lista de Subtipo Presentacion.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta_4
 */
export const API_GET_CATALOGO_SUBTIPO_PRESENTACION = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/subtipos-presentacion`;

/**
 * Servicio que permite consultar los regimenes ACTIVOS ordenados por el nombre ascendente..
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-regimenes
 */
export const API_GET_CATALOGO_SEXOS_ACTIVOS = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/sexos`;

/**
 * Servicio que permite consultar los regimenes ACTIVOS ordenados por el nombre ascendente.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-regimenes
 */
export const API_GET_CATALOGO_REGIMENES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/regimenes`;

/**
 * Servicio que permite consultar los régimenes ACTIVOS y VIGENTES.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-regimenes_1
 */
export const API_GET_CATALOGO_REGIMENES_VIGENTES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/regimenes-vigentes`;

/**
 * Servicio que permite consultar los puntos de verificacion federal activos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-punto-verificacion
 */
export const API_GET_CATALOGO_PUNTOS_VERIFICACION = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/punto-verificacion`;

/**
 * Servicio que permite consultar los puntos de inspección.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-punto-inspecci%C3%B3n
 */
export const API_GET_CATALOGO_PUNTO_INSPECCION = (TRAMITE: string, OISA: string) : string => `sat-t${TRAMITE}/catalogo/punto-inspeccion/${OISA}`;

/**
 * Servicio que permite consultar los paises ACTIVOS ordenados por el nombre ascendete.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-paises
 */
export const API_GET_CATALOGO_CONSULTA_PAISES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/paises`;

/**
 * Servicio que permite consultar los países ACTIVOS y vigentes excluyendo México.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-paises-sin-mexico
 */
export const API_GET_CATALOGO_PAISES_SIN_MEXICO = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/paises-sin-mexico`;

/**
 * Servicio que permite consultar las entidades federativas por medio del pais seleccionado.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-entidades-federativas-pais
 */
export const API_GET_CATALOGO_ENTIDADES_FEDERATIVAS = (TRAMITE: string, CVEPAIS: string) : string => `sat-t${TRAMITE}/pais/${CVEPAIS}/entidades-federativas`;

/**
 * Servicio que permite consultar los países destino por tipo de producto y tipo de mercancía.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-pais-destino
 */
export const API_GET_CATALOGO_PAIS_DESTINO = (TRAMITE: string, CVETIPOPRODUCTO: string) : string => `sat-t${TRAMITE}/catalogo/pais/destino/${CVETIPOPRODUCTO}`;

/**
 * Servicio que permite consultar los datos de las colonias por medio de la clave del municipio o delegación.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-colonia
 */
export const API_GET_CATALOGO_COLONIAS = (TRAMITE: string, CVEDELEGNUM: string) : string => `sat-t${TRAMITE}/catalogo/municipio-delegacion/${CVEDELEGNUM}/colonias`;

/**
 * Servicio que permite consultar los medios de transporte.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-medio-transporte
 */
export const API_GET_CATALOGO_MEDIO_TRANSPORTE = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/medio-transporte`;

/**
 * Servicio que permite consultar una lista de Justificacion.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta_5
 */
export const API_GET_CATALOGO_JUSTIFICACIONES_PAGO = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/justificaciones-pago`;

/**
 * Servicio que permite consultar las fracciones NICO por clave de fracción arancelaria.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-fracciones-nico
 */
export const API_GET_CATALOGO_FRACCION_ARANCELARIA = (TRAMITE: string, CVEFRACCION: string) : string => `sat-t${TRAMITE}/catalogo/fraccion-arancelaria/${CVEFRACCION}/nico`;

/**
 * Servicio que permite consultar los nombres del los medicos veterinarios por establecimiento TIF.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-especies
 */
export const API_GET_CATALOGO_MEDICOS_VETERINARIOS = (TRAMITE: string, CVEESTABLECIMIENTOTIF: string) : string => `sat-t${TRAMITE}/catalogo/establecimiento-tif/${CVEESTABLECIMIENTOTIF}/medicos-veterinarios`;

/**
 * Servicio que permite consultar los nombres del los medicos veterinarios por establecimiento TIF.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-especies
 */
export const API_GET_CATALOGO_ESPECIES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/especies`;

/**
 * Servicio que permite consultar las entidades federativas ordenados por el nombre ascendente.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-entidades-federativas
 */
export const API_GET_CATALOGO_ENTIDADES_FEDERATIVAS_GENERAL = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/entidades-federativas`;

/**
 * Servicio que permite consultar los datos de las delegaciones o municipios por medio de la clave de la entidad federativa.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta-delegacion-municipio
 */
export const API_GET_CATALOGO_ENTIDAD_FEDERATIVA_MUNICIPIOS = (TRAMITE: string, CLVENTIDAD: string) : string => `sat-t${TRAMITE}/catalogo/entidad-federativa/${CLVENTIDAD}/municipios-delegaciones`;

/**
 * Servicio que permite consultar los bancos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/
 */
export const API_GET_CATALOGO_BANCOS = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/bancos`;

/**
 * Consulta las aduanas ACTIVAS ordenadas por clave ascendete.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/
 */
export const API_GET_CATALOGO_ADUANAS = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/aduanas`;

/**
 * Consulta las Oficinas de Inspección de Sanidad Agropecuaria ACTIVAS ordenadas por el nombre ascendete.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Catalogos/consulta_9
 */
export const API_GET_CATALOGO_OFICINAS_INSPECCION = (TRAMITE: string, CVEADUANA: string) : string => `sat-t${TRAMITE}/catalogo/aduana/${CVEADUANA}/oficinas-inspeccion`;

/**
 * Genera la ruta de la API para obtener los datos de una solicitud.
 *
 * @param TRAMITE - Identificador del trámite.
 * @param esPrellenado - Indica si es prellenado.
 * @param idSolicitud - ID de la solicitud.
 * @returns Ruta de la API como string.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Registro-Solicitud/consulta-datos-solicitud
 */
export const API_GET_DATOS_SOLICITUD = (TRAMITE: string, esPrellenado: boolean, idSolicitud : string) : string => `sat-t${TRAMITE}/prellenado/${esPrellenado}/solicitud/${idSolicitud}/datos-solicitud`;

/**
 * Genera la ruta de la API para obtener las solicitudes recientes de un trámite específico y RFC dado.
 *
 * @param TRAMITE - Identificador del trámite.
 * @param RFC - RFC del usuario.
 * @returns Ruta de la API como cadena de texto.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Registro-Solicitud/get-last-solicitudes
 */
export const API_GET_SOLICITUDES_RECENTES = (TRAMITE: string, RFC: string) : string => `sat-t${TRAMITE}/solicitud/recientes/${RFC}`;


/**
 * Genera la ruta de la API para obtener las solicitudes recientes de un trámite específico y RFC dado.
 *
 * @param TRAMITE - Identificador del trámite.
 * @param cveFraccion - Clave de la fracción arancelaria.
 * @returns Ruta de la API como cadena de texto.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Registro-Solicitud/consulta-descripcion-fraccion-arancelaria
 */
export const API_GET_SOLICITUDES_FRACCION_ARANCELARIA_DESCRIPCION = (TRAMITE: string, cveFraccion: string) : string => `sat-t${TRAMITE}/fraccion-arancelaria/${cveFraccion}/descripcion`;


/**
 * Genera la ruta de la API para obtener la descripción de un NICO específico dentro de una fracción arancelaria y trámite dados.
 *
 * @param TRAMITE - Identificador del trámite.
 * @param cveFraccion - Clave de la fracción arancelaria.
 * @param cveNico - Clave del NICO.
 * @returns La ruta de la API como cadena de texto para consultar la descripción del NICO.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Registro-Solicitud/consulta-descripcion-nico
 */
export const API_GET_SOLICITUDES_NICO_DESCRIPCION = (TRAMITE: string, cveFraccion: string,cveNico: string) : string => `sat-t${TRAMITE}/fraccion/${cveFraccion}/nico/${cveNico}/descripcion`;


/**
 * Generates the API endpoint URL for retrieving the unit of measurement associated with a specific tariff fraction.
 *
 * @param TRAMITE - The identifier of the procedure or process (trámite) to be used in the API path.
 * @param cveFraccion - The code of the tariff fraction (fracción arancelaria) for which the unit of measurement is requested.
 * @returns The constructed API endpoint URL as a string.
 *
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t220201/swagger-ui/index.html#/Registro-Solicitud/consulta-descripcion-umt-fraccion-arancelaria
 */
export const API_GET_SOLICITUDES_UNIDAD_MEDIDA = (TRAMITE: string, cveFraccion: string) : string => `sat-t${TRAMITE}/fraccion-arancelaria/${cveFraccion}/unidad-medida`;


/**
 * Genera la ruta de la API para cargar un archivo masivo de mercancía animal en una solicitud específica.
 *
 * @param TRAMITE - Identificador del trámite relacionado con la solicitud.
 * @param archivo - Archivo que se va a cargar en la solicitud.
 * @returns La ruta de la API como cadena de texto para cargar el archivo masivo de mercancía animal.
 */
export const API_GET_SOLICITUDES_CARGAR_ARCHIVO_MASIVO_ANIMAL = (TRAMITE: string, archivo: File) : string => `sat-t${TRAMITE}/solicitud/detalle-mercancia-animal/cargar-archivo`;