import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';

/**
 * Servicio para gestionar operaciones relacionadas con certificados y licencias.
 * Proporciona métodos para obtener datos desde el servidor o archivos JSON locales,
 * incluyendo trámites, catálogos y tablas asociadas.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadosLicenciasService {

  /**
   * La URL del servidor utilizada para operaciones auxiliares con JSON.
   * Este valor se obtiene de la configuración del entorno.
   */
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;
  
  /**
   * Inicializa una nueva instancia del servicio CertificadosLicenciasService.
   * 
   * @param http - El servicio HttpClient utilizado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient ) {
    //
   }

  /**
   * @description Función para obtener el trámite
   * @param id
   * @returns JSONResponse
   */
  obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del banco desde un archivo JSON local.
   * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos
   *          del archivo `banco-catalog.json`.
   */
  getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/banco-catalog.json');
  }

  /**
   * Recupera los datos de los "trámites" asociados desde un archivo JSON local.
   * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos
   *          del archivo `tramites-asociados-tabla.json`.
   */
  getTramitesAsociados(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/tramites-asociados-tabla.json');
  }

  /**
   * Recupera los datos del destinatario desde un archivo JSON local.
   * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos del destinatario.
   */
  getDestinatarioDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/destinatario-tabla.json');
  }

  /**
   * Recupera los datos del fabricante desde un archivo JSON local.
   * @returns {Observable<JSONResponse>} Un observable que contiene la respuesta JSON
   * con los datos del fabricante.
   */
  getFabricanteDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/fabricante-tabla.json');
  }

  /**
   * Recupera el catálogo de estados desde un archivo JSON local.
   * @returns {Observable<JSONResponse>} Un observable que contiene la respuesta JSON
   * con los datos del catálogo de estados.
   */
  getEstadoCatalogo(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/estado-catalog.json');
  }

  /**
   * Recupera los datos de la tabla SCIAN desde un archivo JSON local.
   * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos
   *          del archivo `scian-tabla.json` ubicado en el directorio de assets.
   */
  getScianTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/scian-tabla.json');
  }

  /**
   * Recupera los datos de "mercancías" desde un archivo JSON local.
   * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos
   *          del archivo JSON.
   */
  getMercanciasTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/mercancias-tabla.json');
  }

  /**
   * Recupera una lista de datos clave desde un archivo JSON.
   *
   * @returns Un `Observable` que emite la respuesta JSON que contiene la lista de datos clave.
   */
  getListaClaveTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/lista-claves.json');
  }

}
