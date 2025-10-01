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
const PROCEDURE = '/sat-t80101';

const PROCEDURE_NO = '80101';

/**
 * Rutas de la API para el procedimiento 80101
 */
export const API_ROUTES = (procedure: string=PROCEDURE, procedureNo: string = PROCEDURE_NO) => ({
    ESTADO: `${BASE_URL}${API}/${procedure}${CATALOGO}/estados`,
    PAIS: `${BASE_URL}${API}/${procedure}${CATALOGO}/paises`,
    ActividadProductiva: `${BASE_URL}${API}/${procedure}${CATALOGO}/actividad-productiva-prosec`,
    RepresentacionFederal: `${BASE_URL}${API}/${procedure}${CATALOGO}/representacion-federal`,
    TipoDocumento: `${BASE_URL}${API}/${procedure}${CATALOGO}/tipo-documento/${procedureNo}`,
    municipiosMax: `${BASE_URL}${API}/${procedure}${CATALOGO}/municipio-mex`,
    tipoCategoria: `${BASE_URL}${API}/${procedure}${CATALOGO}/tipo-categoria`,
    servicoImex: `${BASE_URL}${API}/${procedure}${CATALOGO}/servicios-immex`,
    tipoInversion: `${BASE_URL}${API}/${procedure}${CATALOGO}/tipo-inversion`,
    estadoImex: `${BASE_URL}${API}/${procedure}${CATALOGO}/representacion-federal`,
    buscarPlantas: `${BASE_URL}${API}${procedure}${SOLICITUD}/empresas-submanufactureras/buscar-datos-grid-plantas`,
    buscarPlantasImmex: `${BASE_URL}${API}${procedure}${SOLICITUD}/federatarios-y-plantas/estado`,
    buscarPermisoImmex: `${BASE_URL}${API}${procedure}${SOLICITUD}/agregar-anexo-premiso`,
});
