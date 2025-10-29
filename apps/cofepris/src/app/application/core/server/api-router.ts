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
 * Endpoint para buscar representante legal por RFC
 * @param tramite - Número del trámite
 * @returns string con el endpoint
 */
export const API_BUSCAR_REPRESENTANTE = (tramite: string): string => `sat-t${tramite}/representante/buscar`;