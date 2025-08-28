import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_GET_REQUERIMIENTO_DETALLE, ENVIRONMENT, IDREQUERIMIENTO, TRAMITE } from '../../..';
import { BaseResponse } from '../../models/5701/base-response.model';
import { Observable } from 'rxjs';
import { RequerimientoDetalleResponse } from '../../models/130118/requerimiento-detalle-response.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleRequerimientoService {

  /**
   * URL base del servicio
   */
  private readonly host: string;

  /**
   * Constructor del servicio DetalleRequerimientoService
   * @param http HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Consulta el detalle completo de un requerimiento específico
   * @param tramite Número identificador del trámite
   * @param idRequerimiento ID único del requerimiento a consultar
   * @returns Observable con la respuesta del servidor
 */
  getDetalleRequerimiento(tramite: number, idRequerimiento: number): Observable<BaseResponse<RequerimientoDetalleResponse>> {
    const ENDPOINT = `${this.host}${API_GET_REQUERIMIENTO_DETALLE.replace(TRAMITE, tramite.toString()).replace(IDREQUERIMIENTO, idRequerimiento.toString())}`;
    return this.http.get<BaseResponse<RequerimientoDetalleResponse>>(ENDPOINT);
  }
}