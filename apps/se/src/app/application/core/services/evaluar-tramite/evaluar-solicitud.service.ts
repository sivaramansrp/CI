import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_POST_OPCIONES_EVALUACION, NUMFOLIOTRAMITE } from '../../../constantes/130118/api-constants';
import { OpcionesEvaluacionRequest } from '../../models/request/opciones-evaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluarSolicitudService {

  /**
    * URL del servidor donde se encuentra la API.
    */
  private readonly host: string;

  /**
   * Constructor del servicio IniciarService.
   * @param http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Envía las opciones de evaluación del trámite 130118.
   * @param folioTramite Número de folio del trámite.
   * @param PAYLOAD Datos de las opciones de evaluación.
   * @returns Observable con la respuesta del servidor.
   */
  postOpcionesEvaluacion(folioTramite: string, PAYLOAD: OpcionesEvaluacionRequest):
    Observable<BaseResponse<string[]>> {
    const ENDPOINT = `${this.host}` +
      API_POST_OPCIONES_EVALUACION.replace(NUMFOLIOTRAMITE, folioTramite);

    return this.http.post<BaseResponse<string[]>>(ENDPOINT, PAYLOAD);
  }
}
