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
 * API para el catalogo pais y bloque.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-paises-bloques
 */
export const API_GET_CAT_PAIS_BLOQUES = `sat-t110101/catalogo/paises/bloques`;

/**
 * API para elcatalogo de tratados acuerdo.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/getTratadosPorPais
 */
export const API_GET_CAT_TRATADOS_ACUERDO = (CLAVEPAIS: string): string => `sat-t110101/catalogo/pais/${CLAVEPAIS}/tratado-acuerdo`;

/**
 * API para elcatalogo de tratados acuerdo bloque.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Cat%C3%A1logos/consulta-tratado-acuerdo-bloque
 */
export const API_GET_CAT_TRATADOS_ACUERDO_BLOQUE= (CVETRATADOACUERDO: string): string => `sat-t110101/catalogo/tratado-acuerdo/${CVETRATADOACUERDO}/bloque`;