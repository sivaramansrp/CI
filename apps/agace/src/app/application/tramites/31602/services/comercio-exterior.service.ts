import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComercioExteriorService {

    /**
   * La URL del servidor utilizada para operaciones auxiliares con JSON.
   * Este valor se obtiene de la configuración del entorno.
   */
    urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

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
}
