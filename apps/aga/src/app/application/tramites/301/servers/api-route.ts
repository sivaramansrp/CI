/* eslint-disable no-useless-concat */
import { API_ENVIRONMENT } from "../../../../environments/environment";

const BASE_URL = API_ENVIRONMENT.BASE_URL;
const API = API_ENVIRONMENT.API;
const API_VERSION = API_ENVIRONMENT.API_VERSION;
const PROCEDURE = '/sat-t301';
const CATALOGO = '/catalogo';
const SOLICITUD = '/solicitud';

export const PROC_301 = {
    ESTADO: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/estado',
    PAIS: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/pais',
    NICO: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${CATALOGO}` + '/nico',
    POST_FORM_DATA: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${SOLICITUD}` + '/guardar',
    GET_FORM_DATA: `${BASE_URL}` + `${API}` + `${API_VERSION}` + `${PROCEDURE}` + `${SOLICITUD}` + '/acuse',
}
