/* eslint-disable no-useless-concat */

import { COMUN_URL } from "@libs/shared/data-access-user/src";

/**
 * url base de la API
 */
const BASE_URL = COMUN_URL.BASE_URL;
/**
 * API nombre
 */
const API = COMUN_URL.API;
/**
 * versión de la API
 */
const API_VERSION = COMUN_URL.API_VERSION;
/**
 * Catálogo de la API
 */
const CATALOGO = COMUN_URL.CATALOGO_URL;
/**
 * Solicitud de la API
 */
const SOLICITUD = COMUN_URL.SOLICITUD_URL;
/**
 * Trámite de la API
 */
const TRAMITE = COMUN_URL.TRAMITE_URL;
/**
 * Procedimiento de la API
 */
const PROCEDURE = '/sat-t301';

/**
 * Rutas de la API para el procedimiento 301
 */
export const PROC_301 = {
    ESTADO: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/estado',
    PAIS: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/pais',
    NICO: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/nico',
    POST_FORM_DATA: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${SOLICITUD}` + '/guardar',
    GET_FORM_DATA: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${SOLICITUD}` + '/acuse',
    CONSULTA_SOLICITUDE: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${TRAMITE}` + '/consulta' + '/${id}',
};
