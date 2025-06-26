import { DocumentoResponse, DocumentosRequest } from '../../../models/shared/documentos-request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { BaseResponse } from '../../../models/5701/base-response.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private urlServer = ENVIRONMENT.URL_SERVER_UPLOAD;
  private urlServerHost = ENVIRONMENT.API_HOST;

  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
  }

  subirDocumento(token: string, file: File): Observable<{ message: string }> {
    const HEADERS = new HttpHeaders({
      jwt: `${token}`,
      idUser: 1,
    });

    const FORM_DATA = new FormData();
    FORM_DATA.append('file', file, file.name);


    return this.http.put<{ message: string }>(`${this.urlServer}/upload`, FORM_DATA, {
      headers: HEADERS,
    });
  }

  /**
   * @description Función para generar el pdf  del acuse
   * @param id
   * @returns JSONResponse
   */
  generarAcuse(cuerpoAcuse: unknown): Observable<unknown> {
    return this.http
      .put<unknown>(`${this.urlServer}/create-pdf`, cuerpoAcuse)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * @description Función para generar el pdf del documento
   * @param body
   * @returns BaseResponse
   */
  generarDoc(body: DocumentosRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServerHost}/api/generador-documento/tramite/documento`, body);
  }

  /**
   * @description Función para visualizar el documento
   * @param nombre
   * @returns BaseResponse<DocumentoResponse>
   */
  getVisualizarDoc(nombre: string): Observable<BaseResponse<DocumentoResponse>> {
    const ENDPOINT = `${this.urlServerHost}/api/generador-documento/tramite/documento/${nombre}`;
    return this.http.get<BaseResponse>(ENDPOINT).pipe(
      map(
        (response) => {
          return response;
        }),
      catchError(() => {
        const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
        return throwError(() => ERROR);
      })
    );
  }

  /**
 * @description Obtiene los datos para el payload de firma desde un JSON local
 * @returns Observable con los datos de documentos requeridos para la firma
 */
  obtenerDatosFirma(): Observable<BaseResponse> {
    const ENDPOINT = 'assets/json/5701/documentos-firma.json';
    return this.http.get<BaseResponse>(ENDPOINT).pipe(
      tap(response => response),
      catchError(() => {
        const ERROR = new Error(`Error al obtener datos de firma: ${ENDPOINT}`);
        return throwError(() => ERROR);
      })
    );
  }
}
