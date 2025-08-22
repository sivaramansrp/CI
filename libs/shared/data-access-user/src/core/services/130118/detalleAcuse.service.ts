import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_GET_DESCARGAR_ACUSE, ENVIRONMENT, UUID } from '../../..';
import { BaseResponse } from '../../models/5701/base-response.model';
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
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Consulta para url de acuse
   * @param uuid Valor de descarga
   * @returns Observable con la respuesta del servidor
 */
  getDescargarAcuse(uuid: string): Observable<BaseResponse<DocumentoResponse>> {
    const ENDPOINT = `${this.host}${API_GET_DESCARGAR_ACUSE.replace(UUID, uuid)}`;
    return this.http.get<BaseResponse<DocumentoResponse>>(ENDPOINT);
  }
}