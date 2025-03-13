import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/shared/catalogos.model';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'any',
})
export class ServiciosExtraordinariosService {
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {}

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
