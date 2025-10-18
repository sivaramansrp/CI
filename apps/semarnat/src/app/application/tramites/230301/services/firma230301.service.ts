import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_POST_FIRMA, IDSOLICITUD } from '../../../constantes/230301/api-constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';

@Injectable({
  providedIn: 'root',
})
export class Firma230301Service {
  /**
   * URL del servidor donde se encuentra la API.
   */
  urlServer = ENVIRONMENT.API_HOST;

  constructor(private http: HttpClient) {}

  /**
   * Envía la firma electrónica para el trámite 230301.
   * @param body Objeto que contiene los datos de la firma.
   * @returns Un observable que emite la respuesta del servidor.
   */
  enviarFirma<T>(
    idSolicitud: string,
    payload: FirmarRequest
  ): Observable<BaseResponse<T>> {
    const ENDPOINT =
      `${this.urlServer}/api/` + API_POST_FIRMA.replace(IDSOLICITUD, idSolicitud);

    return this.http.post<BaseResponse<T>>(ENDPOINT, payload).pipe(
      map((response) => response),
      catchError(() => {
        const ERROR = new Error(`Error al enviar la firma en ${ENDPOINT}`);
        return throwError(() => ERROR);
      })
    );
  }
}
