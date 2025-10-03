import { ENVIRONMENT } from "../../../environments/environment";
/**
 * URLs de API comunes
 */
export const COMUN_URL = {
  BASE_URL: `${ENVIRONMENT.URL_SERVER}`,
  API: '/api',
  API_VERSION: '/v3',
  CATALOGO_URL: '/catalogo',
  SOLICITUD_URL: '/solicitud',
  TRAMITE_URL: '/tramite',
};

/**
 * API para obtener evaluar iniciar tramite general.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_INICIAR = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/iniciar`;

/**
 * API para prepar evaluacion tramite general.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_MOSTRAR = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/mostrar`;

/**
 * API para prepar evaluacion tramite general.
 */
export const SERVICIO_IMMEX_TABLA = (TRAMITE: string) : string => `sat-t${TRAMITE}/servicios/buscar`;

/**
 * API para descargar datos solicitud en evaluacion.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Evalua-Solicitud/excel-solicitud
 */
export const API_GET_DESCARGAR_SOLICITUD = (TRAMITE: string, IDSOLICITUD: string) : string => `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/excel`;