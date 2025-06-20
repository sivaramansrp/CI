import { Observable, catchError, throwError } from 'rxjs';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Representa la estructura de una respuesta JSON.
 * 
 * @interface JSONResponse
 * 
 * @property {number} id - Identificador único de la respuesta.
 * @property {string} descripcion - Descripción asociada a la respuesta.
 * @property {string} codigo - Código relacionado con la respuesta.
 * @property {string} data - Información adicional en formato de cadena.
 */
export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})

export class ServiciosExtraordinariosService {
  /**
   * URL del servidor para acceder a los catálogos auxiliares definidos en el entorno.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un catálogo por su ID desde el servidor.
   * @param id - Identificador único del catálogo a obtener.
   * @returns Un observable que emite la respuesta JSON del servidor.
   */
  obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
