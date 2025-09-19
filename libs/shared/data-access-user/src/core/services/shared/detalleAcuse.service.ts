import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_GET_DESCARGAR_ACUSE, COMUN_URL, DOCUMENTOMINIO, TRAMITE } from '../../servers/api-router';
import { BaseResponse } from '../../models/shared/base-response.model';
import { DocumentoResponse } from '../../models/shared/documentos-request.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AcuseDetalleService {

  /**
   * URL base del servicio
   */
  private readonly host: string;

  /**
   * Constructor del servicio AcuseDetalleService
   * @param http HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  /**
   * Consulta para base64 de descarga
   * @param tramite Número identificador del trámite
   * @param documentoMinio  Valor de descarga
   * @returns Observable con la respuesta del servidor
 */
  getDescargarAcuse(tramite: number, documentoMinio : string): Observable<BaseResponse<DocumentoResponse>> {
    const ENDPOINT = `${this.host}${API_GET_DESCARGAR_ACUSE.replace(TRAMITE, tramite.toString()).replace(DOCUMENTOMINIO, documentoMinio)}`;
    return this.http.get<BaseResponse<DocumentoResponse>>(ENDPOINT);
  }
}