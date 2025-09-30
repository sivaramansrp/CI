import { IDSOLICITUD } from "@libs/shared/data-access-user/src";

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
 * cveFraccion de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el cveFraccion real de la solicitud.
 */
export const CVEFRACCION = '{cveFraccion}';

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
 * API para el catalogo de paises activos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-paises
 */
export const API_GET_CAT_PAISES = `sat-t110101/catalogo/paises`;

/**
 *  URLs de validacion de tratados y de tabla de tratados
 */

/**
 * API para  validar si es posible agregar criterios de tratado a una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/agrega-tratado-criterio-solicitud
*/
export const API_POST_TRATADO_CRITERIO = `sat-t110101/solicitud/tratado/criterio`;

/**
 * API para configuracion tratados.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/consultar-configuracion-tratados
*/
export const API_POST_SOLICITUD_TRATADOS_CONFIGURACION = `sat-t110101/solicitud/tratados/configuracion`;

/**
 *  URLs de tab datos mercancia
 */

/**
 * API para consultar los datos de la fracción arancelaria partida.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/consultar-datos-fraccion-arancelaria
 */
export const API_GET_FRACCION_ARANCELARIA_PARTIDA = (CVEFRACCION: string): string => `sat-t110101/fraccion-arancelaria/${CVEFRACCION}/partida`;

/**
 * API para validar fracción arancelaria.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/valida-fraccion-arancelaria
 */
export const API_POST_FRACCION_ARANCELARIA_VALIDAR = `sat-t110101/fraccion/validar`;

/**
 * API para validar insumo.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/validar-insumo
 */
export const API_POST_VALIDAR_INSUMO = `sat-t110101/solicitud/insumo/validar`;

/**
 * API para validar empaque.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/validar-empaque
 */
export const API_POST_VALIDAR_EMPAQUE = `sat-t110101/solicitud/empaque/validar`;

/**
 * API para guardar solicitud
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/guardar-solicitud
 */
export const API_POST_GUARDAR_SOLICITUD = `sat-t110101/solicitud/guardar`;


/**
 * API para generar la cadena original para la solicitud
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Registro-Solicitud/genera-cadena-original
 */
export const API_POST_GENERAR_CADENA_ORIGINAL = (IDSOLICITUD: string): string => `sat-t110101/solicitud/${IDSOLICITUD}/generar-cadena-original`;

/**
 * API para firmar la solicitud del tramite 110101.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/firmar_2
 */
export const API_POST_FIRMA = (IDSOLICITUD: string) : string => `sat-t110101/solicitud/${IDSOLICITUD}/firmar`;