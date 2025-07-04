import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT, JSONResponse } from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsquemaDeCertificacionService {

/**
 * La URL del servidor utilizada para operaciones auxiliares con JSON.
 * Este valor se obtiene de la configuración del entorno.
 */
  urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {
    
  }


    /**
     @description Función para obtener el trámite
     @param id
     @returns JSONResponse
    */
    obtenerTramite(id: number): Observable<JSONResponse> {
      return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getIndiqueCatalogo(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/catalog-indique.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getSociedadesTablaDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/socidad-tabla.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }

    getDatosDeLasInstalaciones(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('assets/json/32612/datos-instalaciones.json').pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
}
