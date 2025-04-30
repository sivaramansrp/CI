/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}'

/**
 * API para recuperar las patentes asociadas a un solicitante
 * @param RFC_QUERY El RFC del solicitante
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
 * La clave de la aduana por la que se filtrará la información.
 */
export const CLAVE_ADUANA_QUERY = '{claveAduana}'
/**
 * API para recuperar el catálogo de aduanas
 * @param CLAVE_ADUANA_QUERY La clave de la aduana seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_SECCION_ADUANA = `catalogo/seccion-aduanas/${CLAVE_ADUANA_QUERY}`;

/**
 * La clave de la patente por la que se filtrará la información.
 */
export const CLAVE_PATENTE_QUERY = '{clavePatente}'
/**
 * El tipo de la patente por la que se filtrará la información.
 */
export const TIPO_PATENTE_QUERY = '{tipoPatente}'
/**
 * API para recuperar el catálogo de empresas
 * @param CLAVE_PATENTE_QUERY La clave de la pantente seleccionada por el usuario
 * @param TIPO_PATENTE_QUERY El tipo de patente seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html#/Patente/consulta-lista-rfc-empresas-asociadas
 */
export const API_GET_EMPRESA = 'patente/rfc/asociados/{CLAVE_PATENTE_QUERY}/{TIPO_PATENTE_QUERY}';