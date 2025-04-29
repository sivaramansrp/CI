
import { CatalogosResponse, enviroment } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_GET_SECCION_ADUANA } from '../../../shared/constants/api-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SeccionAduanaService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   *
   */
  getListaSeccionesAduanas(): Observable<CatalogosResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_SECCION_ADUANA;

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
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
