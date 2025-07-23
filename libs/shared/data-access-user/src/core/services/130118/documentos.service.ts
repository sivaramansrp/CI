import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_POST_GUARDAR_ACUSE, API_POST_VISTA_PREVIA, ENVIRONMENT, IDSOLICITUD } from '../../..';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseResponse } from '../../models/5701/base-response.model';
import { DocumentoResponse } from '../../models/shared/documentos-request.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  /**
   * URL base del servicio
   */
  private readonly host: string;

  /**
   * Constructor del servicio DocumentosService
   * @param http HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Guarda el acuse de la solicitud
   * @param idSolicitud Identificador de la solicitud
   * @returns Observable con la respuesta del servidor
   */
  guardarAcuse(idSolicitud: string): Observable<BaseResponse<null>> {
    const ENDPOINT = `${this.host}` + API_POST_GUARDAR_ACUSE.replace(IDSOLICITUD, idSolicitud);

    return this.http.post<BaseResponse<null>>(ENDPOINT, null).pipe(
      catchError(() => {
        const ERROR = new Error(`Error al obtener la cadena original en ${ENDPOINT}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene la vista previa del documento asociado a la solicitud
   * @param idSolicitud Identificador de la solicitud
   * @returns Observable con la respuesta del servidor que contiene el documento
   */
  vistaPrevia(idSolicitud: string): Observable<BaseResponse<DocumentoResponse>> {
    const ENDPOINT = `${this.host}` + API_POST_VISTA_PREVIA.replace(IDSOLICITUD, idSolicitud);

    return this.http.post<BaseResponse<DocumentoResponse>>(ENDPOINT, null).pipe(
      catchError(() => {
        const ERROR = new Error(`Error al obtener la cadena original en ${ENDPOINT}`);
        return throwError(() => ERROR);
      })
    );
  }

}
