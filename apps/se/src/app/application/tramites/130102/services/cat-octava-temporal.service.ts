import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CatalogosResponse, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { Observable, catchError, map, throwError } from 'rxjs';

import { API_GET_BLOQUE_PAISES, API_GET_REGIMENES } from '../server/api-router';
import { CatalogosBloquesResponse } from '../models/octava-temporal.model';

@Injectable({
  providedIn: 'root'
})
export class CatOctavaTemporalService {

  /**
   * URL base del servidor 
    */
  private readonly host: string;

  /**
   * Constructor del servicio que inicializa la URL base del host.
   * @param http Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Obtiene los regímenes.
   * @returns Observable con la respuesta del servidor.
   */
  getRegimenes(): Observable<CatalogosResponse> {
    const ENDPOINT = `${this.host}${API_GET_REGIMENES}`;

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(
          `Ocurrió un error al devolver la información ${ENDPOINT} `
        );
        return throwError(() => ERROR);
      })
    );
  }

  /*
    * Obtiene los países por bloque.  
    * @returns Observable con la respuesta del servidor.
    */

  getPaisesBloque(): Observable<CatalogosBloquesResponse> {
    const ENDPOINT = `${this.host}${API_GET_BLOQUE_PAISES}`;
    return this.http.get<CatalogosBloquesResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(
          `Ocurrió un error al devolver la información ${ENDPOINT} `
        );
        return throwError(() => ERROR);
      })
    );
  }

}
