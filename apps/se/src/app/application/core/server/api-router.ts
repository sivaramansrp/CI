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
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t80205/swagger-ui/index.html#/Registro-Servicios/buscarServicios
 */
export const SERVICIO_IMMEX_TABLA = (TRAMITE: string): string => `sat-t${TRAMITE}/servicios/buscar`;

/**
 * API para prepar evaluacion tramite general.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t80205/swagger-ui/index.html#/Registro-Servicios/buscarServiciosAutorizados
 */
export const SERVICIO_AUTORIZADOS_TABLA = (TRAMITE: string) : string => `sat-t${TRAMITE}/servicios/servicios-autorizados`;

/**
 * API para prepar evaluacion tramite general.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t80205/swagger-ui/index.html#/Registro-Servicios/buscarEmpresasNacionales
 */
export const SERVICIO_EMPRESAS_NACIONALES = (TRAMITE: string) : string => `sat-t${TRAMITE}/servicios/empresas-nacionales`;

/**
 * API para buscar datos de la grid de plantas controladoras de empresas controladas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t80210/solicitud/empresas-controladas/buscar-datos-grid-plantas-controladoras
 */
export const API_BUSCAR_DATOS_GRID = (TRAMITE: string) : string => `sat-t${TRAMITE}/solicitud/empresas-controladas/buscar-datos-grid-plantas-controladoras`;

/**
 * API para buscar datos de la grid de plantas controladoras de empresas controladas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t80211/solicitud/empresas-terciarizadas/buscar-datos-grid-plantas
 */
export const API_BUSCAR_TERCIARIZADAS = (TRAMITE: string): string => `sat-t${TRAMITE}/solicitud/empresas-terciarizadas/buscar-datos-grid-plantas`;

/**
 * API para descargar datos solicitud en evaluacion.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t110101/swagger-ui/index.html#/Evalua-Solicitud/excel-solicitud
 */
export const API_GET_DESCARGAR_SOLICITUD = (TRAMITE: string, IDSOLICITUD: string) : string => `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/excel`;
