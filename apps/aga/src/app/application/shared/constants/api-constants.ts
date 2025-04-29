/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}'

/**
 * API para recuperar las patentes asociadas a un solicitante
 * @param rfcSolicitante El RFC del solicitante
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_PATENTE = `patente/busca?rfc=${RFC_QUERY}`;

/**
 * API para recuperar las patentes asociadas a un apoderado
 * @param rfcApoderado El RFC del apoderado
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_PATENTE_APODERADO = `patente/busca/apoderado?rfc=${RFC_QUERY}`;

/**
 * API para recuperar el catálogo de aduanas
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_ADUANA = 'catalogo/aduanas';

/**
 * API para recuperar el catálogo de aduanas
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_SECCION_ADUANA = 'catalogo/seccion-aduanas/CV2';

/**
 * API para recuperar el catálogo de empresas
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html#/Patente/consulta-lista-rfc-empresas-asociadas
 */
export const API_GET_EMPRESA = 'patente/rfc/asociados/PAT3/TIPAT.AGE';