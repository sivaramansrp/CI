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