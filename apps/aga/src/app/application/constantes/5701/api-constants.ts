/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}';
/**
 * API para recuperar las patentes asociadas a un solicitante
 * @param RFC_QUERY El RFC del solicitante
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_PATENTE = `patente/${RFC_QUERY}`;

/**
 * API para recuperar las patentes asociadas a un apoderado
 * @param rfcApoderado El RFC del apoderado
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_PATENTE_APODERADO = `patente/busca/apoderado?rfc=${RFC_QUERY}`;

/**
 * La clave de la patente por la que se filtrará la información.
 */
export const CLAVE_PATENTE_QUERY = '{clavePatente}';
/**
 * El tipo de la patente por la que se filtrará la información.
 */
export const TIPO_PATENTE_QUERY = '{tipoPatente}';
/**
 * API para recuperar el catálogo de empresas
 * @param CLAVE_PATENTE_QUERY La clave de la pantente seleccionada por el usuario
 * @param TIPO_PATENTE_QUERY El tipo de patente seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html#/Patente/consulta-lista-rfc-empresas-asociadas
 */
export const API_GET_EMPRESA =
  'patente/rfc/asociados/{CLAVE_PATENTE_QUERY}/{TIPO_PATENTE_QUERY}';
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
 * El número de gafete por el que se filtrará la información.
 */
export const NUMERO_GAFETE_QUERY = '{numeroGafete}';
/**
 * El tipo de gafete por el que se filtrará la información.
 */
export const TIPO_GAFETE_QUERY = '{tipoGafete}';
/**
 * API que permite obtener información relacionada a los gafetes.
 * @param NUMERO_GAFETE_QUERY
 * @param TIPO_GAFETE_QUERY
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/gafete/swagger-ui/index.html#/Gafetes/consulta-responsable-gafete
 */
export const API_GET_CONSULTA_RESPONSABLE = `gafete/responsable/${NUMERO_GAFETE_QUERY}/${TIPO_GAFETE_QUERY}`;

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
 * API que obtiene la información del contribuyente por RFC.
 * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_IDC = `idc/contribuyente/detalle/${RFC_QUERY}`;
/**
 * API que valida si un RFC (Registro Federal de Contribuyentes) está certificado para la revisión de origen.
 * * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_ORIGEN = `catalogo/certificacion/origen/valida/${RFC_QUERY}`;
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
 * API para validar el pedimento
 */
export const API_VALIDAR_PEDIMENTO = 'sat-t5701/pedimento/estado';

/**
 * Constante para la linea de captura que se utilizará en las consultas
 */
export const LINEA_CAPTURA_QUERY = '{lineaCaptura}';

/**
 * API para validar la línea de captura
 * @param LINEA_CAPTURA_QUERY La línea de captura a validar
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/pago/swagger-ui/index.html#/Pago/pago_2
 */
export const API_GET_VALIDA_LINEA_CAPTURA = `pago/linea-captura/${LINEA_CAPTURA_QUERY}/usada`;

/**
 * API para validar si una línea de captura ha sido pagada
 * @param LINEA_CAPTURA_QUERY La línea de captura a validar
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/pago/swagger-ui/index.html#/Pago/pago
 */
export const API_GET_VALIDA_LINEA_CAPTURA_PAGADA = `pago/valida/${LINEA_CAPTURA_QUERY}`;

/**
 * API para validar el rfc auroizacion LDA
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/LDA/valida-lda
 */
export const API_POST_VALIDA_LDA = `catalogo/solicitud/valida-lda`;

/**
 * Constante para el número de folio del tramite.
 * Debe ser reemplazada por el número de folio real del tramite.
 */
export const NUMFOLIOTRAMITE = '{numFolioTramite}';

/**
 * ID de la solicitud del dictamen que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el ID real de la solicitud del dictamen.
 */
export const IDSOLICITUDDICTAMEN = '{idSolicitudDictamen}';

/**
 * Tramite que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const TRAMITE= '{tramite}';

/**
 * ID de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el ID real de la solicitud.
 */
export const IDSOLICITUD = '{idSolicitud}';

/**
 * API para obtener las opciones de evaluación del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/opciones-evaluacion
 */
export const API_POST_OPCIONES_EVALUACION = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/opciones-evaluacion`;

/**
 * API para generar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/dictamen-criterios-by-idSolicitud
 */
export const API_GET_DICTAMEN = `sat-t130118/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para guardar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_POST_GUARDAR_DICTAMEN = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

/**
 * API para iniciar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_GET_INICAR_DICTAMEN = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/iniciar`;

/**
 * API para Consultar acuses de resolución del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Acuse/consulta-acuse-resoluciones-funcionario
 */
export const API_GET_ACUSES_RESOLUCION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/funcionario/acuses-resoluciones`;

/**
 * API para Consultar dictamenes del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consultar-dictamenes-by-numFolioTramite
 */
export const API_GET_DICTAMENES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamenes`;

/**
 * API para Consultar requerimientos del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-requerimientos-by-numFolioTramite
 */
export const API_GET_REQUERIMIENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimientos`;

/**
 * API para Consultar documentos de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consulta-documentos-solicitud
 */
export const API_GET_SOLICITUD_DOCUMENTOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/documentos`;

/**
 * API para Consultar tareas de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-tareas-tramite 
 */
export const API_GET_TAREAS_DOCUMENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/bitacora`;


