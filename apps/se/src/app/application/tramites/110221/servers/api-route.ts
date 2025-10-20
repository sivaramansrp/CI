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
const PROCEDURE = '/sat-t110221';

/**
 * Rutas de la API para el procedimiento 110223.
 * Incluye las rutas para guardar la solicitud y para obtener el catálogo de tipo de factura.
 */
export const PROC_110221 = {
    GUARDAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/guardar`,
    TIPO_FACTURA: `${BASE_URL}${API}${PROCEDURE}${CATALOGO}/tipo-factura`,
    ENTIDAD_FEDERATIVA: `${BASE_URL}${API}${PROCEDURE}${CATALOGO}/entidades-federativas`,
    REPRESENTACION_FEDERAL: `${BASE_URL}${API}${PROCEDURE}${CATALOGO}/representacion-federal/MEX`, // Added route for Representación Federal

}
// http://localhost:8081/api/sat-t110221/catalogo/entidades-federativas
//http://localhost:8081/api/sat-t110221/catalogo/representacion-federal/MEX