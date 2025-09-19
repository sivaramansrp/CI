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

/**
 * API para consultar facturas-tpl tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Servicios-Cupos/buscarFacturasDisponiblesTPL
 */
export const API_GET_FACTURAS_TPL = 'sat-t120301/facturas-tpl/disponibles';

/**
 * API asociar facturas-tpl tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Servicios-Cupos/asociarFacturaTPL
 */
export const API_POST_FACTURAS_TPL_ASOCIAR = 'sat-t120301/facturas-tpl/asociar';

/**
 * Id expedicion que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el id asignacion correspondiente.
 */
export const IDEXPEDICION= '{idExpedicion}';

/**
 * API para facturas asociadas tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Servicios-Cupos/buscarExpedicionFacturasTPL
 */
export const API_GET_FACTURAS_TPL_ASOCIADAS = `sat-t120301/facturas/asociada/${IDEXPEDICION}`;

/**
 * API para total de unidades tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Registro-Solicitud/factura-asociada-total-unidad
 */
export const API_GET_FACTURAS_TPL_TOTAL_UNIDAD = `sat-t120301/factura-asociada/${IDEXPEDICION}/total-unidad`;

/**
 * API para eliminar facturas-tpl asociadas tramite 120301.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t120301/swagger-ui/index.html#/Servicios-Cupos/eliminarFactura
 */
export const API_DELETE_FACTURAS_TPL_ELIMINAR = 'sat-t120301/expedicion-factura';