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

/**
 * API para consulta unidades administrativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-unidades-administrativas
 */
export const API_GET_CAT_UNIDADES_ADMINISTRATIVAS = (CVEENTIDAD: string): string => `sat-t130120/catalogo/entidad-federativa/${CVEENTIDAD}/unidades-administrativas`;

/**
 * API para el catálogo de unidades de medidas tarifarias.
 * @param CVEFRACCION - Clave de la fracción arancelaria para la cual se desean obtener las unidades de medidas tarifarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-unidades-medidas-tarifarias
 */
export const API_GET_CAT_UNIDADES_MEDIDAS_TARIFARIAS = (CVEFRACCION: string): string => `sat-t130120/fraccion-arrancelaria/${CVEFRACCION}/unidades-medidas-tarifarias`;

/**
 * API para el catálogo de unidades de medida.
 * @param CVEFRACCION - Clave de la fracción arancelaria para la cual se desean obtener las unidades de medida.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-unidades-medida 
 */
export const API_GET_CAT_UNIDADES_MEDIDA = (CVEFRACCION: string): string => `sat-t130120/catalogo/fraccion-arancelaria/${CVEFRACCION}/unidades-medida`;

/**
 * API para el catálogo de subdivisiones de fracciones arancelarias.
 * @param CVEFRACCION - Clave de la fracción arancelaria para la cual se desean obtener las subdivisiones.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-subdivisiones-fracciones-arancelarias
 */
export const API_GET_CAT_SUBDIVISIONES_FRACCIONES_ARANCELARIAS = (CVEFRACCION: string): string => `sat-t130120/catalogo/fraccion-arancelaria/${CVEFRACCION}/subdivisiones`;

/**
 * API para el catálogo de fracciones arancelarias de calzados.
 * @param CVEREGIMEN - Clave del régimen para el cual se desean obtener las fracciones.
 * @param CVECLASIFICACIONREGIMEN - Clave de la clasificación del régimen.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/fracciones-calzados
 */
export const API_GET_CAT_FRACCIONES_CALZADOS = (CVEREGIMEN: string, CVECLASIFICACIONREGIMEN: string): string => `sat-t130120/catalogo/regimenes/${CVEREGIMEN}/clasificacion/${CVECLASIFICACIONREGIMEN}/fracciones-calzado`;

/**
 * API para el catálogo de fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-fracciones-arrancelarias
 */
export const API_GET_CAT_FRACCIONES_ARRANCELARIAS = `sat-t130120/catalogo/fracciones-arancelarias`;

/**
 * API para el catálogo de fracciones arancelarias.
 * @param CVEFRACCION - Clave de la fracción arancelaria para la cual se desean obtener las subdivisiones.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130120/swagger-ui/index.html#/Catalogos/consulta-subdivisiones-fracciones-arancelarias
 */
export const API_GET_CAT_FRACCIONES_ARRANCELARIAS_SUBDIVISIONES = (CVEFRACCION: string): string => `sat-t130120/catalogo/fraccion-arancelaria/${CVEFRACCION}/subdiviciones`;