import { API_GET_ADUANA, CLAVE_ADUANA_QUERY, enviroment } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecintoResponse } from '../../models/5701/recinto.model';

@Injectable({
  providedIn: 'root',
})
export class RecintoService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   *
   */
  getListaRecintos(claveAduana: string): Observable<RecintoResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_ADUANA.replace(CLAVE_ADUANA_QUERY, claveAduana);

    return this.http.get<RecintoResponse>(ENDPOINT).pipe(
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
