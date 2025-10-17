import { ENVIRONMENT } from '../../../environments/environment';
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
 * API para obtener los datos de IMMEX por RFC.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t231002/swagger-ui/index.html#/Catalogos/consulta-no-autorizacion-immex
 * @param tramite Identificador del trámite.
 * @param rfc RFC del solicitante.
 * @returns URL completa para la consulta.
 */

export const API_GET_IMMEX = (tramite: string, rfc: string): string =>
  `sat-t${tramite}/catalogo/rfc/${rfc}/no-autorizacion-immex`;

/**
 * API para obtener las materias primas por número de bitácora.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t231002/swagger-ui/index.html#/Catalogo/materias-primas
 * @param tramite
 * @returns URL completa para la consulta.
 */
export const API_GET_MATERIAS_BITACORA = (
  rfc: string,
  tramite: string
): string => `sat-t${tramite}/catalogo/rfc/${rfc}/materias-primas`;


/**
 * API para obtener una materia prima por su ID.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t231002/swagger-ui/index.html#/Catalogo/materia-prima-id
 * @param materiaId ID de la materia prima.
 */
export const API_GET_MATERIA_ID = (
  materiaId: string,
  tramite: string
): string =>
  `sat-t${tramite}/catalogo/idMercancia/${materiaId}/materia-prima-detalle`;
