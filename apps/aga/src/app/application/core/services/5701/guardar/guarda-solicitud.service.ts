import { API_POST_SOLICITUD, enviroment } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudPayload } from '../../../models/5701/solicitud-payload.model';
import { SolicitudResult } from '../../../models/5701/solicitud-result.model';

@Injectable({
  providedIn: 'root',
})
export class GuardaSolicitudService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   * Método para guardar la solicitud a la base de datos.
   */
  postSolicitud(solicitud: SolicitudPayload): Observable<SolicitudResult> {
    const ENDPOINT = `${this.host}` + API_POST_SOLICITUD;
  
    return this.http.post<SolicitudResult>(ENDPOINT, solicitud).pipe(
      map((response) => {
        return response;
      }),
      catchError((httpError) => {
        if (httpError instanceof HttpErrorResponse) {
          return throwError(() => ({
            success: false,
            error: httpError.error,
          }));
        }
        const ERROR = new Error(`Ocurrió un error al guardar la información ${ENDPOINT} `);
        return throwError(() => ERROR);
      })
    );
  }
}
