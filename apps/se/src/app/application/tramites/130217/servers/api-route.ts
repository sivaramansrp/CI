/**
 * Constantes de configuración para las rutas de la API del procedimiento 130217
 */

/** URL base del servicio */
const BASE_URL = 'https://vucem-qa.vucem.gob.mx';
/** Prefijo de la API */
const API = '/ttsext';
/** Versión de la API */
const API_VERSION = '/v1';
/** Identificador del procedimiento */
const PROCEDURE = '/130217';
/** Sufijo para endpoints de solicitud */
const SOLICITUD = '/solicitud';
/** Sufijo para endpoints de trámite */
const TRAMITE = '/tramite';

/**
 * Rutas de la API para el procedimiento 130217
 */
export const PROC_130217 = {
    /** Ruta para obtener los datos del formulario */
    GET_FORM_DATA: `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${SOLICITUD}/acuse`,
    /** Ruta para buscar mercancías */
    BUSCAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-mercancias`,
    /** Ruta para guardar los datos del formulario */
    GUARDAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/guardar`,
    /** Ruta para mostrar las partidas de la solicitud */
    MOSTAR_PARTIDAS : `${BASE_URL}${API}${PROCEDURE}/solicitud/mostar/partidas?idSolicitud=`,
    /** Ruta para consultar una solicitud por ID */
    CONSULTA_SOLICITUDE: (id: string | number) : string => `${BASE_URL}${API}${PROCEDURE}${TRAMITE}/consulta/${id}`,
    /** Ruta para obtener opiniones de un trámite */
    OPINIONES: (numFolioTramite: string | number): string => `${BASE_URL}${API}${PROCEDURE}${TRAMITE}/${numFolioTramite}/opiniones`
};
