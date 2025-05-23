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
 * API para recuperar los recintos inherentes de una aduana.
 * @param CLAVE_ADUANA_QUERY El clave de la aduana seleccionada por el usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_RECINTO = `catalogo/recintos-fiscalizados/${CLAVE_ADUANA_QUERY}`;
/**
 * API para obtener el catálogo de tipo de equipo en el trasnporte ferroviario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Tipos%20de%20equipo./consulta-tipos-equipo
 */
export const API_GET_TIPO_EQUIPO = 'catalogo/busca/tipo-equipo';
/**
 * Tipo de transporte [ferro, aereo]
 */
export const TIPO_TRANSPORTE = '{tipoTransporte}';
/**
 * API para validar el número BL de transporte ferroviario. y obtener los datos:
 * Tipo de equipo, Iniciales de equipo y Npumero de equipo.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/privado/swagger-ui/index.html#/Privado%20Validaciones/validaFerro
 */
export const API_CONSULTAR_VALIDACION = `privado/${TIPO_TRANSPORTE}/valida`;
/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}'
/**
 * API que permite verificar si el RFC proporcionado es válido.
 * @param RFC_QUERY EL RFC
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/RFC/valida-rfc
 */
export const API_GET_VALIDA_RFC = `sat-t5701/rfc/valida/${RFC_QUERY}`;

/**
 * API que obtiene la información del contribuyente por RFC.
 * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_IDC = `idc/contribuyente/detalle/${RFC_QUERY}`
/**
 * API que valida si un RFC (Registro Federal de Contribuyentes) está certificado para la revisión de origen.
 * * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_ORIGEN = `certificacion/origen/valida/${RFC_QUERY}`;
/**
 * El tipo de trámite por el que se filtrará la información.
 */
export const TIPO_TRAMITE_QUERY = '{tipoTramite}';
/**
 * API para validar si un RFC tiene certificaciones vigentes.
 * @param TIPO_TRAMITE_QUERY El tipo de trámite
 * @param RFC_QUERY El RFC del solicitante
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Certificaciones/valida-certificaciones
 */
export const API_GET_VALIDA_CERTIFICACIONES = `catalogo/valida-certificaciones/${TIPO_TRAMITE_QUERY}/${RFC_QUERY}`;
/**
 * La línea de pago por la que se filtrará la información.
 */
export const LINEA_PAGO_QUERY = '{lineaPago}';
/**
 * API para validar si una línea de pago es válida.
 * @param LINEA_PAGO_QUERY La línea de pago
 */
export const API_GET_VALIDA_LINEA_PAGO = `pago/sea/${LINEA_PAGO_QUERY}`;
/**
 * API para obtener el monto del trámite
 */
export const API_GET_PARAMETRO_MONTO = `sat-t5701/parametro/monto`;
/**
 * API para guardar la solicitud
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/Solicitud/guardar
 */
export const API_POST_SOLICITUD = 'sat-t5701/guardar';
/**
 * Indica el número de trámite a consultar.
 */
export const TRAMITE = '{numeroTramite}';

/** 
 * API  para obtener el catálogo de cdocumentos obligatorios, según el trámite.
 * @param TRAMITE el trámite seleccionado por el usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/tramite/5701/documentos?especifico=false
*/
export const API_GET_DOCUMENTOS_OBLIGATORIOS = `tramite/{numeroTramite}/documentos` 
