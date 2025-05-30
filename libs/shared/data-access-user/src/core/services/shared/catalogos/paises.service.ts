import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_GET_PAISES } from '../../../constants/api-constants';
import { CatalogoPaisesResponse } from '../../../models/shared/catalogos.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`
  }

  /**
   * Obtiene el listado de los países
   * @returns Observable con la lista de respuestas del catálogo.
   */
  getListaPaises(): Observable<CatalogoPaisesResponse> {
    const ENDPOINT = `${this.host}${API_GET_PAISES}`;

    const HEADER = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Authorization',
      })
    };

    return this.http.get<CatalogoPaisesResponse>(ENDPOINT, HEADER).pipe(
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
