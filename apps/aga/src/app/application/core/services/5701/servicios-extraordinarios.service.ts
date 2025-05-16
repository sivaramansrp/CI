import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JSONResponse } from '@ng-mf/data-access-user';
import { APPINJECT } from 'apps/aga/src/app/app.inject';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  private readonly appConfig = inject(APPINJECT);
  /**
   * URL del servidor para acceder a los catálogos auxiliares definidos en el entorno.
   */
  urlServerCatalogos = this.appConfig.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene un catálogo por su ID desde el servidor.
   * @param id - Identificador único del catálogo a obtener.
   * @returns Un observable que emite la respuesta JSON del servidor.
   */
  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
