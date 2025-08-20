import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_GET_DICTAMEN_DETALLE, ENVIRONMENT, IDDICTAMEN, TRAMITE } from '../../..';
import { BaseResponse } from '../../models/5701/base-response.model';
import { DictamenDetalleResponse } from '../../models/130118/dictamen-detalle-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleDictamenService {

  /**
   * URL base del servicio
   */
  private readonly host: string;

  /**
   * Constructor del servicio DetalleDictamenService
   * @param http HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Consulta el detalle completo de un dictamen específico
   * @param tramite Número identificador del trámite
   * @param idDictamen ID único del dictamen a consultar
   * @returns Observable con la respuesta del servidor
 */
  getDetalleDictamen(tramite: number, idDictamen: string): Observable<BaseResponse<DictamenDetalleResponse>> {
    const ENDPOINT = `${this.host}${API_GET_DICTAMEN_DETALLE.replace(TRAMITE, tramite.toString()).replace(IDDICTAMEN, idDictamen)}`;
    return this.http.get<BaseResponse<DictamenDetalleResponse>>(ENDPOINT);
  }
}