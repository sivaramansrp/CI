/**
 * API para el tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/iniciar
 */
export const API_POST_INICIO = 'sat-t120301/solicitud/iniciar';

/**
 * API para guardar la solicitud del tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/buscar-instrumentos-TPL
 */
export const API_POST_TPL = 'sat-t120301/instrumentos-tpl';

/**
 * API para consultar los anios de autorizacion del tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Catalogos/consulta-anios-autorizacion
 */
export const API_GET_ANIOS_AUTORIZACION = 'sat-t120301/catalogo/anios/autorizacion'

/**
 * Id asignacion que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el id asignacion correspondiente.
 */
export const IDASIGNACION= '{idAsignacion}';

/**
 * API para consultar la unidad administrativa asociada a una asignación tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/obtener-unidad-administrativa
 */
export const API_GET_REPRESENTACION_FEDERAL = `sat-t120301/asignacion/${IDASIGNACION}/unidad-administrativa`;

/**
 * API para consultar detalle de tpl de asignación tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/detalle-instrumento-TPL
 */
export const API_POST_DETALLE_TPL = 'sat-t120301/instrumento-tpl/detalle';

/**
 * API para guardar parcialmente la solicitud del tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/guardar-parcial
 */
export const API_POST_GUARDADO_PARCIAL = 'sat-t120301/solicitud/guardar-parcial';

/**
 * API para consultar las unidades de medidas del tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Catalogos/consulta-unidades-medida-se
 */
export const API_GET_UNIDAD_MEDIDA = 'sat-t120301/catalogo/unidades-medidas';

/**
 * API para consultar las unidades de medidas del tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Catalogos/consulta-importe-of-record
 */
export const API_GET_IMPORTE_RECORD = 'sat-t120301/catalogo/importer-of-record';