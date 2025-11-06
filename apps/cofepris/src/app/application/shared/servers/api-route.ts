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


/*
 * API para obtener el catálogo de clasificación toxicologica
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t260204/catalogo/clasificacion-toxicologica
 */
export const CATALOGO_CLASIFICACION_TOXICOLOGICA = (TRAMITE: string): string => `sat-t${TRAMITE}${CATALOGO}/clasificacion-toxicologica/${TRAMITE}`;

/*
 * API para obtener el catálogo de clasificación toxicologica
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t260204/catalogo/clasificacion-toxicologica
 */
export const CATALOGO_OBJETO_IMPORTACION = (TRAMITE: string): string => `sat-t${TRAMITE}${CATALOGO}/objetoImportacion`;

