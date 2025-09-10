/**
 * cvePais de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el cvePais real de la solicitud.
 */
export const CLAVEPAIS = '{cvePais}';

/**
 * cveTratadoAcuerdo de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el cveTratadoAcuerdo real de la solicitud.
 */
export const CVETRATADOACUERDO = '{cveTratadoAcuerdo}';

/**
 * idTratadoAcuerdo de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el idTratadoAcuerdo real de la solicitud.
 */
export const IDTRATADOACUERDO = '{idTratadoAcuerdo}';

/**
 *  URLs de catalogos
 */

/**
 * API para el catalogo pais y bloque.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-paises-bloques
 */
export const API_GET_CAT_PAIS_BLOQUES = `sat-t110101/catalogo/paises/bloques`;

/**
 * API para el catalogo de tratados acuerdo.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/getTratadosPorPais
 */
export const API_GET_CAT_TRATADOS_ACUERDO = (CLAVEPAIS: string): string => `sat-t110101/catalogo/pais/${CLAVEPAIS}/tratado-acuerdo`;

/**
 * API para el catalogo de tratados acuerdo bloque.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-tratado-acuerdo-bloque
 */
export const API_GET_CAT_TRATADOS_ACUERDO_BLOQUE= (CVETRATADOACUERDO: string): string => `sat-t110101/catalogo/tratado-acuerdo/${CVETRATADOACUERDO}/bloque`;

/**
 * API para el catalogo de criterios de origen.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-criterio-tratados
 */
export const API_GET_CAT_CRITERIOS= (IDTRATADOACUERDO: string): string => `sat-t110101/catalogo/tratado-acuerdo/${IDTRATADOACUERDO}/criterios`;

/**
 * API para el catalogo de entidades federativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta
 */
export const API_GET_CAT_ENTIDADES_FEDERATIVAS = `sat-t110101/catalogo/entidades-federativas`;

/**
 * API para el catalogo de representación federal.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consultar-representaciones-federales
 */
export const API_GET_CAT_REPRESENTACION_FEDERAL= (CVEENTIDAD: string): string => `sat-t110101/catalogo/entidad-federativa/${CVEENTIDAD}/representaciones-federales`;

/**
 * API para el catalogo de declaracion de datos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-by-tipo-tramite
 */
export const API_GET_CAT_DECLARACION_DATOS = (IDTIPOTRAMITE: string): string => `sat-t110101/catalogo/tipo-tramite/${IDTIPOTRAMITE}/declaraciones`;

/**
 * API para el catalogo de criterios otras instancias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/get-criterios-otras-instancias
 */
export const API_GET_CAT_CRITERIOS_OTRAS_INSTANCIAS = `sat-t110101/catalogo/criterios-otras-instancias`;

/**
 *  URLs de validacion de tratados y de tabla de tratados
 */

/**
 * API para  validar si es posible agregar criterios de tratado a una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/agrega-tratado-criterio-solicitud
*/
export const API_POST_TRATADO_CRITERIO = `sat-t110101/solicitud/tratado/criterio`;

/**
 * API para tabla tratados.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/consultar-configuracion-tratados
*/
export const API_POST_SOLICITUD_TRATADOS = `sat-t110101/solicitud/tratados/configuracion`;

