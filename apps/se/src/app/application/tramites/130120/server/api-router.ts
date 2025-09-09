
/**
 * API para el catálogo de regimenes.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-regimenes
 */
export const API_GET_CAT_REGIMENES = `sat-t130120/catalogo/regimenes`;


/**
 * API para el catálogo de clasificación de régimen.
 * @param CVEREGIMEN - Clave del régimen para el cual se desean obtener las clasificaciones.
 * @returns URL del endpoint para obtener la clasificación de régimen.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-clasificacion-regimen 
 */
export const API_GET_CAT_REGIMENES_CLASIFICACION = (CVEREGIMEN: string): string => `sat-t130120/catalogo/regimenes/${CVEREGIMEN}/clasificacion`;

/**
 * API para el catálogo de entidades federativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-entidades-federativas
 */
export const API_GET_CAT_ENTIDADES = `sat-t130120/catalogo/entidades-federativas`;

/**
 * API para el catálogo de tipos de aduanas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-tipos-aduanas
 */
export const API_GET_CAT_TIPOS_ADUANAS = `sat-t130120/catalogo/tipos-aduanas`;

/**
 * API para el catálogo de tipos de monedas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-tipos-monedas
 */
export const API_GET_CAT_TIPOS_MONEDAS = `sat-t130120/tipos-monedas`;

/**
 * API para el catálogo de países.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-paises
 */
export const API_GET_CAT_PAISES = `sat-t130120/catalogo/paises`;