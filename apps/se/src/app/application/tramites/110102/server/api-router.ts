/**
 * API para el catalogo de representación federal.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Catalogos/consultar-representaciones-federales
 */
export const API_GET_CAT_REPRESENTACION_FEDERAL= (CVEENTIDAD: string): string => `sat-t110102/catalogo/entidad-federativa/${CVEENTIDAD}/representaciones-federales`;
/**
 * API para el catalogo de entidades federativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Catalogos/consulta
 */
export const API_GET_CAT_ENTIDADES_FEDERATIVAS = `sat-t110102/catalogo/entidades-federativas`;

/**
 * API para el catalogo de declaracion de datos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Catalogos/consulta-by-tipo-tramite
 */
export const API_GET_CAT_DECLARACION_DATOS = (IDTIPOTRAMITE: string): string => `sat-t110102/catalogo/tipo-tramite/${IDTIPOTRAMITE}/declaraciones`;


/**
 *  URLs de Tab Mercancia
 */

/**
 * API para Solicitud de Comercializadores de Productos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/consulta-comercializadores-productos
 */
export const API_GET_COMERCIALIZADORES_PRODUCTOS = `sat-t110102/solicitud/comercializadores-productos`;


/**
 * API para configuracion tratados.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/consultar-configuracion-tratados
*/
export const API_POST_SOLICITUD_TRATADOS_CONFIGURACION = `sat-t110102/solicitud/tratados/configuracion`;

/**
 * API para guardar solicitud
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/guardar-solicitud
 */
export const API_POST_GUARDAR_SOLICITUD = `sat-t110102/solicitud/guardar`;

/**
 *  URLs para guardado
 */
/**
 * API para validar la solicitud completa previo al guardado.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/valida-solicitud
 */
export const API_POST_VALIDAR_SOLICITUD_COMPLETA = `sat-t110102/solicitud/validar`; 

/**
 * API para generar la cadena original para la solicitud
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/genera-cadena-original
 */
export const API_POST_GENERAR_CADENA_ORIGINAL = (IDSOLICITUD: string): string => `sat-t110102/solicitud/${IDSOLICITUD}/genera-cadena-original`;

/**
 * API para firmar la solicitud del tramite 110102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110102/swagger-ui/index.html#/Registro-Solicitud/firmar-solicitud
 */
export const API_POST_FIRMA = (IDSOLICITUD: string) : string => `sat-t110101/solicitud/${IDSOLICITUD}/firmar`;
