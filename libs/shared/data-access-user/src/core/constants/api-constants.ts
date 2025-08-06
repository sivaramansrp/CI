import { RFC_GENERICO } from "./constantes-generales";

/**
 * API para recuperar el catálogo de aduanas
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_ADUANA = 'catalogo/aduanas';
/**
 * La clave de la aduana por la que se filtrará la información.
 */
export const CLAVE_ADUANA_QUERY = '{claveAduana}';
/**
 * API para recuperar el catálogo de aduanas
 * @param CLAVE_ADUANA_QUERY La clave de la aduana seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_SECCION_ADUANA = `catalogo/seccion-aduanas/${CLAVE_ADUANA_QUERY}`;
/**
 * La clave de la patente por la que se filtrará la información.
 */
export const CLAVE_PATENTE_QUERY = '{clavePatente}';
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
export const RFC_QUERY = '{rfc}';
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
export const API_GET_RFC_IDC = `idc/contribuyente/detalle/${RFC_QUERY}`;
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
 * ID del trámite a eliminar.
 * Este ID se debe reemplazar por el ID del trámite que se desea eliminar.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/Tramite/elimina-tramite-pendiente-by-id
 */
export const ID_TRAMITE = '{idTramite}';

/**
 * API para eliminar un trámite pendiente.
 */
export const API_ELIMINAR_TRAMITE = `sat-t5701/tramite/pendiente/${ID_TRAMITE}`;

/**
 * Indica el número de trámite a consultar.
 */
export const TRAMITE = '{numeroTramite}';

/**
 * API  para obtener el catálogo de cdocumentos obligatorios, según el trámite.
 * @param TRAMITE el trámite seleccionado por el usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/tramite/5701/documentos?especifico=false
 */
export const API_GET_DOCUMENTOS_OBLIGATORIOS = `tramite/{numeroTramite}/documentos`;

/**
 * API para recuperar el catálogo de paises
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Pa%C3%ADs/consulta-paises-activos
 */
export const API_GET_PAISES = 'catalogo/paises';

/**
 * API para generar la cadena original de un trámite.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/tramite-flujo/swagger-ui/index.html#/Cadena/generar
 */
export const API_GENERAR_CADENA_ORIGINAL =
  'api/tramite/solicitud/genera-cadena-original';

/**
 * API para enviar una firma electrónica.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/firma/swagger-ui/index.html#/Firma/firmar
 */
export const API_ENVIAR_FIRMA = 'api/tramite/firmar';

/**
 * API para recuperar las tareas por usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/bandeja-tarea/swagger-ui/index.html#/Bandeja%20tarea/consultar-tareas-servicio
 */
export const API_GET_BANDEJATAREA = 'bandeja-tarea/usuario/tarea';

/**
 * API para recuperar el catálogo de regímenes aduaneros.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-regimenes
 */
export const API_GET_REGIMEN = `sat-t130118/catalogo/regimenes`;

/**
 * La clave del régimen aduanero por el que se filtrará la información.
 */
export const CLASIFICACION = '{cveRegimen}';

/**
 * API para recuperar la clasificación de un régimen aduanero.
 * @param CLASIFICACION La clave del régimen aduanero
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-clasificacion
 */
export const API_GET_REGIMENES_CLASIFICACION = `sat-t130118/catalogo/regimenes/${CLASIFICACION}/clasificacion`;

/**
 * API para recuperar el catálogo de países para el trámite T130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-paises
 */
export const API_GET_PAISES_SAT_T130118 = 'sat-t130118/catalogo/paises';

/**
 * API para recuperar el catálogo de entidades federativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-entidades-federativas
 */
export const API_GET_ENTIDADES_FEDERATIVAS = 'sat-t130118/catalogo/entidades-federativas';

/**
 * La clave de la entidad federativa por la que se filtrará la información.
 */
export const CVEENTIDAD = '{cveEntidad}';

/**
 * API para recuperar las unidades administrativas de una entidad federativa.
 * @param CVEENTIDAD La clave de la entidad federativa
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-unidades-administrativas
 */
export const API_GET_ENTIDADES_FEDERATIVAS_CLAVE = `sat-t130118/catalogo/entidad-federativa/${CVEENTIDAD}/unidades-administrativas`;

/**
 * API para recuperar el catálogo de fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-fraccion-arancelaria
 */
export const API_GET_FRACCION_ARANCELARIA = 'sat-t130118/catalogo/fracciones-arancelarias';

/**
 * La clave de la fracción arancelaria por la que se filtrará la información.
 */
export const CVEFRACCION = '{cveFraccion}';

/**
 * API para recuperar el catálogo de fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-unidades-medidas
 */
export const API_GET_FRACCION_ARANCELARIA_CVE = `sat-t130118/catalogo/fraccion-arancelaria/${CVEFRACCION}/unidades-medida`;

/**
 * API para recuperar el catálogo de subdivisiones y fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-subdivisiones-fracciones-arancelarias
 */
export const API_GET_NICO = `sat-t130118/catalogo/fraccion-arancelaria/${CVEFRACCION}/subdiviciones`;

/**
 * ID de la solicitud que se utilizará en las rutas de la API.
 */
export const IDSOLICITUD = '{idSolicitud}';

/**
 * API para guardar el acuse de una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/guardar-documento
 */
export const API_POST_GUARDAR_ACUSE = `sat-t130118/solicitud/${IDSOLICITUD}/acuse/guardar`;

/**
 * API para generar la vista previa del acuse de una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/genera-documento
 */
export const API_POST_VISTA_PREVIA = `sat-t130118/solicitud/${IDSOLICITUD}/acuse/vista-previa`;

/**
 * API para obtener los documentos
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/consulta-documentos
 */
export const API_GET_DOCUMENTOS130118 = 'sat-t130118/solicitud/documentos';

/**
 * Ruta de la API para obtener la información del contribuyente IDC.
 * Utiliza el RFC genérico como parte de la URL.
 *
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/idc/swagger-ui/index.html#/idc-ws-end-point-controller/informacionContribuyente
 */
export const API_GET_IDC_CONTRIBUYENTE = `idc/contribuyente/${RFC_GENERICO}/informacion`;
