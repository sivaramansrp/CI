import { API_GET_VALIDA_CERTIFICACIONES, CatalogosBooleanResponse, enviroment, RFC_QUERY, TIPO_TRAMITE_QUERY } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CertificacionOeaService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   * 
   */
  getValidacionCertificacion(tipoTramite: string, rfc: string): Observable<CatalogosBooleanResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_VALIDA_CERTIFICACIONES.replace(TIPO_TRAMITE_QUERY, tipoTramite).replace(RFC_QUERY, rfc);

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
