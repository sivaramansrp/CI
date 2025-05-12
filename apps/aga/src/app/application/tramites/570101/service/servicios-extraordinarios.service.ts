import {Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})

export class TramiteFolioService {
  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {
    // El constructor está intencionalmente vacío para la inyección de dependencias
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
