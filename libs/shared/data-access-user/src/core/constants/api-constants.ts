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
/**
 * La clave del socio comercial por la que se filtrará la información.
 */
export const ID_SOCIO_COMERCIAL_QUERY = '{idSocioComercial}';
/**
 * API para recuperar el catálogo de empresas
 * @param CLAVE_PATENTE_QUERY La clave de la pantente seleccionada por el usuario
 * @param TIPO_PATENTE_QUERY El tipo de patente seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html#/Patente/consulta-lista-rfc-empresas-asociadas
 */
export const API_GET_SOCIO_COMERCIAL = `catalogo/certificacion/scc/valida/${ID_SOCIO_COMERCIAL_QUERY}`;
/**
 * API que permite consultar las certificaciones automotrices.
 * @param RFC_QUERY EL RFC del solicitante
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html#/Patente/consulta-lista-rfc-empresas-asociadas
 */
export const API_GET_INDUSTRIA_AUTOMOTRIZ = `programa-se/cert-automotriz/${RFC_QUERY}`;
/**
 * API que permite validar si un RFC es genérico o no.
 * @param RFC_QUERY EL RFC
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/RFC/valida-rfc
 */
export const API_GET_VALIDA_RFC_GENERICO = `sat-t5701/rfc/valida/${RFC_QUERY}`;
/**
 * El número de gafete por el que se filtrará la información.
 */
export const NUMERO_GAFETE_QUERY = '{numeroGafete}'
/**
 * El tipo de gafete por el que se filtrará la información.
 */
export const TIPO_GAFETE_QUERY = '{tipoGafete}'
/**
 * API que permite obtener información relacionada a los gafetes.
 * @param NUMERO_GAFETE_QUERY
 * @param TIPO_GAFETE_QUERY
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/gafete/swagger-ui/index.html#/Gafetes/consulta-responsable-gafete
 */
export const API_GET_CONSULTA_RESPONSABLE = `gafete/responsable/${NUMERO_GAFETE_QUERY}/${TIPO_GAFETE_QUERY}`;

/**
 * API para recuperar los recintos inherentes de una aduana.
 * @param CLAVE_ADUANA_QUERY El clave de la aduana seleccionada por el usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_RECINTO = `catalogo/recintos-fiscalizados/${CLAVE_ADUANA_QUERY}`;

/**
 * API para validar el horario de una aduana y sección
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/Horarios/valida
 */
export const API_VALIDA_HORARIO = 'sat-t5701/horario/valida';

/**
 * API para obtener las certificaciones de Programa Fomento e IMMEX
 * @param RFC_QUERY El RFC del solicitante
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/programa-se/swagger-ui/index.html
 */
export const API_CERTIFICACION = `programa-se/certificacion/${RFC_QUERY}`;

/**
 * API para obtener el catálogo de tipo de equipo en el trasnporte ferroviario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Tipos%20de%20equipo./consulta-tipos-equipo
 */
export const API_GET_TIPO_EQUIPO = 'catalogo/busca/tipo-equipo';

/**
 * API para validar el número BL de transporte ferroviario. y obtener los datos:
 * Tipo de equipo, Iniciales de equipo y Npumero de equipo.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/privado/swagger-ui/index.html#/Privado%20Validaciones/validaFerro
 */
export const API_CONSULTAR_FERRO = `privado/ferro/valida`

