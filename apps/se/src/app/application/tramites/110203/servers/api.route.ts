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
 * Catálogo de la API
 */
const CATALOGO = ENVIRONMENT.CATALOGO_URL;
/**
 * Procedimiento de la API
 */
const PROCEDURE = '/sat-t110203';

/**
 * Rutas de la API para el procedimiento 110223.
 * Incluye las rutas para guardar la solicitud y para obtener el catálogo de tipo de factura.
 */
export const PROC_110203 = {
    GUARDAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/guardar-certificado`,
    // TIPO_FACTURA: `${BASE_URL}${API}${PROCEDURE}${CATALOGO}/tipo-factura`,
    // BUSCAR_MERCANCIAS: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-mercancias`,
}