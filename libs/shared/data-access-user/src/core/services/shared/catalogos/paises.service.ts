import { Observable, catchError, map, throwError } from 'rxjs';
import { API_GET_PAISES } from '../../../constants/api-constants';
import { CatalogoPaisesResponse } from '../../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = `${enviroment.API_HOST}/api/`
  }

  /**
   * Obtiene el listado de los países
   * @returns Observable con la lista de respuestas del catálogo.
   */
  getListaPaises(): Observable<CatalogoPaisesResponse> {
    const ENDPOINT = `${this.host}${API_GET_PAISES}`;
    return this.http.get<CatalogoPaisesResponse>(ENDPOINT).pipe(
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
