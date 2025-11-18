/**
 * Conjunto de rutas de la API para el procedimiento 80301.
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
 * Solicitud de la API
 */
const SOLICITUD = ENVIRONMENT.SOLICITUD_URL;

/**
 * Procedimiento de la API
 */
const PROCEDURE = '/sat-t80301';

/**
 * Rutas de la API para el procedimiento 80301
 */
export const PROC_80301 = {
    /**
     * Ruta para obtener la lista de programas a modificar.
     */
    LISTA_PROGRAMAS: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar-programasa-modificar?rfc=`,
    /**
     * Ruta para obtener los datos de modificación de un programa específico.
     */
    DATOS_MODIFICACION: `${BASE_URL}${API}/idc/contribuyente/LEQI8101314S7/informacion`,
    /**
     * Ruta para obtener las fracciones de exportación e importación.
     */
    FRACCIONES_EXPORTACION: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/fraccionesExportacion`,
    /**
     * Ruta para obtener las fracciones de importación.
     */
    FRACCIONES_IMPORTACION: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/fraccionesImportacion`,
    /**
     * Ruta para obtener la bitácora de un programa IMMEX.
     */
    BITACORA: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/consultar-bitacora-immex?idPrograma=`,
    /**
     * Ruta para buscar una solicitud por su ID.
     */
    BUSCAR_ID_SOLICITUD: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/consultas-busca-id-solicitud`,
    /**
     * Ruta para buscar los datos de certificación SAT.
     */
    CERTIFICACION_SAT: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscarDatosCertificacionSAT?rfc=`,
    /**
     * Rutas para obtener datos relacionados con la solicitud.
     */
    COMPLIMENTARIA: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/socio-accionista`,
    /**
     * Ruta para obtener los datos federales relacionados con la solicitud.
     */
    FEDERETARIOS: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/notarios/por-solicitud-consulta`,
    /**
     * Ruta para obtener las operaciones relacionadas con la solicitud.
     */
    PLANTAS: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/consulta-plantas`,
    /**
     * Ruta para obtener los servicios IMMEX relacionados con la solicitud.
     */
    SERVICIOS_IMMEX: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/buscar/consulta-servicios`,
    /**
     * Ruta para obtener las fracciones de exportación anexadas a la solicitud.
     */
    ANEXO_FRACCIONES_EXPORTACION: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/consulta-productos-exportacion?idSolicitud=`,
    /**
     * Ruta para obtener las fracciones de importación anexadas a la solicitud.
     */
    ANEXO_FRACCIONES_IMPORTACION: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/consulta-mercancias-importacion?idSolicitud=`,
    /**
     * Ruta para guardar los datos de la solicitud.
     */
    GUARDAR: `${BASE_URL}${API}${PROCEDURE}${SOLICITUD}/guardar`,
};
