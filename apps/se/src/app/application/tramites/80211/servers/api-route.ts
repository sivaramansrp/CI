/**
 * Conjunto de rutas de la API para el procedimiento 80101.
 */
import { ENVIRONMENT } from "@libs/shared/data-access-user/src/enviroments/enviroment";
/**
 * url base de la API
 */
const BASE_URL = ENVIRONMENT.API_HOST;
/**
 * API nombre
 */
const API = ENVIRONMENT.API;
/**
 * versión de la API
 */
const API_VERSION = ENVIRONMENT.API_VERSION;
/**
 * Catálogo de la API
 */
const CATALOGO = ENVIRONMENT.CATALOGO_URL;
/**
 * Solicitud de la API
 */
const SOLICITUD = ENVIRONMENT.SOLICITUD_URL;
/**
 * Trámite de la API
 */
const TRAMITE = ENVIRONMENT.TRAMITE_URL;
/**
 * Procedimiento de la API
 */
const PROCEDURE = '/sat-t80211';

/**
 * Rutas de la API para el procedimiento 80211
 */
export const PROC_80211 = {
    ESTADO: `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${CATALOGO}/estado`,
    PAIS: `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${CATALOGO}/pais`,
    POST_FORM_DATA: `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${SOLICITUD}/guardar`,
    GET_FORM_DATA: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/acuse`,
    BUSCAR_PLANTAS: `${BASE_URL}${API}${PROCEDURE}/empresas-terciarizadas/buscar-datos-grid-plantas`,
    TRATADO: `${BASE_URL}${API}${PROCEDURE}${CATALOGO}/tratado`,
    GUARDAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/guardar`,
    CONSULTA_SOLICITUDE: (id: string | number) : string => `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${TRAMITE}/consulta/${id}`,
    OPINIONES: (numFolioTramite: string | number): string => `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${TRAMITE}/${numFolioTramite}/opiniones`
};
