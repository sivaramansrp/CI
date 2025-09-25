/**
 * API MS paara obtener los regimenes del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/regimenes
 */
export const API_GET_REGIMENES = 'sat-t130102/catalogo/regimenes';

/**
 * API MS para obtener los bloques de paises del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/bloques
 */
export const API_GET_BLOQUE_PAISES = 'sat-t130102/bloques';

/**
 * Constante para la clave del tratado.
 * Debe ser reemplazada por la clave real del tratado.
 */
export const CVETRATADO = '{cveTratado}';

/**
 * API MS para obtener los países por bloque del tramite 130102.
 * @param CVETRATADO - Clave del tratado.
 * @returns 
 */
export const API_GET_PAISES_BLOQUE = (CVETRATADO: string) : string => `sat-t130102/pais/${CVETRATADO}/bloques`;

/*
 * API MS para obtener las entidades federativas del tramite 130102.
 *  @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/catalogo/entidades-federativas
 * 
*/
export const API_GET_ENTIDADES_FEDERATIVAS = 'sat-t130102/catalogo/entidades-federativas';

/**
 * Constante para la clave de la entidad.
 * Debe ser reemplazada por la clave real de la entidad.
 */
export const CVEENTIDAD = '{cveEntidad}';

/**
 * API MS para obtener las unidades administrativas de una entidad federativa específica del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/swagger-ui/index.html#/Catalogos/consulta-unidades-administrativas
 * @param CVEENTIDAD - Clave de la entidad federativa.
 * @returns 
 */
export const API_GET_UNIDADES_ADMINISTRATIVAS = (CVEENTIDAD: string) : string => `sat-t130102/catalogo/entidad-federativa/${CVEENTIDAD}/unidades-administrativas`;

/**
 * API MS para obtener las fracciones arancelarias del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/catalogo/pexim/fracciones-arancelarias?modoCarga=combo
 */
export const API_GET_FRACCION_ARANCELARIA = 'sat-t130102/catalogo/pexim/fracciones-arancelarias?modoCarga=combo';

/**
 * Constante para la clave del régimen.
 * Debe ser reemplazada por la clave real del régimen.
 */

export const CVEREGIMEN = '{cveRegimen}';

/**
 * API MS para obtener las clasificaciones de un régimen específico del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/catalogo/regimenes/{cveRegimen}/clasificacion
 */

export const API_GET_CLASIFICACION_REGIMEN = (CVEREGIMEN: string) : string => `sat-t130102/catalogo/regimenes/${CVEREGIMEN}/clasificacion`;

/**
 * Constante para la clave de la fracción arancelaria.
 * Debe ser reemplazada por la clave real de la fracción arancelaria.
 */
export const CVEFRACCION = '{cveFraccion}';

/**
 * aPI MS para obtener las unidades de medida asociadas a una fracción arancelaria específica del tramite 130102.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130102/catalogo/fraccion-arancelaria/17011405/unidades-medida
 * @param CVEFRACCION - Clave de la fracción arancelaria.
 * @returns 
 */
export const API_GET_UNIDADES_MEDIDA = (CVEFRACCION: string) : string => `sat-t130102/catalogo/fraccion-arancelaria/${CVEFRACCION}/unidades-medida`;

/**
 * Constante para la clave de la fracción arancelaria.
 * Debe ser reemplazada por la clave real de la fracción arancelaria.
 */
export const CVE_FRACCION = '{cveFraccion}';


/**
 * API MS para obtener las subdivisiones asociadas a una fracción arancelaria específica del tramite 130102.
 * @param CVE_FRACCION - Clave de la fracción arancelaria.
 * @returns 
 */
export const API_GET_FRACCION_SUBDIVISIONES = (CVE_FRACCION: string) : string => `sat-t130102/catalogo/fraccion-arancelaria/${CVE_FRACCION}/subdiviciones`;

/**
 * Constante para la clave del esquema.
 * Debe ser reemplazada por la clave real del esquema.
 */
export const CVEESQUEMA = '{cveEsquema}';

/**
 * API MS para obtener las reglas de un esquema específico del tramite 130102.
 * @param CVEESQUEMA - Clave del esquema.
 * @returns 
 */
export const API_GET_ESQUEMA_REGLAS_OCTAVA = (CVEESQUEMA: string) : string => `sat-t130102/esquema-regla/${CVEESQUEMA}/octava`;

/**
 * Constante para el número de folio del trámite.
 * Debe ser reemplazada por el número real de folio del trámite.
 */
export const NUMFOLIOTRAMITE = '{numFolioTramite}';

/**
 * API MS para iniciar la notificación de un trámite específico del tramite 130102.
 * @param NUMFOLIOTRAMITE - Número de folio del trámite.
 * @returns 
 */

export const API_GET_INICIAR_NOTIFICACION = (NUMFOLIOTRAMITE: string) : string => `sat-t130102/${NUMFOLIOTRAMITE}/confirmar-notificacion/iniciar`;

/*
    * Constante para la clave de la fracción.
    * Debe ser reemplazada por la clave real de la fracción.
*/
export const CLVFRACCION = '{clvFraccion}';

/**
 * API MS para obtener el TIGIE de una fracción arancelaria específica del tramite 130102.
 * @param CLVFRACCION - Clave de la fracción arancelaria.
 * @returns 
 */
export const API_GET_TIGIE = (CLVFRACCION: string) : string => `sat-t130102/tramite/${CLVFRACCION}/tigie`;