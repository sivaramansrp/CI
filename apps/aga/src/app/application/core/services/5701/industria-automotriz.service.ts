import { API_GET_INDUSTRIA_AUTOMOTRIZ, CatalogosBooleanResponse, enviroment, RFC_QUERY } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class IndustriaAutomotrizService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   * Método para obtener la entidad o persona asociada a un proceso de comercio o negocio que interactúa con el sistema.
   */
  getCertificacionAutomotriz(rfc: string): Observable<CatalogosBooleanResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_INDUSTRIA_AUTOMOTRIZ.replace(RFC_QUERY, rfc);

    return this.http.get<CatalogosBooleanResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
        return throwError(() => ERROR);
      })
    );
  }
}
