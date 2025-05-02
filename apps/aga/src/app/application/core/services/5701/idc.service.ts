import { API_GET_RFC_IDC, enviroment, RFC_QUERY } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IdcResponse } from '../../models/5701/idc.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdcService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   * Obtiene la información del contribuyente por su RFC.
   */
  getInformacionContribuyente(rfc: string): Observable<IdcResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_RFC_IDC.replace(RFC_QUERY, rfc);

    return this.http.get<IdcResponse>(ENDPOINT).pipe(
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
