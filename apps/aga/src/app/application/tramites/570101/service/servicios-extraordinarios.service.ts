import {Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from 'apps/aga/src/app/app.inject';

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
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  private readonly appConfig = inject(APP_CONFIG);
  /**
   * La URL del servidor JSON auxiliar utilizado para manejar servicios extraordinarios.
   * Este valor se obtiene de la configuración del entorno.
   */
  urlServer = this.appConfig.URL_SERVER_JSON_AUXILIAR;
  /**
   * URL del servidor para acceder a los catálogos auxiliares definidos en el entorno.
   */
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
