

import { API_GET_CONSULTA_RESPONSABLE, API_GET_INDUSTRIA_AUTOMOTRIZ, enviroment, NUMERO_GAFETE_QUERY, TIPO_GAFETE_QUERY } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsableGafeteResponse } from '../../models/5701/gafete-responsable.model';


@Injectable({
  providedIn: 'root',
})
export class ConsultaResponsableService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   *
   */
  getGafeteResponsable(numeroGafete: string, tipoGafete: string): Observable<ResponsableGafeteResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_CONSULTA_RESPONSABLE.replace(NUMERO_GAFETE_QUERY, numeroGafete).replace(TIPO_GAFETE_QUERY, tipoGafete);    

    return this.http.get<ResponsableGafeteResponse>(ENDPOINT).pipe(
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
