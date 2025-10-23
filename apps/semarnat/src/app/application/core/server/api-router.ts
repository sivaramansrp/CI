import { IDSOLICITUD } from "../../constantes/230301/api-constants";

/**
 * URLs de API para guardar la solicitud de desistimiento
 */
export const API_POST_GUARDAR_SOLICITUD = 'sat-t230301/solicitud/guardar';

/**
 * URL de API para generar la cadena original del trámite 230301
 */
export const API_POST_CADENA_ORIGINAL = `sat-t230301/solicitud/${IDSOLICITUD}/genera-cadena-original`;
