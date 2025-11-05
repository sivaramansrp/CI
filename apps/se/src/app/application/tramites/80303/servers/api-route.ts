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
 * Solicitud de la API
 */
const SOLICITUD = ENVIRONMENT.SOLICITUD_URL;
/**
 * versión de la API
 */
const API_VERSION = ENVIRONMENT.API_VERSION;
/**
 * Procedimiento de la API
 */
const PROCEDURE = '/sat-t80303';

export const PROC_80303 = {
  CONSULTAR_BITACORA_IMMEX: (idPrograma: string): string =>
    `${BASE_URL}${API}${API_VERSION}${PROCEDURE}${SOLICITUD}/consultar-bitacora-immex?idPrograma=${idPrograma}`,
  CONSULTA_MERCANCIAS_IMPORTACION: (idSolicitud: string): string =>
    `${BASE_URL}${API}${PROCEDURE}/solicitud/consulta-mercancias-importacion?idSolicitud=${idSolicitud}`,
  CONSULTA_PRODUCTOS_EXPORTACION: (idSolicitud: string): string =>
    `${BASE_URL}${API}${PROCEDURE}/solicitud/consulta-productos-exportacion?idSolicitud=${idSolicitud}`,
  CONSULTA_FRACCIONES_SENSIBLES: (idSolicitud: string): string =>
    `${BASE_URL}${API}${PROCEDURE}/solicitud/consulta-fracciones-sensibles?idSolicitud=${idSolicitud}`,
  CONSULTAR_PLANTAS_SUBMANUFACTURERAS: (idSolicitud: string): string =>
    `${BASE_URL}${API}${PROCEDURE}/solicitud/plantas-submanufactureras?idSolicitud=${idSolicitud}`,
  BUSCAR_EMPRESA_SUBMANUFACTURERA: (idSolicitud: string): string =>
    `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-empresa-sumanufacturera-por-id-solicitud?idSolicitud=${idSolicitud}`,
  CONSULTAR_SERVICIOS: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar/consulta-servicios`,
  BUSCAR_SOCIO_ACCIONISTA: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-socio-accionista`, 
  BUSCAR_NOTARIOS_CONSULTA: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-notarios-consulta`, 
  CONSULTA_PLANTAS: `${BASE_URL}${API}${PROCEDURE}/solicitud/consulta-plantas`, 
   BUSCAR_EMPRESAS: `${BASE_URL}${API}${PROCEDURE}/solicitud/buscar-empresas`, // New route added here

  GUARDAR: `${BASE_URL}${API}${PROCEDURE}/solicitud/guardar`,
};