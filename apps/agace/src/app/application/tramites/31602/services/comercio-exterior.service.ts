import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENVIRONMENT } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { JSONResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class ComercioExteriorService {

    /**
   * La URL del servidor utilizada para operaciones auxiliares con JSON.
   * Este valor se obtiene de la configuración del entorno.
   */
    urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {
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
     * Obtiene los datos para la tabla "Empresas del Grupo" desde un archivo JSON local.
     *
     * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON con los datos de la tabla.
     * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
     */
    getEmpresasTablaDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('./assets/json/31602/empresas-del-grupo-tabla.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    /**
     * Obtiene los datos del JSON "banco-catalog" desde la ruta especificada en assets.
     *
     * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON.
     * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
     */
    getBancoDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/31602/banco-catalog.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    /**
     * Obtiene los datos anteriores desde un archivo JSON ubicado en 'assets/json/31602/anteriores-tabla.json'.
     *
     * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON con los datos anteriores.
     * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
     */ 
    getAnterioresDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/31602/anteriores-tabla.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
}
