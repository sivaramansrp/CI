import { Observable, catchError, map, throwError } from 'rxjs';
import { CatalogoPaisesResponse } from '../../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de los países
   * @returns Observable con la lista de respuestas del catálogo.
   */
  getListaPaises(): Observable<CatalogoPaisesResponse> {
    const ENDPOINT = 'assets/json/5701/cat-paises.json';
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
