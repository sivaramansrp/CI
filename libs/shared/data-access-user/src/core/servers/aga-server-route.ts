/* eslint-disable no-useless-concat */
const BASE_URL = 'https://dev.v30.ultrasist.net/api';
const API_VERSION = '/v1';

export const AGA = {
    COMMON_API: `${BASE_URL}` + `${API_VERSION}` + '/atender-Requerimiento/firmar-requerimiento',
    PROC_303: {
        CATALOG: `${BASE_URL}` + `${API_VERSION}` + '/atender-Requerimiento/firmar-requerimiento',
        SUBMIT_FORM: `${BASE_URL}` + `${API_VERSION}` + '/atender-Requerimiento/submit',
    },
    PROC_5701: {
        CATALOG: `${BASE_URL}` + `${API_VERSION}` + '/atender-Requerimiento/firmar-requerimiento',
        SUBMIT_FORM: `${BASE_URL}` + `${API_VERSION}` + '/atender-Requerimiento/submit',
    }
}